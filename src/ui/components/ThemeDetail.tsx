/**
 * Détail d'un thème (D21) en pattern maître-détail :
 *  - Sidebar gauche : liste compacte des fiches du thème, état actif visible.
 *  - Zone droite : la fiche sélectionnée, affichée en mode toujours déployé.
 *
 * Pattern inspiré des grands sites de documentation technique (Stripe, MDN,
 * Notion). Avantages sur la galerie en bandes :
 *   - Lecture confortable en pleine hauteur à droite.
 *   - Liste compacte à gauche, pas d'enchaînement de bandes au défilement.
 *   - L'utilisateur garde la vue d'ensemble du thème pendant qu'il lit une fiche.
 */

import { useEffect, useState } from "react";
import type { CoachUseCase, ThemeWithSheets } from "../../domain/ports";
import type { ObjectiveType } from "../../domain/types";
import { SheetCard } from "./SheetCard";

interface Props {
  theme: ThemeWithSheets;
  coach: CoachUseCase;
  objectiveType: ObjectiveType;
  onPractice: () => void;
  onBack: () => void;
}

export function ThemeDetail({ theme, coach, objectiveType, onPractice, onBack }: Props) {
  // Première fiche sélectionnée par défaut. Si le thème change (changement de
  // contexte), on remet le focus sur la première fiche.
  const firstId = theme.sheets[0]?.id ?? null;
  const [activeId, setActiveId] = useState<string | null>(firstId);

  useEffect(() => {
    setActiveId(firstId);
  }, [firstId]);

  const activeIndex = activeId
    ? theme.sheets.findIndex((s) => s.id === activeId)
    : -1;
  const activeSheet = activeIndex >= 0 ? theme.sheets[activeIndex]! : null;

  if (theme.sheets.length === 0 || !activeSheet) {
    return (
      <div className="theme-detail">
        <div className="theme-detail__back">
          <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
            ‹ Retour aux thèmes
          </button>
        </div>
        <p className="screen-lede">Aucune fiche pour ce thème pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="theme-detail">
      <div className="theme-detail__back">
        <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
          ‹ Retour aux thèmes
        </button>
      </div>

      <aside className="theme-detail__nav" aria-label="Fiches du thème">
        <p className="theme-detail__nav-title">Fiches du thème</p>
        <ul className="theme-detail__list" role="list">
          {theme.sheets.map((sheet, idx) => (
            <li key={sheet.id}>
              <button
                type="button"
                className={`theme-detail__item ${
                  sheet.id === activeId ? "theme-detail__item--active" : ""
                }`}
                onClick={() => setActiveId(sheet.id)}
                aria-current={sheet.id === activeId ? "true" : undefined}
              >
                <span className="theme-detail__item-num">{idx + 1}</span>
                <span className="theme-detail__item-title">{sheet.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="theme-detail__content" aria-label="Fiche sélectionnée">
        <SheetCard
          key={activeSheet.id}
          sheet={activeSheet}
          position={{ current: activeIndex + 1, total: theme.sheets.length }}
          coach={coach}
          objectiveType={objectiveType}
          onPractice={onPractice}
          hideToggle
          onNext={
            activeIndex < theme.sheets.length - 1
              ? () => setActiveId(theme.sheets[activeIndex + 1]!.id)
              : undefined
          }
        />
      </section>
    </div>
  );
}
