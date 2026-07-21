/**
 * Intégrité des corpus de tri du Warmup (refonte 2026-07).
 * Plus de « depends » / level / kind : on vérifie les invariants du nouveau modèle.
 */
import { describe, it, expect } from "vitest";
import type { WarmupCase } from "../../domain/warmup";
import { SPRINT_DEV_WARMUP_FR } from "./sprint.dev.fr";
import { PI_DEV_WARMUP_FR } from "./pi.dev.fr";
import { OKR_EQUIPE_DEV_WARMUP_FR } from "./okr-equipe.dev.fr";
import { OKR_ENTREPRISE_MANAGER_WARMUP_FR } from "./okr-entreprise.manager.fr";

const corpora: Array<[string, WarmupCase[]]> = [
  ["sprint.dev", SPRINT_DEV_WARMUP_FR],
  ["pi.dev", PI_DEV_WARMUP_FR],
  ["okr-equipe.dev", OKR_EQUIPE_DEV_WARMUP_FR],
  ["okr-entreprise.manager", OKR_ENTREPRISE_MANAGER_WARMUP_FR],
];

describe.each(corpora)("corpus Warmup %s", (_name, cases) => {
  it("a des identifiants uniques", () => {
    const ids = cases.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("a des rétroactions non vides", () => {
    for (const c of cases) {
      expect(c.feedbackGood.trim().length).toBeGreaterThan(0);
      expect(c.feedbackAsk.trim().length).toBeGreaterThan(0);
    }
  });

  it("tout cas « à compléter » porte une question de complétion", () => {
    for (const c of cases.filter((c) => c.expected === "complete")) {
      expect((c.completePrompt ?? "").trim().length).toBeGreaterThan(0);
    }
  });

  it("propose au moins un output et un outcome", () => {
    const kinds = new Set(cases.map((c) => c.expected));
    expect(kinds.has("output")).toBe(true);
    expect(kinds.has("outcome")).toBe(true);
  });
});
