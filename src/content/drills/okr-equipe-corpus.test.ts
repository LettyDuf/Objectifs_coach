/**
 * Test d'intégrité du corpus S'entraîner OKR équipe (Indicateur, Variation,
 * Échéance, Contexte).
 *
 * Ces corpus existaient depuis le 2026-06-28 mais n'étaient jamais couverts
 * par un test dédié ni câblés dans `OkrTeamPractice.tsx` (dette découverte le
 * 2026-07-04 en construisant OKR entreprise, corrigée dans le même lot).
 * Garde-fou mêmes invariants que `corpus-integrity.test.ts` (Sprint) et
 * `okr-entreprise-corpus.test.ts`.
 */

import { describe, it, expect } from "vitest";
import { OKR_EQUIPE_INDICATOR_DRILL_FR } from "./okr-equipe.indicator.fr";
import { OKR_EQUIPE_VARIATION_DRILL_FR } from "./okr-equipe.variation.fr";
import { OKR_EQUIPE_ECHEANCE_DRILL_FR } from "./okr-equipe.echeance.fr";
import { OKR_EQUIPE_CONTEXTE_DRILL_FR } from "./okr-equipe.contexte.fr";

describe("Corpus Indicateur OKR équipe (QCM 1-parmi-3)", () => {
  const corpus = OKR_EQUIPE_INDICATOR_DRILL_FR;

  it("est de kind qcm", () => {
    expect(corpus.kind).toBe("qcm");
  });

  it("a 10 cas, 3 options chacun, exactement 1 bonne réponse", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    expect(corpus.cases.length).toBe(10);
    for (const c of corpus.cases) {
      expect(c.options.length, `cas ${c.id}`).toBe(3);
      expect(c.options.filter((o) => o.isCorrect).length, `cas ${c.id}`).toBe(1);
    }
  });

  it("équilibre des positions : a=4, b=3, c=3", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    const counts: Record<string, number> = { A: 0, B: 0, C: 0 };
    for (const c of corpus.cases) {
      const good = c.options.find((o) => o.isCorrect);
      if (good) counts[good.id] = (counts[good.id] ?? 0) + 1;
    }
    expect(counts.A).toBe(4);
    expect(counts.B).toBe(3);
    expect(counts.C).toBe(3);
  });

  it("IDs uniques", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    const ids = corpus.cases.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Corpus Contexte OKR équipe (QCM 1-parmi-4)", () => {
  const corpus = OKR_EQUIPE_CONTEXTE_DRILL_FR;

  it("est de kind qcm", () => {
    expect(corpus.kind).toBe("qcm");
  });

  it("a 8 cas, 4 options chacun, exactement 1 bonne réponse", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    expect(corpus.cases.length).toBe(8);
    for (const c of corpus.cases) {
      expect(c.options.length, `cas ${c.id}`).toBe(4);
      expect(c.options.filter((o) => o.isCorrect).length, `cas ${c.id}`).toBe(1);
    }
  });

  it("IDs uniques", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    const ids = corpus.cases.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe.each([
  ["Variation", OKR_EQUIPE_VARIATION_DRILL_FR],
  ["Échéance", OKR_EQUIPE_ECHEANCE_DRILL_FR],
])("Corpus %s OKR équipe (grille à sélection multiple)", (_label, corpus) => {
  it("est de kind grid", () => {
    expect(corpus.kind).toBe("grid");
  });

  it("a 8 fragments", () => {
    if (corpus.kind !== "grid") throw new Error("type erroné");
    expect(corpus.data.fragments.length).toBe(8);
  });

  it("contient au moins un fragment correct et un incorrect", () => {
    if (corpus.kind !== "grid") throw new Error("type erroné");
    const correct = corpus.data.fragments.filter((f) => f.isCorrect).length;
    const incorrect = corpus.data.fragments.filter((f) => !f.isCorrect).length;
    expect(correct).toBeGreaterThan(0);
    expect(incorrect).toBeGreaterThan(0);
  });

  it("IDs uniques et aucune justification vide", () => {
    if (corpus.kind !== "grid") throw new Error("type erroné");
    const ids = corpus.data.fragments.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of corpus.data.fragments) {
      expect(f.justification, `${f.id}`).not.toBe("");
    }
  });
});
