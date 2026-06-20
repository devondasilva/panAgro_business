"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Sun,
  TrendingUp,
  MapPin,
  Globe
} from 'lucide-react';

const FranchiseSaketePage: React.FC = () => {
  const brandColor = "#8DC63F";

  const packContents = [
    { 
      title: "Pompage Solaire Sakété", 
      desc: "Forage et système de pompage solaire optimisé pour le relief du Plateau.", 
      icon: <Sun className="text-orange-400" /> 
    },
    { 
      title: "Pilotage IoT", 
      desc: "Capteurs de sol connectés pour cultiver 12 mois/12, même en saison sèche.", 
      icon: <Cpu className="text-blue-500" /> 
    },
    { 
      title: "Logistique Express", 
      desc: "Accès au réseau de distribution Porto-Novo, Cotonou et export Nigeria.", 
      icon: <Globe className="text-[#8DC63F]" /> 
    },
    { 
      title: "Formation Panagro", 
      desc: "Transfert de compétences technique et gestion sur notre site pilote de Sakété.", 
      icon: <BookOpen className="text-emerald-500" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF5] font-sans selection:bg-[#8DC63F] overflow-x-hidden">


      {/* --- HERO SECTION : L'OPPORTUNITÉ SAKÉTÉ --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20 mb-6"
              >
                <MapPin size={14} className="text-[#8DC63F]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15]">Hub Régional : Sakété, Plateau</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-[#1A2F15] mb-8">
                L'AGRIBUSINESS <br /> <span className="text-[#8DC63F]">À SAKÉTÉ.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
                Profitez d'un emplacement stratégique entre <span className="font-bold text-[#1A2F15]">Porto-Novo et le Nigeria</span>. Devenez franchisé Panagro et exploitez une ferme intelligente, rentable et durable.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-5 bg-[#1A2F15] text-white font-black rounded-2xl flex items-center gap-3 hover:bg-[#8DC63F] transition-all group">
                  Demander le dossier investisseur <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* --- CARTE STATS (DASHBOARD) --- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 bg-[#1A2F15] rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8DC63F]/10 blur-[100px] pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-8 uppercase tracking-tighter flex items-center gap-2">
                  <TrendingUp size={20} className="text-[#8DC63F]" /> Business Case / 1 Ha
                </h3>
                <div className="space-y-8">
                  <StatItem label="CA Estimé (Sakété-Porto)" value="12M - 18M FCFA" color="#8DC63F" sub="Export Nigeria possible" />
                  <StatItem label="Investissement" value="10 000 000 FCFA" color="white" sub="Installation clé en main" />
                  <StatItem label="Marché Cible" value="+5 Millions" color="#8DC63F" sub="Consommateurs à proximité" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- LE MODÈLE SAKÉTÉ --- */}
      <section className="py-24 bg-white rounded-[4rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-4">La Force du Réseau</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#1A2F15] tracking-tighter">Écosystème Panagro.</h3>
            </div>
            <div className="bg-[#F8FAF5] p-4 rounded-2xl border border-[#8DC63F]/20 italic text-sm text-gray-600">
              "Produire à Sakété, livrer à Porto-Novo en 30 minutes."
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packContents.map((item, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-[#F8FAF5] border border-gray-100 hover:border-[#8DC63F] transition-all group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-[#1A2F15] mb-3 uppercase tracking-tighter">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION STRATÉGIQUE --- */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 bg-[#1A2F15] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h3 className="text-4xl font-black mb-8 leading-none">POURQUOI INVESTIR <br /><span className="text-[#8DC63F]">DANS LE PLATEAU ?</span></h3>
              <div className="space-y-6">
                <BenefitRow title="Logistique Imbattable" desc="Position centrale entre les marchés urbains du Bénin et la puissance économique du Nigeria." />
                <BenefitRow title="Agriculture de Précision" desc="Contrer les caprices de la météo grâce à notre technologie d'irrigation intelligente." />
                <BenefitRow title="Certification Bio" desc="Répondre à la demande croissante de produits sains et tracés à Porto-Novo." />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem]">
              <h4 className="text-2xl font-black text-[#8DC63F] mb-6 italic">Budget Franchise</h4>
              <ul className="space-y-4">
                <li className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-gray-400">Forage & Énergie Solaire</span>
                  <span className="font-bold">4.5M FCFA</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-gray-400">Serres & IoT Panagro</span>
                  <span className="font-bold">2.5M FCFA</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-gray-400">Formation & Marketing</span>
                  <span className="font-bold">3.0M FCFA</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t-2 border-dashed border-[#8DC63F]/30 text-center">
                <p className="text-sm uppercase tracking-widest text-gray-400">Total Clé en Main</p>
                <p className="text-4xl font-black text-white">10M FCFA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMULAIRE --- */}
      <section id="contact" className="py-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black tracking-tighter text-[#1A2F15] mb-4">REJOINDRE PANAGRO SAKÉTÉ</h2>
          <p className="text-gray-500">Candidatez pour l'une des 5 zones exclusives ouvertes dans le département du Plateau.</p>
        </div>
        
        <form className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nom Complet" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#8DC63F] outline-none font-bold transition-all text-[#1A2F15]" />
            <input type="text" placeholder="Téléphone (WhatsApp)" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#8DC63F] outline-none font-bold transition-all text-[#1A2F15]" />
          </div>
          <input type="email" placeholder="Email" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#8DC63F] outline-none font-bold transition-all text-[#1A2F15]" />
          <textarea placeholder="Décrivez votre intérêt pour la zone de Sakété..." rows={4} className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#8DC63F] outline-none font-bold transition-all text-[#1A2F15]"></textarea>
          <button className="w-full py-5 bg-[#1A2F15] text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all flex items-center justify-center gap-3 text-xs">
            Envoyer ma candidature <ArrowRight size={18} />
          </button>
        </form>
      </section>

    </div>
  );
};

// --- SOUS-COMPOSANTS TYPÉS ---

interface StatItemProps {
  label: string;
  value: string;
  color: string;
  sub: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color, sub }) => (
  <div className="border-l-4 border-[#8DC63F]/30 pl-6">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</p>
    <p className="text-3xl md:text-4xl font-black leading-none mb-1" style={{ color: color }}>{value}</p>
    <p className="text-[10px] text-gray-400 italic">{sub}</p>
  </div>
);

interface BenefitRowProps {
  title: string;
  desc: string;
}

const BenefitRow: React.FC<BenefitRowProps> = ({ title, desc }) => (
  <div className="flex gap-4 group">
    <div className="mt-1 flex-shrink-0">
      <CheckCircle2 size={20} className="text-[#8DC63F]" />
    </div>
    <div>
      <h5 className="font-black text-white uppercase text-sm tracking-widest mb-1 group-hover:text-[#8DC63F] transition-colors">{title}</h5>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default FranchiseSaketePage;