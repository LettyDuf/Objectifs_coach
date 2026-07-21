/**
 * Intégrité des corpus de tri du Warmup (refonte 2026-07) + ordre varié.
 */
import { describe, it, expect } from "vitest";
import type { WarmupCase, WarmupAnswer } from "../../domain/warmup";
import { orderVaried } from "../../domain/warmup";
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

describe("orderVaried", () => {
  const mk = (id: string, e: WarmupAnswer) => ({ id, expected: e });
  const base = [
    mk("o1", "output"), mk("o2", "output"), mk("o3", "output"), mk("o4", "output"),
    mk("c1", "outcome"), mk("c2", "outcome"), mk("c3", "outcome"), mk("c4", "outcome"),
    mk("p1", "complete"), mk("p2", "complete"), mk("p3", "complete"),
  ];

  it("n'enchaîne jamais deux réponses identiques", () => {
    for (let t = 0; t < 300; t++) {
      const o = orderVaried(base);
      for (let i = 1; i < o.length; i++) {
        expect(o[i]!.expected).not.toBe(o[i - 1]!.expected);
      }
    }
  });

  it("conserve tous les cas, sans perte ni doublon", () => {
    const o = orderVaried(base);
    expect(o.length).toBe(base.length);
    expect(new Set(o.map((c) => c.id)).size).toBe(base.length);
  });
});
