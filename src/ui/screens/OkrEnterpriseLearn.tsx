/**
 * Écran Théorie · OKR entreprise — détail d'un thème.
 *
 * Réplique OkrTeamLearn.tsx (D21 fix 2026-06-22), audience "manager" au lieu
 * de "dev" (D53 : activation du module OKR entreprise).
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

export function OkrEnterpriseLearn({ coach, themeId, onBack, onEvaluateExample }: Props) {
  const themes = repo.getThemes("okr-entreprise", "manager");
  const theme = themeId ? themes.find((t) => t.theme.id === themeId) : null;

  return (
    <Screen
      header={{
        eyebrow: <span>OKR entreprise · Théorie</span>,
        title: theme ? theme.theme.label : "Théorie · OKR entreprise",
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
            objectiveType="okr-entreprise"
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
