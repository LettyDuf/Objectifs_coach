# Audit UI structurelle & système de gabarit — Coach Objectifs

_Réalisé le 2026-06-21 par un sous-agent IA expert layouts d'application web pro._

## 1. Diagnostic transversal

Il existe aujourd'hui **deux patterns** (selector grid + split-layout) mais **aucun n'est formalisé** en gabarit. Les actions sont posées au fil de l'eau dans **6 emplacements différents** selon les écrans. L'input principal a le même poids visuel qu'un libellé de checkbox.

### Synthèse par écran
- **TypeSelector / ModeSelector** : pattern cohérent entre eux mais incohérent avec les écrans denses. Aucune zone d'action.
- **SprintPractice** : pire écran. Textarea principal au même poids que les checkboxes. ExportPanel noyé à plat. Aside droit déséquilibré.
- **SprintChallenge** : 4 boutons d'action en pleine page sans toolbar. « Carte suivante » disparaît au scroll.
- **SprintLearn** : long empilement vertical. Aucune navigation interne (TOC). CTAs « S'entraîner » dupliqués dans chaque card.
- **Puzzle** : `puzzle-actions` flotte sans appartenance. Aside cumule 4 zones sans hiérarchie. Bouton « Quitter » à un autre endroit que dans Challenge.

## 2. Système de gabarit proposé — un seul template, 4 zones

```
AppShell (sticky)
  ScreenFrame (max 1320, mx-auto)
    ScreenHeader              ← sticky sous AppShell
      ├─ Eyebrow (kicker + breadcrumb compact + meta)
      ├─ Title (h2 serif xl)
      ├─ Lede (md muted, max 64ch)
      └─ HeaderActions (right, secondaire : Quitter, Tirer carte, etc.)
    ScreenBody (grid 4 variantes)
      ├─ PrimaryZone   (input principal, dans une carte)
      ├─ ContextZone   (rail sticky, méta ou évaluation)
      └─ ResultZone    (optionnel, sortie agrégée)
    ScreenActions             ← sticky bas, full-width sur ScreenFrame
      ├─ ActionsLeft   (tertiaire : Quitter, Vider)
      ├─ ActionsCenter (statut : score, compteur)
      └─ ActionsRight  (primaire : Valider, Suivant, Exporter)
```

### Variantes de body
- `--single` (selectors)
- `--rail` (1fr / 380 px)
- `--wide-rail` (1fr / 460 px) — Practice/Challenge
- `--source-aside` (1.6fr / 1fr) — Puzzle

### Spécifications CSS clés
```css
:root {
  --shell-header-h: 56px;
  --screen-actions-h: 64px;
  --screen-rail: 380px;
}
.screen-frame { max-width: 1320px; margin: 0 auto;
                padding: 0 var(--space-6) var(--screen-actions-h); }
.screen-header { position: sticky; top: var(--shell-header-h);
                 background: var(--color-bg); border-bottom: 1px solid var(--color-border);
                 padding: var(--space-5) 0 var(--space-4);
                 display: grid; grid-template-columns: 1fr auto; gap: var(--space-4); }
.screen-actions { position: sticky; bottom: 0;
                  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
                  backdrop-filter: blur(6px);
                  border-top: 1px solid var(--color-border);
                  display: grid; grid-template-columns: auto 1fr auto; }
.zone--primary { background: var(--color-surface); border: 1px solid var(--color-border);
                 border-radius: var(--radius-lg); padding: var(--space-6);
                 box-shadow: var(--shadow-xs); }
.zone--context { position: sticky; top: calc(var(--shell-header-h) + 96px + 16px); align-self: start; }
```

### Hiérarchie visuelle universelle
| Niveau | Token |
|---|---|
| H0 Title écran (un par écran) | `--font-size-xl` serif 600 |
| H1 Zone title | `--font-size-md` serif 600 |
| H2 Field label / sub-section | `--font-size-base` 500 |
| Meta (eyebrow, kicker, badges) | `--font-size-xs` uppercase 0.06em |
| Input principal (textarea brief) | `--font-size-md` padding 32 min-height 160 |
| Input secondaire (checkbox, range) | `--font-size-base` padding 8 |

## 3. Composants React à créer (5 fichiers)
- `src/ui/layout/Screen.tsx` — façade composée
- `src/ui/layout/ScreenHeader.tsx`
- `src/ui/layout/ScreenBody.tsx`
- `src/ui/layout/Zone.tsx`
- `src/ui/layout/ScreenActions.tsx`

```ts
interface ScreenHeaderProps {
  eyebrow?: React.ReactNode;
  title: string;
  lede?: string;
  actions?: React.ReactNode;
}
interface ScreenBodyProps {
  variant?: "single" | "rail" | "wide-rail" | "source-aside";
  primary: React.ReactNode;
  context?: React.ReactNode;
}
interface ScreenActionsProps {
  left?: React.ReactNode;
  status?: React.ReactNode;
  right?: React.ReactNode;
}
```

## 4. Patterns de référence
- **Linear** — sticky bottom action bar (jamais flottant).
- **Notion** — sticky page header avec breadcrumb + actions droite.
- **Stripe Dashboard / Vercel** — rail droit fixe 380 px (pas fluide).
- **Figma** — segmented control en HeaderAction (pour sélecteur de type Puzzle).

## 5. Plan d'application priorisé

| # | Écran | Effort | Effet | Justification |
|---|---|---|---|---|
| 1 | **SprintPractice** | M | Max | Pire écran, valide tout le système, dissout ExportPanel |
| 2 | SprintChallenge | M | Fort | Réutilise wide-rail, range les 4 boutons |
| 3 | Puzzle | M | Fort | Sélecteur de type en segmented, range Quitter |
| 4 | SprintLearn + PILearn | L | Moyen | Introduit TOC, retire CTAs dupliqués |
| 5 | TypeSelector + ModeSelector | S | Faible | Migration cosmétique vers `--single` |
| 6 | PIPractice | S | Faible | Copier-coller du gabarit Practice |

Effort cumulé ~3 jours pour 1+2+3. Le système est rentabilisé dès l'écran 2.
