/**
 * Test d'intégrité du corpus Défi (ChallengeQuiz) OKR entreprise.
 *
 * Garde-fou structurel : 12 cas, 4 options chacun, exactement 1 "good" par
 * cas, aucun champ texte vide. Ne vérifie pas l'équilibrage des positions
 * (l'UI mélange l'ordre des options à chaque partie, cf. `shuffleCases` dans
 * ChallengeQuiz.tsx — la position dans le fichier source n'a pas d'incidence
 * sur l'expérience utilisateur).
 */

import { describe, it, expect } from "vitest";
import { OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR } from "./okr-entreprise.manager.fr";

describe("Corpus Défi OKR entreprise", () => {
  const cases = OKR_ENTREPRISE_MANAGER_CHALLENGE_QUIZ_FR;

  it("a 12 cas", () => {
    expect(cases.length).toBe(12);
  });

  it("chaque cas a type okr-entreprise et audience manager", () => {
    for (const c of cases) {
      expect(c.type, c.id).toBe("okr-entreprise");
      expect(c.audience, c.id).toBe("manager");
    }
  });

  it("chaque cas a 4 options avec exactement 1 bonne réponse", () => {
    for (const c of cases) {
      expect(c.options.length, c.id).toBe(4);
      expect(c.options.filter((o) => o.verdict === "good").length, c.id).toBe(1);
    }
  });

  it("IDs de cas uniques", () => {
    const ids = cases.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("aucun champ texte vide (proposedObjective, objectiveContext, explanations)", () => {
    for (const c of cases) {
      expect(c.proposedObjective, `${c.id}: proposedObjective`).not.toBe("");
      if (c.objectiveContext !== undefined) {
        expect(c.objectiveContext, `${c.id}: objectiveContext`).not.toBe("");
      }
      for (const o of c.options) {
        expect(o.text, `${c.id}/${o.id}: text`).not.toBe("");
        expect(o.explanation, `${c.id}/${o.id}: explanation`).not.toBe("");
      }
    }
  });
});
