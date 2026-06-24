/**
 * Écran Théorie · OKR équipe — détail d'un thème (D21 fix 2026-06-22).
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

export function OkrTeamLearn({ coach, themeId, onBack, onEvaluateExample }: Props) {
  const themes = repo.getThemes("okr-equipe", "dev");
  const theme = themeId ? themes.find((t) => t.theme.id === themeId) : null;

  return (
    <Screen
      header={{
        eyebrow: <span>OKR équipe · Théorie</span>,
        title: theme ? theme.theme.label : "Théorie · OKR équipe",
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
            objectiveType="okr-equipe"
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
