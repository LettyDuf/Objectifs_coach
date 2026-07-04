/**
 * Encart « squelette d'un objectif » (D31).
 *
 * Affiché en tête de l'onglet Pratique du ModeSelector pour transmettre,
 * avant la pratique, la notion fondamentale : un bon objectif est composé
 * de 5 briques nommées. Pas d'exemple ni de phrase ici (volontairement
 * dépouillé). Le lien renvoie vers la fiche théorique fondamentale.
 *
 * Les couleurs sont volontairement identiques à celles utilisées dans
 * SheetCard / BricksDisplay (cohérence transverse). Les libellés sont les
 * mêmes pour les 3 types d'objectif : Sprint, PI, OKR équipe partagent la
 * même grammaire à 5 briques (cf. DOMAINE.md §1).
 */

import type { ObjectiveType } from "../../domain/types";

export interface SkeletonBrick {
  /** Libellé visible. */
  label: string;
  /** Nom du token couleur (debug + classes CSS facultatives). */
  color: "purple" | "teal" | "pink" | "amber" | "blue";
  /** Hex pour la bordure outline (palette validée). */
  borderColor: string;
  /** Hex pour le texte sombre lisible (stop 900 de la même rampe). */
  textColor: string;
}

export const SKELETON_BRICKS_FR: SkeletonBrick[] = [
  { label: "Verbe outcome", color: "purple", borderColor: "#7F77DD", textColor: "#26215C" },
  { label: "Indicateur", color: "teal", borderColor: "#1D9E75", textColor: "#04342C" },
  { label: "Variation chiffrée", color: "pink", borderColor: "#D4537E", textColor: "#4B1528" },
  { label: "Contexte", color: "amber", borderColor: "#BA7517", textColor: "#412402" },
  { label: "Échéance", color: "blue", borderColor: "#378ADD", textColor: "#042C53" },
];

/**
 * Mapping type d'objectif → id du thème théorique fondamental cible du lien.
 * Identifié dans `src/content/themes.fr.ts` (thèmes « Les fondamentaux »).
 */
export const SKELETON_THEME_TARGET: Record<ObjectiveType, string> = {
  sprint: "sprint.fondamentaux",
  pi: "pi.fondamentaux",
  "okr-equipe": "okr.fondamentaux",
  // OKR entreprise n'est pas encore routable (D20, "à venir") : cible de repli
  // vers le thème équipe le temps que le module entreprise existe. Corrige un
  // build cassé depuis l'ajout du 4e ObjectiveType (aucun contenu ajouté ici).
  "okr-entreprise": "okr.fondamentaux",
};
