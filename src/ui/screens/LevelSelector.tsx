/**
 * Écran intermédiaire — sélection du niveau OKR (équipe / entreprise).
 *
 * Conséquence directe de D18 (deux types OKR distincts) et D19 (page intermédiaire
 * plutôt que carrousel) : la carte OKR de la home ouvre cet écran qui permet de
 * choisir le niveau, en cohérence avec le pattern TypeSelector → ModeSelector.
 *
 * V1 : OKR équipe est actif, OKR entreprise marqué « à venir » (D20).
 */

import type { ObjectiveType } from "../../domain/types";
import { Icon, type IconName } from "../components/Icon";
import { Screen } from "../layout/Screen";

interface Props {
  onSelectLevel: (level: ObjectiveType) => void;
  onBack: () => void;
}

interface LevelChoice {
  level: ObjectiveType;
  label: string;
  cadence: string;
  desc: string;
  available: boolean;
  icon: IconName;
}

const CHOICES: LevelChoice[] = [
  {
    level: "okr-equipe",
    label: "OKR équipe",
    cadence: "Trimestriel · 90 jours",
    desc:
      "L'équipe se fixe un Objective qualitatif et 3 à 5 Key Results mesurables pour le trimestre. Co-construit, calibré ambitieux.",
    available: true,
    icon: "okr",
  },
  {
    level: "okr-entreprise",
    label: "OKR entreprise",
    cadence: "Annuel · révision trimestrielle",
    desc:
      "Le comité de direction se fixe ses Objectives stratégiques pour l'année. Animé par un coach OKR.",
    available: false,
    icon: "okr",
  },
];

export function LevelSelector({ onSelectLevel, onBack }: Props) {
  return (
    <Screen
      header={{
        eyebrow: <span>OKR · choix du niveau</span>,
        title: "À quel niveau veux-tu travailler ?",
        lede:
          "Les OKR ne se rédigent pas pareil au niveau entreprise et au niveau équipe. La cadence, le porteur, et la grammaire diffèrent.",
        actions: (
          <button type="button" className="btn" onClick={onBack}>
            Retour
          </button>
        ),
      }}
      body={{
        variant: "single",
        primary: (
          <>
            <div className="card-grid-2x2">
              {CHOICES.map((choice) => {
                const cls = `card-button ${choice.available ? "" : "card-button--disabled"}`;
                return (
                  <button
                    key={choice.level}
                    type="button"
                    className={cls}
                    onClick={() => choice.available && onSelectLevel(choice.level)}
                    disabled={!choice.available}
                    aria-label={`Travailler sur ${choice.label}`}
                  >
                    <span className="card-button__icon" aria-hidden="true">
                      <Icon name={choice.icon} size={32} />
                    </span>
                    <h3 className="card-button__label">{choice.label}</h3>
                    <p
                      className="card-button__desc"
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--color-text-muted)",
                        marginBottom: "var(--space-2)",
                        fontStyle: "italic",
                      }}
                    >
                      {choice.cadence}
                    </p>
                    <p className="card-button__desc">{choice.desc}</p>
                    {choice.available ? (
                      <span className="card-button__cta">Démarrer ›</span>
                    ) : (
                      <span className="coming-soon-banner__tag" style={{ alignSelf: "flex-start" }}>
                        Bientôt
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        ),
      }}
    />
  );
}
