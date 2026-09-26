"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Stats } from "./types";
import OffersTab from "./OffersTab";
import InvestmentsTab from "./InvestmentsTab";
import ProductsTab from "./ProductsTab";
import OrdersTab from "./OrdersTab";
import LeadsTab from "./LeadsTab";
import InvestorsTab from "./InvestorsTab";
import RatesTab from "./RatesTab";

type Tab = "apercu" | "offres" | "investissements" | "produits" | "commandes" | "franchise" | "investisseurs" | "taux";

const TABS: { id: Tab; label: string }[] = [
  { id: "apercu", label: "Vue d'ensemble" },
  { id: "offres", label: "Packs investissement" },
  { id: "investissements", label: "Investissements" },
  { id: "produits", label: "Produits" },
  { id: "commandes", label: "Commandes" },
  { id: "franchise", label: "Franchise" },
  { id: "investisseurs", label: "Investisseurs" },
  { id: "taux", label: "Taux de change" },
];

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#1A2F15]/15 p-5 bg-white">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-2xl font-black text-[#1A2F15] mt-1 tracking-tight">{value}</p>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [tab, setTab] = useState<Tab>("apercu");
  const [unauthorized, setUnauthorized] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);

  const refresh = useCallback(() => {
    fetch("/api/stats").then((r) => {
      if (r.status === 401) {
        setUnauthorized(true);
        return;
      }
      r.json().then(setStats);
    });
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.session?.role === "admin") setAdminName(d.session.name);
      });
    refresh();
  }, [refresh]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF5] text-center px-6">
        <p className="text-[#1A2F15]/70">
          Votre session a expiré.{" "}
          <a href="/login?next=/admin" className="text-[#8DC63F] font-black hover:underline">
            Reconnectez-vous
          </a>
          .
        </p>
      </div>
    );
  }

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAF5]">Chargement du tableau de bord…</div>;
  }

  const t = stats.totals;

  return (
    <div className="min-h-screen bg-[#F8FAF5] pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8DC63F] mb-2">Back-office</p>
            <h1 className="text-4xl font-black tracking-tight text-[#1A2F15]">Tableau de bord</h1>
            {adminName && <p className="mt-2 text-sm text-gray-500">Connecté en tant que {adminName}</p>}
          </div>
          <button onClick={handleLogout}
            className="text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-[#1A2F15]/15 hover:border-red-400 hover:text-red-500 transition-colors">
            Déconnexion
          </button>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {TABS.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`whitespace-nowrap text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                tab === tb.id ? "bg-[#1A2F15] text-white border-[#1A2F15]" : "border-[#1A2F15]/15 text-gray-500 hover:border-[#1A2F15]/40"
              }`}>
              {tb.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "apercu" && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard label="Total investi" value={`${t.totalInvestedFCFA.toLocaleString("fr-FR")} FCFA`} />
                <KpiCard label="Investisseurs" value={String(t.investors)} />
                <KpiCard label="Investissements" value={String(t.investments)} />
                <KpiCard label="Nouvelles candidatures franchise" value={String(t.newLeads)} />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard label="Chiffre d'affaires boutique" value={`${t.totalOrdersFCFA.toLocaleString("fr-FR")} FCFA`} />
                <KpiCard label="Commandes" value={String(t.orders)} />
                <KpiCard label="Produits au catalogue" value={String(t.products)} />
                <KpiCard label="Packs d'investissement" value={String(t.offers)} />
              </div>
            </div>
          )}

          {tab === "offres" && <OffersTab offers={stats.offers} onChanged={refresh} />}
          {tab === "investissements" && <InvestmentsTab investments={stats.investments} onChanged={refresh} />}
          {tab === "produits" && <ProductsTab products={stats.products} onChanged={refresh} />}
          {tab === "commandes" && <OrdersTab orders={stats.orders} onChanged={refresh} />}
          {tab === "franchise" && <LeadsTab leads={stats.leads} onChanged={refresh} />}
          {tab === "investisseurs" && <InvestorsTab investors={stats.investors} />}
          {tab === "taux" && <RatesTab rates={stats.rates} onChanged={refresh} />}
        </div>
      </div>
    </div>
  );
}
