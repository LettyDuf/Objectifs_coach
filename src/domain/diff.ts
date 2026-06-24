/**
 * Diff entre deux évaluations successives.
 *
 * Logique pure, testable seule. Compare critère par critère le statut et la
 * contribution, produit une liste de deltas que l'UI affichera (icônes ↑↓=).
 */

import type { CriterionScore, CriterionStatus, EvaluationResult } from "./types";

export type DeltaDirection = "up" | "down" | "same";

export interface CriterionDelta {
  id: CriterionScore["id"];
  label: string;
  prevStatus: CriterionStatus | "absent";
  currStatus: CriterionStatus | "absent";
  prevContribution: number;
  currContribution: number;
  delta: number;
  direction: DeltaDirection;
  /** Message courant (du nouveau critère) pour expliquer où on en est. */
  message: string;
}

export interface EvaluationDiff {
  scoreDelta: number;
  scoreDirection: DeltaDirection;
  criteriaDeltas: CriterionDelta[];
}

function directionOf(delta: number): DeltaDirection {
  if (delta > 0.5) return "up";
  if (delta < -0.5) return "down";
  return "same";
}

/**
 * Calcule le diff entre une évaluation précédente et l'actuelle.
 * Si un critère apparaît dans l'une mais pas l'autre, on traite « absent » comme 0.
 */
export function diffEvaluations(
  prev: EvaluationResult,
  curr: EvaluationResult,
): EvaluationDiff {
  const prevById = new Map<string, CriterionScore>();
  for (const c of prev.criteria) prevById.set(c.id, c);

  const seenIds = new Set<string>();
  const criteriaDeltas: CriterionDelta[] = [];

  for (const c of curr.criteria) {
    seenIds.add(c.id);
    const p = prevById.get(c.id);
    const prevContribution = p?.contribution ?? 0;
    const delta = c.contribution - prevContribution;
    criteriaDeltas.push({
      id: c.id,
      label: c.label,
      prevStatus: p?.status ?? "absent",
      currStatus: c.status,
      prevContribution,
      currContribution: c.contribution,
      delta: Math.round(delta * 10) / 10,
      direction: directionOf(delta),
      message: c.message,
    });
  }

  // Critères qui étaient présents avant et qui ont disparu (cas rare, ex. pénalité levée).
  for (const c of prev.criteria) {
    if (!seenIds.has(c.id)) {
      criteriaDeltas.push({
        id: c.id,
        label: c.label,
        prevStatus: c.status,
        currStatus: "absent",
        prevContribution: c.contribution,
        currContribution: 0,
        delta: Math.round(-c.contribution * 10) / 10,
        direction: directionOf(-c.contribution),
        message: c.message,
      });
    }
  }

  const scoreDelta = curr.score - prev.score;
  return {
    scoreDelta,
    scoreDirection: directionOf(scoreDelta),
    criteriaDeltas,
  };
}
