/**
 * Variante OKR équipe de PracticeExamples (D21).
 *
 * Spécificité OKR : chaque exemple contient un Objectif + N Résultats clés. La
 * carte affiche les deux avec une hiérarchie visuelle légère.
 */

import type { AnnotatedExample } from "../../domain/ports";
import type { ObjectiveDraft } from "../../domain/types";
import { CarouselColumn } from "./CarouselColumn";
import { TrapHunt } from "./TrapHunt";

interface Props {
  examples: AnnotatedExample[];
}

export function OkrPracticeExamples({ examples }: Props) {
  const goods = examples.filter((e) => e.verdict === "good");
  const bads = examples.filter((e) => e.verdict === "bad");

  return (
    <div className="examples-grid">
      <section aria-labelledby="goods-title">
        <h4 id="goods-title" className="examples-column__title">
          ✓ Bons OKR
        </h4>
        <CarouselColumn
          items={goods}
          unitLabel={{ singular: "bon OKR", plural: "bons OKR" }}
          renderItem={(ex) => <OkrExampleCard example={ex} verdict="good" />}
          renderRecap={(items) => (
            <div>
              <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "var(--font-size-md)", fontWeight: 600 }}>
                Tu as parcouru les {items.length} bons OKR.
              </p>
              <p style={{ margin: "var(--space-3) 0 0", color: "var(--color-text-muted)" }}>
                Passe à l'étape 3 et écris le tien.
              </p>
            </div>
          )}
        />
      </section>
      <section aria-labelledby="bads-title">
        <h4 id="bads-title" className="examples-column__title">
          ✕ Pièges fréquents · trouve l'erreur
        </h4>
        <p className="examples-column__intro">
          Référence permanente. Tous visibles d'un coup pour comparer.
        </p>
        <div className="examples-stack">
          {bads.map((ex) => (
            <OkrExampleCard key={ex.id} example={ex} verdict="bad" />
          ))}
        </div>
      </section>
    </div>
  );
}

interface CardProps {
  example: AnnotatedExample;
  verdict: "good" | "bad";
}

function OkrExampleCard({ example, verdict }: CardProps) {
  const draft = example.draft;
  const objectiveText = "text" in draft ? draft.text : "";
  const keyResults = isOkrDraft(draft) ? draft.keyResults : [];
  const traps = example.trapWords ?? [];

  return (
    <article className="example-card" aria-label={`Exemple ${example.id}`}>
      <div style={{ marginBottom: "var(--space-3)" }}>
        <p style={{ margin: "0 0 var(--space-2)", fontSize: "var(--font-size-xs)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontWeight: 600 }}>
          Objectif
        </p>
        {verdict === "bad" && traps.length > 0 ? (
          <TrapHunt text={objectiveText} trapWords={traps} rationale={example.rationale} />
        ) : (
          <p className="example-card__text" style={{ margin: 0 }}>« {objectiveText} »</p>
        )}
      </div>

      {keyResults.length > 0 && (
        <div style={{ marginBottom: "var(--space-3)" }}>
          <p style={{ margin: "0 0 var(--space-2)", fontSize: "var(--font-size-xs)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", fontWeight: 600 }}>
            Résultats clés
          </p>
          <ol style={{ margin: 0, paddingLeft: "var(--space-4)", fontSize: "var(--font-size-sm)", color: "var(--color-text)" }}>
            {keyResults.map((kr, i) => (
              <li key={i} style={{ marginBottom: "var(--space-1)" }}>
                {kr.text}
                {kr.confidence !== undefined && (
                  <span style={{ color: "var(--color-text-muted)", marginLeft: "var(--space-2)" }}>
                    (confiance {kr.confidence} %)
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <p className="example-card__rationale">
        <strong>{verdict === "good" ? "Ce qui marche : " : "Pourquoi c'est un piège : "}</strong>
        {example.rationale}
      </p>
    </article>
  );
}

function isOkrDraft(
  draft: ObjectiveDraft,
): draft is Extract<ObjectiveDraft, { type: "okr-equipe" | "okr-entreprise" }> {
  return draft.type === "okr-equipe" || draft.type === "okr-entreprise";
}
