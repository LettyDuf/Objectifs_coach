/**
 * Types du cœur de domaine.
 *
 * Aucune dépendance externe. Aucun import de React, de Vite, ou de quoi que ce soit
 * d'infrastructurel. Le domaine doit pouvoir être consommé par n'importe quel adaptateur
 * (UI React aujourd'hui, CLI, tests, autre demain).
 *
 * Vocabulaire :
 *   - Draft : un objectif tel que rédigé par l'utilisateur, pas encore évalué.
 *   - EvaluationResult : la sortie du moteur — score, statut par critère, justifications.
 */

/**
 * Type d'objectif travaillé dans la session. Voir DOMAINE.md §2-4.
 *
 * Note D18 : les OKR sont scindés en deux types distincts (équipe / entreprise) parce
 * que leur cadence, leur grammaire et leur porteur diffèrent (entreprise = annuel par
 * le CODIR, équipe = trimestriel par l'équipe). V1 ne livre que `okr-equipe`,
 * `okr-entreprise` est déclaré pour TypeScript mais marqué « à venir » dans l'UI.
 */
export type ObjectiveType = "sprint" | "pi" | "okr-equipe" | "okr-entreprise";

/**
 * Audience cible. V1 active "dev" (équipe de développeurs) et, depuis le module
 * OKR entreprise, "manager" (CODIR). "po"/"pm" restent déclarés mais inutilisés
 * (voir D8 DECISIONS.md).
 */
export type Audience = "dev" | "po" | "pm" | "manager";

/**
 * Résout l'audience qui correspond à un type d'objectif. Source unique de vérité
 * pour les écrans génériques multi-type (ChallengeQuiz, PitfallQuiz, Puzzle, Analyse) :
 * évite de disséminer un "dev" en dur dans 4 fichiers UI (voir D53 DECISIONS.md).
 */
export function audienceForType(type: ObjectiveType): Audience {
  return type === "okr-entreprise" ? "manager" : "dev";
}

/**
 * Types d'objectif accessibles depuis une session Composer/Analyser démarrée
 * sur `type`, pour un même bloc d'écrans multi-type (D16/D27). Cloisonne les
 * deux familles d'audience : OKR entreprise (CODIR, manager) ne se mélange
 * jamais avec le trio dev (Sprint/PI/OKR équipe) dans le même sélecteur
 * interne, pour ne pas faire atterrir un manager sur du contenu dev ou
 * inversement (voir D53 DECISIONS.md).
 */
export function relatedTypesFor(type: ObjectiveType): ObjectiveType[] {
  return type === "okr-entreprise"
    ? ["okr-entreprise"]
    : ["sprint", "pi", "okr-equipe"];
}

/** Classe PI : committed (engagement) ou stretch (ambition haute). Voir DOMAINE.md §3.2. */
export type PiClass = "committed" | "stretch";

/**
 * Confiance estimée par l'équipe d'atteindre l'objectif, en pourcentage [0, 100].
 * Utilisée pour vérifier le calibrage d'ambition selon le type (voir D10 DECISIONS.md).
 */
export type Confidence = number;

/** Base partagée par tous les drafts. */
interface ObjectiveDraftBase {
  /** Texte rédigé par l'utilisateur. */
  text: string;
  /** Audience à laquelle s'adresse l'objectif. V1 : toujours "dev". */
  audience: Audience;
  /** Confiance estimée d'atteinte (0 à 100). */
  confidence?: Confidence;
  /** Indique si une borne temporelle a été précisée hors texte (case cochée du formulaire). */
  hasExplicitDeadline?: boolean;
  /** Indique si l'équipe a le pouvoir d'agir (case cochée du formulaire). */
  isUnderTeamInfluence?: boolean;
}

export interface SprintDraft extends ObjectiveDraftBase {
  type: "sprint";
}

export interface PiDraft extends ObjectiveDraftBase {
  type: "pi";
  /** Committed ou stretch — détermine le calibrage d'ambition attendu. */
  piClass: PiClass;
  /** Valeur business 1-10 attribuée par un Business Owner (voir D11 DECISIONS.md). */
  businessValue?: number;
}

/**
 * Un OKR équipe = un Objective qualitatif + 3 à 5 Key Results quantitatifs outcome.
 * L'Objective vit dans `text` (hérité de la base). Les KR vivent dans `keyResults`.
 *
 * Note : `confidence` au niveau du draft n'est pas utilisé pour OKR — la confiance
 * pertinente est celle de **chaque KR** (voir DOMAINE.md §4.4). Le moteur agrège
 * les confiances des KR pour évaluer le critère `crediblyAmbitious`.
 */
export interface OkrTeamDraft extends ObjectiveDraftBase {
  type: "okr-equipe";
  /** Les Key Results — chacun a son propre texte et sa propre confiance estimée. */
  keyResults: KeyResultDraft[];
}

export interface KeyResultDraft {
  text: string;
  confidence?: Confidence;
}

/** Stub V1 : OKR entreprise non implémenté. Type déclaré pour TypeScript exhaustif. */
export interface OkrCompanyDraft extends ObjectiveDraftBase {
  type: "okr-entreprise";
  keyResults: KeyResultDraft[];
}

export type ObjectiveDraft = SprintDraft | PiDraft | OkrTeamDraft | OkrCompanyDraft;

/* ---------------- Résultats d'évaluation ---------------- */

/** Statut d'un critère. Code couleur : good=vert, warn=ambre, bad=rouge. */
export type CriterionStatus = "good" | "warn" | "bad";

/** Identifiants stables des critères du tronc commun. Voir DOMAINE.md §1.1. */
export type CommonCriterionId =
  | "outcome"
  | "falsifiable"
  | "timeBounded"
  | "underInfluence"
  | "crediblyAmbitious";

/** Identifiants des règles spécifiques (élargis au fil des modules). */
export type SpecificCriterionId =
  | "general.composite" // pénalité commune — règle V1 stricte (pas de "et")
  | "sprint.single" // un seul but, alias historique
  | "sprint.calibration" // confiance > 70%
  | "pi.businessValue" // valeur business renseignée à l'export
  | "pi.calibration" // committed 80-100, stretch 30-60
  | "okr.objectiveQualitative" // Objective sans chiffre
  | "okr.keyResultCount" // 3 à 5 KR
  | "okr.keyResultQuality"; // chaque KR chiffré, outcome (pas projet)

export type CriterionId = CommonCriterionId | SpecificCriterionId;

/** Évaluation d'un critère unique. */
export interface CriterionScore {
  id: CriterionId;
  label: string;
  status: CriterionStatus;
  /** Message destiné à l'utilisateur, lisible, explicatif. Pas un message de log. */
  message: string;
  /** Pondération de ce critère dans le score global (0 à 1). */
  weight: number;
  /** Contribution effective au score global, après statut. */
  contribution: number;
}

/** Résultat d'évaluation pour un objectif. */
export interface EvaluationResult {
  /** Score 0 à 100. */
  score: number;
  /** Statut global déduit du score (good ≥80, warn 50-79, bad <50). */
  overallStatus: CriterionStatus;
  /** Résultats par critère, tronc commun + spécifiques. */
  criteria: CriterionScore[];
}
