/**
 * Carrousel pédagogique — un élément à la fois, navigation précédent/suivant,
 * récap final optionnel.
 *
 * Générique : prend une liste d'items et un render-prop pour chaque item.
 * Le récap final est optionnel (si fourni, s'affiche après le dernier item).
 */

import { useState, type ReactNode } from "react";

interface Props<T> {
  items: T[];
  /** Render-prop pour chaque item (reçoit l'item courant + son index). */
  renderItem: (item: T, index: number) => ReactNode;
  /** Récap final affiché après le dernier item. Optionnel. */
  renderRecap?: (items: T[]) => ReactNode;
  /** Libellé personnalisable du compteur. */
  unitLabel?: { singular: string; plural: string };
}

export function CarouselColumn<T>({
  items,
  renderItem,
  renderRecap,
  unitLabel = { singular: "exemple", plural: "exemples" },
}: Props<T>) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  if (total === 0) {
    return (
      <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", fontStyle: "italic" }}>
        Aucun {unitLabel.singular} disponible pour le moment.
      </p>
    );
  }

  // État récap final
  if (index >= total && renderRecap) {
    return (
      <div className="carousel-recap">
        {renderRecap(items)}
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => setIndex(0)}
          style={{ marginTop: "var(--space-3)" }}
        >
          ‹ Recommencer
        </button>
      </div>
    );
  }

  const current = items[index]!;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const hasRecap = !!renderRecap;

  function next() {
    if (isLast && hasRecap) setIndex(total); // déclenche le récap
    else if (!isLast) setIndex(index + 1);
  }

  function prev() {
    if (!isFirst) setIndex(index - 1);
  }

  return (
    <div className="carousel-column">
      <div className="carousel-column__counter" aria-live="polite">
        {unitLabel.singular.charAt(0).toUpperCase() + unitLabel.singular.slice(1)} {index + 1} / {total}
      </div>

      <div className="carousel-column__item">{renderItem(current, index)}</div>

      <div className="carousel-column__nav">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={prev}
          disabled={isFirst}
          aria-label={`${unitLabel.singular} précédent`}
        >
          ‹ Précédent
        </button>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          onClick={next}
          aria-label={isLast ? "Voir le récap" : `${unitLabel.singular} suivant`}
        >
          {isLast ? (hasRecap ? "Bilan ›" : "Recommencer ›") : "Suivant ›"}
        </button>
      </div>
    </div>
  );
}
