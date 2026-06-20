"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Wind, Wifi, Utensils, ArrowRight, Star } from 'lucide-react'; // Pense à créer ce composant dans ton dossier components si ce n'est pas déjà fait

const Hebergement: React.FC = () => {
  const brandGreen = "#8DC63F";

  const cabins = [
    {
      name: "La Cabane Perchée",
      price: "120€",
      desc: "Prenez de la hauteur avec une vue panoramique sur nos vergers. Parfait pour les couples.",
      features: ["Lit Queen Size", "Terrasse", "Petit-déjeuner inclus"],
      img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200"
    },
    {
      name: "Le Lodge des Moissons",
      price: "180€",
      desc: "Un espace spacieux et moderne au cœur des champs de céréales. Idéal pour les familles.",
      features: ["4 Personnes", "Cuisine équipée", "Sortie potager"],
      img: "https://images.unsplash.com/photo-1587061949733-7624112d915c?q=80&w=1200"
    },
    {
      name: "L'Éco-Gîte Tech",
      price: "150€",
      desc: "Le confort moderne rencontre l'écologie : énergie solaire et domotique basse consommation.",
      features: ["Espace Bureau", "Starlink Pro", "Douche solaire"],
      img: "https://images.unsplash.com/photo-1449156001931-82992a470604?q=80&w=1200"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1A2F15] font-sans selection:bg-[#8DC63F] selection:text-white overflow-x-hidden">
 

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-[#1A2F15] leading-[0.85] tracking-tighter mb-8">
                DORMIR <br /> <span style={{ color: brandGreen }}>AU CŒUR</span> <br /> DU VIVANT.
              </h1>
              <p className="text-lg text-gray-500 max-w-md leading-relaxed mb-10">
                Plus qu'une chambre, nous vous offrons une immersion totale. Réveillez-vous avec le chant des oiseaux et dégustez les produits récoltés à quelques mètres de votre lit.
              </p>
              <div className="flex gap-8 items-center">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Utilisateur Panagro" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15]">
                  <span className="text-[#8DC63F]">+500 voyageurs</span> <br /> nous ont fait confiance
                </p>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative">
             <img 
               src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000" 
               className="w-full h-full object-cover" 
               alt="Paysage de la ferme au matin"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F15]/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* --- LISTE DES LOGEMENTS --- */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-black text-[#1A2F15] tracking-tighter">Nos écosystèmes <br /> de repos.</h2>
            <div className="hidden md:flex gap-4">
               <button className="p-4 rounded-full border border-gray-200 bg-white hover:bg-[#1A2F15] hover:text-white transition-all"><ArrowRight className="rotate-180" /></button>
               <button className="p-4 rounded-full border border-gray-200 bg-[#1A2F15] text-white"><ArrowRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cabins.map((cabin, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={cabin.img} alt={cabin.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black text-[#1A2F15]">
                    Dès {cabin.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#1A2F15] mb-4">{cabin.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">"{cabin.desc}"</p>
                  <ul className="space-y-3 mb-8">
                    {cabin.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Star size={12} fill={brandGreen} color={brandGreen} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-[#F8FAFC] text-[#1A2F15] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[#8DC63F] hover:text-white transition-all">
                    Vérifier la disponibilité
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES INCLUS --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-black text-[#1A2F15] mb-4">Le confort, <br /> naturellement.</h3>
              <div className="w-20 h-1.5 bg-[#8DC63F] rounded-full"></div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
              <ServiceIcon icon={<Coffee />} label="Petit-dej Fermier" />
              <ServiceIcon icon={<Wifi />} label="Wifi Haut Débit" />
              <ServiceIcon icon={<Utensils />} label="Table d'Hôtes" />
              <ServiceIcon icon={<Wind />} label="Air Pur" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const ServiceIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1A2F15] group-hover:bg-[#1A2F15] group-hover:text-[#8DC63F] transition-all mb-4">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</span>
  </div>
);

export default Hebergement;