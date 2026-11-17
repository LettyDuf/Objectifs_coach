// @vitest-environment node
import { describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { findArchitectureViolations, type ArchitectureConfig } from "./hexagonal-rules";
import { readSourceFiles } from "./source-files";

/**
 * FILET D'ARCHITECTURE HEXAGONALE (règle non négociable des outils Gesto).
 *
 * Le cœur métier (domain) ne dépend de rien d'autre que de lui-même : ni de l'interface,
 * ni du contenu, ni d'une bibliothèque, ni du navigateur. Le contenu pédagogique (content)
 * ne connaît que le domaine. Si ce test échoue, on corrige la dépendance : on ne
 * l'assouplit pas sans décision tracée dans DECISIONS.md.
 */
const BROWSER_GLOBALS = ["window", "document", "localStorage", "sessionStorage", "navigator"];

const ARCHITECTURE: ArchitectureConfig = {
  sourceRoot: "src",
  aliases: {},
  rules: [
    { layer: "domain", mayDependOn: ["domain"], allowedPackages: [], forbiddenGlobals: BROWSER_GLOBALS },
    { layer: "content", mayDependOn: ["domain", "content"], allowedPackages: [], forbiddenGlobals: BROWSER_GLOBALS },
    { layer: "adapters", mayDependOn: ["domain", "adapters"], allowedPackages: [] },
  ],
};

const REPOSITORY_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const sources = readSourceFiles(REPOSITORY_ROOT, "src");

describe("architecture hexagonale", () => {
  it("trouve bien le code à vérifier", () => {
    expect(sources.filter((f) => f.path.startsWith("src/domain/")).length).toBeGreaterThan(5);
  });

  it("aucune couche ne dépend de ce qui lui est interdit", () => {
    expect(findArchitectureViolations(sources, ARCHITECTURE)).toEqual([]);
  });
});
