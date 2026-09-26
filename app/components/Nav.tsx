"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, TrendingUp, ArrowRight, Leaf, LogIn, Globe, ShoppingBasket } from 'lucide-react';

interface Session {
  role: "admin" | "investor";
  id: string;
  name: string;
}

const Nav: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const panagroGreen = "#8DC63F";
  const forestDark = "#1A2F15";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setSession(d.session))
      .finally(() => setSessionLoaded(true));
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setSession(null);
    setIsOpen(false);
    router.push('/');
    router.refresh();
  }

  const links = [
    { name: "L'Exploitation", href: 'exploitation' },
    { name: 'Hébergements', href: 'hebergement' },
    { name: 'Boutique', href: 'boutique' },
    { name: 'Stages & Emplois', href: 'careers' },
    { name: 'Invest', href: 'invest' },
    { name: 'Contact', href: 'contact' },
    { name: 'Franchise', href: 'franchise' },
  ];

  const accountHref =
    session?.role === 'admin' ? '/admin' : session?.role === 'investor' ? '/dashboard' : '/login';
  const accountLabel =
    session?.role === 'admin' ? 'Administration' : session?.role === 'investor' ? 'Mon espace' : 'Connexion';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ${
          isScrolled || isOpen
            ? 'py-3 bg-white shadow-md '
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
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href={accountHref}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-[10px] font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-sm"
                style={{ backgroundColor: isOpen ? panagroGreen : forestDark }}
              >
                <LogIn size={14} /> {sessionLoaded ? accountLabel : 'Connexion'}
              </Link>
              {sessionLoaded && session && (
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15]/50 hover:text-[#1A2F15] transition-colors"
                >
                  Déconnexion
                </button>
              )}
            </div>

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
          <div className="flex-1 flex flex-col justify-center px-10 gap-6 overflow-y-auto py-24">
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
                {link.name === 'Boutique' && <ShoppingBasket size={24} className="text-[#8DC63F]" />}
              </Link>
            ))}

            <Link
              href={accountHref}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black text-[#8DC63F] flex items-center gap-3 transition-all hover:translate-x-2"
            >
              {sessionLoaded ? accountLabel : 'Connexion'} <LogIn size={32} />
            </Link>
            {sessionLoaded && session && (
              <button
                onClick={handleLogout}
                className="text-xl font-black text-white/50 text-left hover:text-white transition-colors"
              >
                Déconnexion
              </button>
            )}

            <div className="h-px w-full bg-white/10 my-4"></div>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-xl font-black text-[#8DC63F] flex items-center gap-3 group">
              Nous contacter <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
