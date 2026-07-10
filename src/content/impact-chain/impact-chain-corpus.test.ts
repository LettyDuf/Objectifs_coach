/**
 * Intégrité du corpus « Du trimestre au sprint » (D61).
 * Le contenu a été validé par Lætitia le 2026-07-08 ; ces tests verrouillent
 * la structure (pas le fond) : toute évolution du corpus doit les garder verts.
 */

import { describe, it, expect } from "vitest";
import { validateCase } from "../../domain/impact-chain";
import { SPRINT_DEV_IMPACT_CHAIN_FR } from "./sprint.dev.fr";

describe("corpus Descente sprint × dev", () => {
  it("contient 4 cas : 3 chaînes + 1 alerte", () => {
    expect(SPRINT_DEV_IMPACT_CHAIN_FR).toHaveLength(4);
    expect(SPRINT_DEV_IMPACT_CHAIN_FR.filter((c) => c.kind === "chaine")).toHaveLength(3);
    expect(SPRINT_DEV_IMPACT_CHAIN_FR.filter((c) => c.kind === "alerte")).toHaveLength(1);
  });

  it.each(SPRINT_DEV_IMPACT_CHAIN_FR.map((c) => [c.id, c] as const))(
    "%s est bien formé",
    (_id, c) => {
      expect(validateCase(c)).toEqual([]);
    },
  );

  it("a des identifiants uniques (cas, étapes, options)", () => {
    const ids: string[] = [];
    for (const c of SPRINT_DEV_IMPACT_CHAIN_FR) {
      ids.push(c.id);
      for (const s of c.steps) ids.push(s.id);
    }
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("parle en sprint, jamais en jours calendaires", () => {
    const json = JSON.stringify(SPRINT_DEV_IMPACT_CHAIN_FR);
    expect(json).not.toContain("14 jours");
  });

  it("ne contient aucun tiret long", () => {
    expect(JSON.stringify(SPRINT_DEV_IMPACT_CHAIN_FR)).not.toContain("—");
  });
});
