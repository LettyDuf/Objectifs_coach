import { describe, it, expect } from "vitest";
import {
  answerOpensNext,
  evaluateStepAnswer,
  stepIsSolved,
  validateCase,
  type ChainStep,
  type ImpactChainCase,
} from "./impact-chain";

const STEP: ChainStep = {
  id: "s1",
  question: "Qu'est-ce qui doit bouger avant ?",
  options: [
    { id: "a", text: "Bonne", correct: true, explanation: "Oui." },
    { id: "b", text: "Output", correct: false, explanation: "Livraison." },
    { id: "c", text: "Lointain", correct: false, explanation: "Hors sprint." },
  ],
  flagFeedback: "Pas ici, la chaîne tient.",
  chainText: "Maillon",
  chainChip: "Constatable à la revue",
};

const FLAG_STEP: ChainStep = {
  ...STEP,
  id: "s2",
  flagIsCorrect: true,
  options: STEP.options.map((o) => ({ ...o, correct: false })),
  flagFeedback: "Exactement : rien n'est constatable.",
};

describe("evaluateStepAnswer", () => {
  it("valide la bonne carte d'une étape normale", () => {
    expect(evaluateStepAnswer(STEP, 0)).toEqual({ correct: true, feedback: "Oui." });
    expect(evaluateStepAnswer(STEP, 1).correct).toBe(false);
  });

  it("recadre le drapeau levé au mauvais moment", () => {
    const v = evaluateStepAnswer(STEP, "flag");
    expect(v.correct).toBe(false);
    expect(v.feedback).toContain("chaîne tient");
  });

  it("valide le drapeau sur une étape alerte, et aucune carte", () => {
    expect(evaluateStepAnswer(FLAG_STEP, "flag").correct).toBe(true);
    expect(evaluateStepAnswer(FLAG_STEP, 0).correct).toBe(false);
  });
});

describe("stepIsSolved", () => {
  it("ne franchit l'étape que sur la bonne réponse", () => {
    expect(stepIsSolved(STEP, null)).toBe(false);
    expect(stepIsSolved(STEP, 1)).toBe(false);
    expect(stepIsSolved(STEP, 0)).toBe(true);
    expect(stepIsSolved(FLAG_STEP, "flag")).toBe(true);
  });
});

describe("answerOpensNext", () => {
  it("ouvre après une carte (même fausse) sur une étape normale, jamais après le drapeau", () => {
    expect(answerOpensNext(STEP, null)).toBe(false);
    expect(answerOpensNext(STEP, 1)).toBe(true);
    expect(answerOpensNext(STEP, "flag")).toBe(false);
  });

  it("n'ouvre que sur le drapeau pour une étape alerte", () => {
    expect(answerOpensNext(FLAG_STEP, 0)).toBe(false);
    expect(answerOpensNext(FLAG_STEP, "flag")).toBe(true);
  });
});

describe("validateCase", () => {
  const base: ImpactChainCase = {
    id: "c1",
    kind: "chaine",
    title: "Test",
    team: "Équipe",
    objectiveLabel: "objectif du trimestre",
    quarterlyObjective: "Réduire X de 10 à 5 d'ici la fin du trimestre.",
    metrics: ["X : 10"],
    skepticQuestion: "Et à la revue ?",
    steps: [STEP],
    line: [
      { label: "Impact", detail: "d", verdict: "bad", feedback: "f" },
      { label: "Outcome", detail: "d", verdict: "good", feedback: "f" },
      { label: "Output", detail: "d", verdict: "warn", feedback: "f" },
    ],
    finalQcmQuestion: "Quel objectif ?",
    finalQcmOptions: [
      { id: "a", text: "Bon", correct: true, explanation: "e" },
      { id: "b", text: "Mauvais", correct: false, explanation: "e" },
    ],
    endRule: "Règle.",
  };

  it("accepte un cas chaîne bien formé", () => {
    expect(validateCase(base)).toEqual([]);
  });

  it("refuse un cas alerte avec une ligne ou sans étape drapeau", () => {
    const bad: ImpactChainCase = { ...base, kind: "alerte" };
    const issues = validateCase(bad);
    expect(issues.some((i) => i.includes("sans étape drapeau"))).toBe(true);
    expect(issues.some((i) => i.includes("ne doit pas avoir de ligne"))).toBe(true);
  });

  it("refuse deux verdicts good sur la ligne", () => {
    const bad = { ...base, line: base.line!.map((l) => ({ ...l, verdict: "good" as const })) };
    expect(validateCase(bad).some((i) => i.includes('verdict "good"'))).toBe(true);
  });
});
