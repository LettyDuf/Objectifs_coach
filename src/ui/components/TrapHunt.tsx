/**
 * Quiz « trouve le piège » (Mockup C — Vague 3).
 *
 * Tokenise un texte en mots cliquables. L'utilisateur sélectionne les mots qui
 * posent problème. La validation compare aux `trapWords` connus. Affichage :
 * - bien vu (mot piège trouvé) : fond rouge pâle
 * - manqué (piège non vu) : fond ambre
 * - faux positif (mot innocent cliqué) : barré gris
 */

import { useMemo, useState } from "react";

interface Props {
  text: string;
  /** Tokens-pièges attendus (normalisés minuscules + sans accent). */
  trapWords: string[];
  /** Explication révélée après validation (optionnel). */
  rationale?: string;
}

interface Token {
  /** Index dans la liste affichée (pour la sélection). */
  i: number;
  /** Mot ou ponctuation, tel qu'affiché. */
  raw: string;
  /** Token normalisé pour comparaison (vide pour la ponctuation). */
  norm: string;
  /** Vrai si c'est un mot cliquable (faux pour la ponctuation et les espaces). */
  isWord: boolean;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9']/g, "");
}

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const regex = /([\p{L}\p{N}']+)|([^\p{L}\p{N}']+)/gu;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[0]!;
    const isWord = !!m[1];
    tokens.push({
      i: i++,
      raw,
      norm: isWord ? normalize(raw) : "",
      isWord,
    });
  }
  return tokens;
}

export function TrapHunt({ text, trapWords, rationale }: Props) {
  const tokens = useMemo(() => tokenize(text), [text]);
  const trapsNorm = useMemo(() => new Set(trapWords.map(normalize)), [trapWords]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(i: number) {
    if (revealed) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  // Comptage après validation
  const found = revealed
    ? [...selected].filter((i) => trapsNorm.has(tokens[i]?.norm ?? ""))
    : [];
  const falsePositives = revealed
    ? [...selected].filter((i) => !trapsNorm.has(tokens[i]?.norm ?? ""))
    : [];
  const missed = revealed
    ? tokens
        .filter((t) => t.isWord && trapsNorm.has(t.norm) && !selected.has(t.i))
        .map((t) => t.i)
    : [];

  // Compteur de mots sélectionnés (visible pendant la chasse)
  const selectionCount = selected.size;

  return (
    <div className="trap-hunt">
      {!revealed && (
        <p className="trap-hunt__instruction">
          Clique sur les mots qui posent problème.
          {selectionCount > 0 && (
            <span className="trap-hunt__counter">
              {" "}· {selectionCount} {selectionCount > 1 ? "mots sélectionnés" : "mot sélectionné"}
            </span>
          )}
        </p>
      )}

      <p className="trap-hunt__sentence">
        {tokens.map((t) => {
          if (!t.isWord) {
            // Ponctuation et espaces : restent en flux naturel, pas en bouton
            return <span key={t.i}>{t.raw}</span>;
          }
          const isSelected = selected.has(t.i);
          let cls = "trap-word";
          if (revealed) {
            if (isSelected && trapsNorm.has(t.norm)) cls += " trap-word--found";
            else if (!isSelected && trapsNorm.has(t.norm)) cls += " trap-word--missed";
            else if (isSelected && !trapsNorm.has(t.norm)) cls += " trap-word--false";
          } else if (isSelected) {
            cls += " trap-word--selected";
          }
          return (
            <button
              key={t.i}
              type="button"
              className={cls}
              onClick={() => toggle(t.i)}
              aria-pressed={isSelected}
              disabled={revealed}
            >
              {t.raw}
            </button>
          );
        })}
      </p>

      {!revealed && (
        <div className="trap-hunt__actions">
          <button
            className="btn btn--primary"
            onClick={() => setRevealed(true)}
            disabled={selected.size === 0}
          >
            Valider mes choix
          </button>
          <button className="btn btn--ghost" onClick={() => setRevealed(true)}>
            Révéler sans choisir
          </button>
        </div>
      )}

      {revealed && (
        <div className="trap-hunt__result">
          <p className="trap-hunt__score">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-md)", fontWeight: "500" }}>
              {found.length} / {trapsNorm.size}
            </span>
            <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-base)" }}>
              pièges identifiés
            </span>
            {falsePositives.length > 0 && (
              <span style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                · {falsePositives.length} faux positif{falsePositives.length > 1 ? "s" : ""}
              </span>
            )}
          </p>
          {rationale && (
            <p className="trap-hunt__rationale">
              <strong>Pourquoi :</strong> {rationale}
            </p>
          )}
          {missed.length > 0 && (
            <p className="trap-hunt__missed-hint">
              Les mots en ambre, tu les as manqués. Les mots barrés, ils ne posent pas de problème.
            </p>
          )}
          <button
            className="btn"
            onClick={() => {
              setSelected(new Set());
              setRevealed(false);
            }}
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}
