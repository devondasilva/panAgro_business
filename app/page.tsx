"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Droplets,
  Sprout,
  ArrowRight,
  MapPin,
  ChevronRight,
  Download,
  Users,
  Home as HomeIcon,
  Mail,
  Phone,
} from "lucide-react";


/* ------------------------------------------------------------------ */
/*  DONNÉES                                                           */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: "120+", label: "Hectares cultivés & élevage" },
  { value: "100%", label: "Irrigation solaire" },
  { value: "48h", label: "Parcelle → étal" },
  { value: "3", label: "Zones de franchise" },
];

const CULTURES = [
  {
    tag: "Élevage & Volaille",
    title: "Le poulet Goliath et nos élevages de qualité.",
    desc: "Poulets goliath robustes et moutons sélectionnés : un élevage conduit avec un suivi sanitaire rigoureux et une alimentation naturelle.",
    img: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80",
  },
  {
    tag: "Spécialités & Vivriers",
    title: "Aériculture diversifiée : escargots et cultures vivrières.",
    desc: "De l'Achat-vente d'escargots géants africains aux récoltes de maïs et de tubercules, Panagro valorise la richesse du terroir.",
    img: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80",
  },
];

const GALERIE = [
  { name: "Poulet Goliath", img: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80" },
  { name: "Mouton", img: "../../public/mouton.jpg" },
  { name: "Escargots", img: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80" },
  { name: "Produits Vivriers", img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80" },
];

const HEBERGEMENTS = [
  {
    title: "Immersion Stagiaire",
    desc: "Éco-dortoirs ventilés pour étudiants et futurs exploitants agricoles.",
    icon: <Users size={20} />,
  },
  {
    title: "Résidence Personnel",
    desc: "Logements durables intégrés pour nos équipes permanentes.",
    icon: <HomeIcon size={20} />,
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */

export default function PanagroHomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAF5] text-[#1A2F15] font-sans">
      {/* ------------------------------ HERO PLEIN CADRE ------------------------------ */}
      <section
        className="relative h-screen min-h-160 flex items-end overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80"
          alt="Exploitation Panagro"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#050A04] via-[#050A04]/30 to-[#050A04]/10" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6 pb-28 md:pb-36 w-full text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-8 w-fit">
            <Sun size={14} className="text-[#8DC63F]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Agro-Tech Bénin 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tighter max-w-3xl mb-8">
            La terre béninoise,
            <br />
            <span className="text-[#8DC63F]">récolte après récolte.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-lg leading-relaxed mb-10">
            Élevage moderne, volaille de qualité, agriculture vivrière et souveraineté alimentaire : Panagro cultive
            un modèle agricole rentable et durable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#franchise"
              className="px-8 py-4 bg-[#8DC63F] text-[#1A2F15] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all flex items-center gap-3 group"
            >
              Investir maintenant <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#cultures"
              className="px-8 py-4 border-2 border-white/40 text-white uppercase tracking-widest rounded-2xl hover:border-[#8DC63F] transition-all"
            >
              Nos productions
            </a>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------ BANDE DE CHIFFRES ------------------------------ */}
      <section className="relative -mt-10 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-[#1A2F15]/5 border border-[#1A2F15]/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#1A2F15]/8">
            {STATS.map((s) => (
              <div key={s.label} className="p-8 text-center">
                <p className="text-3xl md:text-4xl font-black text-[#8DC63F] tracking-tight mb-1">{s.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A2F15]/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CULTURES / ÉLEVAGES — SPLITS ALTERNÉS ------------------------------ */}
      <section id="cultures" className="py-28 md:py-36 space-y-28 md:space-y-40">
        {CULTURES.map((c, i) => (
          <div
            key={c.title}
            className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8DC63F]">{c.tag}</span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mt-4 mb-6 leading-tight">{c.title}</h3>
              <p className="text-[#1A2F15]/60 leading-relaxed mb-8">{c.desc}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest hover:text-[#8DC63F] transition-colors"
              >
                En savoir plus <ChevronRight size={15} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 relative aspect-16/10 overflow-hidden rounded-[3rem]"
              style={{
                clipPath:
                  i % 2 === 0
                    ? "polygon(0 0, 100% 0, 100% 100%, 6% 100%)"
                    : "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
              }}
            >
              <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        ))}
      </section>

      {/* ------------------------------ GALERIE HORIZONTALE ------------------------------ */}
      <section id="galerie" className="py-8 pb-28 md:pb-36">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8DC63F]">La production</span>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight mt-3">Élevage &amp; produits du terroir.</h3>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {GALERIE.map((g) => (
            <motion.div
              key={g.name}
              whileHover={{ y: -6 }}
              className="relative aspect-3/4 rounded-4xl overflow-hidden group"
            >
              <img
                src={g.img}
                alt={g.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050A04]/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-white font-black uppercase text-xs tracking-widest">
                {g.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------ CITATION SUR FOND LIME ------------------------------ */}
      <section className="bg-[#8DC63F] py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Droplets size={36} className="mx-auto mb-8 text-[#1A2F15]" />
          <p className="text-2xl md:text-4xl font-black tracking-tight leading-tight text-[#1A2F15]">
            « De l'élevage rigoureux de nos poulets goliath et moutons à nos cultures vivrières, 
            la qualité est au cœur de chaque investissement chez Panagro. »
          </p>
          <p className="mt-8 text-xs font-black uppercase tracking-widest text-[#1A2F15]/60">
            — Chef d'exploitation, site de Sakété
          </p>
        </div>
      </section>

      {/* ------------------------------ FRANCHISE / CTA ------------------------------ */}
      <section id="franchise" className="bg-[#050A04] py-28 md:py-36 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8DC63F]">
              Impact local &amp; national
            </span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] mt-5 mb-8">
              Entreprenez <br /> <span className="text-[#8DC63F]">dans l'agropastoral.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
              Propulsez votre propre exploitation avec le modèle Panagro — clé en main, combinant 
              élevage performant et cultures vivrières au Bénin.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Investissement</p>
                <p className="font-black text-xl">10 000 000 FCFA</p>
              </div>
              <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">ROI estimé</p>
                <p className="font-black text-xl text-[#8DC63F]">18–24 mois</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 text-center">
              <Sprout size={32} className="mx-auto mb-6 text-[#8DC63F]" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Devenir partenaire</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Zones prioritaires : Sakété, Zè, Porto-Novo.
              </p>
              <button className="w-full py-5 bg-[#8DC63F] text-[#1A2F15] font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                Obtenir le business plan <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ VIVRE SUR L'EXPLOITATION ------------------------------ */}
      <section id="vivre" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8DC63F]">
              Vivre sur l'exploitation
            </span>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight mt-3">Hébergement &amp; immersion.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HEBERGEMENTS.map((h) => (
              <motion.div
                key={h.title}
                whileHover={{ y: -5 }}
                className="bg-white border border-[#1A2F15]/8 p-10 rounded-[3rem] shadow-sm hover:shadow-xl hover:shadow-[#8DC63F]/10 transition-all"
              >
                <div className="w-14 h-14 bg-[#F8FAF5] rounded-2xl flex items-center justify-center mb-8 text-[#8DC63F]">
                  {h.icon}
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight">{h.title}</h4>
                <p className="text-[#1A2F15]/55 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ CONTACT ------------------------------ */}
      <section id="contact" className="pb-28 md:pb-36">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#1A2F15] rounded-[3.5rem] p-12 md:p-16 text-white grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Parlons de votre projet.</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Candidature, partenariat, hébergement : écrivez-nous, une équipe de terrain vous
                répond sous 48h.
              </p>
              <div className="space-y-3 text-sm font-bold">
                <p className="flex items-center gap-3"><Mail size={16} className="text-[#8DC63F]" /> contact@panagro.bj</p>
                <p className="flex items-center gap-3"><Phone size={16} className="text-[#8DC63F]" /> +229 XX XX XX XX</p>
                <p className="flex items-center gap-3"><MapPin size={16} className="text-[#8DC63F]" /> Sakété &amp; Zè, Bénin</p>
              </div>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nom Complet"
                className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-2xl focus:border-[#8DC63F] outline-none transition-all font-bold text-white placeholder:text-gray-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-2xl focus:border-[#8DC63F] outline-none transition-all font-bold text-white placeholder:text-gray-500"
              />
              <textarea
                placeholder="Décrivez votre projet ou votre profil..."
                rows={3}
                className="w-full bg-white/5 border-2 border-white/10 p-4 rounded-2xl focus:border-[#8DC63F] outline-none transition-all font-bold text-white placeholder:text-gray-500"
              />
              <button className="w-full py-4 bg-[#8DC63F] text-[#1A2F15] font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-[#1A2F15]/35">
        Panagro Bénin — Hub Régional 2026
      </footer>
    </div>
  );
}