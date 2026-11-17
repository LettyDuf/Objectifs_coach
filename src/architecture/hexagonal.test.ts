// @vitest-environment node
import { describe, expect, it } from "vitest";
import { fileURLToPath } from "node:url";
import { findArchitectureViolations, layerOf, type ArchitectureConfig } from "./hexagonal-rules";
import { readSourceFiles } from "./source-files";

/**
 * FILET D'ARCHITECTURE HEXAGONALE (règle non négociable des outils Gesto).
 *
 * Le cœur métier (domain) ne dépend de rien d'autre que de lui-même : ni de l'interface,
 * ni du contenu, ni d'une bibliothèque, ni du navigateur. Le contenu pédagogique (content)
 * ne connaît que le domaine. Si ce test échoue, on corrige la dépendance : on ne
 * l'assouplit pas sans décision tracée dans DECISIONS.md.
 */
/** Objets du navigateur et de Node : le cœur et le contenu doivent tourner sans eux. */
const FORBIDDEN_GLOBALS = [
  "window", "document", "localStorage", "sessionStorage", "navigator",
  "globalThis", "process", "require",
];

const ARCHITECTURE: ArchitectureConfig = {
  sourceRoot: "src",
  aliases: {},
  rules: [
    { layer: "domain", mayDependOn: ["domain"], allowedPackages: [], forbiddenGlobals: FORBIDDEN_GLOBALS },
    { layer: "content", mayDependOn: ["domain", "content"], allowedPackages: [], forbiddenGlobals: FORBIDDEN_GLOBALS },
    { layer: "adapters", mayDependOn: ["domain", "adapters"], allowedPackages: [] },
  ],
};

/**
 * Liste fermée des dossiers de src. Un nouveau dossier (src/core, src/services…) fait
 * échouer le test : on décide alors explicitement de sa règle ci-dessus.
 */
const DECLARED_TOP_LEVEL = ["(racine)", "domain", "content", "adapters", "ui", "architecture"];

const REPOSITORY_ROOT = fileURLToPath(new URL("../..", import.meta.url));
const sources = readSourceFiles(REPOSITORY_ROOT, "src");

describe("architecture hexagonale", () => {
  it("trouve bien le code à vérifier", () => {
    expect(sources.filter((f) => f.path.startsWith("src/domain/")).length).toBeGreaterThan(5);
  });

  it("ne laisse aucun dossier de src hors de surveillance", () => {
    const undeclared = sources
      .map((f) => layerOf(f.path, ARCHITECTURE.sourceRoot))
      .filter((layer) => !DECLARED_TOP_LEVEL.includes(layer));
    expect([...new Set(undeclared)]).toEqual([]);
  });

  it("aucune couche ne dépend de ce qui lui est interdit", () => {
    expect(findArchitectureViolations(sources, ARCHITECTURE)).toEqual([]);
  });
});
