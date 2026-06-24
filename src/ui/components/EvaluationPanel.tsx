/**
 * Affichage du résultat d'évaluation — score, barre de progression, critères détaillés.
 *
 * Vague 3 : si une évaluation précédente est fournie via `previousResult`, on calcule
 * le diff et on affiche une section « Ce qui a changé » avec ↑/↓/= par critère.
 * Source : Mockup B validé par Lætitia 2026-06-21.
 *
 * Règle a11y (S2 audit) : `aria-live` limité au résumé score + statut.
 * Règle visuelle (D7) : couleur jamais seule porteuse — icône + texte + couleur.
 */

import type { EvaluationResult, CriterionStatus } from "../../domain/types";
import { diffEvaluations, type DeltaDirection } from "../../domain/diff";

interface Props {
  result: EvaluationResult | null;
  /** Évaluation précédente — déclenche l'affichage du diff si fournie. */
  previousResult?: EvaluationResult | null;
}

function statusLabel(status: CriterionStatus): string {
  switch (status) {
    case "good": return "Solide";
    case "warn": return "Presque";
    case "bad": return "À refaire";
  }
}

function statusIcon(status: CriterionStatus): string {
  return status === "good" ? "✓" : status === "warn" ? "⚠" : "✕";
}

function statusAriaLabel(status: CriterionStatus): string {
  return status === "good" ? "atteint" : status === "warn" ? "partiel" : "raté";
}

function directionIcon(d: DeltaDirection): string {
  return d === "up" ? "↑" : d === "down" ? "↓" : "=";
}

function formatDelta(delta: number): string {
  const rounded = Math.round(delta * 10) / 10;
  if (rounded === 0) return "±0";
  const sign = rounded > 0 ? "+" : "";
  return `${sign}${rounded}`;
}

export function EvaluationPanel({ result, previousResult }: Props) {
  if (!result) {
    return (
      <div className="evaluation evaluation--placeholder">
        <p className="screen-lede" style={{ marginBottom: 0 }}>
          Page blanche. Écris quelque chose pour voir le diagnostic.
        </p>
      </div>
    );
  }

  // Si la précédente existe et est différente, on affiche le diff.
  const showDiff = previousResult !== null && previousResult !== undefined;
  const diff = showDiff ? diffEvaluations(previousResult, result) : null;

  return (
    <section className="evaluation" aria-labelledby="eval-title">
      <div className="evaluation__header" aria-live="polite" aria-atomic="true">
        <div>
          <h2 id="eval-title" style={{ margin: 0, fontSize: "var(--font-size-md)" }}>
            Évaluation
          </h2>
          <p className="evaluation__score" aria-label={`Score ${result.score} sur 100`}>
            {result.score}
            <span className="evaluation__score-unit"> / 100</span>
          </p>
          {diff && diff.scoreDelta !== 0 && (
            <p
              className="evaluation__delta"
              style={{
                margin: "var(--space-2) 0 0",
                fontSize: "var(--font-size-base)",
                color: diff.scoreDirection === "up" ? "var(--color-good)" :
                       diff.scoreDirection === "down" ? "var(--color-warn)" :
                       "var(--color-text-muted)",
              }}
            >
              {directionIcon(diff.scoreDirection)} {formatDelta(diff.scoreDelta)} depuis ta dernière version
            </p>
          )}
        </div>
        <span className={`evaluation__status evaluation__status--${result.overallStatus}`}>
          {statusIcon(result.overallStatus)} {statusLabel(result.overallStatus)}
        </span>
      </div>

      <div
        className="evaluation__score-bar"
        role="progressbar"
        aria-valuenow={result.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Score ${result.score} sur 100`}
      >
        <div
          className={`evaluation__score-bar-fill evaluation__score-bar-fill--${result.overallStatus}`}
          style={{ width: `${result.score}%` }}
        />
      </div>

      {/* Section diff — visible seulement si on a une version précédente */}
      {diff && (
        <div className="evaluation__diff">
          <p className="evaluation__diff-title">Ce qui a changé</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {diff.criteriaDeltas.map((d) => (
              <li
                key={d.id}
                className={`criterion-delta criterion-delta--${d.direction}`}
              >
                <span className={`criterion-delta__arrow criterion-delta__arrow--${d.direction}`}>
                  {directionIcon(d.direction)}
                </span>
                <div className="criterion-delta__body">
                  <div className="criterion-delta__label">{d.label}</div>
                  <div className="criterion-delta__message">{d.message}</div>
                </div>
                <span className="criterion-delta__value">{formatDelta(d.delta)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Liste détaillée des critères (toujours affichée quand pas de diff) */}
      {!diff && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {result.criteria.map((c) => (
            <li key={c.id} className="criterion">
              <span
                className={`criterion__icon criterion__icon--${c.status}`}
                aria-label={statusAriaLabel(c.status)}
              >
                {statusIcon(c.status)}
              </span>
              <div>
                <div className="criterion__label">{c.label}</div>
                <div className="criterion__message">{c.message}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
