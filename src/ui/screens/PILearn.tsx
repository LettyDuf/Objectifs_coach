/**
 * Écran Théorie · Program Increment — détail d'un thème (D21 fix 2026-06-22).
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

export function PILearn({ coach, themeId, onBack, onEvaluateExample }: Props) {
  const themes = repo.getThemes("pi", "dev");
  const theme = themeId ? themes.find((t) => t.theme.id === themeId) : null;

  return (
    <Screen
      header={{
        eyebrow: <span>Program Increment · Théorie</span>,
        title: theme ? theme.theme.label : "Théorie · Program Increment",
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
            objectiveType="pi"
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
