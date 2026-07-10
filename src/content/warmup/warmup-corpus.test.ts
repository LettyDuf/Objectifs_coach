/**
 * Intégrité des corpus Warmup (4 modules).
 *
 * Garde-fous de la réponse « ça dépend » (2026-07-08) :
 *  - "depends" est réservé aux verbes seuls (niveau 1) ; au niveau 2 le
 *    contexte est donné, la réponse doit rester binaire ;
 *  - chaque module propose au moins 2 verbes ambigus ;
 *  - les identifiants restent uniques.
 */

import { describe, it, expect } from "vitest";
import { SPRINT_DEV_WARMUP_FR } from "./sprint.dev.fr";
import { PI_DEV_WARMUP_FR } from "./pi.dev.fr";
import { OKR_EQUIPE_DEV_WARMUP_FR } from "./okr-equipe.dev.fr";
import { OKR_ENTREPRISE_MANAGER_WARMUP_FR } from "./okr-entreprise.manager.fr";
import type { WarmupCase } from "../../domain/warmup";

const CORPORA: [string, WarmupCase[]][] = [
  ["sprint", SPRINT_DEV_WARMUP_FR],
  ["pi", PI_DEV_WARMUP_FR],
  ["okr-equipe", OKR_EQUIPE_DEV_WARMUP_FR],
  ["okr-entreprise", OKR_ENTREPRISE_MANAGER_WARMUP_FR],
];

describe.each(CORPORA)("corpus warmup %s", (_name, cases) => {
  it("réserve « ça dépend » aux verbes seuls du niveau 1", () => {
    for (const c of cases.filter((c) => c.expected === "depends")) {
      expect(c.level).toBe(1);
      expect(c.kind).toBe("verb");
    }
  });

  it("propose au moins 2 verbes ambigus", () => {
    expect(cases.filter((c) => c.expected === "depends").length).toBeGreaterThanOrEqual(2);
  });

  it("a des identifiants uniques", () => {
    const ids = cases.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
