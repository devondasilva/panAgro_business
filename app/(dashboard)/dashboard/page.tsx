"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  Droplets,
  Sun,
  Wallet,
  RefreshCw,
  MapPin,
  Sprout,
  Activity,
  LogOut,
  User,
  ExternalLink,
  Menu,
  X,
  ShoppingBasket
} from 'lucide-react';
import CurrencySelector from '@/app/components/CurrencySelector';
import { Currency, ExchangeRates, Investment, Investor, Order } from '@/lib/types';
import { fromFCFA, formatAmount } from '@/lib/currency';

const STATUS_LABEL: Record<Investment["status"], string> = {
  en_attente: "En attente",
  confirmee: "En cours",
  terminee: "Arrivé à terme",
  annulee: "Annulé",
};
const STATUS_STYLE: Record<Investment["status"], string> = {
  en_attente: "bg-amber-50 text-amber-600 border border-amber-100",
  confirmee: "bg-blue-50 text-blue-600 border border-blue-100",
  terminee: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  annulee: "bg-red-50 text-red-600 border border-red-100",
};

const UserHome: React.FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("FCFA");

  const [investor, setInvestor] = useState<Investor | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);

  const [iotData] = useState({
    soilMoisture: "42%",
    pumpStatus: "Actif (Solaire)",
    sunExposure: "85%",
    lastUpdate: "Il y a 2 min"
  });

  useEffect(() => {
    fetch("/api/investors/me")
      .then(async (r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        setInvestor(d.investor);
        setInvestments(d.investments ?? []);
        setOrders(d.orders ?? []);
        setRates(d.rates);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  const fmt = (fcfa: number) =>
    rates ? formatAmount(fromFCFA(fcfa, currency, rates), currency) : `${fcfa.toLocaleString("fr-FR")} FCFA`;

  const totalEngage = investments
    .filter((i) => i.status === "confirmee" || i.status === "en_attente")
    .reduce((s, i) => s + i.amountFCFA, 0);

  const soldeDisponible = investments
    .filter((i) => i.status === "terminee")
    .reduce((s, i) => s + i.amountFCFA * (1 + i.roiPercent / 100), 0);

  const rendementGlobal = investments.length
    ? investments.reduce((s, i) => s + i.roiPercent, 0) / investments.length
    : 0;

  if (loading) {
    return <div className="min-h-screen bg-[#F8FAF5] flex items-center justify-center text-[#1A2F15]">Chargement…</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF5] font-sans text-[#1A2F15] flex relative overflow-x-hidden">

      {/* --- SIDEBAR DE NAVIGATION (DESKTOP) --- */}
      <aside className={`w-80 bg-[#1A2F15] text-white p-8 flex flex-col justify-between fixed h-screen z-30 transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:left-0`}>
        <div>
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8DC63F] flex items-center justify-center font-black text-[#1A2F15]">P</div>
              <span className="text-xl font-black uppercase tracking-tighter">PANAGRO <span className="text-[#8DC63F]">.</span></span>
            </div>
            <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-3">
            <SidebarLink icon={<Activity size={18} />} label="Vue d'ensemble" href="/dashboard" active />
            <SidebarLink icon={<Sprout size={18} />} label="L'exploitation (Sakété)" href="/exploitation" />
            <SidebarLink icon={<ShoppingBasket size={18} />} label="Boutique" href="/boutique" />
            <SidebarLink icon={<TrendingUp size={18} />} label="Nouvel investissement" href="/invest" />
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8DC63F]">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs font-black truncate max-w-[120px]">{investor?.name ?? "Investisseur"}</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Investisseur</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-3 text-gray-400 hover:text-red-400 rounded-xl hover:bg-white/5 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 lg:pl-80 min-h-screen flex flex-col w-full">

        {/* TOP BAR */}
        <header className="py-6 px-6 md:px-10 flex flex-wrap gap-4 justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 bg-[#1A2F15] text-white rounded-xl" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">Bonjour, {investor?.name ?? ""} 👋</h1>
              <p className="hidden sm:block text-xs text-gray-500 font-medium">Ravi de vous revoir sur votre espace Agro-Tech.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] md:text-xs font-black whitespace-nowrap">
              <MapPin size={14} className="text-[#8DC63F]" /> Sakété, Bénin
            </div>
          </div>
        </header>

        {/* DASHBOARD CORE GRID */}
        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto space-y-8 flex-1">

          {/* --- SECTION 1 : FINANCES & IOT --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Solde Wallet */}
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Solde Disponible</p>
                <h3 className="text-3xl font-black tracking-tighter text-[#1A2F15]">{fmt(soldeDisponible)}</h3>
                <p className="text-[10px] text-gray-400 mt-1">Capital + ROI des cycles arrivés à terme</p>
              </div>
              <div className="flex gap-2 mt-6">
                <Link href="/contact" className="flex-1 py-3.5 bg-[#1A2F15] text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all flex items-center justify-center gap-1">
                  <Wallet size={14} /> Demander un retrait
                </Link>
              </div>
            </div>

            {/* Total Investi */}
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Engagé</p>
                <h3 className="text-3xl font-black tracking-tighter text-[#1A2F15]">{fmt(totalEngage)}</h3>
              </div>
              <div className="mt-6 flex items-center gap-1 text-[11px] font-black text-[#8DC63F] uppercase tracking-wider">
                <TrendingUp size={14} /> {rendementGlobal.toFixed(1)}% ROI moyen visé
              </div>
            </div>

            {/* Statut IoT Instantané */}
            <div className="bg-[#1A2F15] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={80} /></div>
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">📡 IoT Sakété (démo)</p>
                <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full font-bold opacity-70">{iotData.lastUpdate}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets size={16} className="text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Humidité Sol</p>
                    <p className="text-sm font-black">{iotData.soilMoisture}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={16} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase font-bold">Ensoleillement</p>
                    <p className="text-sm font-black">{iotData.sunExposure}</p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-4 border-t border-white/5 pt-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Pompage : {iotData.pumpStatus}
              </p>
            </div>
          </section>

          {/* --- SECTION 2 : LES INVESTISSEMENTS --- */}
          <section className="bg-white border border-gray-100 rounded-[3rem] p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter">Mes Investissements</h3>
                <p className="text-xs text-gray-400">Cycles adossés aux terres de Sakété.</p>
              </div>
              <Link href="/invest" className="p-3 bg-[#F8FAF5] rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                <RefreshCw size={14} />
              </Link>
            </div>

            {investments.length === 0 ? (
              <p className="text-sm text-gray-400 py-6">
                Aucun investissement pour le moment.{" "}
                <Link href="/invest" className="text-[#8DC63F] font-black hover:underline">
                  Découvrir les packs →
                </Link>
              </p>
            ) : (
              <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <th className="pb-4">ID</th>
                      <th className="pb-4">Pack Agricole</th>
                      <th className="pb-4">Montant Engagé</th>
                      <th className="pb-4">ROI visé</th>
                      <th className="pb-4">Durée</th>
                      <th className="pb-4 text-right">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm font-bold">
                    {investments.map((inv) => (
                      <tr key={inv.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 text-xs font-mono text-gray-400">#{inv.id.slice(-6)}</td>
                        <td className="py-4 font-black text-[#1A2F15]">{inv.offerTitle}</td>
                        <td className="py-4 text-[#1A2F15]">{fmt(inv.amountFCFA)}</td>
                        <td className="py-4 text-[#8DC63F] font-black">+{inv.roiPercent}%</td>
                        <td className="py-4 text-xs text-gray-500 font-medium">{inv.durationLabel}</td>
                        <td className="py-4 text-right">
                          <span className={`inline-block text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${STATUS_STYLE[inv.status]}`}>
                            {STATUS_LABEL[inv.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* --- SECTION 2bis : MES COMMANDES BOUTIQUE --- */}
          <section className="bg-white border border-gray-100 rounded-[3rem] p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter">Mes Commandes Boutique</h3>
                <p className="text-xs text-gray-400">Produits de la ferme commandés en ligne.</p>
              </div>
              <Link href="/boutique" className="p-3 bg-[#F8FAF5] rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                <ShoppingBasket size={14} />
              </Link>
            </div>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-400 py-6">
                Aucune commande pour le moment.{" "}
                <Link href="/boutique" className="text-[#8DC63F] font-black hover:underline">
                  Voir la boutique →
                </Link>
              </p>
            ) : (
              <ul className="divide-y divide-gray-50 text-sm">
                {orders.map((o) => (
                  <li key={o.id} className="py-3 flex justify-between items-center">
                    <span className="text-[#1A2F15] font-bold">
                      {o.items.map((it) => `${it.qty}× ${it.name}`).join(", ")}
                    </span>
                    <span className="text-gray-500 font-black">{fmt(o.totalFCFA)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* --- SECTION 3 : ACTUALITÉS ET SUPPORT --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF5] border border-[#8DC63F]/20 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-sm uppercase tracking-wider text-[#1A2F15] mb-2 flex items-center gap-2">
                  <Sprout size={16} className="text-[#8DC63F]" /> Note Agro-Climatique du Plateau
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Le système de goutte-à-goutte connecté a régulé avec succès le coup de chaleur de la semaine dernière sur la parcelle de Poivrons de Sakété. Les prévisions de récolte restent stables.
                </p>
              </div>
              <Link href="/exploitation" className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#1A2F15] flex items-center gap-1 hover:text-[#8DC63F] transition-colors w-max">
                Consulter le carnet de bord <ExternalLink size={12} />
              </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-sm uppercase tracking-wider text-[#1A2F15] mb-2">Besoin d'aide ou d'un conseil ?</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Votre conseiller Panagro est disponible par WhatsApp ou appel direct pour planifier votre prochaine visite sur site ou ajuster vos réinvestissements.
                </p>
              </div>
              <Link href="/contact" className="mt-6 w-full py-4 bg-[#1A2F15] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all text-center">
                Contacter mon conseiller PANAGRO
              </Link>
            </div>
          </section>

        </div>
      </main>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, href, active }) => (
  <Link
    href={href}
    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
      active
      ? 'bg-[#8DC63F] text-[#1A2F15] font-black shadow-lg shadow-[#8DC63F]/10'
      : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span>{label}</span>
  </Link>
);

export default UserHome;
