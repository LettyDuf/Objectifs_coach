/**
 * Scaffold de l'activité « Construire l'objectif » - FR.
 *
 * Ce qui change d'un type d'objectif à l'autre : l'échéance (fin du sprint,
 * revue de PI, fin du trimestre, fin de l'année). Le reste (briques, verbes de
 * variation, leçons) est partagé. Les CAS travaillés viennent du corpus du Défi
 * QCM (via getChallengeQuizCases), donc rien n'est dupliqué ici.
 */

import type { ObjectiveType } from "../../domain/types";

export interface EcheanceOption {
  /** Valeur insérée dans la trame (ex. « la fin du sprint »). */
  value: string;
  /** Libellé du bouton. */
  label: string;
}

export interface BuildScaffold {
  /** Options d'échéance proposées, adaptées à la cadence du type. */
  echeanceOptions: EcheanceOption[];
  /** Palette de verbes de variation proposés (volontairement variés). */
  verbes: string[];
}

/**
 * Verbes de variation proposés. Volontairement diversifiés : un bon objectif ne
 * se reconnaît pas à un verbe unique mais à sa structure (indicateur + avant/après
 * + échéance). À bannir : améliorer, optimiser, renforcer, stabiliser (jugements
 * de valeur, non mesurables).
 */
const VERBES = [
  "Réduire",
  "Ramener",
  "Porter",
  "Relever",
  "Augmenter",
  "Diviser par deux",
  "Faire passer",
];

export const BUILD_SCAFFOLD_FR: Record<ObjectiveType, BuildScaffold> = {
  sprint: {
    echeanceOptions: [
      { value: "la fin du sprint", label: "La fin du sprint" },
      { value: "avant la fin du sprint", label: "Avant" },
      { value: "après le sprint", label: "Après" },
    ],
    verbes: VERBES,
  },
  pi: {
    echeanceOptions: [
      { value: "la revue de PI", label: "La revue de PI" },
      { value: "avant la revue de PI", label: "Avant" },
      { value: "après le PI", label: "Après" },
    ],
    verbes: VERBES,
  },
  "okr-equipe": {
    echeanceOptions: [
      { value: "la fin du trimestre", label: "Fin du trimestre" },
      { value: "avant la fin du trimestre", label: "Avant" },
      { value: "après le trimestre", label: "Après" },
    ],
    verbes: VERBES,
  },
  "okr-entreprise": {
    echeanceOptions: [
      { value: "la fin de l'année", label: "Fin de l'année" },
      { value: "avant la fin de l'année", label: "Avant" },
      { value: "plus tard dans l'année suivante", label: "Plus tard" },
    ],
    verbes: VERBES,
  },
};
