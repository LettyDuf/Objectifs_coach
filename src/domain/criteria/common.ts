/**
 * Critères du tronc commun — applicables aux trois types d'objectifs.
 *
 * Chaque critère expose une fonction `evaluate` qui prend le draft et la configuration
 * heuristique, et renvoie un statut + un message + une pondération. Pas d'effet de bord,
 * pas de dépendance externe. Tout est testable seul.
 *
 * Voir DOMAINE.md §1 et §5 pour les définitions et pondérations validées.
 */

import type {
  CommonCriterionId,
  Confidence,
  CriterionScore,
  CriterionStatus,
  ObjectiveDraft,
} from "../types";
// `Confidence` is re-used via the third parameter of `evaluateCrediblyAmbitious`.
import type { HeuristicsConfig } from "../ports";
import { findFuzzyWords, hasNumericThreshold, startsWithOutputVerb } from "../heuristics";

/** Pondérations validées (DOMAINE.md §5). Doivent sommer à 1. */
export const COMMON_WEIGHTS: Record<CommonCriterionId, number> = {
  outcome: 0.3,
  falsifiable: 0.25,
  timeBounded: 0.15,
  underInfluence: 0.15,
  crediblyAmbitious: 0.15,
};

/** Calibrage d'ambition par type/classe (D10 DECISIONS.md). */
export interface ConfidenceRange {
  min: Confidence;
  max: Confidence;
}

/** Convertit un statut en multiplicateur de score (0, 0.5, 1). */
function statusMultiplier(status: CriterionStatus): number {
  switch (status) {
    case "good":
      return 1;
    case "warn":
      return 0.5;
    case "bad":
      return 0;
  }
}

/** Construit un CriterionScore en calculant la contribution. */
function makeScore(
  id: CommonCriterionId,
  label: string,
  status: CriterionStatus,
  message: string,
): CriterionScore {
  const weight = COMMON_WEIGHTS[id];
  return {
    id,
    label,
    status,
    message,
    weight,
    contribution: weight * 100 * statusMultiplier(status),
  };
}

/* ---------------- Critère 1 : Outcome (pas output) ---------------- */

export function evaluateOutcome(draft: ObjectiveDraft, config: HeuristicsConfig): CriterionScore {
  const verb = startsWithOutputVerb(draft.text, config.outputVerbs);
  if (verb) {
    return makeScore(
      "outcome",
      "Outcome (pas output)",
      "bad",
      `Ton objectif commence par « ${verb} » : c'est une livraison, pas un résultat. Reformule en décrivant ce qui aura changé.`,
    );
  }
  return makeScore(
    "outcome",
    "Outcome (pas output)",
    "good",
    "L'objectif décrit un résultat, pas une livraison.",
  );
}

/* ---------------- Critère 2 : Falsifiable ---------------- */

export function evaluateFalsifiable(
  draft: ObjectiveDraft,
  config: HeuristicsConfig,
): CriterionScore {
  // OKR : l'Objective est qualitatif par doctrine (pas de chiffre). La falsifiabilité
  // s'apprécie sur la présence de chiffres dans **les KR**. Les mots flous restent
  // évalués sur le texte de l'Objective.
  const isOkr = draft.type === "okr-equipe" || draft.type === "okr-entreprise";
  const hasNumber = isOkr
    ? "keyResults" in draft && draft.keyResults.some((kr) => hasNumericThreshold(kr.text))
    : hasNumericThreshold(draft.text);
  const fuzzy = findFuzzyWords(draft.text, config.fuzzyWords);
  if (hasNumber && fuzzy.length === 0) {
    return makeScore(
      "falsifiable",
      "Falsifiable",
      "good",
      "Présence d'un seuil chiffré, aucun mot flou : on saura sans ambiguïté si l'objectif est atteint.",
    );
  }
  if (hasNumber && fuzzy.length > 0) {
    return makeScore(
      "falsifiable",
      "Falsifiable",
      "warn",
      `Un seuil est présent, mais le texte contient un mot flou (${fuzzy.join(", ")}). Précise ce que ce mot recouvre.`,
    );
  }
  if (!hasNumber && fuzzy.length === 0) {
    return makeScore(
      "falsifiable",
      "Falsifiable",
      "warn",
      "Aucun seuil chiffré. Comment saura-t-on objectivement que l'objectif est atteint ?",
    );
  }
  return makeScore(
    "falsifiable",
    "Falsifiable",
    "bad",
    `Aucun seuil chiffré et présence de mot(s) flou(s) : ${fuzzy.join(", ")}. L'objectif n'est pas mesurable en l'état.`,
  );
}

