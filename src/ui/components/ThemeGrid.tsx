/**
 * Grille de thèmes d'apprentissage (D21) — composant « grille seule ».
 *
 * Utilisé dans l'onglet Théorie du ModeSelector. Le clic sur un thème délègue
 * à `onSelectTheme` (App route vers l'écran qui affiche la galerie du thème).
 *
 * Voir aussi `ThemeDetail` : affiche les fiches d'un thème sélectionné.
 */

import type { ThemeWithSheets } from "../../domain/ports";
import { Icon, type IconName } from "./Icon";

interface Props {
  themes: ThemeWithSheets[];
  onSelectTheme: (themeId: string) => void;
}

export function ThemeGrid({ themes, onSelectTheme }: Props) {
  if (themes.length === 0) {
    return (
      <p className="screen-lede">
        Aucune fiche pédagogique pour le moment.
      </p>
    );
  }

  return (
    <div className="theme-grid">
      <p className="theme-grid__lede">
        Choisis un thème pour explorer les fiches qui s'y rattachent.
      </p>
      <div className="card-grid-3">
        {themes.map(({ theme, sheets }) => (
          <button
            key={theme.id}
            type="button"
            className="card-button card-button--theory theme-card"
            onClick={() => onSelectTheme(theme.id)}
            aria-label={`Ouvrir le thème ${theme.label}, ${sheets.length} fiche${sheets.length > 1 ? "s" : ""}`}
          >
            {theme.recommendedFirst && (
              <span className="card-button__recommended">Commence ici</span>
            )}
            <span className="card-button__icon" aria-hidden="true">
              {theme.icon && <Icon name={theme.icon as IconName} size={32} />}
            </span>
            <h3 className="card-button__label">{theme.label}</h3>
            <p className="card-button__desc">{theme.tagline}</p>
            <span className="card-button__cta">
              {sheets.length} fiche{sheets.length > 1 ? "s" : ""} ›
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
