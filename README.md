# Bavaria - Premium Malt Drink

Bavaria est un site web premium conçu pour mettre en avant une gamme de boissons au malt d'exception. Alliant design moderne, animations fluides et interactivité 3D, ce projet offre une expérience utilisateur immersive et haut de gamme.

## ✨ Fonctionnalités Clés

- **Expérience Immersive 3D** : Visualisation dynamique des produits avec effets de parallaxe et animations 3D.
- **Design Système Fluide** : Utilisation de typographies et de grilles responsives (`clamp()`) pour une adaptation parfaite sur tous les écrans.
- **Menu Mobile Premium** : Navigation sophistiquée avec effet "glassmorphism" et animations fluides.
- **Performances Optimisées** : Chargement intelligent des assets et optimisation des images pour un temps de réponse minimal.
- **SEO & Open Graph** : Prêt pour le partage sur les réseaux sociaux avec des balises de métadonnées optimisées.

## 🛠️ Stack Technique

- **Frontend** : [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Scroll** : [Lenis](https://lenis.darkroom.engineering/) pour un défilement ultra-fluide.
- **Icones** : [Lucide React](https://lucide.dev/)
- **Styling** : Vanilla CSS avec un système de design moderne.

## 🚀 Installation & Lancement

### Prérequis
- [Node.js](https://nodejs.org/) (version 20)
- npm ou yarn

### Étapes
1. **Cloner le repository** :
   ```bash
   git clone https://github.com/mackly45/bavaria.git
   cd bavaria
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Construire pour la production** :
   ```bash
   npm run build
   ```

5. **Tests** :
   ```bash
   npm test                          # Vitest (unitaires)
   npx playwright install chromium   # une seule fois
   npm run test:e2e                  # Playwright (desktop + mobile)
   ```

## ⚙️ Configuration

Copier `.env.example` en `.env.local` (ou renseigner les variables dans Vercel). Tout est optionnel : sans valeur, la fonctionnalité reste masquée ou désactivée.

| Variable | Rôle |
| --- | --- |
| `VITE_ORDER_WHATSAPP` / `VITE_ORDER_EMAIL` | Destination des commandes du panier (WhatsApp prioritaire, sinon email, sinon formulaire de contact pré-rempli). |
| `VITE_PRICES`, `VITE_CURRENCY` | Prix unitaires par saveur (JSON) ; le total n'apparaît que si toutes les saveurs du panier ont un prix. |
| `VITE_CONTACT_ENDPOINT`, `VITE_NEWSLETTER_ENDPOINT` | Endpoints POST JSON (ex. Formspree). Sans endpoint, le contact passe par `VITE_CONTACT_EMAIL`. |
| `VITE_STORES` | Points de vente (JSON) affichés avec une carte OpenStreetMap. |
| `VITE_SOCIAL_*` | Liens Instagram / X / Facebook. |
| `VITE_LEGAL_*` | Informations des mentions légales et de la politique de confidentialité. |

Les valeurs nutritionnelles et les ingrédients par saveur se modifient dans `src/data/flavors.js`, les textes FR/EN dans `src/i18n/translations.js`.

## 🖼️ Médias

Les visuels sont servis depuis `public/media` (canettes en WebP 480/960 px, animations en MP4 + poster). Pour les régénérer depuis de nouvelles sources : `npm run media -- sources.json` (Python 3, Pillow et ffmpeg requis).

## 🏗️ Architecture & Déploiement

- **CI/CD** : GitHub Actions (lint, Vitest, build, Playwright).
- **Analytics** : Vercel Web Analytics et Speed Insights (à activer dans le projet Vercel).
- **Hébergement** : Optimisé pour [Vercel](https://vercel.com/).
- **Configuration Vercel** : Inclut `vercel.json` pour la gestion des URLs propes et du cache.

## 📄 Licence

© 2026 Bavaria N.V. Tous droits réservés.
