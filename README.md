# Portfolio — Onur Kucukkaya

Portfolio personnel : présentation, parcours, compétences, projets et contact.

En ligne : https://portfolio-onur-kucukkaya.netlify.app/

## Stack

- HTML sémantique
- [Tailwind CSS v4](https://tailwindcss.com/) (thème personnalisé dans `src/style.css`)
- JavaScript vanilla (`src/main.js`) : menu mobile, lien actif au scroll, animations d’apparition, copie de l’email
- [Vite](https://vite.dev/) pour le développement et le build
- Polices auto-hébergées via Fontsource (Inter, Space Grotesk)
- Déploiement sur Netlify

## Lancer le projet

```bash
npm install
npm run dev
```

Build de production (dossier `dist/`) :

```bash
npm run build
```

## Structure

```
index.html          → toute la page (sections Accueil, À propos, Projets, Contact)
src/main.js         → interactions
src/style.css       → thème Tailwind + composants
public/images/      → images (WebP optimisées) + image de partage og.jpg
public/documents/   → CV en PDF
```
