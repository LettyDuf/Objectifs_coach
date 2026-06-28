/**
 * Helpers d'affichage des templates avec champs numériques inline.
 *
 * Un bloc `numericField` a un template du genre « de [X] à [Y] » ; ces helpers
 * tokenisent la chaîne, créent des `<input>` pour chaque placeholder, et
 * fournissent des `aria-label` adaptés au contexte (« Valeur de départ »,
 * « Pourcentage », etc.).
 *
 * Extrait de Puzzle.tsx le 2026-06-27 (P2 modularisation).
 */

export function renderTemplateWithInputs(
  template: string,
  fieldCount: 1 | 2,
  values: string[],
  onChange: (fieldIndex: number, value: string) => void,
) {
  const parts: (string | { fieldIndex: number })[] = [];
  let rest = template;
  const placeholders: Array<"[X]" | "[Y]"> = ["[X]", "[Y]"];
  for (let i = 0; i < fieldCount; i++) {
    const ph = placeholders[i]!;
    const idx = rest.indexOf(ph);
    if (idx === -1) break;
    if (idx > 0) parts.push(rest.slice(0, idx));
    parts.push({ fieldIndex: i });
    rest = rest.slice(idx + ph.length);
  }
  if (rest.length > 0) parts.push(rest);

  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={`s-${i}`}>{part}</span>
        ) : (
          <input
            key={`f-${i}`}
            type="text"
            inputMode="numeric"
            className="plateau-slot__field"
            value={values[part.fieldIndex] ?? ""}
            placeholder="?"
            aria-label={fieldLabelFor(template, fieldCount, part.fieldIndex)}
            onChange={(e) => onChange(part.fieldIndex, e.target.value)}
            size={4}
          />
        ),
      )}
    </>
  );
}

export function fieldLabelFor(
  template: string,
  fieldCount: 1 | 2,
  fieldIndex: number,
): string {
  if (template.includes("de [X] à [Y]")) {
    return fieldIndex === 0 ? "Valeur de départ" : "Valeur cible";
  }
  if (template.startsWith("par [X]")) return "Facteur (par combien)";
  if (template.includes("[X] %")) return "Pourcentage";
  if (fieldCount === 1) return "Valeur";
  return fieldIndex === 0 ? "Première valeur" : "Seconde valeur";
}
