/**
 * Critères spécifiques OKR équipe (DOMAINE.md §4.4).
 *
 * Encodés sous forme de **pénalités plafonnées** (voir DOMAINE.md §5) pour ne pas
 * créer de double pondération avec le tronc commun. Chaque critère renvoie un
 * `Penalty | null` à appliquer par le moteur.
 *
 * Trois règles :
 *   1. `objectiveQualitative` : l'Objective ne doit pas porter de chiffre.
 *   2. `keyResultCount` : 3 à 5 KR par Objective.
 *   3. `keyResultQuality` : chaque KR doit être chiffré et outcome (pas projet).
 *
 * Hors V1 (DOMAINE.md §4.4) : détection automatique des health metrics. Trop
 * sujette aux faux positifs, enseignée en fiche pédagogique uniquement.
 */

import type { ObjectiveDraft } from "../types";
import type { HeuristicsConfig } from "../ports";
import type { Penalty } from "./penalties";
import { hasNumericThreshold, startsWithOutputVerb } from "../heuristics";

function isOkr(draft: ObjectiveDraft): draft is Extract<
  ObjectiveDraft,
  { type: "okr-equipe" | "okr-entreprise" }
> {
  return draft.type === "okr-equipe" || draft.type === "okr-entreprise";
}

/**
 * Pénalité « Objective qualitatif » : un Objective qui porte un chiffre est mal
 * exprimé (le chiffre est l'affaire des KR). Pénalité fixe -20.
 */
export function objectiveQualitativePenalty(draft: ObjectiveDraft): Penalty | null {
  if (!isOkr(draft)) return null;
  if (!hasNumericThreshold(draft.text)) return null;
  return {
    amount: 20,
    score: {
      id: "okr.objectiveQualitative",
      label: "Objectif qualitatif",
      status: "bad",
      message:
        "L'Objectif contient un chiffre. Un Objectif est qualitatif et inspirant : les chiffres sont l'affaire des Résultats clés.",
      weight: 0,
      contribution: -20,
    },
  };
}

/**
 * Pénalité « Nombre de KR » : doit être entre 3 et 5. En dessous = trop maigre,
 * au-dessus = dilution. Pénalité -10 par KR manquant (jusqu'à 3) ou en trop.
 */
export function keyResultCountPenalty(draft: ObjectiveDraft): Penalty | null {
  if (!isOkr(draft)) return null;
  const n = draft.keyResults.length;
  if (n >= 3 && n <= 5) return null;
  let message: string;
  let amount: number;
  if (n < 3) {
    amount = Math.min(20, (3 - n) * 10);
    message =
      n === 0
        ? "Aucun Résultat clé. Un OKR a besoin de 3 à 5 KR pour matérialiser ce qu'on attend de l'Objectif."
        : `Seulement ${n} Résultat${n > 1 ? "s" : ""} clé${n > 1 ? "s" : ""}. Vise au moins 3 KR pour couvrir l'Objectif sans le réduire à une seule dimension.`;
  } else {
    amount = Math.min(20, (n - 5) * 10);
    message = `${n} Key Results : c'est trop. Au-delà de 5, l'attention se dilue. Resserre à 3-5 KR.`;
  }
  return {
    amount,
    score: {
      id: "okr.keyResultCount",
      label: "3 à 5 Key Results",
      status: "bad",
      message,
      weight: 0,
      contribution: -amount,
    },
  };
}

/**
 * Pénalité « Qualité des KR » : chaque KR doit (a) porter un chiffre, (b) ne pas
 * commencer par un verbe d'output (KR-projet). On compte le nombre de KR fautifs
 * et on pénalise proportionnellement (max -15).
 */
export function keyResultQualityPenalty(
  draft: ObjectiveDraft,
  config: HeuristicsConfig,
): Penalty | null {
  if (!isOkr(draft)) return null;
  if (draft.keyResults.length === 0) return null;
  const faulty: string[] = [];
  for (const kr of draft.keyResults) {
    const issues: string[] = [];
    if (!hasNumericThreshold(kr.text)) issues.push("pas de chiffre");
    const outputVerb = startsWithOutputVerb(kr.text, config.outputVerbs);
    if (outputVerb) issues.push(`commence par « ${outputVerb} » (KR-projet)`);
    if (issues.length > 0) {
      const preview = kr.text.length > 40 ? kr.text.slice(0, 40) + "…" : kr.text || "(vide)";
      faulty.push(`« ${preview} » — ${issues.join(", ")}`);
    }
  }
  if (faulty.length === 0) return null;
  // Un seul KR fautif suffit à faire descendre l'OKR sous 80 : la qualité d'un KR
  // est un signal fort, pas une finition. Plafond -45 pour ne pas effacer le tronc commun.
  const amount = Math.min(45, faulty.length * 25);
  return {
    amount,
    score: {
      id: "okr.keyResultQuality",
      label: "Key Results outcome et chiffrés",
      status: "bad",
      message: `${faulty.length} Résultat${faulty.length > 1 ? "s" : ""} clé${faulty.length > 1 ? "s" : ""} à reformuler : ${faulty.join(" ; ")}.`,
      weight: 0,
      contribution: -amount,
    },
  };
}
