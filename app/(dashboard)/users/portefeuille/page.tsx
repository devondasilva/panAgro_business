"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight, Download, Search } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const monthlyFlows = [
  { mois: 'Jan', flux: 150000 },
  { mois: 'Fév', flux: -50000 },
  { mois: 'Mar', flux: 300000 },
  { mois: 'Avr', flux: -120000 },
  { mois: 'Mai', flux: 450000 },
  { mois: 'Juin', flux: 270000 },
];

export default function PortefeuillePage() {
  return (
    <div className="p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase">Mon Portefeuille</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">Gérez vos fonds, dépôts et retraits en FCFA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARTE SOLDE */}
        <motion.div className="lg:col-span-7 bg-[#1A2F15] text-white p-8 rounded-[3rem] shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Solde Total Disponible</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-2">270 000 <span className="text-xl font-bold text-[#8DC63F]">FCFA</span></h2>
          </div>

          {/* FLUX ROUTAGE NEXT.JS */}
          <div className="grid grid-cols-2 gap-4 mt-12 relative z-10">
            <Link href="/users/portefeuille/depot" className="py-4 bg-[#8DC63F] text-[#1A2F15] font-black rounded-2xl text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2">
              <ArrowUpRight size={16} /> Faire un dépôt
            </Link>
            <Link href="/users/portefeuille/retrait" className="py-4 bg-white/10 text-white font-black border border-white/10 rounded-2xl text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <ArrowDownRight size={16} /> Retirer mes fonds
            </Link>
          </div>
        </motion.div>

        {/* GRAPHIQUE FLUX */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-8 rounded-[3rem] shadow-sm flex flex-col justify-between">
          <h3 className="text-lg font-black tracking-tight">Historique des Flux</h3>
          <div className="h-32 w-full my-4 text-[10px] font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFlows}>
                <XAxis dataKey="mois" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [`${value} FCFA`]} />
                <Bar dataKey="flux" fill="#8DC63F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}