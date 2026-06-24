/**
 * Mode Défi en QCM — un cas, 4 propositions de reformulation, l'utilisateur choisit.
 *
 * Pédagogie : enseigne la grammaire d'un bon objectif (outcome + indicateur + chiffre
 * + échéance). Les chiffres dans les propositions sont des **exemples illustratifs**,
 * pas des vérités absolues — c'est la STRUCTURE qu'on juge, pas la pertinence des
 * valeurs (qui relève du PO).
 */

import type { Audience, ObjectiveType } from "./types";

/** Verdict pédagogique d'une option. Détermine la couleur et le ton du feedback. */
export type QuizVerdict = "good" | "partial" | "bad";

export interface ChallengeQuizOption {
  /** Identifiant local (A, B, C, D). */
  id: string;
  /** La reformulation présentée. */
  text: string;
  /** Verdict de l'option. */
  verdict: QuizVerdict;
  /** Explication courte affichée après la révélation (1-2 phrases). */
  explanation: string;
}

/** Métrique d'usage présentée dans la carte (sans cible imposée). */
export interface ContextMetric {
  label: string;
  value: string;
}

export interface ChallengeQuizCase {
  /** Identifiant stable. */
  id: string;
  type: ObjectiveType;
  audience: Audience;
  /** Nom court de l'équipe (ex. « Équipe Mobile »). */
  teamLabel: string;
  /** Pictogramme. */
  iconName?: string;
  /** Contexte narratif court et neutre (équipe + produit + situation). */
  context: string;
  /** Métriques d'usage actuelles, sans cible imposée. */
  metrics?: ContextMetric[];
  /**
   * Pour les cas OKR : l'Objective déjà posé par l'équipe (qualitatif, acceptable).
   * Quand renseigné, l'UI affiche d'abord « Objective de l'équipe : … » puis
   * « L'équipe propose ce Key Result : … » (le `proposedObjective` devient un KR).
   * Quand absent (Sprint, PI) : l'UI affiche directement « L'équipe propose cet
   * objectif : … ».
   */
  objectiveContext?: string;
  /** L'objectif (Sprint/PI) ou Key Result (OKR) tel que proposé par l'équipe — mauvais. */
  proposedObjective: string;
  /** 4 propositions de reformulation à juger. */
  options: ChallengeQuizOption[];
}
