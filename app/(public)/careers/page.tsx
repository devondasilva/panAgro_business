"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const Careers: React.FC = () => {
  const brandGreen = "#8DC63F";

  const jobs = [
    {
      title: "Stagiaire Agro-Écologie",
      type: "Stage (3-6 mois)",
      location: "Ferme Pilote - Sakété",
      tags: ["Permaculture", "Recherche"],
      id: "ST01"
    },
    {
      title: "Technicien Maintenance IT / Agri-Tech",
      type: "CDI",
      location: "Siège & Terrain (Plateau)",
      tags: ["IoT", "Capteurs", "Réseau"],
      id: "CD01"
    },
    {
      title: "Chef de Culture Maraîchère",
      type: "CDD (Saison)",
      location: "Zone d'Exploitation Sakété",
      tags: ["Production", "Management"],
      id: "CD02"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#8DC63F] selection:text-white overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-end">
            <div className="flex-1">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8DC63F] mb-6 block"
              >
                Recrutement PANAGRO
              </motion.span>
              <h1 className="text-6xl md:text-8xl font-black text-[#1A2F15] leading-[0.85] tracking-tighter mb-8">
                CULTIVER <br /> <span style={{ color: brandGreen }}>VOTRE AVENIR.</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
                Nous ne cherchons pas seulement des collaborateurs, mais des passionnés prêts à réinventer l'agriculture et l'agro-tech de demain au Bénin.
              </p>
            </div>
            <div className="lg:w-1/3 pb-4 w-full">
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <p className="text-sm font-bold text-[#1A2F15] mb-4 uppercase tracking-widest">Pourquoi nous rejoindre ?</p>
                <ul className="space-y-3">
                  {['Formation continue', 'Logement sur place intégré', 'Technologie de pointe (IoT)'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-black text-gray-500">
                      <CheckCircle2 size={14} color={brandGreen} className="flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION OFFRES --- */}
      <section className="py-20 px-6 bg-slate-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 border-b border-gray-200 pb-8 gap-4">
            <h2 className="text-3xl font-black text-[#1A2F15] tracking-tighter">Offres disponibles</h2>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-[#1A2F15] text-white text-[10px] font-black uppercase rounded-lg cursor-pointer">Tout</span>
              <span className="px-4 py-2 bg-white text-gray-400 border border-gray-200 text-[10px] font-black uppercase rounded-lg cursor-pointer hover:text-[#1A2F15] transition-colors">Stages</span>
              <span className="px-4 py-2 bg-white text-gray-400 border border-gray-200 text-[10px] font-black uppercase rounded-lg cursor-pointer hover:text-[#1A2F15] transition-colors">Emplois</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <motion.div 
                key={job.id}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col lg:flex-row items-start lg:items-center justify-between p-8 bg-white border border-gray-100 rounded-[2rem] hover:border-[#8DC63F] transition-all hover:shadow-2xl hover:shadow-[#8DC63F]/5 gap-6"
              >
                <div className="flex gap-6 items-center flex-1">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1A2F15] group-hover:bg-[#8DC63F] group-hover:text-[#1A2F15] transition-colors flex-shrink-0">
                    {job.type.includes('Stage') ? <GraduationCap size={24} /> : <Briefcase size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#1A2F15] mb-2 tracking-tight">{job.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><MapPin size={12} className="text-[#8DC63F]" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {job.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t border-gray-100 pt-4 lg:border-t-0 lg:pt-0">
                  <div className="hidden sm:flex gap-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 text-[9px] font-black uppercase tracking-tighter text-gray-400 rounded-md border border-gray-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#1A2F15] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all">
                    Postuler <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CANDIDATURE SPONTANÉE --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#1A2F15] rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8DC63F] blur-[120px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
                Aucune offre <br /> <span style={{ color: brandGreen }}>ne vous correspond ?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
                Nous sommes constamment à la recherche de profils dynamiques et innovants (agronomie, IoT, gestion, logistique). Envoyez-nous vos motivations en candidature spontanée.
              </p>
              <button className="px-10 py-5 bg-white text-[#1A2F15] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[#8DC63F] hover:text-[#1A2F15] transition-all">
                Candidature Spontanée
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-3xl font-black text-[#8DC63F] mb-1">100%</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Accompagnement</p>
              </div>
              <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center p-6 text-center mt-8">
                <p className="text-3xl font-black text-[#8DC63F] mb-1">Bio</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Engagement Éco</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;