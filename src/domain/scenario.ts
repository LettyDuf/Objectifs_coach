/**
 * Types des cartes contexte scénarisées.
 *
 * Une carte contexte pose un cadre (équipe, situation, contraintes) et présente un
 * mauvais objectif proposé par l'équipe. L'utilisateur doit reformuler en respectant
 * le contexte. Source : Mockup A validé par Lætitia (2026-06-21).
 */

import type { Audience, ObjectiveType } from "./types";

export interface ScenarioCard {
  id: string;
  type: ObjectiveType;
  audience: Audience;
  /** Nom de l'équipe + indication courte de contexte (« Équipe Checkout · SaaS B2B »). */
  teamLabel: string;
  /** Pictogramme à afficher (cf. IconName). */
  iconName?: string;
  /** Description de la situation (2-3 phrases : taille équipe, contexte, contraintes). */
  situation: string;
  /** L'objectif proposé par l'équipe (un mauvais objectif à reformuler). */
  proposedObjective: string;
  /** Court commentaire pédagogique sur ce qui cloche dans la proposition. */
  rationale: string;
  /** Indice optionnel : type de bénéficiaire attendu (« utilisateurs », « support »…). */
  expectedBeneficiary?: string;
}
