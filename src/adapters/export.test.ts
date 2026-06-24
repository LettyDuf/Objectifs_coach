import { describe, it, expect } from "vitest";
import { toJson, toMarkdown } from "./export";
import { buildCoach } from "../composition";
import type { ObjectiveDraft } from "../domain/types";

const coach = buildCoach();

const sprintGood: ObjectiveDraft = {
  type: "sprint",
  text: "Réduire de 50 % le taux d'abandon au paiement d'ici fin de sprint 24.",
  audience: "dev",
  confidence: 80,
  hasExplicitDeadline: true,
  isUnderTeamInfluence: true,
};

describe("toMarkdown", () => {
  it("inclut le titre, le texte, le score et un critère au moins", () => {
    const result = coach.evaluate(sprintGood);
    const md = toMarkdown(sprintGood, result);
    expect(md).toContain("# Objectif Sprint");
    expect(md).toContain(sprintGood.text);
    expect(md).toMatch(/Score\s*:\s*\d+\s*\/\s*100/);
    expect(md).toContain("## Diagnostic par critère");
  });

  it("inclut la confiance quand elle est renseignée", () => {
    const result = coach.evaluate(sprintGood);
    const md = toMarkdown(sprintGood, result);
    expect(md).toContain("Confiance estimée : 80 %");
  });
});

describe("toJson", () => {
  it("produit un JSON parseable avec version, draft et evaluation", () => {
    const result = coach.evaluate(sprintGood);
    const json = toJson(sprintGood, result);
    const parsed = JSON.parse(json);
    expect(parsed.version).toBe(1);
    expect(parsed.draft.text).toBe(sprintGood.text);
    expect(parsed.evaluation.score).toBe(result.score);
    expect(Array.isArray(parsed.evaluation.criteria)).toBe(true);
  });
});
