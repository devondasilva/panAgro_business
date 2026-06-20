"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, TrendingUp, ArrowRight, Leaf, User, Lock, LogIn, Globe } from 'lucide-react';

const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // État pour la modale de connexion

  const panagroGreen = "#8DC63F";
  const forestDark = "#1A2F15";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Désactiver le scroll quand le menu OU la modale est ouvert
  useEffect(() => {
    document.body.style.overflow = (isOpen || showLogin) ? 'hidden' : 'unset';
  }, [isOpen, showLogin]);

  const links = [
    { name: "L'Exploitation", href: 'exploitation' },
    { name: 'Hébergements', href: 'hebergement' },
    { name: 'Stages & Emplois', href: 'careers' },
    { name: 'Invest', href: 'invest' },
    { name: 'Contact', href: 'contact' },
    { name: 'Franchise', href: 'franchise' },
    { name: 'Dashboard', href: 'dashboard' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${
          isScrolled || isOpen 
            ? 'py-3 bg-white shadow-md border-b border-gray-100' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <div className="flex items-center z-[210]">
            <Link href="/" className="flex items-center gap-2 group">
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl shadow-lg transition-transform group-hover:rotate-12"
                style={{ backgroundColor: forestDark }}
              >
                <Leaf color="white" size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className={`text-xl sm:text-2xl font-black tracking-tighter transition-colors ${
                  isOpen ? 'text-white' : 'text-[#1A2F15]'
                }`}>
                  PAN<span style={{ color: panagroGreen }}>AGRO</span>
                </span>
                <span className="hidden xs:block text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Agro-Tech
                </span>
              </div>
            </Link>
          </div>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden lg:flex items-center gap-6 bg-black/5 px-6 py-2 rounded-full backdrop-blur-sm border border-black/5">
            {links.map((link) => (
              <Link 
                key={link.name}
                href={`/${link.href}`}
                className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15] hover:opacity-50 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* --- ACTIONS & BURGER --- */}
          <div className="flex items-center gap-3 z-[210]">
            {/* Bouton Connexion (Desktop) */}
            <button 
              onClick={() => setShowLogin(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-sm"
              style={{ backgroundColor: isOpen ? panagroGreen : forestDark }}
            >
              <LogIn size={14} /> Connexion
            </button>
            
            {/* BURGER CSS */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex lg:hidden w-10 h-10 flex-col items-center justify-center rounded-lg z-[220] transition-all relative"
              style={{ backgroundColor: isOpen ? 'white' : forestDark }}
              aria-label="Menu"
            >
              {isOpen ? (
                <X size={24} color={forestDark} strokeWidth={2.5} />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="w-6 h-0.5 bg-white rounded-full"></span>
                  <span className="w-6 h-0.5 bg-white rounded-full"></span>
                  <span className="w-6 h-0.5 bg-white rounded-full"></span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* --- OVERLAY MENU MOBILE --- */}
        <div 
          className={`fixed inset-0 bg-[#1A2F15] z-[205] transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex-1 flex flex-col justify-center px-10 gap-6">
            <p className="text-[#8DC63F] text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Navigation</p>
            {links.map((link, i) => (
              <Link 
                key={link.name}
                href={`/${link.href}`}
                onClick={() => setIsOpen(false)}
                className={`text-4xl font-black text-white tracking-tighter hover:text-[#8DC63F] transition-all flex items-center gap-4 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${i * 75}ms` : '0ms' }}
              >
                {link.name}
                {link.name === 'Invest' && <TrendingUp size={24} className="text-[#8DC63F]" />}
                {link.name === 'Franchise' && <Globe size={24} className="text-[#8DC63F]" />}
              </Link>
            ))}
            
            {/* Bouton Connexion dans le menu mobile */}
            <button 
              onClick={() => { setIsOpen(false); setShowLogin(true); }}
              className="text-4xl font-black text-[#8DC63F] flex items-center gap-3 transition-all hover:translate-x-2 text-left"
            >
              Connexion <LogIn size={32} />
            </button>

            <div className="h-px w-full bg-white/10 my-4"></div>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-xl font-black text-[#8DC63F] flex items-center gap-3 group">
              Nous contacter <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MODALE DE CONNEXION --- */}
      {showLogin && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-[#1A2F15]/90 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogin(false)}
          ></div>
          
          {/* Boîte de dialogue */}
          <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-[#1A2F15] tracking-tighter">Accès <span style={{ color: panagroGreen }}>PANAGRO</span></h2>
                <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Identifiant</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8DC63F] outline-none transition-all" placeholder="votre@email.com" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="password" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8DC63F] outline-none transition-all" placeholder="••••••••" />
                  </div>
                </div>

                <button className="w-full py-4 bg-[#1A2F15] text-white font-black uppercase tracking-[0.2em] rounded-xl hover:brightness-110 transition-all mt-4 active:scale-95 shadow-lg">
                  Se Connecter
                </button>
              </form>
              <p className="text-center text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">Système de Gestion Interne</p>
            </div>
          </div>
        </div>
      )}

      <div className={`${isScrolled ? 'h-16' : 'h-20 sm:h-24'} transition-all duration-500`}></div>
    </>
  );
};

export default Nav;