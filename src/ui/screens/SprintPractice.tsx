/**
 * Écran S'entraîner — Sprint.
 *
 * **Pilote du gabarit Screen** (D17). Composition :
 *   - ScreenHeader : eyebrow + titre + lede + bouton « Vider »
 *   - ScreenBody --wide-rail
 *       Primary : <Zone primary> contenant le textarea + paramètres en <details> repliable
 *       Context : <EvaluationPanel> en zone contexte (sticky)
 *   - ScreenActions : statut centre (score), actions à droite (3 boutons d'export)
 *
 * ExportPanel actuel non utilisé ici : les 3 actions d'export sont inlinées dans la
 * toolbar basse pour rester visibles en permanence.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { CoachUseCase } from "../../domain/ports";
import type { EvaluationResult, SprintDraft } from "../../domain/types";
import { EvaluationPanel } from "../components/EvaluationPanel";
import { Warmup } from "../components/Warmup";
import { PracticeExamples } from "../components/PracticeExamples";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { toJson, toMarkdown } from "../../adapters/export";
import { createContentRepository } from "../../content/repository";

const repo = createContentRepository();

interface Props {
  coach: CoachUseCase;
}

const INITIAL: SprintDraft = {
  type: "sprint",
  text: "",
  audience: "dev",
  confidence: 75,
  hasExplicitDeadline: false,
  isUnderTeamInfluence: false,
};

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function SprintPractice({ coach }: Props) {
  const [draft, setDraft] = useState<SprintDraft>(INITIAL);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const warmupCases = useMemo(() => repo.getWarmupCases("sprint", "dev"), []);
  const examples = useMemo(() => repo.getExamples("sprint", "dev"), []);

  const result = useMemo(() => {
    if (draft.text.trim().length === 0) return null;
    return coach.evaluate(draft);
  }, [draft, coach]);

  // Diff entre versions
  const previousResult = useRef<EvaluationResult | null>(null);
  const displayedPrevious = previousResult.current;
  useEffect(() => {
    if (result) previousResult.current = result;
  }, [result]);

  function update<K extends keyof SprintDraft>(key: K, value: SprintDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function flash(message: string) {
    setExportFeedback(message);
    window.setTimeout(() => setExportFeedback(null), 2500);
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard
      .writeText(toMarkdown(draft, result))
      .then(() => flash("Copié."))
      .catch(() => flash("Impossible d'accéder au presse-papier."));
  }

  function handleDownloadMd() {
    if (!result) return;
    downloadFile("objectif.md", toMarkdown(draft, result), "text/markdown;charset=utf-8");
    flash(".md téléchargé.");
  }

  function handleDownloadJson() {
    if (!result) return;
    downloadFile("objectif.json", toJson(draft, result), "application/json;charset=utf-8");
    flash(".json téléchargé.");
  }

  const hasContent = draft.text.trim().length > 0;

  return (
    <Screen
      header={{
        eyebrow: <span>Sprint · S'entraîner</span>,
        title: "Échauffe-toi, inspire-toi, écris",
        lede:
          "Trois étapes empilées. Tu peux sauter les deux premières si tu te sens prêt. Le diagnostic réagit en direct à droite.",
        actions: (
          <button
            type="button"
            className="btn"
            onClick={() => setDraft(INITIAL)}
            disabled={!hasContent}
          >
            Vider
          </button>
        ),
      }}
      body={{
        variant: "wide-rail",
        primary: (
          <div className="practice-steps">
            {warmupCases.length > 0 && (
              <details className="practice-step" open>
                <summary className="practice-step__summary">
                  <span className="practice-step__num">1</span>
                  <span className="practice-step__title">Échauffement output / outcome</span>
                  <span className="practice-step__hint">2 min · optionnel</span>
                </summary>
                <div className="practice-step__body">
                  <Warmup cases={warmupCases} />
                </div>
              </details>
            )}

            {examples.length > 0 && (
              <details className="practice-step">
                <summary className="practice-step__summary">
                  <span className="practice-step__num">2</span>
                  <span className="practice-step__title">Inspire-toi d'exemples annotés</span>
                  <span className="practice-step__hint">optionnel</span>
                </summary>
                <div className="practice-step__body">
                  <PracticeExamples coach={coach} examples={examples} />
                </div>
              </details>
            )}

          <Zone
            variant="primary"
            title="3 · Écris ton objectif de sprint"
            meta={hasContent ? "score en direct" : undefined}
          >
            <div className="field">
              <textarea
                id="objective-text"
                className={`field__textarea ${!hasContent ? "field__textarea--invite" : ""}`}
                placeholder="Ex. Réduire de 50 % le taux d'abandon au paiement sur mobile d'ici la fin du sprint 24."
                value={draft.text}
                onChange={(e) => update("text", e.target.value)}
                style={{ minHeight: 160, fontSize: "var(--font-size-md)" }}
                aria-label="Ton objectif de sprint"
              />
              <span className="field__hint">
                Décris un résultat (ce qui aura changé), pas une livraison.
              </span>
            </div>

            <details
              style={{
                marginTop: "var(--space-4)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Paramètres complémentaires
              </summary>

              <div style={{ marginTop: "var(--space-4)" }}>
                <div className="field">
                  <label className="field__label" htmlFor="confidence">
                    Confiance estimée (≥ 70 % pour un sprint)
                  </label>
                  <div className="confidence-row">
                    <input
                      id="confidence"
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={draft.confidence ?? 75}
                      onChange={(e) => update("confidence", Number(e.target.value))}
                    />
                    <span className="confidence-row__value">{draft.confidence ?? 75} %</span>
                  </div>
                </div>

                <div className="field__check">
                  <input
                    id="deadline"
                    type="checkbox"
                    checked={draft.hasExplicitDeadline ?? false}
                    onChange={(e) => update("hasExplicitDeadline", e.target.checked)}
                  />
                  <label htmlFor="deadline" className="field__label">
                    Échéance claire (fin du sprint, date, itération nommée)
                  </label>
                </div>

                <div className="field__check">
                  <input
                    id="influence"
                    type="checkbox"
                    checked={draft.isUnderTeamInfluence ?? false}
                    onChange={(e) => update("isUnderTeamInfluence", e.target.checked)}
                  />
                  <label htmlFor="influence" className="field__label">
                    L'équipe a réellement le pouvoir d'agir sur ce résultat
                  </label>
                </div>
              </div>
            </details>
          </Zone>
          </div>
        ),
        context: (
          <Zone variant="context" aria-label="Évaluation en direct">
            <EvaluationPanel result={result} previousResult={displayedPrevious} />
          </Zone>
        ),
      }}
      actions={{
        status: result ? (
          <span
            className={`score-chip score-chip--${result.overallStatus}`}
            aria-label={`Score ${result.score} sur 100`}
          >
            <span className="score-chip__label">Score</span>
            {result.score} / 100
          </span>
        ) : exportFeedback ? (
          <span style={{ color: "var(--color-good)" }}>{exportFeedback}</span>
        ) : (
          <span>Écris quelque chose pour déclencher l'évaluation.</span>
        ),
        right: (
          <>
            <button className="btn" onClick={handleCopy} disabled={!result}>
              Copier
            </button>
            <button className="btn" onClick={handleDownloadMd} disabled={!result}>
              .md
            </button>
            <button
              className="btn btn--primary"
              onClick={handleDownloadJson}
              disabled={!result}
            >
              Exporter .json
            </button>
          </>
        ),
      }}
    />
  );
}
