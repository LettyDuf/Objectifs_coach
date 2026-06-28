/**
 * Écran Défi · QCM (Sprint).
 *
 * Mécanique : carte de contexte (équipe, produit, situation neutre + métriques),
 * 4 propositions de reformulation, l'utilisateur clique. Révélation immédiate
 * coloriée par verdict (good / partial / bad) + explication par option + feedback
 * principal sur la bonne réponse. Navigation cas suivant.
 *
 * Pédagogie : enseigne la grammaire d'un bon objectif. Les chiffres dans les
 * propositions sont des exemples illustratifs, on juge la STRUCTURE.
 */

import { useMemo, useState } from "react";
import type { CoachUseCase } from "../../domain/ports";
import type {
  ChallengeQuizCase,
  ChallengeQuizOption,
  QuizVerdict,
} from "../../domain/challenge-quiz";
import type { ObjectiveType } from "../../domain/types";
import { createContentRepository } from "../../content/repository";
import { Icon, type IconName } from "../components/Icon";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { useSession } from "../SessionContext";

/**
 * Shuffle Fisher-Yates non destructif. Utilisé pour randomiser l'ordre des cas et
 * l'ordre des options à chaque lancement — on ne mémorise pas « la bonne est toujours
 * la C ».
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

/**
 * Mélange les cas (ordre global) puis, pour chaque cas, mélange ses options et
 * réaffecte les lettres A/B/C/D selon le nouvel ordre. L'utilisateur voit toujours
 * un ordre lisible A→D ; les verdicts et explications restent attachés au texte
 * d'origine.
 */
function shuffleCases(source: ChallengeQuizCase[]): ChallengeQuizCase[] {
  return shuffle(source).map((c) => ({
    ...c,
    options: shuffle(c.options).map((opt, idx) => ({
      ...opt,
      id: OPTION_LETTERS[idx] ?? opt.id,
    })),
  }));
}

interface Props {
  coach: CoachUseCase;
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

export function ChallengeQuiz({ type, onExit }: Props) {
  // Source non mélangée — utilisée comme entrée du shuffle, jamais affichée directement.
  const source = useMemo(() => repo.getChallengeQuizCases(type, "dev"), [type]);
  const typeLabel = TYPE_LABELS[type];
  const proposedLabel = type === "okr-equipe" ? "Résultat clé" : "objectif";

  // Ordre randomisé à chaque mount (cas + options). Re-shuffle au clic « Rejouer ».
  const [cases, setCases] = useState<ChallengeQuizCase[]>(() => shuffleCases(source));
  const [index, setIndex] = useState(0);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const session = useSession();

  if (cases.length === 0) {
    return (
      <Screen
        header={{ title: `Défi ${typeLabel}`, lede: "Aucun cas disponible." }}
        body={{ variant: "single", primary: <Zone variant="primary"><p>Reviens plus tard.</p></Zone> }}
        actions={{ right: <button className="btn" onClick={onExit}>Retour</button> }}
      />
    );
  }

  // Écran final : bilan
  if (index >= cases.length) {
    const ratio = correctCount / cases.length;
    const verdict =
      ratio >= 0.85 ? "Solide" : ratio >= 0.6 ? "Bonne base" : "À retravailler";
    return (
      <Screen
        header={{
          eyebrow: <span>{typeLabel} · Défi terminé</span>,
          title: "Bilan de ta session",
          lede: `Tu as choisi la meilleure reformulation sur ${correctCount} cas sur ${cases.length}.`,
        }}
        body={{
          variant: "single",
          primary: (
            <Zone variant="primary">
              <div style={{ display: "flex", alignItems: "valeur de référence", gap: "var(--space-3)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xl)", fontWeight: 500 }}>
                  {correctCount} / {cases.length}
                </span>
                <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{verdict}</span>
              </div>
              <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)" }}>
                {ratio >= 0.85
                  ? "Tu maîtrises la structure d'un bon objectif. Va t'entraîner sur ton vrai sujet."
                  : ratio >= 0.6
                    ? "Tu connais l'essentiel. Relis les fiches sur les pièges qui t'ont eu, puis entraîne-toi."
                    : "Bon parcours d'apprentissage. Reprends les fiches pédagogiques avant de revenir."}
              </p>
            </Zone>
          ),
        }}
        actions={{
          left: <button className="btn" onClick={onExit}>Quitter</button>,
          right: (
            <button
              className="btn btn--primary"
              onClick={() => {
                // Re-shuffle complet : nouvel ordre des cas + nouvel ordre des
                // propositions. L'utilisateur ne refait pas la même session.
                setCases(shuffleCases(source));
                setIndex(0);
                setChosenId(null);
                setCorrectCount(0);
              }}
            >
              Rejouer ›
            </button>
          ),
        }}
      />
    );
  }

  const currentCase = cases[index]!;
  const chosenOption = chosenId
    ? currentCase.options.find((o) => o.id === chosenId) ?? null
    : null;
  const correctOption = currentCase.options.find((o) => o.verdict === "good") ?? null;

