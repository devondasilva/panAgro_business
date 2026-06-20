import React from 'react';
import { Leaf, ArrowRight, Globe, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  const panagroGreen = "#8DC63F";

  return (
    <footer className="bg-[#1A2F15] text-white pt-24 pb-12 px-6 overflow-hidden relative">
      {/* Effet visuel de fond : un cercle lumineux subtil */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8DC63F] blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* --- TOP SECTION : NEWSLETTER & BRAND --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#8DC63F] rounded-xl flex items-center justify-center">
                <Leaf color="#1A2F15" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                PAN<span style={{ color: panagroGreen }}>AGRO</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm mb-10">
              Réinventer l'agriculture par la technologie. Une exploitation durable, connectée et ouverte sur le monde.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Globe size={16} />} href="#" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[#8DC63F] mb-6">Restez connecté à la terre</h3>
            <div className="relative max-w-lg">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="w-full bg-white/5 border border-white/10 py-5 px-6 rounded-2xl outline-none focus:border-[#8DC63F] transition-all text-sm font-medium"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#8DC63F] text-[#1A2F15] px-6 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:brightness-110 transition-all">
                S'abonner <ArrowRight size={14} />
              </button>
            </div>
            <div className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={12} /> Données sécurisées & respect de la vie privée
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION : LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20">
          <FooterColumn 
            title="L'Exploitation" 
            links={["Vision Bio", "Technologies", "Nos Produits", "Plan du domaine"]} 
          />
          <FooterColumn 
            title="Investissement" 
            links={["Packs de rendement", "Rapports annuels", "Éthique & Sécurité", "FAQ Investisseurs"]} 
          />
          <FooterColumn 
            title="Communauté" 
            links={["Stages & Formations", "Offres d'emploi", "Blog de la ferme", "Événements"]} 
          />
          <FooterColumn 
            title="Légal & Tech" 
            links={["Mentions Légales", "Cookies", "Support IT", "API accès"]} 
          />
        </div>

        {/* --- BOTTOM SECTION : COPYRIGHT & INFO --- */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            <p>© 2026 PANAGRO HOLDING</p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10"></div>
            <p className="flex items-center gap-2 italic">
              <Globe size={12} /> Designed with precision in Benin
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-[#8DC63F] transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-[#8DC63F] transition-colors">Conditions d'usage</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- SOUS-COMPOSANTS LOGICAUX ---

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-col gap-6">
    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white underline underline-offset-8 decoration-[#8DC63F]/30 italic">
      {title}
    </h4>
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-sm text-gray-500 hover:text-[#8DC63F] hover:translate-x-2 transition-all inline-block font-medium">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href }) => (
  <a href={href} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#8DC63F] hover:text-[#1A2F15] hover:border-transparent transition-all hover:-translate-y-1">
    {icon}
  </a>
);

export default Footer;