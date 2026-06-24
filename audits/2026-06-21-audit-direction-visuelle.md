# Audit direction visuelle — Coach Objectifs

_Réalisé le 2026-06-21 par un sous-agent IA expert design SaaS B2B moderne._

## 1. Diagnostic — pourquoi « triste, gris, ennuyeux »

Le crème + sable + brun n'est pas neutre — c'est lu comme **palette papier vieilli**. Quatre problèmes additifs :
- **Saturation globale trop basse.** Tous les tons tournent autour de 30-40 sur HSL Saturation. Linear est froid mais jamais triste parce que l'accent est saturé 60+ et tranche sur fond quasi-noir.
- **Terracotta isolé.** Sans contre-point chromatique (un froid, un vif), l'œil ne trouve pas de respiration.
- **Typo system-ui à 7 paliers, sans contraste de forme.** Aucune respiration verticale.
- **Radius modeste + zéro ombre = wireframe.** Pas un parti pris, juste une absence de décision.

## 2. Direction proposée — « Editorial Tech : papier blanc, encres vives »

Inspirée de Vercel (rigueur typo), Anthropic (chaleur sans mascotte), Linear (saturation maîtrisée), avec touche éditoriale presse en ligne sérieuse. Sérieux mais l'œil a un endroit où respirer et un endroit où vibrer.

## 3. Nouvelle palette

```css
--color-bg:          #FAFAF7;   /* off-white lumineux, pas crème */
--color-surface:     #FFFFFF;   /* blanc pur */
--color-surface-alt: #F1F1ED;
--color-text:        #111111;   /* ratio 18.9:1 AAA */
--color-text-muted:  #5A5A55;   /* ratio 5.8:1 AA */
--color-border:      #E5E4DF;
--color-focus:       #3730A3;   /* indigo profond, ratio 9.1:1 AAA */
--color-accent:      #DC2626;   /* rouge-corail vif, ratio 5.2:1 AA */
--color-accent-2:    #0F766E;   /* teal forêt, ratio 5.4:1 AA */
--color-good:        #047857;
--color-warn:        #B45309;
--color-bad:         #B91C1C;
--color-highlight:   #FEF3C7;   /* surligneur jaune doux */
```

## 4. Formes — « cartes nettes, bords assumés »

```css
--radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px; --radius-pill: 999px;
--shadow-xs: 0 1px 0 rgba(17,17,17,.04);
--shadow-sm: 0 1px 2px rgba(17,17,17,.06), 0 0 0 1px rgba(17,17,17,.04);
--shadow-md: 0 4px 12px -2px rgba(17,17,17,.08), 0 0 0 1px rgba(17,17,17,.05);
--border-strong: 1px solid #111111; /* CTA primaire */
```

Pas de neo-brutalism (trop daté en 2026, incompatible doctrine sobre). Mais bordure noire 1px sur le CTA principal = signal fort, gratuit, mature.

## 5. Typo (100 % web-safe)

```css
--font-sans: ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-serif: ui-serif, Georgia, "Times New Roman", serif;
--font-mono: ui-monospace, "SF Mono", Menlo, monospace;
```

- Corps & UI : sans, weight 400/500/600.
- Titres de section : serif, weight 600, `letter-spacing: -0.01em`.
- Métadonnées, timers, scores : mono, weight 500, taille -1px.

Échelle 6 paliers : 13 / 15 / 17 / 21 / 28 / 38 (ratio ~1.28).

## 6. Pictos & motifs

- Garder SVG inline 24×24, passer stroke à **1.5** (1.8 fait clip-art).
- Default `--color-text-muted`, actif `--color-accent`.
- Motif `.bg-dots` discret (rgba 6 % max).
- Liseré accent 3px en haut des cartes actives.

## 7. Plan d'action (~½ journée)

1. Tokens d'abord (30 min). Remplacer les 11 variables.
2. Tester sur un seul écran (1h).
3. Typo serif sur h1/h2 uniquement (20 min).
4. `.bg-dots` au header + liseré accent carte active (30 min).
5. Pictos stroke 1.5 + linecap round (30 min).
6. Audit contraste auto (30 min).
7. Validation utilisatrice.

## 8. Risques

- Rouge `#DC2626` peut être lu « erreur » sur boutons neutres. Réserver aux CTA primaires.
- Georgia en titres < 28 px paraît « blog 2010 ».
- Bordure noire 1px sur CTA peut baver en vidéoprojection basse-résolution.
- Motif `.bg-dots` au-delà de 6 % vibre.
- `--color-text-muted` 5.8:1 OK AA mais pas sous 13 px.
