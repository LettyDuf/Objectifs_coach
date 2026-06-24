/**
 * Tests des critères spécifiques OKR équipe (DOMAINE.md §4.4).
 * Couvre les 3 règles : Objective qualitatif, nombre de KR, qualité des KR.
 */

import { describe, it, expect } from "vitest";
import {
  objectiveQualitativePenalty,
  keyResultCountPenalty,
  keyResultQualityPenalty,
} from "./okr";
import type { ObjectiveDraft, KeyResultDraft } from "../types";
import { HEURISTICS_FR } from "../../content/heuristics.fr";

function okrDraft(
  text: string,
  keyResults: KeyResultDraft[] = [],
): ObjectiveDraft {
  return {
    type: "okr-equipe",
    text,
    audience: "dev",
    keyResults,
  };
}

function sprintDraft(): ObjectiveDraft {
  return {
    type: "sprint",
    text: "Réduire le taux d'abandon de 50 % d'ici fin de sprint",
    audience: "dev",
  };
}

describe("objectiveQualitativePenalty", () => {
  it("null si pas OKR", () => {
    expect(objectiveQualitativePenalty(sprintDraft())).toBeNull();
  });

  it("null si Objective sans chiffre", () => {
    const r = objectiveQualitativePenalty(
      okrDraft("Devenir l'outil de référence pour l'observabilité"),
    );
    expect(r).toBeNull();
  });

  it("pénalité -20 si Objective porte un chiffre", () => {
    const r = objectiveQualitativePenalty(okrDraft("Améliorer l'observabilité de 30 %"));
    expect(r).not.toBeNull();
    expect(r!.amount).toBe(20);
    expect(r!.score.status).toBe("bad");
  });
});

describe("keyResultCountPenalty", () => {
  it("null si 3 à 5 KR", () => {
    expect(keyResultCountPenalty(okrDraft("O", [kr(), kr(), kr()]))).toBeNull();
    expect(keyResultCountPenalty(okrDraft("O", [kr(), kr(), kr(), kr(), kr()]))).toBeNull();
  });

  it("pénalité si 0 KR", () => {
    const r = keyResultCountPenalty(okrDraft("O", []));
    expect(r!.amount).toBe(20);
    expect(r!.score.message).toContain("Aucun");
  });

  it("pénalité progressive si moins de 3 KR", () => {
    const r1 = keyResultCountPenalty(okrDraft("O", [kr()]));
    const r2 = keyResultCountPenalty(okrDraft("O", [kr(), kr()]));
    expect(r1!.amount).toBeGreaterThan(r2!.amount);
  });

  it("pénalité si plus de 5 KR", () => {
    const r = keyResultCountPenalty(okrDraft("O", [kr(), kr(), kr(), kr(), kr(), kr()]));
    expect(r!.amount).toBe(10);
    expect(r!.score.message).toContain("trop");
  });

  it("plafond à -20", () => {
    const r = keyResultCountPenalty(
      okrDraft("O", [kr(), kr(), kr(), kr(), kr(), kr(), kr(), kr(), kr(), kr()]),
    );
    expect(r!.amount).toBe(20);
  });
});

describe("keyResultQualityPenalty", () => {
  it("null si tous les KR sont bons", () => {
    const r = keyResultQualityPenalty(
      okrDraft("O", [
        { text: "Faire passer le NPS de 32 à 50" },
        { text: "Atteindre 80 % d'adoption" },
        { text: "Réduire le délai de 8 min à 2 min" },
      ]),
      HEURISTICS_FR,
    );
    expect(r).toBeNull();
  });

  it("pénalise un KR sans chiffre", () => {
    const r = keyResultQualityPenalty(
      okrDraft("O", [{ text: "Améliorer la satisfaction client" }]),
      HEURISTICS_FR,
    );
    expect(r).not.toBeNull();
    expect(r!.score.message).toContain("pas de chiffre");
  });

  it("pénalise un KR qui commence par un verbe d'output (KR-projet)", () => {
    const r = keyResultQualityPenalty(
      okrDraft("O", [{ text: "Livrer le nouveau dashboard v2 d'ici fin du trimestre" }]),
      HEURISTICS_FR,
    );
    expect(r).not.toBeNull();
    expect(r!.score.message).toContain("KR-projet");
  });

  it("plafonne à -45 même avec beaucoup de KR fautifs", () => {
    const r = keyResultQualityPenalty(
      okrDraft("O", [
        { text: "Livrer X" },
        { text: "Livrer Y" },
        { text: "Livrer Z" },
        { text: "Livrer W" },
        { text: "Livrer V" },
      ]),
      HEURISTICS_FR,
    );
    expect(r!.amount).toBeLessThanOrEqual(45);
  });
});

function kr(text = "Faire passer la métrique de 10 à 50"): KeyResultDraft {
  return { text };
}