  function handleChoose(option: ChallengeQuizOption) {
    if (chosenId) return;
    setChosenId(option.id);
    if (option.verdict === "good") {
      setCorrectCount((n) => n + 1);
      session.bump();
    }
  }

  function handleNext() {
    setChosenId(null);
    setIndex(index + 1);
  }

  return (
    <Screen
      header={{
        eyebrow: (
          <span>
            {typeLabel} · Défi · Cas {index + 1} / {cases.length} · <strong>{correctCount}</strong> {correctCount > 1 ? "bonnes" : "bonne"} jusqu'ici
          </span>
        ),
        title: currentCase.teamLabel,
        lede: chosenId
          ? "Lis le feedback, puis passe au cas suivant."
          : "Lis le contexte, puis choisis la reformulation la plus solide.",
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
          <Zone variant="primary" title="Contexte" meta={currentCase.teamLabel}>
            <article className="quiz-context">
              <div className="quiz-context__header">
                {currentCase.iconName && (
                  <span className="quiz-context__avatar" aria-hidden="true">
                    <Icon name={currentCase.iconName as IconName} size={22} />
                  </span>
                )}
                <p className="quiz-context__text">{currentCase.context}</p>
              </div>

              {currentCase.metrics && currentCase.metrics.length > 0 && (
                <dl className="quiz-context__metrics">
                  {currentCase.metrics.map((m, i) => (
                    <div key={i} className="quiz-context__metric">
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {currentCase.objectiveContext && (
                <>
                  <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", margin: "var(--space-4) 0 var(--space-2)" }}>
                    Objectif trimestriel déjà posé :
                  </p>
                  <blockquote
                    className="quiz-context__quote"
                    style={{
                      background: "var(--color-surface-alt)",
                      borderLeftColor: "var(--color-accent-2)",
                      fontStyle: "italic",
                    }}
                  >
                    « {currentCase.objectiveContext} »
                  </blockquote>
                </>
              )}

              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", margin: "var(--space-4) 0 var(--space-2)" }}>
                L'équipe propose ce {proposedLabel} :
              </p>
              <blockquote className="quiz-context__quote">
                « {currentCase.proposedObjective} »
              </blockquote>
            </article>

          </Zone>
          <Zone variant="primary" as="section">
            <div className="quiz-options-wrap quiz-options-wrap--single">
              <h3 className="quiz-options__title">Quelle reformulation choisirais-tu ?</h3>
              <p className="quiz-options__hint">
                Une seule est vraiment solide. Lis-les toutes avant de cliquer.
              </p>

              <div className="quiz-options" role="radiogroup" aria-label="Reformulations">
                {currentCase.options.map((option) => {
                  const revealed = !!chosenId;
                  const isChosen = chosenId === option.id;
                  let cls = "quiz-option";
                  if (revealed) {
                    cls += ` quiz-option--${option.verdict}`;
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
                      <span className="quiz-option__text">{option.text}</span>
                      {revealed && (
                        <span className="quiz-option__verdict-icon" aria-hidden="true">
                          {option.verdict === "good" ? "✓" : option.verdict === "partial" ? "⚠" : "✕"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {chosenOption && (
                <div className={`quiz-feedback quiz-feedback--${chosenOption.verdict}`}>
                  <p className="quiz-feedback__verdict">
                    {chosenOption.verdict === "good" ? (
                      <>
                        <Icon name="good" size={16} /> <strong>Bien vu.</strong>
                      </>
                    ) : chosenOption.verdict === "partial" ? (
                      <>
                        <Icon name="warn" size={16} /> <strong>Presque.</strong>
                      </>
                    ) : (
                      <>
                        <Icon name="bad" size={16} /> <strong>Pas tout à fait.</strong>
                      </>
                    )}
                  </p>
                  <p className="quiz-feedback__explanation">{chosenOption.explanation}</p>

                  {chosenOption.verdict !== "good" && correctOption && (
                    <div className="quiz-feedback__correct">
                      <p style={{ margin: "0 0 var(--space-2)", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>
                        La meilleure reformulation : <strong>{correctOption.id}</strong>
                      </p>
                      <p style={{ margin: 0, fontSize: "var(--font-size-sm)" }}>
                        {correctOption.explanation}
                      </p>
                    </div>
                  )}
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
            {chosenOption?.verdict === "good"
              ? "Bonne réponse — passe au suivant."
              : "Lis le feedback, puis passe au suivant."}
          </span>
        ) : (
          <span>Choisis une reformulation pour voir le feedback.</span>
        ),
        right: (
          <button
            className="btn btn--primary"
            onClick={handleNext}
            disabled={!chosenId}
            aria-disabled={!chosenId}
          >
            {index < cases.length - 1 ? "Cas suivant ›" : "Voir le bilan ›"}
          </button>
        ),
      }}
    />
  );
}

// Évite un warning sur l'import inutilisé `QuizVerdict` (utilisé via type seulement).
export type { QuizVerdict };
