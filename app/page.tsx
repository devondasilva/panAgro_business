"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Home, 
  ArrowRight,  
  MapPin, 
  ChevronRight, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  Globe,
  Sun,
  Droplets
} from 'lucide-react';

// --- EN-TÊTE DES DONNÉES DU SITE ---
const ACCOMMODATIONS = [
  {
    title: "Immersion Stagiaire",
    desc: "Éco-dortoirs ventilés pour étudiants et futurs exploitants agricoles.",
    features: ["Wifi par satellite", "Cantine du terroir", "Certificat de formation"],
    price: "Formule Apprentissage",
    icon: <Users size={24} />
  },
  {
    title: "Résidence Personnel",
    desc: "Logements durables intégrés pour nos équipes permanentes.",
    features: ["Autonomie Solaire", "Cuisine commune", "Sécurité 24/7"],
    price: "Inclus Contrat",
    icon: <Home size={24} />
  }
];

const JOB_OFFERS = [
  "Technicien Irrigation Solaire",
  "Chef d'Exploitation (Franchise)"
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAF5] text-[#1A2F15] font-sans selection:bg-[#8DC63F] selection:text-white overflow-x-hidden">

      {/* --- DYNAMIC BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#8DC63F]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-[#1A2F15]/5 blur-[100px] rounded-full"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* --- HERO SECTION (BENTO STYLE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          
          {/* Main Title Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20 mb-8 w-fit text-[#8DC63F]">
              <Sun size={14} className="animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Agro-Tech Bénin 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
              RÉVOLUTION <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8DC63F] to-[#1A2F15]">AGRICOLE.</span>
            </h1>
            
            <p className="text-lg text-gray-500 max-w-lg leading-relaxed mb-10">
              Transformez la terre béninoise en actif rentable. Nous fusionnons <span className="text-[#1A2F15] font-bold italic">irrigation solaire</span> et savoir-faire local pour une souveraineté alimentaire durable.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#1A2F15] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#8DC63F] transition-all flex items-center gap-3 group">
                Investir maintenant <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-[#1A2F15] text-[#1A2F15] uppercase tracking-widest rounded-2xl hover:border-[#8DC63F] transition-all">
                Nos Produits Bio
              </button>
            </div>
          </motion.div>

          {/* Visual Showcase */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <div className="bg-[#1A2F15] rounded-[2.5rem] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1591033594798-33227a05780d?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                alt="Exploitation Allada"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 font-black italic">
                  <MapPin size={16} className="text-[#8DC63F]" /> Allada, Bénin
                </div>
              </div>
            </div>
            <div className="bg-[#8DC63F] rounded-[2.5rem] p-8 flex flex-col justify-between text-[#1A2F15]">
              <Droplets size={32} />
              <div>
                <p className="text-4xl font-black italic tracking-tighter">100%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Irrigation Solaire Autonome</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FRANCHISE SECTION --- */}
        <section className="mb-24">
          <div className="bg-[#050A04] border border-[#8DC63F]/30 rounded-[4rem] p-8 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8DC63F]/10 blur-[150px] rounded-full pointer-events-none group-hover:bg-[#8DC63F]/15 transition-all duration-700"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20 mb-8 text-[#8DC63F]">
                  <Globe size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Impact Local & National</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                  ENTREPRENEZ <br /> 
                  <span className="text-[#8DC63F]">DANS LE BIO.</span>
                </h2>
                
                <p className="text-gray-400 text-lg mb-12 max-w-md">
                  Propulsez votre propre exploitation avec le modèle Panagro. Une solution clé en main adaptée au climat et au marché béninois.
                </p>

                <div className="space-y-6">
                  <FranchiseFeature icon={<ShieldCheck className="text-[#8DC63F]" />} title="Accès au Marché" desc="Écoulement garanti vers les supermarchés et hôtels de Cotonou." />
                  <FranchiseFeature icon={<TrendingUp className="text-[#8DC63F]" />} title="Rentabilité Prouvée" desc="ROI estimé entre 18 et 24 mois selon la zone." />
                </div>
              </div>

              {/* Franchise Action Card */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative text-center">
                <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-8">Devenir Franchiseur</h3>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-500 font-black uppercase text-[10px] tracking-widest text-left">Investissement Moyen</span>
                    <span className="text-white font-black text-xl">10.000.000 FCFA</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-gray-500 font-black uppercase text-[10px] tracking-widest text-left">Accompagnement</span>
                    <span className="text-[#8DC63F] font-black uppercase text-xs tracking-tighter underline italic">Support 24/7</span>
                  </div>
                </div>

                <button className="w-full py-5 bg-[#8DC63F] text-[#1A2F15] font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  OBTENIR LE BUSINESS PLAN <Download size={18} />
                </button>
                <p className="text-center text-gray-500 text-[10px] mt-6 uppercase tracking-widest font-bold">
                  Zones prioritaires : Ouidah, Allada, Porto-Novo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ACCOMMODATIONS GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          <div className="md:col-span-12 mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-2">Vivre sur l'Exploitation</h2>
            <h3 className="text-4xl font-black tracking-tighter">Hébergement & Immersion.</h3>
          </div>

          {ACCOMMODATIONS.map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="md:col-span-6 bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-[#8DC63F]/5 transition-all group"
            >
              <div className="w-14 h-14 bg-[#F8FAF5] rounded-2xl flex items-center justify-center mb-8 text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h4 className="text-3xl font-black mb-4 tracking-tight">{item.title}</h4>
              <p className="text-gray-500 mb-8 leading-relaxed">{item.desc}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {item.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]"></div> {f}
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{item.price}</span>
                <button className="text-[#1A2F15] font-black flex items-center gap-2 hover:text-[#8DC63F] transition-colors uppercase text-xs tracking-tighter">
                  S'inscrire <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* --- RECRUITMENT / CONTACT FORM --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-100 p-12 rounded-[3.5rem] shadow-xl shadow-gray-200/50">
            <h3 className="text-4xl font-black tracking-tighter mb-8 italic text-[#1A2F15]">Contact_</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nom Complet" className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-[#8DC63F] outline-none transition-all font-bold" />
              <input type="email" placeholder="Email" className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-[#8DC63F] outline-none transition-all font-bold" />
              <textarea placeholder="Décrivez votre projet ou votre profil..." rows={4} className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-[#8DC63F] outline-none transition-all font-bold"></textarea>
              <button className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all">
                Envoyer ma demande
              </button>
            </form>
          </div>

          <div className="bg-[#1A2F15] p-12 rounded-[3.5rem] flex flex-col justify-between text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl font-black tracking-tighter mb-6 uppercase leading-tight">Rejoindre la <br /> <span className="text-[#8DC63F]">Force Verte.</span></h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Nous recrutons des talents audacieux pour bâtir le Bénin de demain. De l'ingénierie agronomique à la logistique urbaine.
              </p>
              <ul className="space-y-4">
                {JOB_OFFERS.map((job) => (
                  <li key={job} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#8DC63F]/50 cursor-pointer transition-all group/item">
                    <span className="font-bold">{job}</span>
                    <ArrowRight size={16} className="text-[#8DC63F] group-hover/item:translate-x-2 transition-transform" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F]">
              Panagro Bénin — Hub Régional 2026
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

// --- SUB-COMPONENTS ---

const FranchiseFeature = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-5">
    <div className="mt-1">{icon}</div>
    <div>
      <h5 className="text-white font-black uppercase text-xs tracking-widest mb-1">{title}</h5>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);