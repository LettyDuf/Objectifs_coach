/**
 * Pénalités — règles binaires qui retranchent du score global sans entrer dans la
 * pondération principale. Voir DOMAINE.md §5 : "pas de double pondération entre tronc
 * commun et règle spécifique".
 *
 * V1 : seule la pénalité "composite" est active. Les pénalités spécifiques par type
 * (OKR nombre de KR, etc.) seront branchées dans leurs modules respectifs.
 */

import type { CriterionScore, ObjectiveDraft } from "../types";
import { looksComposite } from "../heuristics";

/** Pénalité plafonnée. Une pénalité produit un CriterionScore négatif (contribution < 0). */
export interface Penalty {
  score: CriterionScore;
  amount: number; // points retranchés du score final
}

/** Pénalité composite : tout "et" coordonnant deux résultats — règle V1 stricte (DOMAINE.md §1.2). */
export function compositePenalty(draft: ObjectiveDraft): Penalty | null {
  if (!looksComposite(draft.text)) return null;
  return {
    amount: 20,
    score: {
      id: "general.composite",
      label: "Objectif unique",
      status: "bad",
      message:
        "Le texte contient « et » : il y a probablement deux objectifs ici. Un objectif = un résultat. Sépare-les en deux.",
      weight: 0,
      contribution: -20,
    },
  };
}
