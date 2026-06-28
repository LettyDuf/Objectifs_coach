/**
 * Types du sous-domaine Puzzle.
 *
 * Conformes à DOMAINE.md §6 ter : 6 catégories de blocs, dont une (Variation) avec
 * tuile(s) à remplir d'un chiffre. Aucune dépendance externe.
 */

/** Les 6 catégories de blocs constituant un objectif outcome-based. */
export type PuzzleCategory =
  | "action" // Catégorie 1
  | "indicator" // Catégorie 2
  | "variation" // Catégorie 3 — blocs spéciaux avec tuile chiffre
  | "context" // Catégorie 4
  | "preposition" // Catégorie 5
  | "timeReference"; // Catégorie 6

/** Qualité d'un bloc — sert à composer les niveaux de difficulté. */
export type BlockQuality = "good" | "neutral" | "distractor";

/** Niveau de difficulté du puzzle. */
export type PuzzleLevel = "easy" | "medium" | "hard";

/** Bloc texte simple. Aucun champ à remplir. */
export interface TextBlock {
  kind: "text";
  id: string;
  category: PuzzleCategory;
  quality: BlockQuality;
  /** Texte affiché et utilisé dans l'assemblage final. */
  text: string;
}

/**
 * Bloc avec tuile(s) à remplir d'un chiffre.
 *
 * Le `template` contient un ou deux placeholders `[X]` / `[Y]` que l'utilisateur
 * remplit lui-même. Le bloc n'est utilisable dans l'assemblage que si tous ses
 * champs ont une valeur non vide.
 */
export interface NumericFieldBlock {
  kind: "numericField";
  id: string;
  category: PuzzleCategory;
  quality: BlockQuality;
  /** Template avec placeholders, ex. « de [X] à [Y] » ou « par [X] ». */
  template: string;
  fieldCount: 1 | 2;
}

export type PuzzleBlock = TextBlock | NumericFieldBlock;

/** Un set de blocs prêt à jouer pour un niveau donné. */
export interface PuzzleSet {
  level: PuzzleLevel;
  /** Blocs disponibles, indexés par catégorie pour l'affichage en colonnes. */
  blocksByCategory: Record<PuzzleCategory, PuzzleBlock[]>;
}

/**
 * Instance d'un bloc placée dans la phrase en construction.
 *
 * Pour les blocs `numericField`, `values` contient les saisies de l'utilisateur
 * (string pour rester libre — un input vide est représenté par "").
 *
 * `slotKey` (optionnel) identifie la zone du plateau où le bloc a été déposé
 * (D25). Quand il est défini sur tous les blocs, l'évaluation et l'assemblage
 * passent en mode « plateau » : ordre canonique + slots obligatoires.
 */
export interface PlacedBlock {
  /** Identifiant d'instance (unique dans la phrase). */
  instanceId: string;
  block: PuzzleBlock;
  /** Valeurs saisies pour les champs numériques (vide pour les TextBlock). */
  values: string[];
  /** Zone du plateau qui contient ce bloc (cf. SlotKey). Optionnel pour compat. */
  slotKey?: SlotKey;
}

/**
 * Zones du plateau de cartes (D25). Six zones fixes :
 *   - 4 obligatoires : intention / mesure / cible / horizon
 *   - 2 bonus       : contexte / liaison
 * Chaque zone accepte une seule carte (option A validée 2026-06-26).
 */
export type SlotKey =
  | "intention"
  | "mesure"
  | "cible"
  | "horizon"
  | "contexte"
  | "liaison";

/** Mapping catégorie de bloc → zone du plateau. */
export const CATEGORY_TO_SLOT: Record<PuzzleCategory, SlotKey> = {
  action: "intention",
  indicator: "mesure",
  variation: "cible",
  timeReference: "horizon",
  context: "contexte",
  preposition: "liaison",
};

/** Zones obligatoires : la phrase n'est évaluable que si toutes sont remplies. */
export const REQUIRED_SLOTS: ReadonlyArray<SlotKey> = [
  "intention",
  "mesure",
  "cible",
  "horizon",
];

/** Ordre canonique d'assemblage de la phrase (lecture grammaticale).
 * La liaison vient juste avant l'horizon ("d'ici la fin du sprint"). */
export const SLOT_ORDER: ReadonlyArray<SlotKey> = [
  "intention",
  "mesure",
  "cible",
  "contexte",
  "liaison",
  "horizon",
];

/** Libellés affichables des zones du plateau. */
export const SLOT_LABELS: Record<SlotKey, string> = {
  intention: "Intention",
  mesure: "Mesure",
  cible: "Cible",
  horizon: "Horizon",
  contexte: "Contexte",
  liaison: "Vers l'échéance",
};

