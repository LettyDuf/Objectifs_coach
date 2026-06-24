/**
 * Ports du domaine — interfaces que les adaptateurs implémentent ou consomment.
 *
 * Convention archi hexagonale :
 *   - Port d'entrée (driving) : utilisé par l'UI pour piloter le domaine. Verbe en API.
 *   - Port de sortie (driven) : utilisé par le domaine pour aller chercher des données
 *     externes (contenu pédagogique, plus tard persistance, etc.). Nom en repository.
 */

import type { ObjectiveDraft, EvaluationResult, ObjectiveType, Audience } from "./types";
import type { PuzzleSet, PuzzleLevel } from "./puzzle/types";
import type { ScenarioCard } from "./scenario";
import type { WarmupCase } from "./warmup";
import type { ChallengeQuizCase } from "./challenge-quiz";

/** Port d'entrée — ce que fait le moteur, vu de l'UI. */
export interface CoachUseCase {
  evaluate(draft: ObjectiveDraft): EvaluationResult;
}

/** Configuration des heuristiques (listes externalisées en données). */
export interface HeuristicsConfig {
  outputVerbs: string[];
  fuzzyWords: string[];
}

/** Un exemple annoté, utilisé en mode "Apprendre" et comme fixture de test. */
export interface AnnotatedExample {
  /** Identifiant stable, utile pour les tests et les références. */
  id: string;
  /** Bon ou mauvais exemple. */
  verdict: "good" | "bad";
  /** Le draft tel qu'il serait saisi par l'utilisateur. */
  draft: ObjectiveDraft;
  /** Explication courte du pourquoi (utile en pédagogie et en commentaire de test). */
  rationale: string;
  /**
   * Critères qui doivent être en faute pour les mauvais exemples (sert d'assertion en test).
   * Vide pour les bons exemples.
   */
  expectedFailingCriteria?: string[];
  /**
   * Mots-pièges à identifier dans le quiz « trouve le piège » (Mockup C — Vague 3).
   * Tokens normalisés (minuscules, sans accent). Une casse différente est tolérée à l'usage.
   * Renseigné uniquement sur les mauvais exemples.
   */
  trapWords?: string[];
}

/**
 * Une fiche pédagogique — texte explicatif court affiché en tête du mode Apprendre.
 *
 * Différente d'un AnnotatedExample : pas évaluée par le moteur, c'est du contenu narratif
 * structuré (titre, intro, sections, illustrations). Sert à transmettre la doctrine et
 * les pièges à éviter avant d'aborder les exemples.
 */
export interface PedagogicalSheet {
  /** Identifiant stable. */
  id: string;
  /** Titre court. */
  title: string;
  /** Introduction (un paragraphe). */
  intro: string;
  /** Sections de la fiche, dans l'ordre d'affichage. */
  sections: PedagogicalSection[];
  /** Nom d'icône (cf. IconName du composant Icon) — affichée en tête. Optionnel. */
  icon?: string;
  /** Phrase-clé affichée en gros au sommet (mode infographique). Optionnel. */
  heroPhrase?: string;
  /**
   * Libellé optionnel du bouton d'application en bas de fiche.
   * Si fourni, un CTA visible apparaît invitant à mettre en pratique.
   */
  practiceCtaLabel?: string;
  /**
   * Identifiant du thème auquel cette fiche appartient (D21). Permet de regrouper
   * les fiches dans l'onglet Théorie. Si absent, la fiche est placée dans le
   * thème par défaut « Toutes les fiches ».
   */
  themeId?: string;
}

/**
 * Thème d'apprentissage (D21) — regroupe plusieurs fiches dans l'onglet Théorie
 * pour donner un point d'entrée éditorial (« Les fondamentaux », « Les pièges
 * classiques », etc.). Donne du sens à l'exploration au lieu d'une simple liste
 * de fiches.
 */
