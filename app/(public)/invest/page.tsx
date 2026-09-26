"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Leaf, PieChart, Info, Check } from 'lucide-react';
import CurrencySelector from '@/app/components/CurrencySelector';
import { Currency, ExchangeRates, InvestmentOffer } from '@/lib/types';
import { fromFCFA, formatAmount } from '@/lib/currency';

type PaymentMethod = "mtn_momo" | "moov_money" | "carte_bancaire" | "virement";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  mtn_momo: "MTN Mobile Money",
  moov_money: "Moov Money",
  carte_bancaire: "Carte bancaire",
  virement: "Virement bancaire",
};

const Invest: React.FC = () => {
  const brandGreen = "#8DC63F";

  const [offers, setOffers] = useState<InvestmentOffer[]>([]);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [currency, setCurrency] = useState<Currency>("FCFA");
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mtn_momo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/offers").then((r) => r.json()).then((d) => setOffers(d.offers ?? []));
    fetch("/api/rates").then((r) => r.json()).then((d) => setRates(d.rates));
  }, []);

  const selectedOffer = offers.find((o) => o.id === selectedOfferId);

  function minInCurrency(offer: InvestmentOffer): string {
    if (!rates) return `${offer.minAmountFCFA.toLocaleString("fr-FR")} FCFA`;
    return formatAmount(fromFCFA(offer.minAmountFCFA, currency, rates), currency);
  }

  function openOffer(offerId: string) {
    setSelectedOfferId(offerId);
    setSuccess(null);
    setError(null);
    const offer = offers.find((o) => o.id === offerId);
    if (offer && rates) {
      setAmount(String(Math.round(fromFCFA(offer.minAmountFCFA, currency, rates))));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedOffer) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          offerId: selectedOffer.id,
          amount: Number(amount),
          currency,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setSuccess(
        `Merci ${data.investor.name} ! Votre investissement de ${formatAmount(
          Number(amount),
          currency
        )} dans "${selectedOffer.title}" est enregistré, en attente de confirmation de paiement. Suivez-le depuis votre tableau de bord.`
      );
      setSelectedOfferId(null);
      setAmount("");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#8DC63F] selection:text-white overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20 mb-8"
          >
            <TrendingUp size={16} color={brandGreen} />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15]">Agribusiness Durable • Bénin</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-[#1A2F15] leading-none tracking-tighter mb-8">
            INVESTIR DANS <br /> <span style={{ color: brandGreen }}>LE VIVANT.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed mb-8">
            Devenez acteur de la transition agro-tech à Sakété. Financez nos cycles de production de contre-saison et partagez les fruits de nos récoltes.
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Afficher les montants en
            </p>
            <CurrencySelector value={currency} onChange={setCurrency} />
          </div>
        </div>
      </section>

      {/* --- GRILLE DES PACKS --- */}
      <section className="py-20 px-6 bg-slate-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2.5rem] border flex flex-col justify-between transition-all duration-300 ${
                offer.featured ? 'bg-[#1A2F15] text-white border-transparent shadow-2xl lg:scale-105 z-10' : 'bg-white border-gray-100 text-[#1A2F15]'
              }`}
            >
              <div>
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 block ${offer.featured ? 'text-[#8DC63F]' : 'text-gray-400'}`}>
                  Durée : {offer.durationLabel}
                </span>
                <h3 className="text-2xl font-black mb-2 tracking-tighter">{offer.title}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className={`text-4xl font-black ${offer.featured ? 'text-white' : 'text-[#8DC63F]'}`}>{offer.roiPercent}% ROI*</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {offer.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wide opacity-80">
                      <div className={`w-1.5 h-1.5 rounded-full ${offer.featured ? 'bg-[#8DC63F]' : 'bg-[#1A2F15]'}`}></div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={`text-[10px] font-black mb-4 uppercase tracking-widest ${offer.featured ? 'text-gray-400' : 'text-gray-300'}`}>
                  Minimum : {minInCurrency(offer)}
                </p>
                <button
                  onClick={() => openOffer(offer.id)}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${
                    offer.featured
                    ? 'bg-[#8DC63F] text-[#1A2F15] hover:brightness-110'
                    : 'bg-[#1A2F15] text-white hover:bg-black'
                  }`}
                >
                  Choisir ce pack
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FORMULAIRE D'INVESTISSEMENT --- */}
      {selectedOffer && (
        <section className="py-16 px-6">
          <div className="max-w-xl mx-auto bg-white border-2 border-[#1A2F15]/10 rounded-[2.5rem] p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F] mb-2">
              {selectedOffer.title}
            </p>
            <h3 className="text-2xl font-black text-[#1A2F15] tracking-tighter mb-6">
              Finaliser mon investissement
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <input required placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)}
                  className="rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none" />
                <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none" />
              </div>
              <input required placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none" />

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">
                  Montant ({currency})
                </label>
                <input
                  required
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-2xl border-2 border-[#1A2F15]/10 px-4 py-3 focus:border-[#8DC63F] outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">Minimum : {minInCurrency(selectedOffer)}</p>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">
                  Mode de paiement
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`text-xs font-bold py-2.5 rounded-xl border-2 transition-all ${
                        paymentMethod === m
                          ? "border-[#8DC63F] bg-[#8DC63F]/10 text-[#1A2F15]"
                          : "border-[#1A2F15]/10 text-gray-500"
                      }`}
                    >
                      {PAYMENT_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-600 bg-red-50 rounded-2xl px-4 py-3">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-[#1A2F15] text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all disabled:opacity-60"
                >
                  {loading ? "Envoi…" : "Confirmer mon investissement"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOfferId(null)}
                  className="px-5 rounded-2xl border-2 border-[#1A2F15]/10 text-sm font-bold text-gray-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {success && (
        <section className="px-6 -mt-8 mb-8">
          <div className="max-w-xl mx-auto bg-[#8DC63F]/10 border-2 border-[#8DC63F]/30 rounded-2xl p-6 flex items-start gap-3">
            <Check className="text-[#8DC63F] shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-[#1A2F15]">{success}</p>
          </div>
        </section>
      )}

      {/* --- SECTION ASSURANCE & CONFIANCE --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-8">
            <ShieldCheck size={40} color={brandGreen} className="mb-6" />
            <h4 className="text-xl font-black text-[#1A2F15] mb-4">Actifs Tangibles</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Vos fonds sont directement adossés aux infrastructures physiques de notre site de Sakété (forages, systèmes solaires, serres).</p>
          </div>
          <div className="flex flex-col items-center text-center p-8">
            <PieChart size={40} color={brandGreen} className="mb-6" />
            <h4 className="text-xl font-black text-[#1A2F15] mb-4">Suivi Transparent</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Suivez l'état de croissance des parcelles et les volumes de récoltes vendus via votre espace investisseur.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8">
            <Leaf size={40} color={brandGreen} className="mb-6" />
            <h4 className="text-xl font-black text-[#1A2F15] mb-4">Souveraineté Alimentaire</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Chaque investissement renforce la production locale saine et réduit la dépendance aux importations de produits chimiques.</p>
          </div>
        </div>
      </section>

      {/* --- FAQ MINI --- */}
      <section className="py-20 px-6 bg-gray-50 rounded-[4rem] mx-6 mb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Info size={24} color={brandGreen} />
            <h3 className="text-3xl font-black text-[#1A2F15] tracking-tighter">Questions Fréquentes</h3>
          </div>
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-200">
              <p className="font-black text-[#1A2F15] mb-2 uppercase text-xs tracking-widest italic">Comment est versé le ROI ?</p>
              <p className="text-gray-500 text-sm">Les gains et le capital initial sont reversés à la fin du cycle choisi, dans la devise de votre investissement (FCFA, EUR ou USD), par virement ou solution de paiement mobile.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <p className="font-black text-[#1A2F15] mb-2 uppercase text-xs tracking-widest italic">Puis-je suivre physiquement la ferme à Sakété ?</p>
              <p className="text-gray-500 text-sm">Absolument. Selon votre pack, des visites privées de l'exploitation connectée sont planifiées pour vous permettre de constater l'avancement technique du projet.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Invest;
