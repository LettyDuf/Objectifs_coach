/**
 * Écran d'accueil — sélection du type d'objectif (gabarit Screen).
 *
 * Refonte 2026-06-21 (7 leviers A→G) :
 *   A. Cards compactes (CSS `align-items: start` + padding réduit)
 *   B. CTA « Démarrer › » visible sur chaque card active
 *   C. Pictos 56 px dans cercle accent atténué
 *   D. Hero d'accueil narratif (au lieu de lede technique)
 *   E. Bannière « Pas encore prêt ? Découvre les fiches »
 *   F. OKR retiré de la grille, banni en pied de page « Bientôt »
 *   G. Shell header allégé (cf. tokens.css + components.css)
 */

import type { ObjectiveType } from "../../domain/types";
import { Icon, type IconName } from "../components/Icon";
import { Screen } from "../layout/Screen";

/**
 * Choix possibles depuis la home. `"okr-family"` est un sentinelle UI : il déclenche
 * la page intermédiaire `LevelSelector` (D19) au lieu de router directement vers un
 * type concret. App résout ensuite vers `okr-equipe` ou `okr-entreprise`.
 */
export type HomeChoice = ObjectiveType | "okr-family";

interface Props {
  onSelect: (choice: HomeChoice) => void;
  /** Callback « Découvre les fiches » — amène vers le mode Apprendre Sprint. */
  onExplore?: () => void;
}

interface TypeChoice {
  choice: HomeChoice;
  label: string;
  desc: string;
  available: boolean;
  icon: IconName;
}

const CHOICES: TypeChoice[] = [
  {
    choice: "sprint",
    label: "Sprint",
    desc: "Un but unique pour l'itération de l'équipe (1 à 4 semaines).",
    available: true,
    icon: "sprint",
  },
  {
    choice: "pi",
    label: "Program Increment",
    desc: "Un résultat de valeur métier à l'échelle du train (8 à 12 semaines).",
    available: true,
    icon: "pi",
  },
  {
    choice: "okr-family",
    label: "OKR",
    desc: "Un Objectif qualitatif soutenu par 3 à 5 Résultats clés. Niveau équipe (entreprise prévu plus tard).",
    available: true,
    icon: "okr",
  },
];

export function TypeSelector({ onSelect, onExplore }: Props) {
  return (
    <Screen
      header={{
        eyebrow: <span>Sprint · Program Increment · OKR</span>,
        title: "Choisis ton terrain",
        lede:
          "Apprends à rédiger des objectifs solides en jouant. Choisis le cadre qui te concerne, on s'occupe du reste.",
      }}
      body={{
        variant: "single",
        primary: (
          <>
            <div className="card-grid-3">
              {CHOICES.map((choice) => (
                <button
                  key={choice.choice}
                  type="button"
                  className="card-button"
                  onClick={() => onSelect(choice.choice)}
                  aria-label={`Travailler sur ${choice.label}`}
                >
                  <span className="card-button__icon" aria-hidden="true">
                    <Icon name={choice.icon} size={32} />
                  </span>
                  <h3 className="card-button__label">{choice.label}</h3>
                  <p className="card-button__desc">{choice.desc}</p>
                  <span className="card-button__cta">Démarrer ›</span>
                </button>
              ))}
            </div>

            {/* Porte d'entrée alternative pour débutants */}
            {onExplore && (
              <aside className="explore-banner" aria-label="Découvrir sans s'engager">
                <div className="explore-banner__text">
                  <p className="explore-banner__title">Pas encore prêt à choisir ?</p>
                  <p className="explore-banner__desc">
                    Commence par lire les fiches pédagogiques Sprint. Tu reviendras choisir plus tard.
                  </p>
                </div>
                <button className="btn" onClick={onExplore}>
                  Découvrir les fiches ›
                </button>
              </aside>
            )}
          </>
        ),
      }}
    />
  );
}