export interface LearningTheme {
  /** Identifiant stable (référencé par `PedagogicalSheet.themeId`). */
  id: string;
  /** Titre éditorial court (« Les fondamentaux »). */
  label: string;
  /** Accroche d'une ligne qui donne envie d'ouvrir. Pas de redondance avec le titre. */
  tagline: string;
  /** Nom d'icône (cf. IconName). */
  icon?: string;
  /** Marqué « Commence ici » dans la grille. Au plus un thème par module. */
  recommendedFirst?: boolean;
}

/** Un thème associé aux fiches qu'il regroupe (sortie de `getThemes`). */
export interface ThemeWithSheets {
  theme: LearningTheme;
  sheets: PedagogicalSheet[];
}

export interface PedagogicalSection {
  heading: string;
  body: string;
  /** Liste optionnelle d'items ; chaque item peut être une raison, un exemple, un point. */
  bullets?: string[];
  /** Illustrations annotées (mauvais → correction), optionnel. */
  examples?: { bad: string; good?: string; note?: string }[];
  /** Nom d'icône (cf. IconName) affichée à côté du titre de section. */
  icon?: string;
  /**
   * Type spécial de section.
   * - `"source"` : encart citation différencié, italique, icône livre.
   * - `"bricks"` : grille colorée des composants grammaticaux d'un objectif,
   *   précédée d'une phrase exemple annotée (couleurs assorties).
   */
  kind?: "source" | "bricks";
  /** Briques (5 max) à afficher quand `kind: "bricks"`. */
  bricks?: Brick[];
  /** Phrase exemple complète quand `kind: "bricks"`. Les `snippet` de chaque
   * brique sont highlightés dans cette phrase, dans l'ordre de leur position
   * d'apparition. */
  bricksSentence?: string;
}

/** Une « brique » de la grammaire d'un bon objectif (utilisée par `kind: "bricks"`). */
export interface Brick {
  /** Numéro de position dans la phrase (1 à 5 pour un Sprint Goal). */
  num: number;
  /** Nom court de la brique (ex. « Verbe outcome », « Indicateur »). */
  label: string;
  /** Question à laquelle la brique répond (ex. « L'action qui amorce le résultat »). */
  hint: string;
  /** 2-3 exemples concrets séparés par des virgules. */
  examples: string;
  /** Bout de phrase exact à highlighter dans `bricksSentence` (ex. « Réduire »). */
  snippet: string;
  /** Identifiant de couleur (« purple », « teal », « pink », « amber », « blue »). */
  color: "purple" | "teal" | "pink" | "amber" | "blue";
}

/** Port de sortie — d'où vient le contenu pédagogique. */
export interface ContentRepository {
  getHeuristicsConfig(): HeuristicsConfig;
  getExamples(type: ObjectiveType, audience: Audience): AnnotatedExample[];
  getSheets(type: ObjectiveType, audience: Audience): PedagogicalSheet[];
  /**
   * Thèmes d'apprentissage avec leurs fiches associées (D21). Ordre des thèmes
   * géré par le repository. Les fiches sans `themeId` sont rattachées à un thème
   * par défaut « Toutes les fiches ».
   */
  getThemes(type: ObjectiveType, audience: Audience): ThemeWithSheets[];
  /**
   * Renvoie un set de puzzle pour le niveau demandé, ou `null` si aucun puzzle
   * n'est défini pour ce couple (type, audience).
   */
  getPuzzleSet(type: ObjectiveType, audience: Audience, level: PuzzleLevel): PuzzleSet | null;
  /** Cartes contexte pour le mode Défi scénarisé. */
  getScenarioCards(type: ObjectiveType, audience: Audience): ScenarioCard[];
  /** Cas d'échauffement output/outcome pour le mode S'entraîner. */
  getWarmupCases(type: ObjectiveType, audience: Audience): WarmupCase[];
  /** Cas du Défi version QCM (4 propositions à juger). */
  getChallengeQuizCases(type: ObjectiveType, audience: Audience): ChallengeQuizCase[];
}
