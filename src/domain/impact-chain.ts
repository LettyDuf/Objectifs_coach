/**
 * Exercice « Du trimestre au sprint » (La descente) — domaine pur.
 *
 * D61 : on part d'un objectif trimestriel et on descend la chaîne d'impact
 * maillon par maillon jusqu'à la mesure constatable à la revue de sprint.
 * Mécanique validée sur MVP jouable (2026-07-08) : sceptique, étapes de choix,
 * ligne de la revue de sprint, QCM final, drapeau (signal d'alerte quand
 * aucun maillon ne tient : c'est l'objectif trimestriel qui est flou).
 *
 * Aucune dépendance UI. Le contenu vit dans src/content/impact-chain/.
 */

/** Une carte proposée à une étape de la descente (ou au QCM final). */
export interface ChainOption {
  id: string;
  text: string;
  correct: boolean;
  /** Le pourquoi, en langage simple, affiché après le choix. */
  explanation: string;
}

/** Une étape de la descente : « qu'est-ce qui doit bouger avant ? » */
export interface ChainStep {
  id: string;
  question: string;
  /** 3 cartes. Exactement une correcte, sauf si `flagIsCorrect`. */
  options: ChainOption[];
  /** Cas alerte : aucune carte ne tient, le drapeau est la bonne réponse. */
  flagIsCorrect?: boolean;
  /** Feedback du drapeau (bonne pioche si `flagIsCorrect`, sinon recadrage doux). */
  flagFeedback: string;
  /** Texte du maillon accroché à la chaîne quand l'étape est résolue. */
  chainText: string;
  /** Libellé du niveau affiché sur le maillon (ex. « Constatable à la revue »). */
  chainChip: string;
}

/** Un choix de la ligne de la revue : « le maillon le plus haut montrable ». */
export interface LineChoice {
  label: string;
  detail: string;
  verdict: "good" | "warn" | "bad";
  feedback: string;
}

/** Un cas complet de l'exercice. */
export interface ImpactChainCase {
  id: string;
  /** "chaine" : descente complète. "alerte" : le drapeau est la bonne réponse. */
  kind: "chaine" | "alerte";
  title: string;
  team: string;
  /** Ex. « objectif du trimestre (OKR) », « annoncé par le sponsor ». */
  objectiveLabel: string;
  quarterlyObjective: string;
  metrics: string[];
  skepticQuestion: string;
  steps: ChainStep[];
  /** Absent pour un cas alerte. Exactement un verdict "good" sinon. */
  line?: LineChoice[];
  finalQcmQuestion: string;
  finalQcmOptions: ChainOption[];
  endRule: string;
}

/** Réponse possible à une étape : l'index d'une carte, ou le drapeau. */
export type StepAnswer = number | "flag";

export interface StepVerdict {
  correct: boolean;
  feedback: string;
}

/** Évalue une réponse d'étape. Logique pure, testable seule. */
export function evaluateStepAnswer(step: ChainStep, answer: StepAnswer): StepVerdict {
  if (answer === "flag") {
    return { correct: step.flagIsCorrect === true, feedback: step.flagFeedback };
  }
  const opt = step.options[answer];
  if (!opt) return { correct: false, feedback: "" };
  return { correct: opt.correct && step.flagIsCorrect !== true, feedback: opt.explanation };
}

/**
 * Une étape est franchie quand la bonne réponse a été trouvée : la bonne carte
 * pour une étape normale, le drapeau pour une étape alerte. (On laisse
 * l'utilisateur explorer les autres réponses : elles n'ouvrent pas la suite.)
 */
export function stepIsSolved(step: ChainStep, answer: StepAnswer | null): boolean {
  if (answer === null) return false;
  return evaluateStepAnswer(step, answer).correct;
}

/**
 * La réponse ouvre-t-elle la suite ? Mécanique validée sur MVP (2026-07-08) :
 * sur une étape normale, n'importe quelle carte ouvre la suite (le feedback a
 * été lu, le bon maillon s'accroche) mais le drapeau ne suffit pas ; sur une
 * étape alerte, seul le drapeau ouvre la suite.
 */
export function answerOpensNext(step: ChainStep, answer: StepAnswer | null): boolean {
  if (answer === null) return false;
  if (step.flagIsCorrect) return answer === "flag";
  return answer !== "flag";
}

/** Vérifie l'intégrité d'un cas (utilisé par les tests de corpus). */
export function validateCase(c: ImpactChainCase): string[] {
  const issues: string[] = [];
  if (c.steps.length === 0) issues.push(`${c.id} : aucune étape`);
  for (const s of c.steps) {
    if (s.options.length !== 3) issues.push(`${s.id} : ${s.options.length} options (3 attendues)`);
    const correct = s.options.filter((o) => o.correct).length;
    if (s.flagIsCorrect) {
      if (correct !== 0) issues.push(`${s.id} : étape alerte avec ${correct} carte(s) correcte(s)`);
    } else if (correct !== 1) {
      issues.push(`${s.id} : ${correct} cartes correctes (1 attendue)`);
    }
    if (!s.flagFeedback) issues.push(`${s.id} : drapeau sans feedback`);
  }
  if (c.kind === "alerte") {
    if (!c.steps.some((s) => s.flagIsCorrect)) issues.push(`${c.id} : cas alerte sans étape drapeau`);
    if (c.line) issues.push(`${c.id} : un cas alerte ne doit pas avoir de ligne`);
  } else {
    if (!c.line) issues.push(`${c.id} : ligne de la revue manquante`);
    else if (c.line.filter((l) => l.verdict === "good").length !== 1)
      issues.push(`${c.id} : la ligne doit avoir exactement un verdict "good"`);
    if (c.steps.some((s) => s.flagIsCorrect)) issues.push(`${c.id} : étape drapeau dans un cas non alerte`);
  }
  const qcmCorrect = c.finalQcmOptions.filter((o) => o.correct).length;
  if (qcmCorrect !== 1) issues.push(`${c.id} : QCM final avec ${qcmCorrect} bonnes réponses`);
  return issues;
}
