/**
 * Écran « Anti-patterns » (mode Pratique).
 *
 * Mécanique : un mauvais exemple déjà enseigné en Théorie (fiche marquée
 * `isNamedPitfall`), l'utilisateur doit reconnaître à quel piège nommé il
 * correspond parmi 4 options. Différent du Défi (ChallengeQuiz) : on ne juge
 * pas une reformulation, on identifie l'anti-pattern. Zéro contenu propre à cet
 * écran — tout est dérivé des fiches Théorie déjà validées (voir
 * `src/domain/pitfall-quiz.ts`).
 */

import { useMemo, useState } from "react";
import type { PitfallQuizCase } from "../../domain/pitfall-quiz";
import type { ObjectiveType } from "../../domain/types";
import { createContentRepository } from "../../content/repository";
import { Icon } from "../components/Icon";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { useSession } from "../SessionContext";

/** Shuffle Fisher-Yates non destructif (même mécanique que ChallengeQuiz). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];
const MAX_OPTIONS = 4;

interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

/**
 * Construit les options d'un cas : le bon libellé + jusqu'à 3 distracteurs pris
 * au hasard parmi les autres pièges du même module. Plafonné à 4 options pour
 * rester cohérent avec le Défi (A-D) même quand le module a plus de 4 pièges
 * (OKR équipe en a 5 aujourd'hui).
 */
function buildOptions(current: PitfallQuizCase, all: PitfallQuizCase[]): QuizOption[] {
  const others = all.filter((c) => c.correctPitfallId !== current.correctPitfallId);
  const distractors = shuffle(others)
    .slice(0, MAX_OPTIONS - 1)
    .map((c) => ({ label: c.correctLabel, isCorrect: false }));
  const shuffled = shuffle([{ label: current.correctLabel, isCorrect: true }, ...distractors]);
  return shuffled.map((opt, idx) => ({ id: OPTION_LETTERS[idx] ?? String(idx), ...opt }));
}

interface Props {
  type: ObjectiveType;
  onExit: () => void;
}

const repo = createContentRepository();

const TYPE_LABELS: Record<ObjectiveType, string> = {
  sprint: "Sprint",
  pi: "Program Increment",
  "okr-equipe": "OKR équipe",
  "okr-entreprise": "OKR entreprise",
};

