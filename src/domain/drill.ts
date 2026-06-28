/**
 * Types domaine pour les mini-exercices (drills) S'entraîner.
 *
 * Trois formats au V1 :
 *   - QCM 1 parmi N options (Indicateur N=3, Contexte N=4)
 *   - Grille à sélection multiple (Variation, Échéance — repère les fragments précis)
 *
 * Chaque drill a un corpus de cas validé pédagogiquement (cf.
 * proposition-corpus-mini-exercices.md, V3 panel pluridisciplinaire).
 */

/** Une option d'un QCM mini-exercice. */
export interface QcmOption {
  /** Lettre A, B, C, D (utilisée pour libellé et raccourcis). */
  id: string;
  /** Texte affiché. */
  text: string;
  /** Vrai si c'est la bonne réponse. */
  isCorrect: boolean;
}

/** Un cas d'exercice QCM (Indicateur, Contexte). */
export interface DrillQcmCase {
  id: string;
  /** Énoncé qui précède les options (ex. « Améliorer le passage en caisse »). */
  statement: string;
  /** Question posée (ex. « Lequel est mesurable ? »). */
  question: string;
  /** Les options à choisir. */
  options: QcmOption[];
  /** Explication pédagogique affichée après la sélection. */
  explanation: string;
}

/** Un fragment d'une grille à sélection multiple. */
export interface GridFragment {
  id: string;
  text: string;
  /** Vrai si ce fragment doit être coché (cf. consigne). */
  isCorrect: boolean;
  /** Justification courte affichée après validation. */
  justification: string;
}

/** Un drill grille à sélection multiple (Variation, Échéance). */
export interface DrillGridCase {
  /** Consigne unique pour toute la grille. */
  consigne: string;
  /** Fragments à cocher ou non. */
  fragments: GridFragment[];
}

/** Configuration complète d'un mini-exercice. */
export type DrillCorpus =
  | { kind: "qcm"; intro: string; cases: DrillQcmCase[] }
  | { kind: "grid"; intro: string; data: DrillGridCase };
