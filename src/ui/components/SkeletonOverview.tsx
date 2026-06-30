/**
 * SkeletonOverview — encart « le squelette d'un objectif » (D31).
 *
 * Affiché en tête de l'onglet Pratique du ModeSelector pour transmettre la
 * notion fondamentale (5 briques nommées d'un bon objectif) avant que
 * l'utilisateur entre dans la pratique sans avoir lu la théorie.
 *
 * Volontairement dépouillé : pas d'exemple, pas de phrase, juste les 5
 * libellés dans des rectangles évidés colorés. Lien discret « Voir la fiche
 * fondamentale » qui route vers le thème théorique du même module.
 */

import type { ObjectiveType } from "../../domain/types";
import {
  SKELETON_BRICKS_FR,
  SKELETON_THEME_TARGET,
} from "../../content/skeleton/skeleton.fr";

interface Props {
  objectiveType: ObjectiveType;
  onOpenTheory: (themeId: string) => void;
}

export function SkeletonOverview({ objectiveType, onOpenTheory }: Props) {
  const themeTarget = SKELETON_THEME_TARGET[objectiveType];
  return (
    <section
      className="skeleton-overview"
      aria-labelledby="skeleton-overview-title"
    >
      <div className="skeleton-overview__head">
        <h2
          id="skeleton-overview-title"
          className="skeleton-overview__title"
        >
          Le squelette d'un objectif
        </h2>
        <button
          type="button"
          className="skeleton-overview__link"
          onClick={() => onOpenTheory(themeTarget)}
        >
          Voir la fiche fondamentale ›
        </button>
      </div>
      <ul className="skeleton-overview__row" role="list">
        {SKELETON_BRICKS_FR.map((brick) => (
          <li
            key={brick.label}
            className="skeleton-overview__brick"
            style={{
              borderColor: brick.borderColor,
              color: brick.textColor,
            }}
          >
            {brick.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
