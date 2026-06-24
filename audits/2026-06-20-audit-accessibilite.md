# Audit WCAG 2.1 AA — Coach Objectifs

_Réalisé le 2026-06-20 par un sous-agent IA expert accessibilité._

## 1. Violations / risques

### Bloquants

- **B1. `role="listitem"` sur `<button>`** — `TypeSelector.tsx:58`, `ModeSelector.tsx:25,32,38,45`. Le rôle ARIA écrase le rôle natif du bouton. WCAG 4.1.2. Retirer.
- **B2. Pattern radiogroup non conforme** — `SprintPuzzle.tsx:206-220`. Les `<button role="radio">` ne gèrent pas la navigation flèches, ni le roving tabindex. WCAG 2.1.1 + APG. Revenir à de vrais `<input type="radio">`.
- **B3. Drag-and-drop sans alternative clavier complète** — `SprintPuzzle.tsx`. `KeyboardSensor + sortableKeyboardCoordinates` ne fait que réordonner. Pour ajouter un bloc source dans la cible, il n'y a aucun équivalent clavier. Aucun announcer non plus. WCAG 2.1.1 (A), 4.1.3 (AA). Voir §4.
- **B4. `<button>` dans `<button>`** — `SprintPuzzle.tsx:366-388`. Le handle est un `<button>` recevant les listeners D&D, ce qui collisionne avec son activation native. WCAG 4.1.2. Utiliser `<span role="button" tabindex="0">`.

### Sérieux

- **S1. Focus invisible sur `.btn--primary`** — la couleur de focus `#2563eb` sur fond bleu primary = contraste ~1:1. WCAG 1.4.11. Ajouter `outline-offset` + `box-shadow` blanc en sandwich.
- **S2. `aria-live` trop bavard** — `EvaluationPanel.tsx`. La région entière (12+ items) est annoncée à chaque keystroke. Limiter au seul résumé score + statut.
- **S3. Accordéon : `<h3>` dans `<button>`** — `SheetCard.tsx`. Plusieurs AT perdent le rôle heading. Pattern Disclosure : bouton à côté du titre.
- **S4. Champs numériques du puzzle sans label contextuel** — `aria-label="Valeur [X]"` est cryptique. WCAG 2.4.6.
- **S5. Compteur de session `key={count}`** — `App.tsx`. Le remount casse l'identité du `role="status"` pour les AT.
- **S6. Téléchargement sans live region persistante** — `ExportPanel.tsx`. Le `<p role="status">` apparaît conditionnellement, pas observable par AT au moment où le texte arrive.

### Mineurs

- M1. `<details>` natif dans Challenge : OK.
- M2. Icônes Unicode : `aria-hidden` sur décoratives — déjà fait.
- M3. `<html lang="fr">` à confirmer dans index.html. WCAG 3.1.1.
- M4. Pas de skip link vers `<main>`. WCAG 2.4.1.
- M5. Hiérarchie de titres cohérente.
- M6. `disabled` sur bouton du défi → l'`aria-label` explicatif n'est jamais lu. Utiliser `aria-disabled`.

## 2. Bonnes pratiques déjà présentes

- Couleurs sémantiques avec ratios documentés, jamais seules (icône + texte + couleur).
- `:focus-visible` global défini.
- `prefers-reduced-motion` respecté.
- Landmarks `<header>`, `<main>`, `<nav aria-label>`.
- `<label htmlFor>` correct sur tous les champs.
- `aria-expanded`/`aria-controls` sur accordéon.
- Typographie lisible.
- Aucun piège clavier hors drag-and-drop.

## 3. Recommandations ciblées

```css
/* R1 — Focus visible sur primary */
.btn--primary:focus-visible {
  outline: 3px solid #fff;
  box-shadow: 0 0 0 6px var(--color-focus);
}
```

```css
/* R4 — Skip link */
.skip-link { position:absolute; left:-9999px }
.skip-link:focus { left:0; top:0; padding:8px; background:#fff; z-index:100 }
```

## 4. Drag-and-drop — verdict détaillé

L'état actuel **n'est pas accessible au clavier**. Trois actions nécessaires :

1. **Mode alternatif explicite** : à côté de chaque `SourceBlock`, un bouton « Ajouter à la zone » qui appelle directement `addBlock(block)`. Sans D&D. Chemin sûr pour clavier et AT.
2. **Announcer @dnd-kit** : configurer `accessibility.announcements` sur `<DndContext>` (onDragStart/Over/End/Cancel).
3. **screenReaderInstructions** : `accessibility.screenReaderInstructions={{ draggable: "..." }}`.

Le bouton-dans-bouton (B4) doit être réglé d'abord.

## 5. Score global

- **Aujourd'hui : ~64 % (18/28 critères pertinents)**.
- **Après application des bloquants + sérieux : ~93 % (26/28)**.

Le code part d'une bonne base. L'effort restant est concentré sur le puzzle et trois patterns ARIA mal appliqués.
