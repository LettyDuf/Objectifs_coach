/**
 * Onglets Théorie / Pratique pour la page Apprendre.
 *
 * Décision UX (validée 2026-06-22) : séparer franchement les fiches pédagogiques
 * (théorie) des exercices (warmup + exemples annotés en carrousels). En atelier,
 * le facilitateur sait toujours dans quel coin il est, et l'utilisateur n'est pas
 * noyé sous tout en même temps.
 *
 * Pattern accessible (ARIA Tabs) : role="tablist" / role="tab" / role="tabpanel"
 * + aria-selected + aria-controls / aria-labelledby. Clavier : Tab pour atteindre
 * la barre, flèches gauche/droite pour basculer entre onglets (à brancher si retour
 * utilisatrice demande — V1 reste sur Tab + Espace/Entrée standard).
 *
 * Par défaut on ouvre sur Théorie (« Apprendre » porte la promesse de la lecture).
 * Un bouton « Passer à la pratique → » apparaît en bas du coin Théorie pour fluidifier.
 */

import { useState, type ReactNode } from "react";
import { Icon } from "./Icon";

type Tab = "theory" | "practice";

interface Props {
  theory: ReactNode;
  practice: ReactNode;
  /** Onglet ouvert au premier rendu. Par défaut « théorie ». */
  defaultTab?: Tab;
  /**
   * Texte du CTA placé en bas du coin Théorie pour amener vers la Pratique.
   * Si omis, pas de CTA (on suppose que l'utilisateur cliquera l'onglet).
   */
  switchToPracticeLabel?: string;
}

export function LearnTabs({
  theory,
  practice,
  defaultTab = "theory",
  switchToPracticeLabel = "Passer à la pratique ›",
}: Props) {
  const [active, setActive] = useState<Tab>(defaultTab);

  return (
    <div className="learn-tabs">
      <div
        className="learn-tabs__bar"
        role="tablist"
        aria-label="Apprendre — choisir entre théorie et pratique"
      >
        <button
          id="learn-tab-theory"
          type="button"
          role="tab"
          aria-selected={active === "theory"}
          aria-controls="learn-panel-theory"
          tabIndex={active === "theory" ? 0 : -1}
          className={`learn-tabs__tab ${active === "theory" ? "learn-tabs__tab--active" : ""}`}
          onClick={() => setActive("theory")}
        >
          <Icon name="learn" size={18} />
          <span>Théorie</span>
        </button>
        <button
          id="learn-tab-practice"
          type="button"
          role="tab"
          aria-selected={active === "practice"}
          aria-controls="learn-panel-practice"
          tabIndex={active === "practice" ? 0 : -1}
          className={`learn-tabs__tab ${active === "practice" ? "learn-tabs__tab--active" : ""}`}
          onClick={() => setActive("practice")}
        >
          <Icon name="practice" size={18} />
          <span>Pratique</span>
        </button>
      </div>

      {active === "theory" && (
        <section
          id="learn-panel-theory"
          role="tabpanel"
          aria-labelledby="learn-tab-theory"
          className="learn-tabs__panel"
        >
          {theory}
          {switchToPracticeLabel && (
            <aside className="learn-tabs__switch" aria-label="Passer à la pratique">
              <div className="learn-tabs__switch-text">
                <p className="learn-tabs__switch-title">Quand tu te sens prêt :</p>
                <p className="learn-tabs__switch-desc">
                  Bascule en pratique pour t'échauffer et chasser les pièges sur des exemples.
                </p>
              </div>
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => setActive("practice")}
              >
                {switchToPracticeLabel}
              </button>
            </aside>
          )}
        </section>
      )}

      {active === "practice" && (
        <section
          id="learn-panel-practice"
          role="tabpanel"
          aria-labelledby="learn-tab-practice"
          className="learn-tabs__panel"
        >
          {practice}
        </section>
      )}
    </div>
  );
}
