/**
 * Cœur de moteur — orchestre l'évaluation d'un objectif.
 *
 * Responsabilités :
 *   - Sélectionne le calibrage d'ambition en fonction du type/classe (D10).
 *   - Évalue chaque critère du tronc commun.
 *   - Applique les pénalités spécifiques.
 *   - Calcule le score final et le statut global.
 *
 * Ce fichier n'importe rien d'externe au domaine. Pas de React, pas de Vite.
 */

import type { CoachUseCase, HeuristicsConfig } from "./ports";
import type {
  CriterionScore,
  CriterionStatus,
  EvaluationResult,
  ObjectiveDraft,
  PiClass,
  ObjectiveType,
} from "./types";
import {
  ConfidenceRange,
  evaluateCrediblyAmbitious,
  evaluateFalsifiable,
  evaluateOutcome,
  evaluateTimeBounded,
  evaluateUnderInfluence,
} from "./criteria/common";
import { compositePenalty } from "./criteria/penalties";
import {
  objectiveQualitativePenalty,
  keyResultCountPenalty,
  keyResultQualityPenalty,
} from "./criteria/okr";

/**
 * Calibrage d'ambition par (type, classe). Voir DOMAINE.md §2/3/4 et D10.
 * Pour OKR équipe, la fourchette s'applique à la confiance moyenne des KR
 * (pas à `draft.confidence`, qui n'a pas de sens pour un Objective).
 */
export const CONFIDENCE_RANGES: {
  sprint: ConfidenceRange;
  pi: Record<PiClass, ConfidenceRange>;
  "okr-equipe": ConfidenceRange;
  "okr-entreprise": ConfidenceRange;
} = {
  sprint: { min: 70, max: 100 },
  pi: {
    committed: { min: 80, max: 100 },
    stretch: { min: 30, max: 60 },
  },
  "okr-equipe": { min: 50, max: 70 },
  "okr-entreprise": { min: 50, max: 70 },
};

function rangeFor(draft: ObjectiveDraft): ConfidenceRange {
  switch (draft.type) {
    case "sprint":
      return CONFIDENCE_RANGES.sprint;
    case "pi":
      return CONFIDENCE_RANGES.pi[draft.piClass];
    case "okr-equipe":
      return CONFIDENCE_RANGES["okr-equipe"];
    case "okr-entreprise":
      return CONFIDENCE_RANGES["okr-entreprise"];
  }
}

/**
 * Pour un OKR, la confiance pertinente est la moyenne des KR (l'O n'a pas de
 * confiance propre). On la calcule ici pour la passer au critère tronc commun
 * `crediblyAmbitious` sans modifier sa signature.
 */
function meanKeyResultConfidence(draft: ObjectiveDraft): number | undefined {
  if (draft.type !== "okr-equipe" && draft.type !== "okr-entreprise") return undefined;
  const declared = draft.keyResults
    .map((kr) => kr.confidence)
    .filter((c): c is number => typeof c === "number");
  if (declared.length === 0) return undefined;
  const sum = declared.reduce((a, b) => a + b, 0);
  return Math.round(sum / declared.length);
}

function overallStatus(score: number): CriterionStatus {
  if (score >= 80) return "good";
  if (score >= 50) return "warn";
  return "bad";
}

/** Construction du moteur — injection du repository de contenu (port de sortie). */
export function createCoachEngine(getConfig: () => HeuristicsConfig): CoachUseCase {
  return {
    evaluate(draft: ObjectiveDraft): EvaluationResult {
      const config = getConfig();
      // Pour OKR, la confiance pertinente est la moyenne des KR (pas `draft.confidence`).
      const overrideConfidence = meanKeyResultConfidence(draft);
      const criteria: CriterionScore[] = [
        evaluateOutcome(draft, config),
        evaluateFalsifiable(draft, config),
        evaluateTimeBounded(draft),
        evaluateUnderInfluence(draft),
        evaluateCrediblyAmbitious(draft, rangeFor(draft), overrideConfidence),
      ];

      const baseScore = criteria.reduce((sum, c) => sum + c.contribution, 0);

      // Pénalités V1 : composite (tous types) + 3 règles spécifiques OKR.
      const penalties = [
        compositePenalty(draft),
        objectiveQualitativePenalty(draft),
        keyResultCountPenalty(draft),
        keyResultQualityPenalty(draft, config),
      ].filter((p): p is NonNullable<typeof p> => p !== null);

      for (const p of penalties) criteria.push(p.score);
      const totalPenalty = penalties.reduce((sum, p) => sum + p.amount, 0);

      const rawScore = baseScore - totalPenalty;
      const score = Math.max(0, Math.min(100, Math.round(rawScore)));

      return {
        score,
        overallStatus: overallStatus(score),
        criteria,
      };
    },
  };
}

/** Helper exporté pour les tests et l'UI : statut global à partir du score. */
export { overallStatus };
export type { ObjectiveType };
