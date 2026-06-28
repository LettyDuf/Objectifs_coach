/**
 * Quiz d'échauffement output/outcome (idée Lætitia, option C).
 *
 * Deux niveaux séquentiels :
 *   1. Verbes purs (5 cas) — pédagogie de base
 *   2. Mini-objectifs avec contexte (5 cas) — pédagogie de la nuance
 *
 * Récap final à la fin avec score et message contextuel.
 */

import { useMemo, useState } from "react";
import type { WarmupCase, WarmupAnswer } from "../../domain/warmup";
import { Icon } from "./Icon";

/**
 * Shuffle Fisher-Yates non destructif. Retourne une nouvelle liste mélangée.
 * Utilisé pour présenter les cas de Warmup dans un ordre différent à chaque
 * lancement (premier mount + chaque clic « Recommencer »).
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

interface Props {
  cases: WarmupCase[];
  /** Callback optionnel après la complétion (pour stats / dismissal). */
  onComplete?: (stats: { total: number; correct: number }) => void;
  /** Démarre directement en mode "playing" (saute l'écran intro avec l'encart règle). */
  skipIntro?: boolean;
  /** Contenu additionnel rendu après le bouton « Recommencer » dans l'état done. */
  endSlot?: import("react").ReactNode;
}

interface Answer {
  caseId: string;
  user: WarmupAnswer;
  correct: boolean;
}

type Stage = "intro" | "playing" | "level-transition" | "done";

