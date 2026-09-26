"use client";

import { useState } from "react";
import { AdminLead } from "./types";

export default function LeadsTab({ leads, onChanged }: { leads: AdminLead[]; onChanged: () => void }) {
  const [busyId, setBusyId] = useState<string | null>(null);

  async function markTraite(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/franchise-leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "traite" }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/franchise-leads/${id}`, { method: "DELETE" });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  if (leads.length === 0) {
    return <p className="text-sm text-[#1A2F15]/60">Aucune candidature franchise pour le moment.</p>;
  }

  return (
    <div className="space-y-3">
      {leads.map((l) => (
        <div key={l.id} className="rounded-2xl border border-[#1A2F15]/15 p-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-[#1A2F15]">
              {l.name}{" "}
              <span className={`ml-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${l.status === "nouveau" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                {l.status === "nouveau" ? "Nouveau" : "Traité"}
              </span>
            </p>
            <p className="text-xs text-gray-500">{l.email} · {l.phone}</p>
            {l.message && <p className="text-sm text-gray-600 mt-2 max-w-lg">{l.message}</p>}
          </div>
          <div className="flex gap-3 shrink-0">
            {l.status === "nouveau" && (
              <button disabled={busyId === l.id} onClick={() => markTraite(l.id)}
                className="text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50">
                Marquer traité
              </button>
            )}
            <button disabled={busyId === l.id} onClick={() => handleDelete(l.id)}
              className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50">
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
