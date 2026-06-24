# Audit UX/UI — Coach Objectifs (usage laptop atelier)

_Réalisé le 2026-06-20 par un sous-agent IA expert design._

## 1. Diagnostic

| # | Problème | Où | Pourquoi c'est un problème | Impact |
|---|---|---|---|---|
| **P1** | Largeur contenu plafonnée à **880 px** et centrée | `tokens.css` `--content-max-width: 880px`, `components.css` `.app__main` | Sur 1440-1920 px, deux tiers de l'écran sont vides. En vidéoprojection, le facilitateur perd la moitié de la surface utile. | **Haut** |
| **P2** | Layout mono-colonne sur tous les écrans riches (Practice, Challenge, Puzzle, Learn) | `SprintPractice.tsx`, `SprintChallenge.tsx`, `SprintPuzzle.tsx` | Formulaire et évaluation se succèdent verticalement. L'utilisateur scrolle pour voir l'effet de sa saisie — alors que l'écran a la place pour les afficher côte à côte. | **Haut** |
| **P3** | `card-grid` `minmax(240px, 1fr)` → 4 cartes ModeSelector qui s'étalent et deviennent énormes en 1600px | `components.css` ligne 116-121 | Sur laptop large, les 4 cartes Apprendre/S'entraîner/Défi/Puzzle font ~340 px de large chacune, ce qui les rend disproportionnées vs. leur contenu. | **Moyen** |
| **P4** | Hiérarchie typographique compressée : `--font-size-base: 17px`, `--font-size-xl: 26px`, `--font-size-xxl: 36px` mais pas de palier intermédiaire pour les h3 de section | `tokens.css`, `SprintLearn.tsx` | Les `<h3>` "Fiches pédagogiques", "Bons exemples", "Mauvais exemples" héritent du style navigateur (~19 px) — quasi invisibles à 3 m. | **Haut** |
| **P5** | Évaluation en bas de page, hors champ visuel pendant la saisie | `SprintPractice.tsx` ligne 110, `SprintChallenge.tsx` ligne 181 | Le feedback en direct, qui est la promesse pédagogique principale, oblige à scroller. | **Haut** |
| **P6** | Puzzle : 6 colonnes × largeur 880 ≈ **130 px par colonne** | `SprintPuzzle.tsx` + `components.css` `.puzzle-source` | Les blocs sont étriqués, souvent tronqués en 2-3 lignes. La zone cible passe en dessous, perdant le geste "atelier" attendu. | **Haut** |
| **P7** | Pas d'ancrage visuel pour le mode actif. Le badge session est en haut à droite, isolé | `App.tsx` `.app__header` | En atelier vidéoprojeté, le contexte (« on est sur Puzzle, niveau Moyen ») n'est pas lisible d'un coup d'œil. | **Moyen** |
| **P8** | Boutons d'action `.btn` à 17 px sur padding `space-2 / space-4` = ~36 px de haut | `components.css` ligne 165-189 | Cibles peu présentes en vidéo-projection. Le CTA primaire ne se distingue pas suffisamment. | **Moyen** |
| **P9** | Galerie d'exemples (Learn) : 8-12 cartes verticales empilées, sans filtre ni vue tableau | `SprintLearn.tsx` lignes 51-59 | L'empilement linéaire force le scroll et noie la comparaison bon/mauvais. | **Moyen** |
| **P10** | Confiance + cases à cocher sur 3 lignes pleines après le textarea | `SprintPractice.tsx` lignes 67-108 | Champs secondaires occupent autant d'espace vertical que le champ principal. Bruit visuel élevé. | **Faible** |

## 2. Recommandations concrètes

- **R1 (P1)** : remplacer `--content-max-width: 880px` par **deux tokens** : `--content-max-width-narrow: 760px` (texte long) et `--content-max-width-wide: 1320px` (écrans atelier). Appliquer `wide` à `.app__main` par défaut.
- **R2 (P2)** : passer Practice, Challenge en **grid 2 colonnes** `grid-template-columns: minmax(0, 1fr) minmax(420px, 520px); gap: var(--space-6)`. Formulaire à gauche, `EvaluationPanel` collant à droite (`position: sticky; top: var(--space-5)`).
- **R3 (P3)** : TypeSelector → grid 3 colonnes fixes. ModeSelector → grid 2×2 avec pictogrammes SVG 32×32.
- **R4 (P4)** : étendre l'échelle typo à **6 paliers** : `xs:13 / sm:15 / base:17 / md:20 / lg:24 / xl:32 / xxl:40`. Créer `.section-title` (24 px, bold, border-bottom 2px).
- **R5 (P5)** : conséquence directe de R2 — `EvaluationPanel` sticky right. Ajouter une barre de progression du score en tête.
- **R6 (P6)** : refondre `.puzzle-source` en grid 2 colonnes : `[blocs source | zone d'assemblage]` 60/40. `.puzzle-target` devient sticky.
- **R7 (P7)** : header en 3 zones : titre+breadcrumb (gauche) | chip mode actif au centre | badge session (droite).
- **R8 (P8)** : créer `.btn--lg` (padding `space-3/space-5`, font-size `--font-size-md` 20 px) pour les CTAs principaux.
- **R9 (P9)** : Learn passe en grid 2 colonnes « Bons | Mauvais ».
- **R10 (P10)** : regrouper confiance + 2 checkboxes dans un `<fieldset>` 3 colonnes.

## 3. Plan d'action priorisé

### Vague 1 — must-have (très haut ROI)
1. R1 + R2 — élargir et 2 colonnes avec évaluation sticky
2. R4 — échelle typo étendue + `.section-title`
3. R6 — refonte Puzzle en 2 colonnes
4. R8 — `.btn--lg` sur CTAs primaires

### Vague 2 — should-have
5. R3, R5, R9, R10

### Vague 3 — nice-to-have
6. R7, mode plein écran touche F, toggle densité

## 4. Risques

- Lisibilité vidéoprojeté : garder une largeur narrow pour les fiches pédagogiques (60-80 caractères par ligne).
- Sticky panels : prévoir `max-height: calc(100vh - var(--space-6) * 2); overflow-y: auto` pour les petits viewports verticaux.
- Doctrine sobre : pictogrammes monochromes uniquement (`currentColor` ou tokens sémantiques).
- Tokens sémantiques : la barre de score doit consommer `--color-good/warn/bad`, pas inventer un dégradé.