export function Warmup({ cases, onComplete, skipIntro = false, endSlot }: Props) {
  // Groupement par niveau — mémorisé pour stabilité de référence côté init.
  const allLevel1 = useMemo(() => cases.filter((c) => c.level === 1), [cases]);
  const allLevel2 = useMemo(() => cases.filter((c) => c.level === 2), [cases]);

  // Ordre randomisé à chaque lancement (mount + reset). Shuffle indépendant par niveau
  // pour préserver la progression pédagogique (verbes purs d'abord, mini-objectifs ensuite).
  const [level1, setLevel1] = useState<WarmupCase[]>(() => shuffle(allLevel1));
  const [level2, setLevel2] = useState<WarmupCase[]>(() => shuffle(allLevel2));

  const [stage, setStage] = useState<Stage>(skipIntro ? "playing" : "intro");
  const [currentLevel, setCurrentLevel] = useState<1 | 2>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [revealed, setRevealed] = useState<WarmupAnswer | null>(null);
  const [streak, setStreak] = useState(0); // bonnes réponses d'affilée — pour le combo

  const currentList = currentLevel === 1 ? level1 : level2;
  const currentCase = currentList[currentIndex] ?? null;

  // Score live = bonnes réponses sur toutes les questions vues jusqu'ici (tous niveaux confondus)
  const correctCount = answers.filter((a) => a.correct).length;

  function handleAnswer(answer: WarmupAnswer) {
    if (!currentCase || revealed) return;
    const correct = answer === currentCase.expected;
    setAnswers((prev) => [...prev, { caseId: currentCase.id, user: answer, correct }]);
    setRevealed(answer);
    setStreak((s) => (correct ? s + 1 : 0));
  }

  function handleNext() {
    setRevealed(null);
    if (currentIndex < currentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }
    // Fin du niveau courant
    if (currentLevel === 1 && level2.length > 0) {
      setStage("level-transition");
      return;
    }
    finish();
  }

  function startLevel2() {
    setCurrentLevel(2);
    setCurrentIndex(0);
    setStage("playing");
  }

  function finish() {
    setStage("done");
    if (onComplete) {
      onComplete({
        total: answers.length,
        correct: answers.filter((a) => a.correct).length,
      });
    }
  }

  function reset() {
    // Re-shuffle à chaque rejouer : l'utilisateur ne refait pas le même parcours.
    setLevel1(shuffle(allLevel1));
    setLevel2(shuffle(allLevel2));
    setAnswers([]);
    setCurrentIndex(0);
    setCurrentLevel(1);
    setRevealed(null);
    setStreak(0);
    setStage("intro");
  }

  // ============================================================
  // Rendu — intro
  // ============================================================
  if (stage === "intro") {
    return (
      <section className="warmup warmup--intro" aria-labelledby="warmup-intro-title">
        <div className="warmup__kicker">Échauffement</div>
        <h3 id="warmup-intro-title" className="warmup__title">
          Output ou outcome ? Repère la différence.
        </h3>
        <div className="warmup__rule" role="note">
          <p>
            <strong>Si le verbe décrit ce que tu fais</strong>, c'est un <em>output</em>.
            <br />
            <strong>S'il décrit ce qui change après</strong>, c'est un <em>outcome</em>.
          </p>
          <p className="warmup__rule-aside">
            Un bon objectif vise un <em>outcome</em> : un effet mesurable côté utilisateur ou métier.
          </p>
        </div>
        <p className="warmup__lede">
          {level1.length} verbes à classer, puis {level2.length} mini-objectifs où le contexte tranche.
          L'ordre change à chaque lancement.
        </p>
        <div className="warmup__actions">
          <button className="btn btn--primary" onClick={() => setStage("playing")}>
            Lancer l'échauffement ›
          </button>
        </div>
      </section>
    );
  }

  // ============================================================
  // Rendu — transition entre niveaux
  // ============================================================
  if (stage === "level-transition") {
    const l1Score = answers.filter((a) => a.correct).length;
    return (
      <section className="warmup warmup--transition" aria-live="polite">
        <div className="warmup__kicker">Niveau 1 terminé · {l1Score} / {level1.length}</div>
        <h3 className="warmup__title">Niveau 2 : le contexte tranche</h3>
        <p className="warmup__lede">
          Le verbe seul ne suffit pas toujours. Voici {level2.length} mini-objectifs : à toi de juger
          chacun selon son contexte entier.
        </p>
        <div className="warmup__actions">
          <button className="btn btn--primary" onClick={startLevel2}>
            Niveau 2 ›
          </button>
        </div>
      </section>
    );
  }

  // ============================================================
  // Rendu — done
  // ============================================================
  if (stage === "done") {
    const correct = answers.filter((a) => a.correct).length;
    const total = answers.length;
    const ratio = correct / total;
    const verdict =
      ratio >= 0.9 ? "Solide" : ratio >= 0.7 ? "Bonne base" : "À retravailler";
    return (
      <section className="warmup warmup--done" aria-live="polite">
        <div className="warmup__kicker">Échauffement terminé</div>
        <h3 className="warmup__title">
          <span className="warmup__score">{correct} / {total}</span>
          <span className="warmup__verdict">{verdict}</span>
        </h3>
        <p className="warmup__lede">
          {ratio >= 0.9
            ? "Tu maîtrises la distinction. Tu peux passer à un autre exercice ou recommencer pour aller plus vite."
            : ratio >= 0.7
              ? "Tu connais l'essentiel. Recommence quelques fois pour consolider les cas ambigus, ou explore la Théorie pour creuser."
              : "Reprends doucement : recommence pour t'imprégner du pattern, ou va lire les fiches dans l'onglet Théorie."}
        </p>
        <div className="warmup__actions">
          <button className="btn" onClick={reset}>
            Recommencer
          </button>
        </div>
        {endSlot}
      </section>
    );
  }

  // ============================================================
  // Rendu — playing
  // ============================================================
  if (!currentCase) return null;
  const answeredAnswer = revealed;
  const isLastInList = currentIndex >= currentList.length - 1;
  // Texte de progression dynamique, à droite du kicker — score live
  const totalAnswered = answers.length + (revealed ? 0 : 0); // answers est déjà mis à jour après handleAnswer
  const liveScoreLabel =
    totalAnswered > 0
      ? `${correctCount} ✓ sur ${totalAnswered}`
      : "Première question";

  return (
    <section className="warmup warmup--playing" aria-live="polite">
      <div className="warmup__kicker warmup__kicker--play">
        <span>
          Niveau {currentLevel} · Cas {currentIndex + 1} / {currentList.length}
        </span>
        <span className="warmup__live-score" aria-label={`Score en cours : ${liveScoreLabel}`}>
          {liveScoreLabel}
        </span>
      </div>

      <div className="warmup__prompt-wrap">
        {currentCase.kind === "verb" ? (
          <p className="warmup__prompt warmup__prompt--verb">
            <em>{currentCase.prompt}</em>
          </p>
        ) : (
          <p className="warmup__prompt warmup__prompt--objective">
            « {currentCase.prompt} »
          </p>
        )}
      </div>

      <div className="warmup__choices" role="group" aria-label="Output ou outcome">
        <button
          type="button"
          className={`warmup__choice warmup__choice--output ${
            answeredAnswer === "output"
              ? currentCase.expected === "output"
                ? "warmup__choice--correct"
                : "warmup__choice--wrong"
              : ""
          } ${revealed && currentCase.expected === "output" && answeredAnswer !== "output" ? "warmup__choice--should" : ""}`}
          onClick={() => handleAnswer("output")}
          disabled={!!revealed}
        >
          OUTPUT
          <span className="warmup__choice-sub">ce qu'on produit</span>
        </button>
        <button
          type="button"
          className={`warmup__choice warmup__choice--outcome ${
            answeredAnswer === "outcome"
              ? currentCase.expected === "outcome"
                ? "warmup__choice--correct"
                : "warmup__choice--wrong"
              : ""
          } ${revealed && currentCase.expected === "outcome" && answeredAnswer !== "outcome" ? "warmup__choice--should" : ""}`}
          onClick={() => handleAnswer("outcome")}
          disabled={!!revealed}
        >
          OUTCOME
          <span className="warmup__choice-sub">le résultat constaté</span>
        </button>
      </div>

      {revealed && (
        <div
          className={`warmup__feedback warmup__feedback--${
            revealed === currentCase.expected ? "good" : "bad"
          }`}
          role="status"
        >
          <p className="warmup__feedback-verdict">
            {revealed === currentCase.expected ? (
              <>
                <Icon name="good" size={16} />
                <span>
                  Bien vu.
                  {streak >= 3 && (
                    <span className="warmup__combo" aria-label={`Combo de ${streak}`}>
                      {" "}
                      · Combo ×{streak}
                    </span>
                  )}
                </span>
              </>
            ) : (
              <>
                <Icon name="bad" size={16} /> Réponse attendue :{" "}
                <strong>{currentCase.expected}</strong>.
              </>
            )}
          </p>
          <p className="warmup__feedback-explanation">{currentCase.explanation}</p>
          <button
            className={`warmup__feedback-next warmup__feedback-next--${
              revealed === currentCase.expected ? "good" : "bad"
            }`}
            onClick={handleNext}
          >
            {!isLastInList
              ? "Suivant ›"
              : currentLevel === 1 && level2.length > 0
                ? "Passer au niveau 2 ›"
                : "Voir le bilan ›"}
          </button>
        </div>
      )}
    </section>
  );
}
