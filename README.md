# Panagro — plateforme agro-tech

Site du projet **Panagro** : présentation de l'exploitation de Sakété, offres
d'investissement multi-devises, programme de franchise, boutique de produits
de la ferme, espace investisseur et back-office administrateur.

Construit avec **Next.js 16 (App Router, Turbopack)**, **TypeScript**,
**React 19**, **Tailwind CSS v4** et **Framer Motion**.

## ⚠️ Ce projet utilise Next.js 16 — pas la version que vous connaissez

Next 16 a introduit des changements de rupture par rapport aux versions
précédentes, notamment :
- `params`, `searchParams` (pages et routes API) et `cookies()`/`headers()`
  sont désormais **asynchrones** (`await params`, `await cookies()`...).
- `middleware.ts` est renommé **`proxy.ts`**, et la fonction exportée
  `middleware` devient **`proxy`**. Il s'exécute en runtime Node.js (plus en
  Edge), ce qui simplifie l'accès aux API Node standard.

Tout le code de ce projet a été écrit en tenant compte de ces changements.
Si vous ajoutez du code vous-même avec l'aide d'une IA, rappelez-lui de
consulter `node_modules/next/dist/docs/` avant d'écrire des routes ou du
middleware — ses connaissances d'entraînement datent probablement d'avant
Next 16.

## Pourquoi des fichiers JSON plutôt que la base Postgres déjà configurée

Le projet a `DATABASE_URL`/`DIRECT_URL` déjà renseignés (Prisma) dans `.env`,
mais **ce backend fonctionnel utilise des fichiers JSON locaux** (`/data`),
exactement comme le projet Beach Tennis Bénin. Choix assumé, pour deux
raisons :
1. Le schéma Prisma existant n'était qu'un squelette (un seul modèle `User`
   vide) — rien n'était réellement câblé dessus.
2. Cela permet au site de tourner **immédiatement** avec `npm install && npm
   run dev`, sans base de données à provisionner, exactement comme demandé.

La couche d'accès aux données est isolée dans `lib/db.ts` : pour migrer vers
Postgres/Prisma plus tard, il suffit de réécrire les fonctions de ce fichier
avec les mêmes signatures, sans toucher au reste du code.

## Démarrer le projet

Prérequis : [Node.js](https://nodejs.org) 20 ou plus récent.

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

Pour un build de production :

```bash
npm run build
npm run start
```

## Connexion et rôles

Deux espaces, accessibles depuis `/login` :

- **Investisseur** — nom + email + téléphone, création automatique du
  compte à la première connexion. Donne accès à `/dashboard` : portefeuille
  d'investissements réel, commandes boutique, tout affichable en FCFA, EUR
  ou USD.
- **Administrateur** — identifiant + mot de passe, donne accès à `/admin`.

Compte administrateur par défaut :

```
Identifiant : admin
Mot de passe : Panagro2026
```

**Changez ce mot de passe avant toute mise en ligne réelle** :

```bash
npm run create-admin -- <identifiant> <nouveau-mot-de-passe> "Nom affiché"
```

Les sessions sont des cookies signés (HMAC, Web Crypto) et les mots de passe
sont hachés avec sel (scrypt). Définissez la variable d'environnement
`AUTH_SECRET` avant un déploiement réel.

## Tableau de bord admin (`/admin`)

| Onglet | Actions possibles |
|---|---|
| Vue d'ensemble | Total investi, chiffre d'affaires boutique, effectifs |
| Packs investissement | Créer/modifier/supprimer un pack, le mettre en avant, le masquer |
| Investissements | Confirmer un paiement reçu, marquer un cycle terminé, annuler |
| Produits | Créer un produit avec upload de vraies photos, modifier prix/stock, masquer, supprimer |
| Commandes | Marquer payée / expédiée / annulée |
| Franchise | Voir les candidatures, les marquer traitées, les supprimer |
| Investisseurs | Liste de tous les comptes investisseurs |
| Taux de change | Mettre à jour les taux FCFA ⇄ EUR / USD |

Toutes les actions passent par des routes API protégées côté serveur
(`requireAdmin()`) — un appel direct sans session admin valide est rejeté
(401), pas seulement caché dans l'interface.

## Devises (FCFA, EUR, USD)

Le FCFA est la devise de référence (`lib/currency.ts`). L'euro est arrimé au
FCFA par traité (1 EUR = 655,957 FCFA, taux fixe) ; le dollar flotte et doit
être mis à jour régulièrement par un administrateur depuis l'onglet **Taux
de change**. Les investissements et les commandes boutique peuvent être
réglés dans les trois devises : le montant est toujours stocké en FCFA en
base (canonique), avec la devise de paiement d'origine conservée pour
traçabilité.

## Paiement — ce qui est réellement fonctionnel

Le parcours de paiement est **complet de bout en bout** : choix du mode
(Mobile Money, carte, virement), création d'un enregistrement réel
(investissement ou commande), passage en attente, puis confirmation par un
administrateur qui déclenche la mise à jour du statut (et, pour la
boutique, la décrémentation du stock).

Ce qui n'est **pas** branché : un vrai prestataire de paiement (MTN MoMo,
Moov Money, Stripe...) qui débiterait réellement une carte ou un compte
Mobile Money. Aucune clé d'API de paiement n'était fournie ; brancher un
prestataire réel se ferait dans `app/api/investments/route.ts` et
`app/api/orders/route.ts`, au moment de la création de l'enregistrement.

## Boutique (`/boutique`)

Catalogue de produits de la ferme (volaille, escargots, produits vivriers…)
avec panier, sélection de devise, et commande. Chaque commande est reliée à
un compte investisseur (créé automatiquement si besoin), visible ensuite
dans `/dashboard` et dans l'onglet **Commandes** du back-office.

## Structure du projet

```
app/
  (public)/          pages publiques : exploitation, hébergement, boutique,
                      carrières, invest, franchise, contact
  (dashboard)/        espace investisseur (/dashboard)
  admin/               back-office (/admin)
  login/               connexion investisseur / admin
  api/                 toutes les routes API
lib/
  types.ts             modèle de données partagé
  db.ts                accès aux données (fichiers JSON sous /data)
  auth.ts               sessions (cookies signés, Web Crypto)
  password.ts           hachage des mots de passe (scrypt)
  currency.ts            conversions FCFA ⇄ EUR ⇄ USD
  upload.ts               upload d'images vers /public/uploads
data/                    fichiers JSON (base de données locale)
scripts/create-admin.js  création/mise à jour d'un compte admin
```

## Aller plus loin

- **Vrai prestataire de paiement** : brancher Kkiapay/FedaPay/CinetPay
  (Mobile Money local) ou Stripe (carte internationale) dans les routes
  `investments` et `orders`.
- **Base de données réelle** : migrer `lib/db.ts` vers Prisma/Postgres — le
  schéma est déjà présent (`prisma/schema.prisma`), à compléter avec les
  modèles de `lib/types.ts`.
- **Taux de change automatiques** : brancher une API de taux de change
  (ex. exchangerate.host) pour rafraîchir le taux USD automatiquement
  plutôt que de le saisir manuellement dans l'onglet **Taux de change**.
- **Notifications** : email/SMS/WhatsApp à la création d'un investissement
  ou d'une commande, et à chaque changement de statut.
