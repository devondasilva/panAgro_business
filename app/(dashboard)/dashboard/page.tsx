"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Droplets, 
  Sun, 
  Wallet, 
  ArrowDownRight, 
  RefreshCw, 
  MapPin, 
  Sprout, 
  Activity,
  LogOut,
  User,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

const UserHome: React.FC = () => {
  const brandGreen = "#8DC63F";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Données de l'investisseur connecté
  const user = { name: "Honore Christel" };
  const walletBalance = "270 000"; 
  const totalInvested = "1 250 000";

  // Données IoT simulées en direct de la ferme de Sakété
  const [iotData, setIotData] = useState({
    soilMoisture: "42%",
    pumpStatus: "Actif (Solaire)",
    sunExposure: "85%",
    lastUpdate: "Il y a 2 min"
  });

  const activeInvestments = [
    { id: "PG-908", pack: "Pack Récolte", amount: "1 000 000 FCFA", roi: "+12%", daysLeft: 114, status: "En cours" },
    { id: "PG-412", pack: "Pack Croissance", amount: "250 000 FCFA", roi: "+8%", daysLeft: 22, status: "Arrivé à terme" }
  ];

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
            <SidebarLink icon={<Activity size={18} />} label="Vue d'ensemble" active />
            <SidebarLink icon={<Sprout size={18} />} label="Mes Cultures (Sakété)" />
            <SidebarLink icon={<Wallet size={18} />} label="Transactions" />
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8DC63F]">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs font-black truncate max-w-[120px]">{user.name}</p>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Investisseur</p>
            </div>
          </div>
          <button className="p-3 text-gray-400 hover:text-red-400 rounded-xl hover:bg-white/5 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 lg:pl-80 min-h-screen flex flex-col w-full">
        
        {/* TOP BAR */}
        <header className="py-6 px-6 md:px-10 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 bg-[#1A2F15] text-white rounded-xl" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">Bonjour, {user.name} 👋</h1>
              <p className="hidden sm:block text-xs text-gray-500 font-medium">Ravi de vous revoir sur votre espace Agro-Tech.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] md:text-xs font-black whitespace-nowrap">
            <MapPin size={14} className="text-[#8DC63F]" /> Sakété, Bénin
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
                <h3 className="text-4xl font-black tracking-tighter text-[#1A2F15]">{walletBalance} <span className="text-xs font-bold text-gray-400">FCFA</span></h3>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="flex-1 py-3.5 bg-[#1A2F15] text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all flex items-center justify-center gap-1">
                  Retrait <ArrowDownRight size={14} />
                </button>
              </div>
            </div>

            {/* Total Investi */}
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Engagé</p>
                <h3 className="text-4xl font-black tracking-tighter text-[#1A2F15]">{totalInvested} <span className="text-xs font-bold text-gray-400">FCFA</span></h3>
              </div>
              <div className="mt-6 flex items-center gap-1 text-[11px] font-black text-[#8DC63F] uppercase tracking-wider">
                <TrendingUp size={14} /> +14.2% Rendement Global
              </div>
            </div>

            {/* Statut IoT Instantané */}
            <div className="bg-[#1A2F15] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={80} /></div>
              <div className="flex justify-between items-start mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">📡 IoT Sakété Live</p>
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

          {/* --- SECTION 2 : LES PRODUCTIONS CONTRACTUELLES --- */}
          <section className="bg-white border border-gray-100 rounded-[3rem] p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tighter">Mes Productions Contractuelles</h3>
                <p className="text-xs text-gray-400">Cycles actifs adossés aux terres de Sakété.</p>
              </div>
              <button className="p-3 bg-[#F8FAF5] rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
                <RefreshCw size={14} />
              </button>
            </div>

            <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="pb-4">ID Contrat</th>
                    <th className="pb-4">Pack Agricole</th>
                    <th className="pb-4">Montant Engagé</th>
                    <th className="pb-4">Estimation ROI</th>
                    <th className="pb-4">Échéance</th>
                    <th className="pb-4 text-right">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm font-bold">
                  {activeInvestments.map((inv, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 text-xs font-mono text-gray-400">#{inv.id}</td>
                      <td className="py-4 font-black text-[#1A2F15]">{inv.pack}</td>
                      <td className="py-4 text-[#1A2F15]">{inv.amount}</td>
                      <td className="py-4 text-[#8DC63F] font-black">{inv.roi}</td>
                      <td className="py-4 text-xs text-gray-500 font-medium">
                        {inv.daysLeft > 0 ? `${inv.daysLeft} jours restants` : "Terminé"}
                      </td>
                      <td className="py-4 text-right">
                        <span className={`inline-block text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
                          inv.status === "En cours" ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#1A2F15] flex items-center gap-1 hover:text-[#8DC63F] transition-colors w-max">
                Consulter le carnet de bord <ExternalLink size={12} />
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-sm uppercase tracking-wider text-[#1A2F15] mb-2">Besoin d'aide ou d'un conseil ?</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Votre conseiller Panagro est disponible par WhatsApp ou appel direct pour planifier votre prochaine visite sur site ou ajuster vos réinvestissements.
                </p>
              </div>
              <button className="mt-6 w-full py-4 bg-[#1A2F15] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all">
                Contacter mon conseiller PANAGRO
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Overlay pour fermer le menu mobile en cliquant à côté */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

// --- SOUS-COMPOSANTS TYPÉS ---
interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, active }) => (
  <a 
    href="#" 
    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
      active 
      ? 'bg-[#8DC63F] text-[#1A2F15] font-black shadow-lg shadow-[#8DC63F]/10' 
      : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span>{label}</span>
  </a>
);

export default UserHome;