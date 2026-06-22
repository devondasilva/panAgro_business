"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Sprout, 
  DollarSign, 
  PieChart as PieIcon, 
} from 'lucide-react';

// --- DONNÉES SIMULÉES DE PERFORMANCE SAKÉTÉ (2026) ---
const revenueHistory = [
  { mois: 'Jan', gains: 50000 },
  { mois: 'Fév', gains: 95000 },
  { mois: 'Mar', gains: 160000 },
  { mois: 'Avr', gains: 240000 },
  { mois: 'Mai', gains: 310000 },
  { mois: 'Juin', gains: 425000 },
];

const cropYields = [
  { culture: 'Tomate', rendement: 85, color: '#8DC63F' },
  { culture: 'Poivron', rendement: 70, color: '#1A2F15' },
  { culture: 'Gingembre', rendement: 45, color: '#A0AEC0' }, // Remplacé le blanc cassé peu lisible sur mobile par un gris doux
  { culture: 'Piment', rendement: 90, color: '#E11D48' },
];

const capitalAllocation = [
  { name: 'Solaire & IoT', value: 45, color: '#1A2F15' },
  { name: 'Intrants', value: 30, color: '#8DC63F' },
  { name: 'Logistique', value: 25, color: '#64748B' },
];

const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('6_mois');

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto space-y-6 md:space-y-8 bg-[#F8FAF5] min-h-screen font-sans text-[#1A2F15] w-full">
      
      {/* --- EN-TÊTE DE LA PAGE --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Analyses</h1>
          <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Suivi financier & rendements (Sakété)</p>
        </div>
        
        {/* Filtre Temporel Adapté au Mobile */}
        <div className="flex items-center gap-2 bg-white p-2.5 w-full sm:w-auto justify-center rounded-xl shadow-sm border border-gray-100 text-xs font-black">
          <Calendar size={14} className="text-[#8DC63F]" />
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-transparent outline-none pr-4 cursor-pointer text-[#1A2F15] font-black uppercase tracking-wider w-full sm:w-auto"
          >
            <option value="6_mois">6 Derniers Mois</option>
            <option value="1_an">Année 2026</option>
          </select>
        </div>
      </div>

      {/* --- CARTES DE PERFORMANCE RAPIDE --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatMiniCard 
          title="Gains Totaux Générés" 
          value="425 000 FCFA" 
          change="+24% vs mois dernier" 
          isPositive={true}
          icon={<DollarSign className="text-[#8DC63F]" />}
        />
        <StatMiniCard 
          title="Taux de Rendement Moyen" 
          value="11.8 %" 
          change="Performance optimale" 
          isPositive={true}
          icon={<TrendingUp className="text-[#8DC63F]" />}
        />
        <StatMiniCard 
          title="Efficacité Solaire" 
          value="98.4 %" 
          change="0 pannes à Sakété" 
          isPositive={true}
          icon={<Sprout className="text-[#8DC63F]" />}
          className="sm:col-span-2 lg:col-span-1" // Centrage visuel élégant sur tablette
        />
      </section>

      {/* --- ZONE GRAPHIQUE PRINCIPALE : BENTO GRID RESPONSIVE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Courbe d'évolution des gains */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-white border border-gray-100 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm flex flex-col justify-between"
        >
          <div className="mb-4">
            <span className="text-[10px] font-black text-[#8DC63F] uppercase tracking-widest block mb-1">Croissance Financière</span>
            <h3 className="text-lg md:text-xl font-black tracking-tight">Courbe des Revenus Générés</h3>
          </div>
          
          {/* h-60 sur mobile / h-72 sur PC pour un ratio d'affichage impeccable */}
          <div className="h-60 md:h-72 w-full text-[10px] md:text-xs font-bold touch-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGains" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8DC63F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8DC63F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="mois" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip 
                  trigger="click" // Force l'activation au clic (indispensable sur mobile)
                  contentStyle={{ backgroundColor: '#1A2F15', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(value) => [`${value} FCFA`, 'Gains']}
                />
                <Area type="monotone" dataKey="gains" stroke="#8DC63F" strokeWidth={3} fillOpacity={1} fill="url(#colorGains)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 2. Répartition du Capital */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-4 bg-[#1A2F15] text-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-black text-[#8DC63F] uppercase tracking-widest block mb-1">Transparence</span>
            <h3 className="text-lg md:text-xl font-black tracking-tight">Allocation du Capital</h3>
          </div>

          <div className="h-40 md:h-44 w-full relative flex items-center justify-center my-4 touch-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={capitalAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {capitalAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Part']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <PieIcon size={20} className="text-[#8DC63F] mx-auto mb-0.5" />
              <p className="text-[8px] font-black uppercase text-gray-400 tracking-wider">Actifs</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {capitalAllocation.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                  <span className="truncate max-w-[180px] text-gray-200">{item.name}</span>
                </div>
                <span className="text-[#8DC63F] font-black">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- SECTION INFÉRIEURE : RENDEMENTS AGRICOLES --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-12 bg-white border border-gray-100 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm w-full"
        >
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Agronomie de Précision</span>
              <h3 className="text-lg md:text-xl font-black tracking-tight">Rendement Énergétique & Cultures</h3>
            </div>
            <span className="text-[10px] bg-[#F8FAF5] border border-gray-100 text-gray-500 font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Objectif : 100%
            </span>
          </div>

          {/* Défilement horizontal fluide automatique si l'écran est minuscule */}
          <div className="h-64 w-full text-[10px] md:text-xs font-bold touch-none overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%" minWidth={300}>
              <BarChart data={cropYields} barSize={window && window.innerWidth < 640 ? 24 : 40} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="culture" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} unit="%" />
                <Tooltip 
                  trigger="click"
                  contentStyle={{ backgroundColor: '#1A2F15', borderRadius: '12px', border: 'none', color: '#fff' }}
                  formatter={(value) => [`${value}% d'efficacité`, 'Rendement']}
                />
                <Bar dataKey="rendement" radius={[8, 8, 0, 0]}>
                  {cropYields.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

// --- SOUS-COMPOSANT STAT MINI-CARD OPTIMISÉ POUR MOBILE ---
interface StatMiniCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  className?: string;
}

const StatMiniCard: React.FC<StatMiniCardProps> = ({ title, value, change, isPositive, icon, className = "" }) => (
  <div className={`bg-white border border-gray-100 p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-sm flex items-center justify-between active:border-[#8DC63F] active:scale-[0.98] transition-all duration-200 ${className}`}>
    <div className="min-w-0 flex-1 pr-2">
      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 truncate">{title}</p>
      <h4 className="text-xl md:text-2xl font-black text-[#1A2F15] tracking-tight mb-1">{value}</h4>
      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-wide text-gray-500 flex items-center gap-1 truncate">
        <span className={isPositive ? 'text-[#8DC63F]' : 'text-rose-500'}>
          {isPositive ? '✓' : '⚠'}
        </span> 
        {change}
      </p>
    </div>
    <div className="w-11 h-11 md:w-12 md:h-12 bg-[#F8FAF5] rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
  </div>
);

export default AnalyticsPage;