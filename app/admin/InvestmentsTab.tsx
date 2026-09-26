"use client";

import { useState } from "react";
import { AdminInvestment } from "./types";

const STATUS_LABEL: Record<AdminInvestment["status"], string> = {
  en_attente: "En attente",
  confirmee: "Confirmé",
  terminee: "Terminé",
  annulee: "Annulé",
};
const STATUS_COLOR: Record<AdminInvestment["status"], string> = {
  en_attente: "bg-amber-50 text-amber-600",
  confirmee: "bg-blue-50 text-blue-600",
  terminee: "bg-emerald-50 text-emerald-600",
  annulee: "bg-red-50 text-red-600",
};

export default function InvestmentsTab({
  investments,
  onChanged,
}: {
  investments: AdminInvestment[];
  onChanged: () => void;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);

  async function setStatus(id: string, status: AdminInvestment["status"]) {
    setBusyId(id);
    try {
      await fetch(`/api/investments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  if (investments.length === 0) {
    return <p className="text-sm text-[#1A2F15]/60">Aucun investissement pour le moment.</p>;
  }

  return (
    <div className="rounded-2xl border border-[#1A2F15]/15 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-[#1A2F15] text-white text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Investisseur</th>
            <th className="px-4 py-3 font-semibold">Pack</th>
            <th className="px-4 py-3 font-semibold">Montant</th>
            <th className="px-4 py-3 font-semibold">Paiement</th>
            <th className="px-4 py-3 font-semibold">Statut</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv, i) => (
            <tr key={inv.id} className={i % 2 === 0 ? "bg-[#F8FAF5]" : "bg-white"}>
              <td className="px-4 py-3">{inv.investorName}</td>
              <td className="px-4 py-3">{inv.offerTitle}</td>
              <td className="px-4 py-3 font-semibold">
                {inv.amountFCFA.toLocaleString("fr-FR")} FCFA
                {inv.currency !== "FCFA" && (
                  <span className="text-xs text-gray-400"> (payé en {inv.currency})</span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">{inv.paymentMethod.replace("_", " ")}</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[inv.status]}`}>
                  {STATUS_LABEL[inv.status]}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {inv.status === "en_attente" && (
                    <button disabled={busyId === inv.id} onClick={() => setStatus(inv.id, "confirmee")}
                      className="text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50">
                      Confirmer paiement
                    </button>
                  )}
                  {inv.status === "confirmee" && (
                    <button disabled={busyId === inv.id} onClick={() => setStatus(inv.id, "terminee")}
                      className="text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50">
                      Marquer terminé
                    </button>
                  )}
                  {inv.status !== "annulee" && (
                    <button disabled={busyId === inv.id} onClick={() => setStatus(inv.id, "annulee")}
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
