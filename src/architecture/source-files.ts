import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { isProductionSource, type SourceFile } from "./hexagonal-rules";

/** Lit tous les fichiers de code livré sous `directory`, chemins exprimés depuis `repositoryRoot`. */
export function readSourceFiles(repositoryRoot: string, directory: string): SourceFile[] {
  return listFiles(join(repositoryRoot, directory))
    .map((absolute) => relative(repositoryRoot, absolute).split(sep).join("/"))
    .filter(isProductionSource)
    .map((path) => ({ path, text: readFileSync(join(repositoryRoot, path), "utf-8") }));
}

function listFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}
