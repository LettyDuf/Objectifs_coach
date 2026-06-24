/**
 * Écran Défi générique — Sprint et PI.
 *
 * Pioche dans le pool de cartes contexte du type demandé. Construit le draft
 * d'évaluation selon le type (SprintDraft ou PiDraft avec valeurs par défaut
 * raisonnables pour le mode pédagogique).
 *
 * Remplace `SprintChallenge` qui devient un alias rétrocompatible.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { CoachUseCase } from "../../domain/ports";
import type {
  EvaluationResult,
  ObjectiveDraft,
  ObjectiveType,
  PiDraft,
  SprintDraft,
} from "../../domain/types";
import type { ScenarioCard } from "../../domain/scenario";
import { createContentRepository } from "../../content/repository";
import { canAdvance } from "../challenge";
import { EvaluationPanel } from "../components/EvaluationPanel";
import { Icon, type IconName } from "../components/Icon";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { useSession } from "../SessionContext";

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

/** Construit un draft « brouillon » selon le type, en réutilisant le texte saisi. */
function buildDraft(type: ObjectiveType, text: string, opts: {
  confidence: number;
  hasExplicitDeadline: boolean;
  isUnderTeamInfluence: boolean;
}): ObjectiveDraft {
  if (type === "pi") {
    const piDraft: PiDraft = {
      type: "pi",
      text,
      audience: "dev",
      confidence: opts.confidence,
      hasExplicitDeadline: opts.hasExplicitDeadline,
      isUnderTeamInfluence: opts.isUnderTeamInfluence,
      piClass: "committed",
      businessValue: 7,
    };
    return piDraft;
  }
  const sprintDraft: SprintDraft = {
    type: "sprint",
    text,
    audience: "dev",
    confidence: opts.confidence,
    hasExplicitDeadline: opts.hasExplicitDeadline,
    isUnderTeamInfluence: opts.isUnderTeamInfluence,
  };
  return sprintDraft;
}

function freshRewrite() {
  return { text: "", confidence: 75, hasExplicitDeadline: false, isUnderTeamInfluence: false };
}

function drawCard(pool: ScenarioCard[], excludeId: string | null): ScenarioCard {
  if (pool.length <= 1) return pool[0]!;
  const eligible = excludeId ? pool.filter((c) => c.id !== excludeId) : pool;
  return eligible[Math.floor(Math.random() * eligible.length)]!;
}

