# Architecture TB Concep'T Alu

## Principe
Le site est généré statiquement par `build.mjs` sans dépendance externe. Les pages sont construites depuis des données structurées dans `src/data/`.

## Évolutivité
- `services.mjs` : prestations et pages SEO services.
- `locations.mjs` : pages locales uniques.
- `realizations.mjs` : futures réalisations réelles uniquement.
- `catalog.schema.json` : structure des fournisseurs et produits.

## Catalogue futur
Les routes prévues sont :
- `/catalogue/`
- `/catalogue/fenetres/`
- `/catalogue/portes/`
- `/catalogue/baies-vitrees/`
- `/fournisseur/<slug>/`
- `/produit/<reference>/`

Le modèle autorise ensuite recherche par référence, matériau, dimensions, couleur, fournisseur, vitrage, performances et disponibilité.

## Administration future
Ne pas exposer une fausse administration côté navigateur. Une vraie administration doit ajouter :
1. authentification avec rôles ;
2. stockage persistant ;
3. fonctions serveur pour les mutations ;
4. validation serveur et journalisation ;
5. limitation des requêtes ;
6. protection CSRF selon le mécanisme d'authentification ;
7. gestion des fichiers et suppression RGPD.

Sur Netlify, une piste compatible consiste à utiliser `@netlify/identity` pour l'authentification, Netlify Functions pour l'API et Netlify Blobs ou une base structurée pour le contenu. L'activation doit se faire après validation des besoins d'administration et des coûts.

## Sécurité actuelle
Le site public est statique. Les formulaires passent par Netlify Forms, avec honeypot. Les en-têtes Netlify ajoutent HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options et COOP.
