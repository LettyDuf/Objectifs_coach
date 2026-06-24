/**
 * Logique pure du mode Défi — gestion de la queue d'exemples à corriger.
 *
 * Séparée de l'UI pour être testable seule. Pas d'import React ici.
 */

import type { AnnotatedExample } from "../domain/ports";

/** Score minimum pour considérer la réécriture comme validée. */
export const CHALLENGE_PASS_SCORE = 80;

/** Construit la liste des défis disponibles à partir des exemples. */
export function buildChallengeQueue(examples: AnnotatedExample[]): AnnotatedExample[] {
  return examples.filter((e) => e.verdict === "bad");
}

/** Vérifie si un score atteint le seuil de passage. */
export function canAdvance(score: number): boolean {
  return score >= CHALLENGE_PASS_SCORE;
}

/** Retourne l'index suivant, ou null si on a fini. */
export function nextIndex(currentIndex: number, queueLength: number): number | null {
  const next = currentIndex + 1;
  return next < queueLength ? next : null;
}