/* ---------------- Critère 3 : Borné dans le temps ---------------- */

/** Détecte une borne temporelle dans le texte (sprint N, PI N, fin de…, date, trimestre). */
function textMentionsDeadline(text: string): boolean {
  const t = text.toLowerCase();
  if (/\bsprint\s+\d+/.test(t)) return true;
  if (/\bpi\s+\d+/.test(t)) return true;
  if (/\btrimestre\b/.test(t)) return true;
  if (/\bfin\s+(de|du|d')\s+/.test(t)) return true;
  if (/\bd['’]ici\b/.test(t)) return true;
  if (/\b(avant|d['’]ici)\s+(la|le|fin)\b/.test(t)) return true;
  if (/\b20\d{2}\b/.test(t)) return true; // année
  return false;
}

export function evaluateTimeBounded(draft: ObjectiveDraft): CriterionScore {
  if (draft.hasExplicitDeadline || textMentionsDeadline(draft.text)) {
    return makeScore(
      "timeBounded",
      "Borné dans le temps",
      "good",
      "Une échéance est précisée.",
    );
  }
  return makeScore(
    "timeBounded",
    "Borné dans le temps",
    "bad",
    "Aucune échéance détectée. D'ici quand l'objectif doit-il être atteint ?",
  );
}

/* ---------------- Critère 4 : Sous influence de l'équipe ---------------- */

export function evaluateUnderInfluence(draft: ObjectiveDraft): CriterionScore {
  if (draft.isUnderTeamInfluence) {
    return makeScore(
      "underInfluence",
      "Sous influence de l'équipe",
      "good",
      "L'équipe se reconnaît comme capable de faire bouger l'aiguille.",
    );
  }
  return makeScore(
    "underInfluence",
    "Sous influence de l'équipe",
    "bad",
    "L'équipe n'a pas confirmé pouvoir agir sur ce résultat. Sans pouvoir d'action, l'objectif devient un vœu.",
  );
}

/* ---------------- Critère 5 : Ambition crédible ---------------- */

export function evaluateCrediblyAmbitious(
  draft: ObjectiveDraft,
  range: ConfidenceRange,
  overrideConfidence?: Confidence | undefined,
): CriterionScore {
  // OKR : la confiance pertinente est celle des KR, pas du draft.
  // L'override permet à `engine.ts` de passer une confiance agrégée sans toucher
  // au draft (cohérence avec le principe de critères stateless).
  const c = overrideConfidence ?? draft.confidence;
  if (c === undefined || c === null) {
    return makeScore(
      "crediblyAmbitious",
      "Ambition crédible",
      "warn",
      `Indique la confiance estimée de l'équipe (fourchette attendue pour ce type : ${range.min}–${range.max} %).`,
    );
  }
  if (c >= range.min && c <= range.max) {
    return makeScore(
      "crediblyAmbitious",
      "Ambition crédible",
      "good",
      `Confiance ${c} % — dans la fourchette attendue (${range.min}–${range.max} %).`,
    );
  }
  if (c > range.max) {
    return makeScore(
      "crediblyAmbitious",
      "Ambition crédible",
      "bad",
      `Confiance ${c} % — trop élevée. Au-dessus de ${range.max} %, l'objectif est trop facile pour ce type.`,
    );
  }
  return makeScore(
    "crediblyAmbitious",
    "Ambition crédible",
    "bad",
    `Confiance ${c} % — trop basse. En dessous de ${range.min} %, l'objectif est un pari plus qu'un cap.`,
  );
}
