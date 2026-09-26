import type { NextConfig } from "next";

// Remarque : la version précédente utilisait `output: 'export'` (export 100 %
// statique) pour être packagée telle quelle dans l'app mobile Capacitor.
// Un export statique ne peut exécuter aucune route API, aucune session, ni
// aucune écriture de données — donc aucun tableau de bord, paiement ou espace
// admin n'y est possible. Le site tourne maintenant comme une vraie
// application Next.js (comme le projet Beach Tennis Bénin) ; voir le README
// pour la marche à suivre côté app mobile (Capacitor pointe vers l'URL du
// site déployé plutôt que de l'embarquer en statique).
const nextConfig: NextConfig = {};

export default nextConfig;