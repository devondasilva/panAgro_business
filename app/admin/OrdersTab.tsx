"use client";

import { useState } from "react";
import { AdminOrder } from "./types";

const STATUS_LABEL: Record<AdminOrder["status"], string> = {
  en_attente: "En attente",
  payee: "Payée",
  expediee: "Expédiée",
  annulee: "Annulée",
};
const STATUS_COLOR: Record<AdminOrder["status"], string> = {
  en_attente: "bg-amber-50 text-amber-600",
  payee: "bg-blue-50 text-blue-600",
  expediee: "bg-emerald-50 text-emerald-600",
  annulee: "bg-red-50 text-red-600",
};

export default function OrdersTab({ orders, onChanged }: { orders: AdminOrder[]; onChanged: () => void }) {
  const [busyId, setBusyId] = useState<string | null>(null);

  async function setStatus(id: string, status: AdminOrder["status"]) {
    setBusyId(id);
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  if (orders.length === 0) {
    return <p className="text-sm text-[#1A2F15]/60">Aucune commande pour le moment.</p>;
  }

  return (
    <div className="rounded-2xl border border-[#1A2F15]/15 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#1A2F15] text-white text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Client</th>
            <th className="px-4 py-3 font-semibold">Articles</th>
            <th className="px-4 py-3 font-semibold text-right">Total</th>
            <th className="px-4 py-3 font-semibold">Statut</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id} className={i % 2 === 0 ? "bg-[#F8FAF5]" : "bg-white"}>
              <td className="px-4 py-3">{o.investorName}</td>
              <td className="px-4 py-3">{o.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}</td>
              <td className="px-4 py-3 text-right font-semibold">{o.totalFCFA.toLocaleString("fr-FR")} FCFA</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[o.status]}`}>
                  {STATUS_LABEL[o.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  {o.status === "en_attente" && (
                    <button disabled={busyId === o.id} onClick={() => setStatus(o.id, "payee")}
                      className="text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50">
                      Marquer payée
                    </button>
                  )}
                  {o.status === "payee" && (
                    <button disabled={busyId === o.id} onClick={() => setStatus(o.id, "expediee")}
                      className="text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50">
                      Marquer expédiée
                    </button>
                  )}
                  {o.status !== "annulee" && (
                    <button disabled={busyId === o.id} onClick={() => setStatus(o.id, "annulee")}
                      className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50">
                      Annuler
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
