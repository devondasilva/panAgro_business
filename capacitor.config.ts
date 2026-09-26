import type { CapacitorConfig } from '@capacitor/cli';

// Le site n'est plus exporté en statique (voir next.config.ts) : il faut un
// serveur pour les fonctionnalités réelles (paiement, admin, commandes).
// L'app mobile charge donc le site déployé en direct plutôt que des fichiers
// embarqués. Remplacez l'URL ci-dessous par celle de votre déploiement, et
// enlevez `cleartext` une fois en HTTPS (déjà le cas si vous déployez sur
// Vercel ou équivalent).
const config: CapacitorConfig = {
  appId: 'com.panagro.app',
  appName: 'panagro-app',
  server: {
    url: 'https://votre-domaine-panagro.example.com',
    cleartext: true,
  },
};

export default config;
