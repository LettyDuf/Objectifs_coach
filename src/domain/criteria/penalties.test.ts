/**
 * Tests de la pénalité composite (DOMAINE.md §1.2 : un objectif = un résultat).
 */

import { describe, it, expect } from "vitest";
import { compositePenalty } from "./penalties";
import type { SprintDraft } from "../types";

function sprintDraft(text: string): SprintDraft {
  return {
    type: "sprint",
    text,
    audience: "dev",
    confidence: 75,
    hasExplicitDeadline: true,
    isUnderTeamInfluence: true,
  };
}

describe("compositePenalty", () => {
  it("pénalise un objectif coordonnant deux résultats", () => {
    const p = compositePenalty(
      sprintDraft("Améliorer la performance et finir la migration d'ici fin du sprint"),
    );
    expect(p).not.toBeNull();
    expect(p?.amount).toBe(20);
    expect(p?.score.status).toBe("bad");
    expect(p?.score.contribution).toBe(-20);
  });

  it("ne pénalise pas un objectif simple sans 'et' coordonnant", () => {
    const p = compositePenalty(sprintDraft("Réduire de 50% le taux d'abandon"));
    expect(p).toBeNull();
  });

  it("ne pénalise pas un objectif sans 'et' tout court", () => {
    const p = compositePenalty(sprintDraft("Diviser par deux le temps de chargement"));
    expect(p).toBeNull();
  });
});