export function PitfallQuiz({ type, onExit }: Props) {
  const source = useMemo(() => repo.getPitfallQuizCases(type, "dev"), [type]);
  const typeLabel = TYPE_LABELS[type];

  const [cases, setCases] = useState<PitfallQuizCase[]>(() => shuffle(source));
  const [options, setOptions] = useState<QuizOption[]>(() =>
    cases[0] ? buildOptions(cases[0], source) : [],
  );
  const [index, setIndex] = useState(0);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const session = useSession();

  if (source.length < 2) {
    return (
      <Screen
        header={{ title: `Anti-patterns ${typeLabel}`, lede: "Pas assez de pièges enregistrés pour ce module." }}
        body={{ variant: "single", primary: <Zone variant="primary"><p>Reviens plus tard.</p></Zone> }}
        actions={{ right: <button className="btn" onClick={onExit}>Retour</button> }}
      />
    );
  }

  function restart() {
    const reshuffled = shuffle(source);
    setCases(reshuffled);
    setOptions(reshuffled[0] ? buildOptions(reshuffled[0], source) : []);
    setIndex(0);
    setChosenId(null);
    setCorrectCount(0);
  }

  if (index >= cases.length) {
    const ratio = correctCount / cases.length;
    const verdict = ratio >= 0.85 ? "Solide" : ratio >= 0.6 ? "Bonne base" : "À retravailler";
    return (
      <Screen
        header={{
          eyebrow: <span>{typeLabel} · Anti-patterns terminé</span>,
          title: "Bilan de ta session",
          lede: `Tu as reconnu le bon piège sur ${correctCount} cas sur ${cases.length}.`,
        }}
        body={{
          variant: "single",
          primary: (
            <Zone variant="primary">
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xl)", fontWeight: 500 }}>
                  {correctCount} / {cases.length}
                </span>
                <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{verdict}</span>
              </div>
              <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)" }}>
                {ratio >= 0.85
                  ? "Tu repères les pièges classiques du regard. Va t'entraîner à écrire sur ton vrai sujet."
                  : ratio >= 0.6
                    ? "Tu connais les grandes familles. Relis les fiches sur les pièges qui t'ont eu, puis reviens."
                    : "Bon début. Reprends les fiches Théorie sur les pièges avant de revenir."}
              </p>
            </Zone>
          ),
        }}
        actions={{
          left: <button className="btn" onClick={onExit}>Quitter</button>,
          right: (
            <button className="btn btn--primary" onClick={restart}>
              Rejouer ›
            </button>
          ),
        }}
      />
    );
  }

  const currentCase = cases[index]!;
  const chosenOption = chosenId ? options.find((o) => o.id === chosenId) ?? null : null;
  const correctOption = options.find((o) => o.isCorrect) ?? null;

  function handleChoose(option: QuizOption) {
    if (chosenId) return;
    setChosenId(option.id);
    if (option.isCorrect) {
      setCorrectCount((n) => n + 1);
      session.bump();
    }
  }

  function handleNext() {
    const nextIndex = index + 1;
    setChosenId(null);
    setIndex(nextIndex);
    const nextCase = cases[nextIndex];
    setOptions(nextCase ? buildOptions(nextCase, source) : []);
  }

  return (
    <Screen
      header={{
        eyebrow: (
          <span>
            {typeLabel} · Anti-patterns · Cas {index + 1} / {cases.length} ·{" "}
            <strong>{correctCount}</strong> {correctCount > 1 ? "bonnes" : "bonne"} jusqu'ici
          </span>
        ),
        title: "Quel piège reconnais-tu ?",
        lede: chosenId
          ? "Lis le feedback, puis passe au cas suivant."
          : "Lis le mauvais exemple, puis choisis le nom du piège qu'il illustre.",
        actions: (
          <button className="btn" onClick={onExit} type="button">
            Quitter
          </button>
        ),
      }}
      body={{
        variant: "single",
        primary: (
          <>
            <Zone variant="primary" title="Mauvais exemple">
              <blockquote className="quiz-context__quote">« {currentCase.badExample} »</blockquote>
            </Zone>
            <Zone variant="primary" as="section">
              <div className="quiz-options-wrap quiz-options-wrap--single">
                <h3 className="quiz-options__title">À quel piège ça correspond ?</h3>
                <p className="quiz-options__hint">Une seule option est la bonne famille de piège.</p>

                <div className="quiz-options" role="radiogroup" aria-label="Pièges possibles">
                  {options.map((option) => {
                    const revealed = !!chosenId;
                    const isChosen = chosenId === option.id;
                    let cls = "quiz-option";
                    if (revealed) {
                      cls += ` quiz-option--${option.isCorrect ? "good" : "bad"}`;
                      if (isChosen) cls += " quiz-option--chosen";
                    }
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={cls}
                        onClick={() => handleChoose(option)}
                        disabled={revealed}
                        aria-pressed={isChosen}
                      >
                        <span className="quiz-option__letter">{option.id}.</span>
                        <span className="quiz-option__text">{option.label}</span>
                        {revealed && (
                          <span className="quiz-option__verdict-icon" aria-hidden="true">
                            {option.isCorrect ? "✓" : "✕"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {chosenOption && (
                  <div className={`quiz-feedback quiz-feedback--${chosenOption.isCorrect ? "good" : "bad"}`}>
                    <p className="quiz-feedback__verdict">
                      {chosenOption.isCorrect ? (
                        <>
                          <Icon name="good" size={16} /> <strong>Bien vu.</strong>
                        </>
                      ) : (
                        <>
                          <Icon name="bad" size={16} /> <strong>Pas ce piège-là.</strong>
                        </>
                      )}
                    </p>
                    <p className="quiz-feedback__explanation">{currentCase.explanation}</p>

                    {!chosenOption.isCorrect && correctOption && (
                      <div className="quiz-feedback__correct">
                        <p style={{ margin: "0 0 var(--space-2)", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>
                          Le bon piège : <strong>{correctOption.id}. {correctOption.label}</strong>
                        </p>
                      </div>
                    )}

                    <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
                      Reformulation solide : « {currentCase.goodExample} »
                    </p>
                  </div>
                )}
              </div>
            </Zone>
          </>
        ),
      }}
      actions={{
        left: (
          <button className="btn" onClick={onExit} type="button">
            Quitter
          </button>
        ),
        status: chosenId ? (
          <span style={{ color: "var(--color-text-muted)" }}>
            {chosenOption?.isCorrect ? "Bonne réponse — passe au suivant." : "Lis le feedback, puis passe au suivant."}
          </span>
        ) : (
          <span>Choisis un piège pour voir le feedback.</span>
        ),
        right: (
          <button className="btn btn--primary" onClick={handleNext} disabled={!chosenId} aria-disabled={!chosenId}>
            {index < cases.length - 1 ? "Cas suivant ›" : "Voir le bilan ›"}
          </button>
        ),
      }}
    />
  );
}
