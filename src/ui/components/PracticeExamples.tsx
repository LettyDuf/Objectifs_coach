/**
 * Bloc « Inspire-toi d'exemples annotés » utilisé en étape 2 du hub Pratique (D21).
 *
 * Refactorisation : les composants `ExampleCard` et `BadExampleCard` étaient
 * jusqu'ici dupliqués dans SprintLearn et PILearn. Ils sont rapatriés ici et
 * réutilisés par SprintPractice et PIPractice.
 *
 * Note : pour OKR équipe, la carte d'exemple est custom (Objective + Key Results
 * avec hiérarchie visuelle). Voir OkrPracticeExamples (à venir si besoin) ou
 * la version inlinée dans OkrTeamPractice.
 */

import { useState } from "react";
import type { CoachUseCase, AnnotatedExample } from "../../domain/ports";
import { CarouselColumn } from "./CarouselColumn";
import { EvaluationPanel } from "./EvaluationPanel";
import { TrapHunt } from "./TrapHunt";

interface Props {
  coach: CoachUseCase;
  examples: AnnotatedExample[];
}

export function PracticeExamples({ coach, examples }: Props) {
  const goods = examples.filter((e) => e.verdict === "good");
  const bads = examples.filter((e) => e.verdict === "bad");

  return (
    <div className="examples-grid">
      <section aria-labelledby="goods-title">
        <h4 id="goods-title" className="examples-column__title">
          ✓ Bons exemples
        </h4>
        <CarouselColumn
          items={goods}
          unitLabel={{ singular: "bon exemple", plural: "bons exemples" }}
          renderItem={(ex) => <ExampleCard example={ex} coach={coach} />}
          renderRecap={(items) => (
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 600,
                }}
              >
                Tu as parcouru les {items.length} bons exemples.
              </p>
              <p style={{ margin: "var(--space-3) 0 0", color: "var(--color-text-muted)" }}>
                Maintenant à toi : passe à l'étape 3 et écris ton objectif.
              </p>
            </div>
          )}
        />
      </section>
      <section aria-labelledby="bads-title">
        <h4 id="bads-title" className="examples-column__title">
          ✕ Mauvais exemples · trouve les pièges
        </h4>
        <CarouselColumn
          items={bads}
          unitLabel={{ singular: "cas", plural: "cas" }}
          renderItem={(ex) => <BadExampleCard example={ex} coach={coach} />}
          renderRecap={(items) => (
            <div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 600,
                }}
              >
                Tu as vu les {items.length} cas de pièges.
              </p>
              <p style={{ margin: "var(--space-3) 0 0", color: "var(--color-text-muted)" }}>
                À toi : passe à l'étape 3 et rédige sans tomber dans les mêmes.
              </p>
            </div>
          )}
        />
      </section>
    </div>
  );
}

interface ExampleCardProps {
  example: AnnotatedExample;
  coach: CoachUseCase;
}

function ExampleCard({ example, coach }: ExampleCardProps) {
  const [revealed, setRevealed] = useState(false);
  const result = revealed ? coach.evaluate(example.draft) : null;
  const text = "text" in example.draft ? example.draft.text : "";

  return (
    <article className="example-card" aria-label={`Exemple ${example.id}`}>
      <p className="example-card__text">« {text} »</p>

      {!revealed ? (
        <div className="example-card__actions">
          <button className="btn btn--ghost btn--sm" onClick={() => setRevealed(true)}>
            Voir pourquoi
          </button>
        </div>
      ) : (
        <>
          <p className="example-card__rationale">
            <strong>Ce qui marche : </strong>
            {example.rationale}
          </p>
          <EvaluationPanel result={result} />
          <div className="example-card__actions">
            <button className="btn btn--ghost btn--sm" onClick={() => setRevealed(false)}>
              Replier
            </button>
          </div>
        </>
      )}
    </article>
  );
}

function BadExampleCard({ example, coach }: ExampleCardProps) {
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const text = "text" in example.draft ? example.draft.text : "";
  const traps = example.trapWords ?? [];
  const result = showDiagnostic ? coach.evaluate(example.draft) : null;

  return (
    <article className="example-card" aria-label={`Exemple ${example.id}`}>
      {traps.length > 0 ? (
        <TrapHunt text={text} trapWords={traps} rationale={example.rationale} />
      ) : (
        <>
          <p className="example-card__text">« {text} »</p>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            Pas de piège textuel à débusquer ici. Le souci est plus subtil
            (calibrage, métadonnée). Lis le diagnostic ci-dessous.
          </p>
        </>
      )}

      <div className="example-card__actions">
        <button
          className="btn btn--link"
          onClick={() => setShowDiagnostic((v) => !v)}
        >
          {showDiagnostic ? "Masquer le diagnostic moteur" : "Voir le diagnostic moteur ›"}
        </button>
      </div>

      {showDiagnostic && (
        <div style={{ marginTop: "var(--space-3)" }}>
          <EvaluationPanel result={result} />
        </div>
      )}
    </article>
  );
}
