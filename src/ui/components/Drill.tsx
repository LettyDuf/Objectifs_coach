/**
 * Composant unifié des mini-exercices S'entraîner (drills 2 à 5).
 *
 * Rend soit un QCM séquentiel (Indicateur, Contexte), soit une grille à
 * sélection multiple (Variation, Échéance), selon le `kind` du corpus.
 *
 * Pattern de boucle (intro → playing → done) inspiré du Warmup pour cohérence
 * pédagogique.
 */

import { useMemo, useState, type ReactNode } from "react";

import type {
  DrillCorpus,
  DrillQcmCase,
  GridFragment,
} from "../../domain/drill";

interface Props {
  corpus: DrillCorpus;
  /** Contenu additionnel rendu à la fin de l'exercice (ex. suggestions d'autres exercices). */
  endSlot?: ReactNode;
}

export function Drill({ corpus, endSlot }: Props) {
  if (corpus.kind === "qcm") {
    return <QcmRunner cases={corpus.cases} endSlot={endSlot} />;
  }
  return <GridRunner data={corpus.data} endSlot={endSlot} />;
}

// ============================================================
// QCM Runner — un cas après l'autre
// ============================================================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function QcmRunner({
  cases,
  endSlot,
}: {
  cases: DrillQcmCase[];
  endSlot?: ReactNode;
}) {
  const [shuffled, setShuffled] = useState<DrillQcmCase[]>(() => shuffle(cases));
  const [index, setIndex] = useState(0);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const finished = index >= shuffled.length;
  const current = finished ? null : shuffled[index]!;
  const chosen = current?.options.find((o) => o.id === chosenId) ?? null;

  function handleChoose(optionId: string) {
    if (chosenId || !current) return;
    setChosenId(optionId);
    const opt = current.options.find((o) => o.id === optionId);
    if (opt?.isCorrect) setCorrectCount((n) => n + 1);
  }

  function handleNext() {
    setChosenId(null);
    setIndex((i) => i + 1);
  }

  function reset() {
    setShuffled(shuffle(cases));
    setIndex(0);
    setChosenId(null);
    setCorrectCount(0);
  }

  if (finished) {
    const ratio = correctCount / shuffled.length;
    const verdict = ratio >= 0.9 ? "Solide" : ratio >= 0.7 ? "Bonne base" : "À retravailler";
    return (
      <section className="drill drill--done" aria-live="polite">
        <div className="drill__kicker">Exercice terminé</div>
        <h3 className="drill__title">
          <span className="drill__score">{correctCount} / {shuffled.length}</span>
          <span className="drill__verdict">{verdict}</span>
        </h3>
        <p className="drill__lede">
          {ratio >= 0.9
            ? "Tu maîtrises bien. Passe à un autre exercice ou recommence pour aller plus vite."
            : ratio >= 0.7
              ? "Tu connais l'essentiel. Recommence quelques fois pour consolider les cas ambigus."
              : "Reprends doucement : recommence pour t'imprégner du pattern."}
        </p>
        <div className="drill__actions">
          <button className="btn" onClick={reset}>Recommencer</button>
        </div>
        {endSlot}
      </section>
    );
  }

  if (!current) return null;
  return (
    <section className="drill drill--playing">
      <div className="drill__kicker">
        Cas {index + 1} / {shuffled.length}
        <span className="drill__live-score">
          · <strong>{correctCount}</strong> {correctCount > 1 ? "bonnes" : "bonne"} jusqu'ici
        </span>
      </div>
      <p className="drill-qcm__statement">{current.statement}</p>
      <h3 className="drill-qcm__question">{current.question}</h3>
      <ul className="drill-qcm__options" role="radiogroup" aria-label={current.question}>
        {current.options.map((opt) => {
          const revealed = chosenId !== null;
          const isChosen = chosenId === opt.id;
          let cls = "drill-qcm__option";
          if (revealed) {
            cls += opt.isCorrect ? " drill-qcm__option--good" : isChosen ? " drill-qcm__option--bad" : " drill-qcm__option--neutral";
          }
          return (
            <li key={opt.id}>
              <button
                type="button"
                className={cls}
                onClick={() => handleChoose(opt.id)}
                disabled={revealed}
                aria-pressed={isChosen}
              >
                <span className="drill-qcm__letter">{opt.id}.</span>
                <span className="drill-qcm__text">{opt.text}</span>
                {revealed && opt.isCorrect && <span className="drill-qcm__mark" aria-hidden="true">✓</span>}
                {revealed && isChosen && !opt.isCorrect && <span className="drill-qcm__mark" aria-hidden="true">✕</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {chosen && (
        <div className={`drill-qcm__feedback drill-qcm__feedback--${chosen.isCorrect ? "good" : "bad"}`}>
          <p className="drill-qcm__feedback-verdict">
            {chosen.isCorrect ? "Bien vu." : "Pas tout à fait."}
          </p>
          <p className="drill-qcm__feedback-explain">{current.explanation}</p>
          <button className="btn btn--primary" onClick={handleNext}>
            {index < shuffled.length - 1 ? "Suivant ›" : "Voir le bilan ›"}
          </button>
        </div>
      )}
    </section>
  );
}

// ============================================================
// Grid Runner — sélection multiple sur une grille
// ============================================================

function GridRunner({
  data,
  endSlot,
}: {
  data: { consigne: string; fragments: GridFragment[] };
  endSlot?: ReactNode;
}) {
  const fragments = useMemo(() => shuffle(data.fragments), [data.fragments]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);

  function toggle(id: string) {
    if (revealed) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function reset() {
    setSelected(new Set());
    setRevealed(false);
  }

  // Score : nombre de bonnes décisions (coché correct + non coché correct)
  const correctIds = fragments.filter((f) => f.isCorrect).map((f) => f.id);
  const totalCorrect = correctIds.length;
  const wellChecked = correctIds.filter((id) => selected.has(id)).length;
  const wronglyChecked = fragments.filter((f) => selected.has(f.id) && !f.isCorrect).length;
  const missed = totalCorrect - wellChecked;
  const perfectScore = wellChecked === totalCorrect && wronglyChecked === 0;

  if (revealed) {
    const verdict = perfectScore ? "Parfait" : (missed === 0 && wronglyChecked <= 1) || (missed <= 1 && wronglyChecked === 0) ? "Presque" : "À retravailler";
    return (
      <section className="drill drill--done" aria-live="polite">
        <div className="drill__kicker">Exercice terminé</div>
        <h3 className="drill__title">
          <span className="drill__score">{wellChecked} / {totalCorrect}</span>
          <span className="drill__verdict">{verdict}</span>
        </h3>
        <p className="drill__lede">
          {perfectScore
            ? "Tu repères les fragments précis sans hésiter. Tu peux passer à un autre exercice."
            : missed > 0 && wronglyChecked > 0
              ? `Tu as manqué ${missed} fragment${missed > 1 ? "s" : ""} précis et coché ${wronglyChecked} fragment${wronglyChecked > 1 ? "s" : ""} vague${wronglyChecked > 1 ? "s" : ""}. Regarde les justifications ci-dessous, puis recommence.`
              : missed > 0
                ? `Tu as manqué ${missed} fragment${missed > 1 ? "s" : ""} précis. Regarde les justifications, puis recommence.`
                : `Tu as coché ${wronglyChecked} fragment${wronglyChecked > 1 ? "s" : ""} vague${wronglyChecked > 1 ? "s" : ""}. Regarde les justifications, puis recommence.`}
        </p>
        <ul className="drill-grid__results">
          {fragments.map((f) => {
            const userChose = selected.has(f.id);
            const isCorrectAnswer = f.isCorrect;
            const ok = userChose === isCorrectAnswer;
            return (
              <li
                key={f.id}
                className={`drill-grid__result drill-grid__result--${ok ? "ok" : "ko"} drill-grid__result--${isCorrectAnswer ? "expected" : "skip"}`}
              >
                <span className="drill-grid__result-mark" aria-hidden="true">
                  {ok ? "✓" : "✕"}
                </span>
                <div className="drill-grid__result-body">
                  <span className="drill-grid__result-text">{f.text}</span>
                  <span className="drill-grid__result-justif">{f.justification}</span>
                </div>
                <span className="drill-grid__result-tag">
                  {isCorrectAnswer ? "à cocher" : "à laisser"}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="drill__actions">
          <button className="btn" onClick={reset}>Recommencer</button>
        </div>
        {endSlot}
      </section>
    );
  }

  return (
    <section className="drill drill--playing">
      <p className="drill-grid__consigne">{data.consigne}</p>
      <ul className="drill-grid__fragments" role="group" aria-label={data.consigne}>
        {fragments.map((f) => {
          const isSelected = selected.has(f.id);
          return (
            <li key={f.id}>
              <button
                type="button"
                className={`drill-grid__fragment${isSelected ? " is-selected" : ""}`}
                onClick={() => toggle(f.id)}
                aria-pressed={isSelected}
              >
                <span className="drill-grid__check" aria-hidden="true">
                  {isSelected ? "✓" : ""}
                </span>
                <span className="drill-grid__fragment-text">{f.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="drill__actions">
        <button
          className="btn btn--primary"
          onClick={() => setRevealed(true)}
          disabled={selected.size === 0}
        >
          Valider mes choix ›
        </button>
        <span className="drill-grid__count">
          {selected.size} fragment{selected.size > 1 ? "s" : ""} coché{selected.size > 1 ? "s" : ""}
        </span>
      </div>
    </section>
  );
}
