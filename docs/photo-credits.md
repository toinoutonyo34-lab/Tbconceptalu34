# Crédits photographiques

Les images du site sont des **illustrations d’ambiance**. Elles ne représentent pas des chantiers réalisés par TB Concep’T Alu.

Toutes les photos ajoutées ou retravaillées pour cette version proviennent de banques d’images libres, avec une licence autorisant l’usage commercial. Aucune photo de client n’a été inventée.

## Pexels (licence Pexels)

| Fichier | Sujet | Auteur | Source |
|---|---|---|---|
| `illu-volets-*.webp`, `card-volets-*.webp` | Volets roulants sur façade | Jan van der Wolf | [Pexels 35102521](https://www.pexels.com/photo/minimalist-building-facade-with-roller-blinds-35102521/) |
| `illu-baies-moderne-*.webp`, `card-baies-*.webp` | Maison contemporaine aux grandes ouvertures | Max Vakhtbovych | [Pexels 7031607](https://www.pexels.com/photo/exterior-of-modern-house-with-glass-doors-and-panoramic-windows-7031607/) |
| `illu-porte-alu-*.webp`, `card-porte-*.webp` | Entrée contemporaine verre et aluminium | Max Vakhtbovych | [Pexels 7587881](https://www.pexels.com/photo/modern-house-entrance-7587881/) |
| `illu-porte-bois-*.webp` | Entrée en bois et pierre | Curtis Adams | [Pexels 19227220](https://www.pexels.com/photo/exterior-and-the-entrance-of-a-modern-house-19227220/) |
| `illu-stores-*.webp`, `card-stores-*.webp` | Façade avec occultations | Vlado Paunovic | [Pexels 5288504](https://www.pexels.com/photo/blinds-on-windows-of-building-5288504/) |
| `illu-vitrage-*.webp`, `card-vitrage-*.webp` | Vitrage endommagé | auteur de la photo Pexels | [Pexels 12641791](https://www.pexels.com/photo/close-up-shot-of-a-broken-window-12641791/) |

Licence Pexels : usage libre, y compris commercial, sans autorisation préalable. L’attribution n’est pas obligatoire ; elle est indiquée ici par souci de transparence.

## Unsplash (licence Unsplash)

Les visuels déjà présents sur le site (fichiers `photo-…webp`, `maison-sud.webp`, `fenetres.webp`, `portes.webp`, `interieur.webp`, `terrasse.webp`, etc.) proviennent d’Unsplash, licence Unsplash (usage commercial autorisé, attribution appréciée). Ils ont été recadrés, étalonnés et déclinés en WebP responsives (`illu-hero-maison`, `illu-maison-sud`, `illu-fenetres-interieur`, `illu-fenetres-villa`, `illu-interieur`, `illu-terrasse`, `illu-salon-baies`, `illu-porte-classique`, `illu-pose`, `illu-garage`, `card-fenetres`, `card-pose`, `card-garage`).

Identifiants Unsplash d’origine, lorsque le nom de fichier le mentionne :

- `photo-1600585154340-be6161a56a0c` (héros d’accueil)
- `photo-1600566753086-00f18fb6b3ea` (fenêtres, intérieur)
- `photo-1600607687939-ce8a6c25118c`
- `photo-1751486403820-7cf45ebec080` (pose de fenêtre)
- `photo-1605146769289-440113cc3d00` (porte de garage)

## Traitement

Recadrage homogène (3:2, 16:9 ou 4:3 selon l’usage), étalonnage léger (contraste, saturation, netteté) et export WebP en 480 / 800 / 1600 px (ou 1200 px pour les cartes), avec `srcset`, `sizes` et chargement différé (`loading="lazy"`), sauf pour l’image principale de chaque page (`fetchpriority="high"`).
