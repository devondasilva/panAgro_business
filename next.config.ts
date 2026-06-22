import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <-- FORCE NEXT.JS À GÉNÉRER DU HTML/CSS STATIQUE
  images: {
    unoptimized: true, // <-- REQUIS pour l'export statique mobile
  },
};

export default nextConfig;