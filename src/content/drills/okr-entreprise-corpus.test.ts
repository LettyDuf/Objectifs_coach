/**
 * Test d'intégrité du corpus S'entraîner OKR entreprise (Indicateur, Variation,
 * Échéance, Contexte) + Warmup associé.
 *
 * Garde-fou : verrouille les invariants structurels (comptage, options,
 * équilibrage des positions, unicité des ids) pour éviter qu'une régression
 * silencieuse passe inaperçue, comme le fait déjà `corpus-integrity.test.ts`
 * pour Sprint et `pitfall-quiz-corpus.test.ts` pour les Anti-patterns.
 */

import { describe, it, expect } from "vitest";
import { OKR_ENTREPRISE_MANAGER_WARMUP_FR } from "../warmup/okr-entreprise.manager.fr";
import { OKR_ENTREPRISE_MANAGER_INDICATOR_FR } from "./okr-entreprise.indicator.fr";
import { OKR_ENTREPRISE_MANAGER_VARIATION_FR } from "./okr-entreprise.variation.fr";
import { OKR_ENTREPRISE_MANAGER_ECHEANCE_FR } from "./okr-entreprise.echeance.fr";
import { OKR_ENTREPRISE_MANAGER_CONTEXTE_FR } from "./okr-entreprise.contexte.fr";

describe("Warmup OKR entreprise (output/outcome)", () => {
  const cases = OKR_ENTREPRISE_MANAGER_WARMUP_FR;

  it("a 10 cas de niveau 1 et 10 de niveau 2", () => {
    expect(cases.filter((c) => c.level === 1).length).toBe(10);
    expect(cases.filter((c) => c.level === 2).length).toBe(10);
  });

  it("IDs uniques", () => {
    const ids = cases.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("aucun champ texte vide", () => {
    for (const c of cases) {
      expect(c.prompt, `${c.id}: prompt`).not.toBe("");
      expect(c.explanation, `${c.id}: explanation`).not.toBe("");
    }
  });
});

describe("Corpus Indicateur OKR entreprise (QCM 1-parmi-3)", () => {
  const corpus = OKR_ENTREPRISE_MANAGER_INDICATOR_FR;

  it("est de kind qcm", () => {
    expect(corpus.kind).toBe("qcm");
  });

  it("a 10 cas", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    expect(corpus.cases.length).toBe(10);
  });

  it("chaque cas a 3 options et exactement 1 bonne réponse", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
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

describe("Corpus Contexte OKR entreprise (QCM 1-parmi-4)", () => {
  const corpus = OKR_ENTREPRISE_MANAGER_CONTEXTE_FR;

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
  ["Variation", OKR_ENTREPRISE_MANAGER_VARIATION_FR],
  ["Échéance", OKR_ENTREPRISE_MANAGER_ECHEANCE_FR],
])("Corpus %s OKR entreprise (grille à sélection multiple)", (_label, corpus) => {
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
