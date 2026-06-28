/**
 * Bloc « Inspire-toi d'exemples annotés » utilisé en étape 2 du hub Pratique (D21).
 *
 * Refactorisation : les composants `ExampleCard` et `BadExampleCard` étaient
 * jusqu'ici dupliqués dans SprintLearn et PILearn. Ils sont rapatriés ici et
 * réutilisés par SprintPractice et PIPractice.
 *
 * Note : pour OKR équipe, la carte d'exemple est custom (Objectif + Résultats clés
 * avec hiérarchie visuelle). Voir OkrPracticeExamples (à venir si besoin) ou
 * la version inlinée dans OkrTeamPractice.
 */

import type { AnnotatedExample } from "../../domain/ports";
import { CarouselColumn } from "./CarouselColumn";
import { TrapHunt } from "./TrapHunt";

interface Props {
  examples: AnnotatedExample[];
}

export function PracticeExamples({ examples }: Props) {
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
          renderItem={(ex) => <ExampleCard example={ex} />}
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
        <p className="examples-column__intro">
          Référence permanente. Tous visibles d'un coup pour que tu puisses comparer.
        </p>
        <div className="examples-stack">
          {bads.map((ex) => (
            <BadExampleCard key={ex.id} example={ex} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface ExampleCardProps {
  example: AnnotatedExample;
}

function ExampleCard({ example }: ExampleCardProps) {
  const text = "text" in example.draft ? example.draft.text : "";
  return (
    <article className="example-card" aria-label={`Exemple ${example.id}`}>
      <p className="example-card__text">« {text} »</p>
      <p className="example-card__rationale">
        <strong>Ce qui marche : </strong>
        {example.rationale}
      </p>
    </article>
  );
}

function BadExampleCard({ example }: ExampleCardProps) {
  const text = "text" in example.draft ? example.draft.text : "";
  const traps = example.trapWords ?? [];

  return (
    <article className="example-card" aria-label={`Exemple ${example.id}`}>
      {traps.length > 0 ? (
        <TrapHunt text={text} trapWords={traps} rationale={example.rationale} />
      ) : (
        <>
          <p className="example-card__text">« {text} »</p>
          <p className="example-card__rationale">
            <strong>Pourquoi c'est un piège : </strong>
            {example.rationale}
          </p>
        </>
      )}
    </article>
  );
}
