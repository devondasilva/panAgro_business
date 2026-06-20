// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "PANAGRO - Plateforme Investisseur",
  description: "Suivi de production Agro-Tech — Sakété, Bénin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* La classe 'font-sans' applique ta police Inter locale configurée dans Tailwind.
        'bg-[#F8FAF5]' assure un fond cohérent et évite les flashs blancs au chargement.
      */}
      <body className="font-sans antialiased bg-[#F8FAF5] min-h-screen flex flex-col justify-between">
        <Nav />
        
        {/* Conteneur principal qui pousse le footer vers le bas si la page est courte */}
        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}