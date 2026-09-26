"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ShoppingBasket, Plus, Minus, Trash2, Leaf, Check } from "lucide-react";
import CurrencySelector from "@/app/components/CurrencySelector";
import { Currency, ExchangeRates, Product } from "@/lib/types";
import { fromFCFA, formatAmount } from "@/lib/currency";

type PaymentMethod = "mtn_momo" | "moov_money" | "carte_bancaire" | "virement";
const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  mtn_momo: "MTN Mobile Money",
  moov_money: "Moov Money",
  carte_bancaire: "Carte bancaire",
  virement: "Virement bancaire",
};

interface CartLine {
  product: Product;
  qty: number;
}

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [currency, setCurrency] = useState<Currency>("FCFA");
  const [cart, setCart] = useState<CartLine[]>([]);

  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mtn_momo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then((d) =>
      setProducts((d.products ?? []).filter((p: Product) => p.active))
    );
    fetch("/api/rates").then((r) => r.json()).then((d) => setRates(d.rates));
  }, []);

  function fmt(fcfa: number) {
    if (!rates) return `${fcfa.toLocaleString("fr-FR")} FCFA`;
    return formatAmount(fromFCFA(fcfa, currency, rates), currency);
  }

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function changeQty(productId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) =>
          l.product.id === productId
            ? { ...l, qty: Math.max(0, Math.min(l.product.stock, l.qty + delta)) }
            : l
        )
        .filter((l) => l.qty > 0)
    );
  }

  const totalFCFA = useMemo(
    () => cart.reduce((s, l) => s + l.product.priceFCFA * l.qty, 0),
    [cart]
  );

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          currency,
          paymentMethod,
          items: cart.map((l) => ({ productId: l.product.id, qty: l.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setSuccess(`Merci ${name} ! Votre commande de ${fmt(totalFCFA)} est enregistrée, en attente de paiement.`);
      setCart([]);
      setShowCheckout(false);
      fetch("/api/products").then((r) => r.json()).then((d) =>
        setProducts((d.products ?? []).filter((p: Product) => p.active))
      );
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-white font-sans">
      <section className="pt-40 pb-16 px-6 bg-[#F8FAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20 mb-6">
            <Leaf size={16} className="text-[#8DC63F]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15]">Directement de la ferme de Sakété</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1A2F15] leading-none">
              LA BOUTIQUE <br /><span className="text-[#8DC63F]">PANAGRO.</span>
            </h1>
            <CurrencySelector value={currency} onChange={setCurrency} />
          </div>
        </div>
      </section>

      {success && (
        <div className="max-w-2xl mx-auto px-6 -mt-8 mb-8 relative z-10">
          <div className="bg-[#8DC63F]/10 border-2 border-[#8DC63F]/30 rounded-2xl p-6 flex items-start gap-3">
            <Check className="text-[#8DC63F] shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-[#1A2F15]">{success}</p>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-14">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-xl font-black uppercase tracking-tight text-[#1A2F15] border-b border-gray-100 pb-3 mb-6">
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {products.filter((p) => p.category === cat).map((p) => (
                  <div key={p.id} className="border border-gray-100 rounded-[2rem] overflow-hidden hover:shadow-lg transition-shadow">
                    {p.images[0] ? (
                      <div className="relative h-40 w-full bg-[#F8FAF5]">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-40 w-full bg-[#1A2F15] flex items-center justify-center">
                        <Leaf className="text-[#8DC63F]" size={32} />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="font-black text-[#1A2F15]">{p.name}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{p.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-lg font-black text-[#8DC63F]">{fmt(p.priceFCFA)}</span>
                        <span className="text-[10px] text-gray-400">{p.stock > 0 ? `${p.stock} en stock` : "Épuisé"}</span>
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        disabled={p.stock === 0}
                        className="mt-4 w-full py-2.5 rounded-xl bg-[#1A2F15] text-white text-xs font-black uppercase tracking-widest hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all disabled:opacity-40"
                      >
                        {p.stock === 0 ? "Épuisé" : "Ajouter au panier"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="text-gray-400">Aucun produit disponible pour le moment.</p>}
        </div>

        {/* PANIER */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#F8FAF5] rounded-[2.5rem] p-7 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBasket className="text-[#8DC63F]" size={20} />
              <h3 className="font-black uppercase tracking-tight text-[#1A2F15]">Mon panier</h3>
            </div>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-400">Votre panier est vide.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((l) => (
                  <div key={l.product.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#1A2F15] truncate">{l.product.name}</p>
                      <p className="text-xs text-gray-400">{fmt(l.product.priceFCFA * l.qty)}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => changeQty(l.product.id, -1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                      <button onClick={() => changeQty(l.product.id, 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => changeQty(l.product.id, -l.qty)} className="w-6 h-6 rounded-full border border-red-100 text-red-400 flex items-center justify-center ml-1">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total</span>
                  <span className="text-xl font-black text-[#1A2F15]">{fmt(totalFCFA)}</span>
                </div>

                {!showCheckout ? (
                  <button onClick={() => setShowCheckout(true)}
                    className="w-full py-3.5 bg-[#1A2F15] text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all">
                    Passer commande
                  </button>
                ) : (
                  <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                    <input required placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                    <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                    <input required placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" />
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-white">
                      {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((m) => (
                        <option key={m} value={m}>{PAYMENT_LABELS[m]}</option>
                      ))}
                    </select>
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="w-full py-3.5 bg-[#8DC63F] text-[#1A2F15] font-black uppercase tracking-widest text-xs rounded-xl hover:bg-[#1A2F15] hover:text-white transition-all disabled:opacity-60">
                      {loading ? "Envoi…" : `Confirmer — ${fmt(totalFCFA)}`}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
