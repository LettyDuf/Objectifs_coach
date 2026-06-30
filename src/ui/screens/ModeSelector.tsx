/**
 * Écran de sélection du mode (D21).
 *
 * Onglets Théorie / Pratique avec palette différenciée :
 *   - **Théorie (bleu marine)** : affiche directement la grille de thèmes. Cliquer
 *     un thème route vers l'écran qui en présente les fiches.
 *   - **Pratique (corail)** : trois cards de mode (S'entraîner, Défi, Puzzle).
 *
 * Fix 2026-06-22 : la grille de thèmes vit ici, pas après une card intermédiaire.
 * Voir D21 dans DECISIONS.md.
 */

import { useMemo, useState } from "react";
import { Icon, type IconName } from "../components/Icon";
import { ThemeGrid } from "../components/ThemeGrid";
import { SkeletonOverview } from "../components/SkeletonOverview";
import type { ObjectiveType } from "../../domain/types";
import { Screen } from "../layout/Screen";
import { createContentRepository } from "../../content/repository";

type Mode = "learn" | "practice" | "challenge" | "puzzle" | "analyse";
type Tab = "theory" | "practice";

interface Props {
  typeLabel: string;
  objectiveType: ObjectiveType;
  onSelect: (mode: Mode) => void;
  /** Appelé quand l'utilisateur clique un thème dans l'onglet Théorie. */
  onSelectTheme: (themeId: string) => void;
}

interface ModeChoice {
  mode: Mode;
  label: string;
  desc: string;
  icon: IconName;
}

const PRACTICE_MODES: ModeChoice[] = [
  {
    mode: "practice",
    label: "S'entraîner",
    desc: "Cinq mini-exercices ludiques, un par pièce d'un objectif : verbe, indicateur, variation, échéance, contexte.",
    icon: "practice",
  },
  {
    mode: "challenge",
    label: "Défi",
    desc: "Des cas réels avec quatre propositions à juger. Choisis la meilleure reformulation.",
    icon: "challenge",
  },
  {
    mode: "puzzle",
    label: "Composer",
    desc: "Assistant guidé pour rédiger un vrai objectif d'équipe, brique par brique. À copier ou exporter à la fin.",
    icon: "puzzle",
  },
  {
    mode: "analyse",
    label: "Analyser un objectif",
    desc: "Colle un objectif déjà rédigé. L'outil te dit en 30 secondes ce qui tient et ce qui pèche.",
    icon: "analyse",
  },
];

const repo = createContentRepository();

export function ModeSelector({ typeLabel, objectiveType, onSelectTheme, onSelect }: Props) {
  const themes = useMemo(
    () => repo.getThemes(objectiveType, "dev"),
    [objectiveType],
  );
  const practiceModes = PRACTICE_MODES;

  const [active, setActive] = useState<Tab>("practice");

  // Le nombre affiché dans l'onglet Théorie = nombre de thèmes disponibles.
  const theoryCount = themes.length;

  return (
    <Screen
      header={{
        eyebrow: (
          <span>
            {typeLabel} · {theoryCount + practiceModes.length} entrées disponibles
          </span>
        ),
        title: `${typeLabel}, par où commencer ?`,
        lede: "Un coin pour apprendre, un coin pour pratiquer.",
      }}
      body={{
        variant: "single",
        primary: (
          <div className={`mode-tabs mode-tabs--${active}`}>
            <div
              className="mode-tabs__bar"
              role="tablist"
              aria-label="Choisir entre théorie et pratique"
            >
              <button
                id="mode-tab-theory"
                type="button"
                role="tab"
                aria-selected={active === "theory"}
                aria-controls="mode-panel-theory"
                tabIndex={active === "theory" ? 0 : -1}
                className={`mode-tabs__tab mode-tabs__tab--theory ${active === "theory" ? "is-active" : ""}`}
                onClick={() => setActive("theory")}
              >
                <Icon name="learn" size={18} />
                <span>Théorie</span>
                <span className="mode-tabs__count">{theoryCount}</span>
              </button>
              <button
                id="mode-tab-practice"
                type="button"
                role="tab"
                aria-selected={active === "practice"}
                aria-controls="mode-panel-practice"
                tabIndex={active === "practice" ? 0 : -1}
                className={`mode-tabs__tab mode-tabs__tab--practice ${active === "practice" ? "is-active" : ""}`}
                onClick={() => setActive("practice")}
              >
                <Icon name="practice" size={18} />
                <span>Pratique</span>
                <span className="mode-tabs__count">{practiceModes.length}</span>
              </button>
            </div>

            {active === "theory" && (
              <section
                id="mode-panel-theory"
                role="tabpanel"
                aria-labelledby="mode-tab-theory"
                className="mode-tabs__panel mode-tabs__panel--theory"
              >
                <ThemeGrid themes={themes} onSelectTheme={onSelectTheme} />
              </section>
            )}

            {active === "practice" && (
              <section
                id="mode-panel-practice"
                role="tabpanel"
                aria-labelledby="mode-tab-practice"
                className="mode-tabs__panel mode-tabs__panel--practice"
              >
                <SkeletonOverview
                  objectiveType={objectiveType}
                  onOpenTheory={onSelectTheme}
                />
                <div className="card-grid-3">
                  {practiceModes.map((m) => (
                    <ModeCard key={m.mode} choice={m} onSelect={onSelect} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ),
      }}
    />
  );
}

function ModeCard({
  choice,
  onSelect,
}: {
  choice: ModeChoice;
  onSelect: (mode: Mode) => void;
}) {
  return (
    <button
      type="button"
      className="card-button card-button--practice"
      onClick={() => onSelect(choice.mode)}
      aria-label={`Mode ${choice.label}`}
    >
      <span className="card-button__icon" aria-hidden="true">
        <Icon name={choice.icon} size={32} />
      </span>
      <h3 className="card-button__label">{choice.label}</h3>
      <p className="card-button__desc">{choice.desc}</p>
      <span className="card-button__cta">Démarrer ›</span>
    </button>
  );
}
