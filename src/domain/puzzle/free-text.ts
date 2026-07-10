/**
 * Évaluation honnête d'un verbe saisi en carte libre (Composer, D26).
 *
 * Le Composer ne note jamais le texte libre. Seule aide fournie : si le verbe
 * saisi figure dans les listes d'heuristiques connues (verbes de travail,
 * mots flous), on le signale doucement, comme une carte à risque. Sinon,
 * l'outil dit qu'il ne connaît pas ce verbe et renvoie le débat à l'équipe.
 *
 * Logique pure : la config d'heuristiques est injectée (port), aucune
 * dépendance au contenu ni à React.
 */

import type { HeuristicsConfig } from "../ports";

export type FreeVerbAssessment = "output-verb" | "fuzzy-word" | "unknown";

/** Normalise pour comparaison : minuscules, espaces compactés. */
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Évalue un verbe saisi librement contre les listes d'heuristiques.
 * Retourne "output-verb" si le verbe (ou son début) figure dans la liste des
 * verbes de travail, "fuzzy-word" s'il contient un mot flou connu, "unknown"
 * sinon.
 */
export function assessFreeVerb(
  input: string,
  config: HeuristicsConfig,
): FreeVerbAssessment {
  const text = normalize(input);
  if (text.length === 0) return "unknown";
  for (const verb of config.outputVerbs) {
    const v = normalize(verb);
    if (text === v || text.startsWith(v + " ")) return "output-verb";
  }
  for (const word of config.fuzzyWords) {
    const w = normalize(word);
    if (text === w || text.includes(" " + w) || text.startsWith(w + " ")) {
      return "fuzzy-word";
    }
  }
  return "unknown";
}
