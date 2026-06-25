/**
 * Fiche pédagogique — pattern Disclosure + pédagogie active.
 *
 * Vague d'amélioration 2026-06-21 (5 recommandations) :
 *   1. CTA d'application en bas (« Mettre en pratique »)
 *   2. Exemple pair-comparé interactif (bouton « voir le score »)
 *   3. Picto par section (rendre les rubriques mémorables)
 *   4. Encart source différencié (encart citation gris, icône livre)
 *   5. Marqueur « Fiche N/M » + bouton « suivante »
 */

import { useId, useState } from "react";
import type { Brick, PedagogicalSheet, PedagogicalSection, CoachUseCase } from "../../domain/ports";
import type { ObjectiveType } from "../../domain/types";
import { Icon, type IconName } from "./Icon";

interface Props {
  sheet: PedagogicalSheet;
  defaultOpen?: boolean;
  /** Position dans la liste de fiches (« 1 / 2 »). Optionnel. */
  position?: { current: number; total: number } | undefined;
  /** Callback pour passer à la fiche suivante. Si absent : pas de bouton. */
  onNext?: (() => void) | undefined;
  /** Coach pour évaluer les exemples interactivement. Si absent : exemples non interactifs. */
  coach?: CoachUseCase | undefined;
  /** Type d'objectif (pour construire le draft d'évaluation des exemples). */
  objectiveType?: ObjectiveType;
  /** Callback CTA d'application en bas de fiche. Si absent : pas de CTA. */
  onPractice?: (() => void) | undefined;
  /** Masque le bouton Déplier/Replier et force l'état ouvert. Utilisé dans le
   * pattern maître-détail où la fiche est toujours visible côté lecture. */
  hideToggle?: boolean;
}

export function SheetCard({
  sheet,
  defaultOpen = false,
  position,
  onNext,
  onPractice,
  hideToggle = false,
}: Props) {
  const [open, setOpen] = useState(hideToggle || defaultOpen);
  const bodyId = useId();
  const isOpen = hideToggle || open;

  return (
    <article className={`sheet-card ${isOpen ? "sheet-card--open" : ""} ${hideToggle ? "sheet-card--always-open" : ""}`}>
      <div className="sheet-card__header">
        {sheet.icon ? (
          <span className="sheet-card__pict" aria-hidden="true">
            <Icon name={sheet.icon as IconName} size={20} />
          </span>
        ) : (
          <span className="sheet-card__icon" aria-hidden="true">
            {isOpen ? "▾" : "▸"}
          </span>
        )}
        <div className="sheet-card__header-text">
          {position && (
            <span className="sheet-card__kicker">
              Fiche {position.current} / {position.total}
            </span>
          )}
          <h3 className="sheet-card__title">{sheet.title}</h3>
        </div>
        {!hideToggle && (
          <button
            type="button"
            className="sheet-card__toggle-btn"
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? `Replier la fiche « ${sheet.title} »` : `Déplier la fiche « ${sheet.title} »`}
          >
            {open ? "Replier" : "Déplier"}
          </button>
        )}
      </div>

      {isOpen && (
        <div id={bodyId} className="sheet-card__body">
          {sheet.heroPhrase && (
            <p className="sheet-card__hero">{sheet.heroPhrase}</p>
          )}
          {sheet.intro && <p className="sheet-card__intro">{sheet.intro}</p>}

          {sheet.sections.map((section, idx) => (
            <SheetSection key={idx} section={section} />
          ))}

          {/* CTA d'application + navigation entre fiches */}
          {(onPractice || onNext) && (
            <footer className="sheet-card__footer">
              {onPractice && (
                <button className="btn btn--primary" onClick={onPractice}>
                  {sheet.practiceCtaLabel ?? "Mettre en pratique"} ›
                </button>
              )}
              {onNext && (
                <button className="btn" onClick={onNext} style={{ marginLeft: "auto" }}>
                  Fiche suivante ›
                </button>
              )}
            </footer>
          )}
        </div>
      )}
    </article>
  );
}

/* ============================================================
 * Section avec picto, support encart source et exemples interactifs
 * ============================================================ */

/**
 * Mapping icon → fonction sémantique pour les filets verticaux des sections.
 * - concept (indigo)  : exposés, structures, savoir
 * - alert   (ambre)   : signaux d'alerte, pièges
 * - do      (vert)    : pratique, comment faire, tests
 * Les sections kind="source" sont rendues séparément en gris (.sheet-card__source).
 */
function semanticClass(section: PedagogicalSection): string {
  if (section.kind === "source") return "";
  const icon = section.icon ?? "";
  // Mapping affiné 2026-06-25 (validé Lætitia) : 4 fonctions distinctes pour éviter
  // la monotonie chromatique sur les fiches concept-lourdes (OKR Anatomie, etc.).
  if (icon === "warn" || icon === "bad" || icon === "challenge") return "sheet-card__section--alert";
  if (icon === "good" || icon === "wrench" || icon === "practice") return "sheet-card__section--do";
  if (icon === "learn") return "sheet-card__section--perspective";
  // target, okr et défaut : concept
  return "sheet-card__section--concept";
}