export function Challenge({ coach, type, onExit }: Props) {
  const pool = useMemo(() => repo.getScenarioCards(type, "dev"), [type]);
  const [card, setCard] = useState<ScenarioCard | null>(() =>
    pool.length > 0 ? drawCard(pool, null) : null,
  );
  const [rewrite, setRewrite] = useState(freshRewrite);
  const [solvedCount, setSolvedCount] = useState(0);
  const session = useSession();

  const rewriteEval = rewrite.text.trim().length > 0
    ? coach.evaluate(buildDraft(type, rewrite.text, rewrite))
    : null;
  const canPass = rewriteEval !== null && canAdvance(rewriteEval.score);
  const hasContent = rewrite.text.trim().length > 0;

  const previousRewriteResult = useRef<EvaluationResult | null>(null);
  const displayedPreviousRewrite = previousRewriteResult.current;
  useEffect(() => {
    if (rewriteEval) previousRewriteResult.current = rewriteEval;
  }, [rewriteEval]);

  if (pool.length === 0) {
    return (
      <Screen
        header={{ title: `Défi ${TYPE_LABELS[type]}`, lede: "Aucune carte contexte disponible." }}
        body={{ variant: "single", primary: <Zone variant="primary"><p>Reviens plus tard.</p></Zone> }}
        actions={{ right: <button className="btn" onClick={onExit}>Retour</button> }}
      />
    );
  }

  if (!card) return null;

  const originalEval = coach.evaluate(
    buildDraft(type, card.proposedObjective, {
      confidence: 80,
      hasExplicitDeadline: false,
      isUnderTeamInfluence: true,
    }),
  );

  function pickNextCard() {
    if (canPass) {
      session.bump();
      setSolvedCount((n) => n + 1);
    }
    const next = drawCard(pool, card?.id ?? null);
    setCard(next);
    setRewrite(freshRewrite());
    previousRewriteResult.current = null;
  }

  function update<K extends keyof ReturnType<typeof freshRewrite>>(
    key: K,
    value: ReturnType<typeof freshRewrite>[K],
  ) {
    setRewrite((d) => ({ ...d, [key]: value }));
  }

  return (
    <Screen
      header={{
        eyebrow: (
          <span>
            {TYPE_LABELS[type]} · Défi · {solvedCount > 0
              ? `${solvedCount} objectif${solvedCount > 1 ? "s" : ""} sauvé${solvedCount > 1 ? "s" : ""}`
              : "1ère carte"}
          </span>
        ),
        title: "À toi de reformuler",
        lede: "L'équipe te propose un objectif bancal. Réécris-le pour qu'il vise un résultat mesurable.",
        actions: (
          <button className="btn" onClick={pickNextCard} type="button">
            <Icon name="puzzle" size={14} /> Tirer une autre carte
          </button>
        ),
      }}
      body={{
        variant: "wide-rail",
        primary: (
          <Zone
            variant="primary"
            title="Carte de la session"
            meta={card.teamLabel}
          >
            <article className="scenario-card" style={{ margin: 0, boxShadow: "none" }}>
              <div className="scenario-card__header">
                {card.iconName && (
                  <span className="scenario-card__avatar" aria-hidden="true">
                    <Icon name={card.iconName as IconName} size={22} />
                  </span>
                )}
                <p className="scenario-card__situation">{card.situation}</p>
              </div>

              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", margin: "var(--space-3) 0 var(--space-2)" }}>
                L'équipe te propose cet objectif :
              </p>
              <blockquote className="scenario-card__quote">
                « {card.proposedObjective} »
              </blockquote>

              <p className="scenario-card__hint">
                <Icon name="target" size={14} /> Bénéficiaire attendu : <strong>{card.expectedBeneficiary ?? "à identifier"}</strong>
              </p>

              <details style={{ marginTop: "var(--space-3)", fontSize: "var(--font-size-sm)" }}>
                <summary style={{ cursor: "pointer", color: "var(--color-text-muted)" }}>
                  Voir le diagnostic du moteur sur cette proposition
                </summary>
                <div style={{ marginTop: "var(--space-3)" }}>
                  <EvaluationPanel result={originalEval} />
                </div>
              </details>
            </article>

            <div
              style={{
                marginTop: "var(--space-5)",
                paddingTop: "var(--space-5)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <h3 className="zone__title" style={{ margin: 0 }}>Ta réécriture</h3>
                {!hasContent && (
                  <span className="zone__meta">à écrire ici ↓</span>
                )}
              </div>

              <div className="field">
                <textarea
                  id="rewrite-text"
                  className={`field__textarea ${!hasContent ? "field__textarea--invite" : ""}`}
                  placeholder={
                    type === "pi"
                      ? "Vise un outcome business, nomme la mesure, ancre l'échéance dans le PI."
                      : "Vise un outcome, nomme la mesure, ancre l'échéance dans le sprint."
                  }
                  value={rewrite.text}
                  onChange={(e) => update("text", e.target.value)}
                  style={{ minHeight: 140, fontSize: "var(--font-size-md)" }}
                />
              </div>

              <details>
                <summary
                  style={{
                    cursor: "pointer",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginTop: "var(--space-3)",
                  }}
                >
                  Paramètres complémentaires
                </summary>

                <div style={{ marginTop: "var(--space-4)" }}>
                  <div className="field">
                    <label className="field__label" htmlFor="rewrite-confidence">
                      Confiance ({type === "pi" ? "80 à 100 % pour un committed PI" : "≥ 70 % pour un sprint"})
                    </label>
                    <div className="confidence-row">
                      <input
                        id="rewrite-confidence"
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={rewrite.confidence}
                        onChange={(e) => update("confidence", Number(e.target.value))}
                      />
                      <span className="confidence-row__value">{rewrite.confidence} %</span>
                    </div>
                  </div>

                  <div className="field__check">
                    <input
                      id="rewrite-deadline"
                      type="checkbox"
                      checked={rewrite.hasExplicitDeadline}
                      onChange={(e) => update("hasExplicitDeadline", e.target.checked)}
                    />
                    <label htmlFor="rewrite-deadline" className="field__label">
                      Échéance claire
                    </label>
                  </div>

                  <div className="field__check">
                    <input
                      id="rewrite-influence"
                      type="checkbox"
                      checked={rewrite.isUnderTeamInfluence}
                      onChange={(e) => update("isUnderTeamInfluence", e.target.checked)}
                    />
                    <label htmlFor="rewrite-influence" className="field__label">
                      Sous influence de l'équipe / du train
                    </label>
                  </div>
                </div>
              </details>
            </div>
          </Zone>
        ),
        context: (
          <Zone variant="context" aria-label="Évaluation de la réécriture">
            <EvaluationPanel result={rewriteEval} previousResult={displayedPreviousRewrite} />
          </Zone>
        ),
      }}
      actions={{
        left: (
          <button className="btn" onClick={onExit} type="button">
            Quitter
          </button>
        ),
        status: rewriteEval ? (
          <span
            className={`score-chip score-chip--${rewriteEval.overallStatus}`}
            aria-label={`Score ${rewriteEval.score} sur 100`}
          >
            <span className="score-chip__label">Score</span>
            {rewriteEval.score} / 100
          </span>
        ) : (
          <span>Écris ta réécriture pour voir le score.</span>
        ),
        right: (
          <button
            className="btn btn--primary"
            aria-disabled={!canPass}
            onClick={canPass ? pickNextCard : undefined}
            aria-label={canPass ? "Réécriture validée — carte suivante" : "Atteins 80 pour valider"}
          >
            {canPass ? "Réécrit. Suivant ›" : "80 pour débloquer"}
          </button>
        ),
      }}
    />
  );
}
