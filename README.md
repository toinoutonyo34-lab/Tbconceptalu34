# TB Concept Alu — refonte 2026

Site statique issu du dépôt existant.

Construction : `node build.mjs`. Dossier public : `dist/`. Netlify est configuré dans netlify.toml. Aucun paquet à installer. Les HTML à la racine et dans les dossiers de pages sont les sources publiées. Les styles et scripts se trouvent dans assets/ ; leurs copies éditables dans src/ doivent rester synchronisées. Les données dans src/data/ sont conservées pour une future génération et ne régénèrent pas les pages automatiquement.

Les formulaires utilisent Netlify Forms ; activer la détection et les notifications puis vérifier une réception réelle après déploiement. Les aperçus locaux ne transmettent aucune demande.

Aucun avis ou chantier fictif : les photographies sont des inspirations identifiées. Voir docs/IMAGES.md.
