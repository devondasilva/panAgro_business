"use client";

import { useState } from "react";
import { AdminOffer } from "./types";

const emptyForm = { title: "", durationLabel: "", roiPercent: "", minAmountFCFA: "", benefits: "" };

export default function OffersTab({ offers, onChanged }: { offers: AdminOffer[]; onChanged: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          durationLabel: form.durationLabel,
          roiPercent: Number(form.roiPercent),
          minAmountFCFA: Number(form.minAmountFCFA),
          benefits: form.benefits.split(",").map((b) => b.trim()).filter(Boolean),
          featured: false,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setForm(emptyForm);
      setShowForm(false);
      onChanged();
    } finally {
      setCreating(false);
    }
  }

  async function toggleActive(o: AdminOffer) {
    setBusyId(o.id);
    try {
      await fetch(`/api/offers/${o.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !o.active }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function toggleFeatured(o: AdminOffer) {
    setBusyId(o.id);
    try {
      await fetch(`/api/offers/${o.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !o.featured }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/offers/${id}`, { method: "DELETE" });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((s) => !s)}
          className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-[#1A2F15]/15 hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors"
        >
          {showForm ? "Annuler" : "+ Nouveau pack"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-2xl border border-[#1A2F15]/15 p-5 grid sm:grid-cols-2 gap-3">
          <input required placeholder="Titre (ex. Pack Découverte)" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm sm:col-span-2" />
          <input required placeholder="Durée (ex. 3 mois)" value={form.durationLabel}
            onChange={(e) => setForm({ ...form, durationLabel: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm" />
          <input required type="number" placeholder="ROI (%)" value={form.roiPercent}
            onChange={(e) => setForm({ ...form, roiPercent: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm" />
          <input required type="number" placeholder="Montant minimum (FCFA)" value={form.minAmountFCFA}
            onChange={(e) => setForm({ ...form, minAmountFCFA: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm sm:col-span-2" />
          <input placeholder="Avantages séparés par des virgules" value={form.benefits}
            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm sm:col-span-2" />
          {error && <p className="text-xs text-red-600 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={creating}
            className="sm:col-span-2 rounded-xl bg-[#8DC63F] text-[#1A2F15] font-black py-2 text-sm hover:bg-[#1A2F15] hover:text-white transition-colors disabled:opacity-60">
            {creating ? "Création…" : "Créer le pack"}
          </button>
        </form>
      )}

      <div className="rounded-2xl border border-[#1A2F15]/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#1A2F15] text-white text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Pack</th>
              <th className="px-4 py-3 font-semibold">Durée</th>
              <th className="px-4 py-3 font-semibold">ROI</th>
              <th className="px-4 py-3 font-semibold">Minimum</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((o, i) => (
              <tr key={o.id} className={i % 2 === 0 ? "bg-[#F8FAF5]" : "bg-white"}>
                <td className="px-4 py-3 font-semibold">
                  {o.title} {o.featured && <span className="text-[#8DC63F]">★</span>}
                </td>
                <td className="px-4 py-3">{o.durationLabel}</td>
                <td className="px-4 py-3">{o.roiPercent}%</td>
                <td className="px-4 py-3">{o.minAmountFCFA.toLocaleString("fr-FR")} FCFA</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${o.active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
                    {o.active ? "Actif" : "Masqué"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button disabled={busyId === o.id} onClick={() => toggleFeatured(o)} className="text-xs font-semibold text-[#8DC63F] hover:underline disabled:opacity-50">
                      {o.featured ? "Retirer avant" : "Mettre en avant"}
                    </button>
                    <button disabled={busyId === o.id} onClick={() => toggleActive(o)} className="text-xs font-semibold text-gray-500 hover:underline disabled:opacity-50">
                      {o.active ? "Masquer" : "Publier"}
                    </button>
                    <button disabled={busyId === o.id} onClick={() => handleDelete(o.id)} className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
