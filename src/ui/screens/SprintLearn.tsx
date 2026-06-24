/**
 * Écran Théorie · Sprint — détail d'un thème (D21 fix 2026-06-22).
 *
 * Atterrissage depuis le clic d'un thème dans le ModeSelector (onglet Théorie).
 * Affiche les fiches du thème sélectionné. Bouton « Retour aux thèmes » qui
 * ramène au ModeSelector.
 *
 * Fallback : si `themeId` est absent ou inconnu, on affiche la grille de thèmes
 * locale (cas où on arrive ici sans contexte — bouton « Découvrir les fiches »
 * de la home, etc.).
 */

import type { CoachUseCase } from "../../domain/ports";
import { createContentRepository } from "../../content/repository";
import { ThemeDetail } from "../components/ThemeDetail";
import { ThemeGrid } from "../components/ThemeGrid";
import { Screen } from "../layout/Screen";

interface Props {
  coach: CoachUseCase;
  themeId?: string | undefined;
  onBack: () => void;
  onEvaluateExample: () => void;
}

const repo = createContentRepository();

export function SprintLearn({ coach, themeId, onBack, onEvaluateExample }: Props) {
  const themes = repo.getThemes("sprint", "dev");
  const theme = themeId ? themes.find((t) => t.theme.id === themeId) : null;

  return (
    <Screen
      header={{
        eyebrow: <span>Sprint · Théorie</span>,
        title: theme ? theme.theme.label : "Théorie · Sprint",
        lede: theme
          ? theme.theme.tagline
          : "Choisis un thème pour explorer les fiches qui s'y rattachent.",
        actions: (
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={onEvaluateExample}
          >
            Passer à la pratique ›
          </button>
        ),
      }}
      body={{
        variant: "single",
        primary: theme ? (
          <ThemeDetail
            theme={theme}
            coach={coach}
            objectiveType="sprint"
            onPractice={onEvaluateExample}
            onBack={onBack}
          />
        ) : (
          <ThemeGrid themes={themes} onSelectTheme={() => onBack()} />
        ),
      }}
    />
  );
}
