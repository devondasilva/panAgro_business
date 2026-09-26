"use client";

import { useState } from "react";
import Image from "next/image";
import { AdminProduct } from "./types";

const emptyForm = { name: "", category: "", description: "", priceFCFA: "", stock: "" };

export default function ProductsTab({ products, onChanged }: { products: AdminProduct[]; onChanged: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<FileList | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [addImageFiles, setAddImageFiles] = useState<Record<string, FileList | null>>({});
  const [edits, setEdits] = useState<Record<string, { priceFCFA: string; stock: string }>>({});

  function editValue(p: AdminProduct, field: "priceFCFA" | "stock") {
    return edits[p.id]?.[field] ?? String(p[field]);
  }
  function setEdit(id: string, field: "priceFCFA" | "stock", value: string) {
    setEdits((prev) => ({
      ...prev,
      [id]: {
        priceFCFA: prev[id]?.priceFCFA ?? String(products.find((p) => p.id === id)?.priceFCFA ?? ""),
        stock: prev[id]?.stock ?? String(products.find((p) => p.id === id)?.stock ?? ""),
        [field]: value,
      },
    }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      const fd = new FormData();
      fd.set("name", form.name);
      fd.set("category", form.category);
      fd.set("description", form.description);
      fd.set("priceFCFA", form.priceFCFA);
      fd.set("stock", form.stock);
      if (files) Array.from(files).forEach((f) => fd.append("images", f));
      const res = await fetch("/api/products", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setForm(emptyForm);
      setFiles(null);
      setShowForm(false);
      onChanged();
    } finally {
      setCreating(false);
    }
  }

  async function handleSave(id: string) {
    const edit = edits[id];
    if (!edit) return;
    setBusyId(id);
    try {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceFCFA: Number(edit.priceFCFA), stock: Number(edit.stock) }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function toggleActive(p: AdminProduct) {
    setBusyId(p.id);
    try {
      await fetch(`/api/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !p.active }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function handleAddImages(productId: string) {
    const fl = addImageFiles[productId];
    if (!fl || fl.length === 0) return;
    setBusyId(productId);
    try {
      const fd = new FormData();
      Array.from(fl).forEach((f) => fd.append("images", f));
      await fetch(`/api/products/${productId}/images`, { method: "POST", body: fd });
      setAddImageFiles((prev) => ({ ...prev, [productId]: null }));
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemoveImage(productId: string, imgPath: string) {
    setBusyId(productId);
    try {
      await fetch(`/api/products/${productId}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: imgPath }),
      });
      onChanged();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => setShowForm((s) => !s)}
          className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-[#1A2F15]/15 hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors">
          {showForm ? "Annuler" : "+ Nouveau produit"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-2xl border border-[#1A2F15]/15 p-5 grid sm:grid-cols-2 gap-3">
          <input required placeholder="Nom du produit" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm sm:col-span-2" />
          <input required placeholder="Catégorie (ex. Volaille)" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm" />
          <input required type="number" placeholder="Prix (FCFA)" value={form.priceFCFA}
            onChange={(e) => setForm({ ...form, priceFCFA: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm" />
          <input required type="number" placeholder="Stock" value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm sm:col-span-2" />
          <textarea placeholder="Description" rows={2} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded-xl border border-[#1A2F15]/20 px-3 py-2 text-sm sm:col-span-2" />
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Photos (JPEG, PNG, WEBP — 8 Mo max chacune)
            </label>
            <input type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} className="text-sm" />
          </div>
          {error && <p className="text-xs text-red-600 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={creating}
            className="sm:col-span-2 rounded-xl bg-[#8DC63F] text-[#1A2F15] font-black py-2 text-sm hover:bg-[#1A2F15] hover:text-white transition-colors disabled:opacity-60">
            {creating ? "Création…" : "Créer le produit"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-[#1A2F15]/15 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#F8FAF5]">
              <div>
                <p className="font-semibold text-[#1A2F15]">
                  {p.name} {!p.active && <span className="text-xs text-red-500 font-normal">(masqué)</span>}
                </p>
                <p className="text-xs text-gray-500">
                  {p.category} · {p.images.length} photo(s) · stock {p.stock}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input value={editValue(p, "priceFCFA")} onChange={(e) => setEdit(p.id, "priceFCFA", e.target.value)}
                  className="w-24 rounded-lg border border-[#1A2F15]/20 px-2 py-1 text-sm" />
                <input value={editValue(p, "stock")} onChange={(e) => setEdit(p.id, "stock", e.target.value)}
                  className="w-16 rounded-lg border border-[#1A2F15]/20 px-2 py-1 text-sm" />
                <button disabled={busyId === p.id} onClick={() => handleSave(p.id)}
                  className="text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50">
                  Enregistrer
                </button>
                <button onClick={() => setOpenId(openId === p.id ? null : p.id)}
                  className="text-xs font-semibold text-[#8DC63F] hover:underline">
                  {openId === p.id ? "Masquer" : "Photos"}
                </button>
                <button disabled={busyId === p.id} onClick={() => toggleActive(p)}
                  className="text-xs font-semibold text-gray-500 hover:underline disabled:opacity-50">
                  {p.active ? "Masquer" : "Publier"}
                </button>
                <button disabled={busyId === p.id} onClick={() => handleDelete(p.id)}
                  className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50">
                  Supprimer
                </button>
              </div>
            </div>

            {openId === p.id && (
              <div className="p-4 border-t border-[#1A2F15]/10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.images.map((img) => (
                    <div key={img} className="relative w-20 h-16 rounded-xl overflow-hidden group">
                      <Image src={img} alt="" fill className="object-cover" />
                      <button onClick={() => handleRemoveImage(p.id, img)}
                        className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        Retirer
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input type="file" accept="image/*" multiple
                    onChange={(e) => setAddImageFiles((prev) => ({ ...prev, [p.id]: e.target.files }))}
                    className="text-xs" />
                  <button disabled={busyId === p.id} onClick={() => handleAddImages(p.id)}
                    className="text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50">
                    Ajouter
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
