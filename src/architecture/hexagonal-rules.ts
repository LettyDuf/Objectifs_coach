import { posix } from "node:path";

/**
 * Vérificateur d'architecture hexagonale.
 *
 * COPIE SYNCHRONISÉE : ce fichier, son test et source-files.ts existent à l'identique dans
 * Objectifs_coach (src/architecture), coach-identifier-les-processus et Coach_Risques
 * (tests/architecture). Toute correction se reporte dans les trois dépôts.
 *
 * Limites connues (analyse par expressions régulières, assumée) : un objet du navigateur
 * utilisé dans un ${...} de texte entre accents graves n'est pas vu ; un nom de variable
 * égal à un objet interdit (ex. un paramètre « document ») est signalé à tort ; un texte
 * qui contient une phrase d'import est lu comme un import. Le linter complète le filet.
 *
 * Fonctions pures : on leur donne des fichiers (chemin + texte), elles rendent la liste
 * des infractions. Aucune lecture de disque ici : c'est le test d'architecture qui lit
 * les fichiers et appelle ce vérificateur.
 *
 * Une « couche » est le premier dossier sous la racine source (src/domain → "domain").
 * Une couche sans règle est libre (en général l'interface et la composition).
 */

export interface SourceFile {
  /** Chemin depuis la racine du dépôt, avec des « / » (ex. "src/domain/engine.ts"). */
  readonly path: string;
  readonly text: string;
}

export interface LayerRule {
  readonly layer: string;
  /** Couches dont cette couche a le droit de dépendre (elle-même comprise si besoin). */
  readonly mayDependOn: readonly string[];
  /** Bibliothèques externes autorisées dans cette couche. */
  readonly allowedPackages: readonly string[];
  /** Objets du navigateur interdits dans cette couche (window, document…). */
  readonly forbiddenGlobals?: readonly string[];
}

export interface ArchitectureConfig {
  readonly sourceRoot: string;
  /** Alias d'import vers un dossier (ex. "@domain" → "src/domain"). */
  readonly aliases: Readonly<Record<string, string>>;
  readonly rules: readonly LayerRule[];
}

export interface Violation {
  readonly file: string;
  readonly detail: string;
}

const OUTSIDE_SOURCE = "(hors de la racine source)";

const STRING_OR_COMMENT =
  /("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\/\*[\s\S]*?\*\/|\/\/[^\n]*/g;

const IMPORT_SPECIFIER =
  /\b(?:import|export)\b[^;]*?\bfrom\s*["']([^"']+)["']|\bimport\s*\(\s*["'`]([^"'`]+)["'`]\s*\)|\bimport\s*["']([^"']+)["']/g;

export function isProductionSource(path: string): boolean {
  return /\.tsx?$/.test(path) && !/\.test\.tsx?$/.test(path) && !path.endsWith(".d.ts");
}

export function findArchitectureViolations(
  files: readonly SourceFile[],
  config: ArchitectureConfig,
): Violation[] {
  return files.flatMap((file) => {
    const rule = ruleFor(file.path, config);
    if (!rule) return [];
    return [...importViolations(file, rule, config), ...globalViolations(file, rule)];
  });
}

function ruleFor(path: string, config: ArchitectureConfig): LayerRule | undefined {
  const layer = layerOf(path, config.sourceRoot);
  return config.rules.find((rule) => rule.layer === layer);
}

/** Couche d'un chemin : premier dossier sous la racine source, "(racine)" pour un fichier posé à la racine. */
export function layerOf(path: string, sourceRoot: string): string {
  const prefix = `${sourceRoot}/`;
  if (!path.startsWith(prefix)) return OUTSIDE_SOURCE;
  const segments = path.slice(prefix.length).split("/");
  const isRootFile = segments.length === 1 && segments[0]!.includes(".");
  return isRootFile ? "(racine)" : segments[0]!;
}

function importViolations(file: SourceFile, rule: LayerRule, config: ArchitectureConfig): Violation[] {
  return importSpecifiers(file.text)
    .filter((specifier) => !isAllowedImport(file.path, specifier, rule, config))
    .map((specifier) => ({
      file: file.path,
      detail: `importe "${specifier}" : la couche ${rule.layer} ne peut dépendre que de ${describeAllowed(rule)}.`,
    }));
}

function isAllowedImport(fromPath: string, specifier: string, rule: LayerRule, config: ArchitectureConfig): boolean {
  const target = resolveLocal(fromPath, specifier, config.aliases);
  if (target === null) return rule.allowedPackages.includes(packageName(specifier));
  return rule.mayDependOn.includes(layerOf(target, config.sourceRoot));
}

/** Rend le chemin visé dans le dépôt, ou null si c'est une bibliothèque externe. */
function resolveLocal(fromPath: string, specifier: string, aliases: ArchitectureConfig["aliases"]): string | null {
  if (specifier.startsWith(".")) return posix.normalize(posix.join(posix.dirname(fromPath), specifier));
  const alias = Object.keys(aliases).find((name) => specifier === name || specifier.startsWith(`${name}/`));
  return alias ? aliases[alias] + specifier.slice(alias.length) : null;
}

function packageName(specifier: string): string {
  const segments = specifier.split("/");
  return specifier.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0]!;
}

function importSpecifiers(text: string): string[] {
  const code = text.replace(STRING_OR_COMMENT, (_match, literal: string | undefined) => literal ?? " ");
  return [...code.matchAll(IMPORT_SPECIFIER)].map((m) => (m[1] ?? m[2] ?? m[3])!);
}

function globalViolations(file: SourceFile, rule: LayerRule): Violation[] {
  const forbidden = rule.forbiddenGlobals ?? [];
  if (forbidden.length === 0) return [];
  const code = file.text.replace(STRING_OR_COMMENT, (_match, literal: string | undefined) => (literal ? '""' : " "));
  return forbidden
    .filter((name) => new RegExp(`(?<![\\w$.])${name}(?![\\w$])`).test(code))
    .map((name) => ({
      file: file.path,
      detail: `utilise "${name}" : la couche ${rule.layer} doit fonctionner sans navigateur ni Node.`,
    }));
}

function describeAllowed(rule: LayerRule): string {
  const packages = rule.allowedPackages.length > 0 ? ` et des bibliothèques ${rule.allowedPackages.join(", ")}` : "";
  return `${rule.mayDependOn.join(", ")}${packages}`;
}
