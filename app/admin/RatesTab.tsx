"use client";

import { useState } from "react";
import { AdminRates } from "./types";

export default function RatesTab({ rates, onChanged }: { rates: AdminRates; onChanged: () => void }) {
  const [eur, setEur] = useState(String(rates.fcfaPerUnit.EUR));
  const [usd, setUsd] = useState(String(rates.fcfaPerUnit.USD));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/rates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EUR: Number(eur), USD: Number(usd) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      onChanged();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-md">
      <p className="text-sm text-[#1A2F15]/60 mb-6">
        Le FCFA est la devise de référence de la plateforme. Renseignez combien
        de FCFA valent 1 EUR et 1 USD ; ces taux servent à convertir les montants
        affichés et réglés en euros ou en dollars.
      </p>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1">
            1 EUR = ? FCFA
          </label>
          <input required type="number" step="0.01" value={eur} onChange={(e) => setEur(e.target.value)}
            className="w-full rounded-xl border border-[#1A2F15]/20 px-3 py-2.5" />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1">
            1 USD = ? FCFA
          </label>
          <input required type="number" step="0.01" value={usd} onChange={(e) => setUsd(e.target.value)}
            className="w-full rounded-xl border border-[#1A2F15]/20 px-3 py-2.5" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-emerald-600">Taux mis à jour.</p>}
        <button type="submit" disabled={saving}
          className="rounded-xl bg-[#1A2F15] text-white font-black uppercase tracking-widest px-6 py-3 text-sm hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-colors disabled:opacity-60">
          {saving ? "Enregistrement…" : "Mettre à jour les taux"}
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-4">
        Dernière mise à jour : {new Date(rates.updatedAt).toLocaleString("fr-FR")}
      </p>
    </div>
  );
}
