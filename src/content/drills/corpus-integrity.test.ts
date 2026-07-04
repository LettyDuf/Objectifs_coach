/**
 * Tests d'intégrité du corpus mini-exercices Sprint.
 *
 * Vérifie les invariants structurels pour ne pas régresser silencieusement
 * sur le contenu pédagogique (un cas QCM sans bonne réponse, une grille
 * sans fragment à cocher, ID dupliqués, etc.).
 */

import { describe, it, expect } from "vitest";
import { SPRINT_INDICATOR_DRILL_FR } from "./sprint.indicator.fr";
import { SPRINT_CONTEXTE_DRILL_FR } from "./sprint.contexte.fr";
import { SPRINT_VARIATION_DRILL_FR } from "./sprint.variation.fr";
import { SPRINT_ECHEANCE_DRILL_FR } from "./sprint.echeance.fr";
import { SPRINT_MAINTENANCE_DRILL_FR } from "./sprint.maintenance.fr";

describe("Corpus Indicateur (QCM 1-parmi-3)", () => {
  const corpus = SPRINT_INDICATOR_DRILL_FR;
  it("est de kind qcm", () => {
    expect(corpus.kind).toBe("qcm");
  });
  it("a 10 cas", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    expect(corpus.cases.length).toBe(10);
  });
  it("chaque cas a exactement 1 bonne réponse", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    for (const c of corpus.cases) {
      const correct = c.options.filter((o) => o.isCorrect);
      expect(correct.length, `cas ${c.id}`).toBe(1);
    }
  });
  it("chaque cas a 3 options", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    for (const c of corpus.cases) {
      expect(c.options.length, `cas ${c.id}`).toBe(3);
    }
  });
  it("équilibre des positions : a=4, b=3, c=3 (équilibrage validé Lætitia)", () => {
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

describe("Corpus Contexte (QCM 1-parmi-4)", () => {
  const corpus = SPRINT_CONTEXTE_DRILL_FR;
  it("est de kind qcm", () => {
    expect(corpus.kind).toBe("qcm");
  });
  it("chaque cas a 4 options et exactement 1 bonne réponse", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    for (const c of corpus.cases) {
      expect(c.options.length, `cas ${c.id}`).toBe(4);
      expect(c.options.filter((o) => o.isCorrect).length, `cas ${c.id}`).toBe(1);
    }
  });
});

describe("Corpus Maintenance : trouver la valeur (QCM 1-parmi-4)", () => {
  const corpus = SPRINT_MAINTENANCE_DRILL_FR;
  it("est de kind qcm", () => {
    expect(corpus.kind).toBe("qcm");
  });
  it("a 4 cas (un par famille ISO/IEC 14764 : corrective, adaptative, perfective, préventive)", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
    expect(corpus.cases.length).toBe(4);
  });
  it("chaque cas a 4 options et exactement 1 bonne réponse", () => {
    if (corpus.kind !== "qcm") throw new Error("type erroné");
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

describe("Corpus Variation (grille à sélection multiple)", () => {
  const corpus = SPRINT_VARIATION_DRILL_FR;
  it("est de kind grid", () => {
    expect(corpus.kind).toBe("grid");
  });
  it("a au moins 1 fragment à cocher et au moins 1 à laisser", () => {
    if (corpus.kind !== "grid") throw new Error("type erroné");
    const toCheck = corpus.data.fragments.filter((f) => f.isCorrect).length;
    const toLeave = corpus.data.fragments.filter((f) => !f.isCorrect).length;
    expect(toCheck).toBeGreaterThan(0);
    expect(toLeave).toBeGreaterThan(0);
  });
  it("IDs uniques", () => {
    if (corpus.kind !== "grid") throw new Error("type erroné");
    const ids = corpus.data.fragments.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Corpus Échéance (grille à sélection multiple)", () => {
  const corpus = SPRINT_ECHEANCE_DRILL_FR;
  it("est de kind grid", () => {
    expect(corpus.kind).toBe("grid");
  });
  it("a au moins 1 fragment à cocher et au moins 1 à laisser", () => {
    if (corpus.kind !== "grid") throw new Error("type erroné");
    const toCheck = corpus.data.fragments.filter((f) => f.isCorrect).length;
    const toLeave = corpus.data.fragments.filter((f) => !f.isCorrect).length;
    expect(toCheck).toBeGreaterThan(0);
    expect(toLeave).toBeGreaterThan(0);
  });
});


// ============================================================
// PI — corpus V1 panel SAFe 2026-06-28
// ============================================================

import { PI_INDICATOR_DRILL_FR } from "./pi.indicator.fr";
import { PI_CONTEXTE_DRILL_FR } from "./pi.contexte.fr";
import { PI_VARIATION_DRILL_FR } from "./pi.variation.fr";
import { PI_ECHEANCE_DRILL_FR } from "./pi.echeance.fr";

describe("Corpus PI Indicateur (QCM 1-parmi-3)", () => {
  const c = PI_INDICATOR_DRILL_FR;
  it("kind qcm + 10 cas + 3 options + 1 bonne réponse", () => {
    expect(c.kind).toBe("qcm");
    if (c.kind !== "qcm") throw new Error();
    expect(c.cases.length).toBe(10);
    for (const cas of c.cases) {
      expect(cas.options.length, `cas ${cas.id}`).toBe(3);
      expect(cas.options.filter((o) => o.isCorrect).length, `cas ${cas.id}`).toBe(1);
    }
  });
  it("équilibre positions a=4, b=3, c=3", () => {
    if (c.kind !== "qcm") throw new Error();
    const counts: Record<string, number> = { A: 0, B: 0, C: 0 };
    for (const cas of c.cases) {
      const good = cas.options.find((o) => o.isCorrect);
      if (good) counts[good.id] = (counts[good.id] ?? 0) + 1;
    }
    expect(counts.A).toBe(4);
    expect(counts.B).toBe(3);
    expect(counts.C).toBe(3);
  });
});

describe("Corpus PI Contexte (QCM 1-parmi-4)", () => {
  const c = PI_CONTEXTE_DRILL_FR;
  it("kind qcm + cas avec 4 options + 1 bonne réponse", () => {
    expect(c.kind).toBe("qcm");
    if (c.kind !== "qcm") throw new Error();
    for (const cas of c.cases) {
      expect(cas.options.length, `cas ${cas.id}`).toBe(4);
      expect(cas.options.filter((o) => o.isCorrect).length, `cas ${cas.id}`).toBe(1);
    }
  });
});

describe("Corpus PI Variation (grille)", () => {
  const c = PI_VARIATION_DRILL_FR;
  it("kind grid + ≥ 1 à cocher + ≥ 1 à laisser", () => {
    expect(c.kind).toBe("grid");
    if (c.kind !== "grid") throw new Error();
    expect(c.data.fragments.filter((f) => f.isCorrect).length).toBeGreaterThan(0);
    expect(c.data.fragments.filter((f) => !f.isCorrect).length).toBeGreaterThan(0);
  });
});

describe("Corpus PI Échéance (grille)", () => {
  const c = PI_ECHEANCE_DRILL_FR;
  it("kind grid + ≥ 1 à cocher + ≥ 1 à laisser", () => {
    expect(c.kind).toBe("grid");
    if (c.kind !== "grid") throw new Error();
    expect(c.data.fragments.filter((f) => f.isCorrect).length).toBeGreaterThan(0);
    expect(c.data.fragments.filter((f) => !f.isCorrect).length).toBeGreaterThan(0);
  });
});


// ============================================================
// OKR équipe — corpus V1 panel expert OKR 2026-06-27
// ============================================================

import { OKR_EQUIPE_INDICATOR_DRILL_FR } from "./okr-equipe.indicator.fr";
import { OKR_EQUIPE_CONTEXTE_DRILL_FR } from "./okr-equipe.contexte.fr";
import { OKR_EQUIPE_VARIATION_DRILL_FR } from "./okr-equipe.variation.fr";
import { OKR_EQUIPE_ECHEANCE_DRILL_FR } from "./okr-equipe.echeance.fr";

describe("Corpus OKR équipe Indicateur (QCM 1-parmi-3)", () => {
  const c = OKR_EQUIPE_INDICATOR_DRILL_FR;
  it("kind qcm + 10 cas + 3 options + 1 bonne réponse", () => {
    expect(c.kind).toBe("qcm");
    if (c.kind !== "qcm") throw new Error();
    expect(c.cases.length).toBe(10);
    for (const cas of c.cases) {
      expect(cas.options.length, `cas ${cas.id}`).toBe(3);
      expect(cas.options.filter((o) => o.isCorrect).length, `cas ${cas.id}`).toBe(1);
    }
  });
  it("équilibre positions a=4, b=3, c=3", () => {
    if (c.kind !== "qcm") throw new Error();
    const counts: Record<string, number> = { A: 0, B: 0, C: 0 };
    for (const cas of c.cases) {
      const good = cas.options.find((o) => o.isCorrect);
      if (good) counts[good.id] = (counts[good.id] ?? 0) + 1;
    }
    expect(counts.A).toBe(4);
    expect(counts.B).toBe(3);
    expect(counts.C).toBe(3);
  });
});

describe("Corpus OKR équipe Contexte (QCM 1-parmi-4)", () => {
  const c = OKR_EQUIPE_CONTEXTE_DRILL_FR;
  it("kind qcm + cas avec 4 options + 1 bonne réponse", () => {
    expect(c.kind).toBe("qcm");
    if (c.kind !== "qcm") throw new Error();
    for (const cas of c.cases) {
      expect(cas.options.length, `cas ${cas.id}`).toBe(4);
      expect(cas.options.filter((o) => o.isCorrect).length, `cas ${cas.id}`).toBe(1);
    }
  });
});

describe("Corpus OKR équipe Variation (grille)", () => {
  const c = OKR_EQUIPE_VARIATION_DRILL_FR;
  it("kind grid + ≥ 1 à cocher + ≥ 1 à laisser", () => {
    expect(c.kind).toBe("grid");
    if (c.kind !== "grid") throw new Error();
    expect(c.data.fragments.filter((f) => f.isCorrect).length).toBeGreaterThan(0);
    expect(c.data.fragments.filter((f) => !f.isCorrect).length).toBeGreaterThan(0);
  });
});

describe("Corpus OKR équipe Échéance (grille)", () => {
  const c = OKR_EQUIPE_ECHEANCE_DRILL_FR;
  it("kind grid + ≥ 1 à cocher + ≥ 1 à laisser", () => {
    expect(c.kind).toBe("grid");
    if (c.kind !== "grid") throw new Error();
    expect(c.data.fragments.filter((f) => f.isCorrect).length).toBeGreaterThan(0);
    expect(c.data.fragments.filter((f) => !f.isCorrect).length).toBeGreaterThan(0);
  });
});