function SheetSection({
  section,
}: {
  section: PedagogicalSection;
}) {
  // Encart source — rendu différencié
  if (section.kind === "source") {
    return (
      <aside className="sheet-card__source">
        <div className="sheet-card__source-icon" aria-hidden="true">
          <Icon name="learn" size={20} />
        </div>
        <div>
          <p className="sheet-card__source-label">Source</p>
          <p className="sheet-card__source-body">{section.body}</p>
        </div>
      </aside>
    );
  }

  // Briques de grammaire — phrase annotée + grille colorée
  if (section.kind === "bricks" && section.bricks && section.bricksSentence) {
    return (
      <section className={`sheet-card__section ${semanticClass(section)}`}>
        <h4 className="sheet-card__section-heading">
          {section.icon && (
            <span className="sheet-card__section-icon" aria-hidden="true">
              <Icon name={section.icon as IconName} size={18} />
            </span>
          )}
          {section.heading}
        </h4>
        {section.body && <p className="sheet-card__section-body">{section.body}</p>}
        <BricksDisplay bricks={section.bricks} sentence={section.bricksSentence} />
      </section>
    );
  }

  return (
    <section className={`sheet-card__section ${semanticClass(section)}`}>
      <h4 className="sheet-card__section-heading">
        {section.icon && (
          <span className="sheet-card__section-icon" aria-hidden="true">
            <Icon name={section.icon as IconName} size={18} />
          </span>
        )}
        {section.heading}
      </h4>
      {section.body && <p className="sheet-card__section-body">{section.body}</p>}
      {section.bullets && (
        <ul className="sheet-card__bullets">
          {section.bullets.map((b, i) => (
            <li key={i}>{renderInlineMarkdown(b)}</li>
          ))}
        </ul>
      )}
      {section.examples && (
        <div className="sheet-card__examples">
          {section.examples.map((ex, i) => (
            <ExamplePair
              key={i}
              bad={ex.bad}
              good={ex.good}
              note={ex.note}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ExamplePair({
  bad,
  good,
  note,
}: {
  bad: string;
  good?: string | undefined;
  note?: string | undefined;
}) {
  return (
    <div className="example-pair">
      <div className="example-pair__bad">
        <span className="example-pair__label">
          <Icon name="bad" size={16} />
          Mauvais
        </span>
        <p className="example-pair__text">{bad}</p>
      </div>
      {good && (
        <div className="example-pair__good">
          <span className="example-pair__label">
            <Icon name="good" size={16} />
            Reformulation
          </span>
          <p className="example-pair__text">{good}</p>
        </div>
      )}
      {note && <p className="example-pair__note">{note}</p>}
    </div>
  );
}

/**
 * Briques de grammaire : phrase annotée colorée + grille des 5 tiles.
 *
 * Algo phrase annotée : on parse la phrase à la recherche de chaque `snippet`
 * dans l'ordre des briques. Chaque match est remplacé par un <span> coloré.
 * Les snippets doivent apparaître **dans l'ordre** dans la phrase et être
 * uniques pour fonctionner correctement.
 */
function BricksDisplay({ bricks, sentence }: { bricks: Brick[]; sentence: string }) {
  return (
    <div className="bricks">
      <div className="bricks__sentence">
        <span className="bricks__label">Le squelette</span>
        <div className="bricks__phrase bricks__phrase--skeleton">
          {renderTokenizedSentence(sentence, bricks, (brick) => brick.label)}
        </div>
        <span className="bricks__label bricks__label--secondary">Un exemple</span>
        <div className="bricks__phrase bricks__phrase--example">
          {renderTokenizedSentence(sentence, bricks, (brick) => brick.snippet)}
        </div>
      </div>
      <div className="bricks__legend">
        {bricks.map((brick) => (
          <div key={brick.num} className={`brick-leg brick-leg--${brick.color}`}>
            <div className="brick-leg__head">
              <span className="brick-leg__num">{String(brick.num).padStart(2, "0")}</span>
              <span className="brick-leg__dot" aria-hidden="true"></span>
              <span className="brick-leg__name">{brick.label}</span>
            </div>
            <div className="brick-leg__hint">{brick.hint}</div>
            <div className="brick-leg__ex">{brick.examples}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Tokenise la phrase en localisant chaque `snippet` dans l'ordre des briques.
 * Le texte hors snippet reste tel quel ; chaque snippet trouvé est remplacé
 * par une pill colorée dont le contenu est délégué à `renderToken` (label
 * pour la vue squelette, snippet pour la vue exemple).
 */
function renderTokenizedSentence(
  sentence: string,
  bricks: Brick[],
  renderToken: (brick: Brick) => string,
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const brick of bricks) {
    const idx = sentence.indexOf(brick.snippet, cursor);
    if (idx === -1) continue; // snippet non trouvé : on ignore
    if (idx > cursor) {
      parts.push(sentence.slice(cursor, idx));
    }
    parts.push(
      <span key={`b-${key++}`} className={`brick-pill brick-pill--${brick.color}`}>
        {renderToken(brick)}
      </span>,
    );
    cursor = idx + brick.snippet.length;
  }
  if (cursor < sentence.length) {
    parts.push(sentence.slice(cursor));
  }
  return parts;
}

/**
 * Mini-parser inline Markdown : interprète `**xxx**` → `<strong>xxx</strong>`.
 * Volontairement minimal (pas de lib externe). Couvre le besoin actuel
 * des fiches pédagogiques. À étendre si on a besoin d'italique ou de code inline.
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Regex non-greedy : capture les paires **…**
  const regex = /\*\*([^*]+)\*\*/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    parts.push(<strong key={`b-${key++}`}>{match[1]}</strong>);
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts.length > 0 ? parts : text;
}
