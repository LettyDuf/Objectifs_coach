/**
 * Pictogrammes SVG inline — style line-art monochrome.
 *
 * Tous les pictos sont en `currentColor` : la couleur vient de la classe CSS du parent
 * (`color: var(--color-accent)` par défaut sur les usages décoratifs).
 *
 * Le `viewBox` est 24×24, `stroke-width: 2`, sans remplissage.
 * `aria-hidden` par défaut : ce sont des décorations, pas des informations.
 */

import type { CSSProperties } from "react";

export type IconName =
  // Types d'objectifs
  | "sprint"
  | "pi"
  | "okr"
  // Modes
  | "learn"
  | "practice"
  | "challenge"
  | "puzzle"
  // Fiches pédagogiques
  | "target"
  | "wrench"
  // États
  | "good"
  | "warn"
  | "bad";

interface Props {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 32, className, style }: Props) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ display: "inline-flex", color: "inherit", ...style }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PATHS[name]}
      </svg>
    </span>
  );
}

const PATHS: Record<IconName, React.ReactNode> = {
  /* Sprint : flèche circulaire (itération courte) */
  sprint: (
    <>
      <path d="M3 12a9 9 0 0 1 15.5-6.3" />
      <path d="M21 12a9 9 0 0 1-15.5 6.3" />
      <path d="M18 3v4h-4" />
      <path d="M6 21v-4h4" />
    </>
  ),
  /* PI : trois noeuds connectés (multi-équipes) */
  pi: (
    <>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="19" r="2.2" />
      <path d="M7 7l4 10" />
      <path d="M17 7l-4 10" />
      <path d="M7 6h10" />
    </>
  ),
  /* OKR : cible bullseye */
  okr: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  /* Apprendre : livre ouvert */
  learn: (
    <>
      <path d="M3 6a3 3 0 0 1 3-3h5v15H6a3 3 0 0 0-3 3z" />
      <path d="M21 6a3 3 0 0 0-3-3h-5v15h5a3 3 0 0 1 3 3z" />
      <path d="M12 3v18" />
    </>
  ),
  /* S'entraîner : stylo qui écrit */
  practice: (
    <>
      <path d="M4 20l3-1 10.5-10.5a2.1 2.1 0 0 0-3-3L4 16z" />
      <path d="M14 5l3 3" />
      <path d="M3 21h6" />
    </>
  ),
  /* Défi : drapeau planté */
  challenge: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2.5 4 2.5 4H5" />
    </>
  ),
  /* Puzzle : pièce de puzzle */
  puzzle: (
    <>
      <path d="M9 3h6v3a2 2 0 1 0 4 0V3h3v6h-3a2 2 0 1 0 0 4h3v6h-6v-3a2 2 0 1 0-4 0v3H3v-6h3a2 2 0 1 0 0-4H3V3h6z" />
    </>
  ),
  /* Fiche cible : étoile pour le "un seul Sprint Goal" */
  target: (
    <>
      <polygon points="12 3 14.6 9 21 9.5 16 14 17.5 20.5 12 17 6.5 20.5 8 14 3 9.5 9.4 9" />
    </>
  ),
  /* Fiche maintenance : clé à molette */
  wrench: (
    <>
      <path d="M14.7 6.3a4.5 4.5 0 0 1 5.5 5.5L9.8 22.2a2.1 2.1 0 0 1-3-3z" />
      <path d="M13 8l3 3" />
    </>
  ),
  /* États : ✓ ⚠ ✕ */
  good: (
    <>
      <polyline points="5 13 10 18 19 7" />
    </>
  ),
  warn: (
    <>
      <path d="M12 3l10 17H2z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="18" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  bad: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </>
  ),
};
