/**
 * Écran S'entraîner — PI, version gabarit Screen (D17).
 *
 * Identique à SprintPractice mais avec deux champs PI spécifiques :
 *   - classe : committed (engagement) ou stretch (ambition haute)
 *   - valeur business 1-10 (métadonnée Business Owner — D11)
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CoachUseCase } from "../../domain/ports";
import type { EvaluationResult, PiClass, PiDraft } from "../../domain/types";
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

const INITIAL: PiDraft = {
  type: "pi",
  text: "",
  audience: "dev",
  confidence: 85,
  hasExplicitDeadline: false,
  isUnderTeamInfluence: false,
  piClass: "committed",
  businessValue: 5,
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

export function PIPractice({ coach }: Props) {
  const radioName = useId();
  const [draft, setDraft] = useState<PiDraft>(INITIAL);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const warmupCases = useMemo(() => repo.getWarmupCases("pi", "dev"), []);
  const examples = useMemo(() => repo.getExamples("pi", "dev"), []);

  const result = useMemo(() => {
    if (draft.text.trim().length === 0) return null;
    return coach.evaluate(draft);
  }, [draft, coach]);

  const previousResult = useRef<EvaluationResult | null>(null);
  const displayedPrevious = previousResult.current;
  useEffect(() => {
    if (result) previousResult.current = result;
  }, [result]);

  function update<K extends keyof PiDraft>(key: K, value: PiDraft[K]) {
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
    downloadFile("objectif-pi.md", toMarkdown(draft, result), "text/markdown;charset=utf-8");
    flash(".md téléchargé.");
  }

  function handleDownloadJson() {
    if (!result) return;
    downloadFile("objectif-pi.json", toJson(draft, result), "application/json;charset=utf-8");
    flash(".json téléchargé.");
  }

  const hasContent = draft.text.trim().length > 0;
  const expectedRange =
    draft.piClass === "committed" ? "80–100 % attendu" : "30–60 % attendu";

  return (
    <Screen
      header={{
        eyebrow: <span>Program Increment · S'entraîner</span>,
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
            title="3 · Écris ton objectif de PI"
            meta={hasContent ? "score en direct" : undefined}
          >
            <div className="field">
              <textarea
                id="objective-text"
                className={`field__textarea ${!hasContent ? "field__textarea--invite" : ""}`}
                placeholder="Ex. Permettre à 80 % de nos clients entreprise d'activer le SSO en self-service, mesuré sur le dernier mois du PI."
                value={draft.text}
                onChange={(e) => update("text", e.target.value)}
                style={{ minHeight: 160, fontSize: "var(--font-size-md)" }}
                aria-label="Ton objectif de PI"
              />
              <span className="field__hint">
                Décris un résultat de valeur métier observable à la PI Review.
              </span>
            </div>

            <fieldset
              style={{
                marginTop: "var(--space-4)",
                border: 0,
                borderTop: "1px solid var(--color-border)",
                padding: "var(--space-4) 0 0",
              }}
            >
              <legend
                style={{
                  fontSize: "var(--font-size-sm)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--color-text-muted)",
                  marginBottom: "var(--space-3)",
                  padding: 0,
                }}
              >
                Classe PI
              </legend>
              <div className="field__check">
                <input
                  type="radio"
                  name={radioName}
                  value="committed"
                  checked={draft.piClass === "committed"}
                  onChange={() => update("piClass", "committed")}
                />
                <span>
                  <strong>Committed</strong> : engagement, 80 à 100 % de confiance
                </span>
              </div>
              <div className="field__check">
                <input
                  type="radio"
                  name={radioName}
                  value="stretch"
                  checked={draft.piClass === "stretch"}
                  onChange={() => update("piClass", "stretch" as PiClass)}
                />
                <span>
                  <strong>Stretch</strong> : ambition haute, 30 à 60 % de confiance
                </span>
              </div>
            </fieldset>

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
                    Confiance estimée ({expectedRange})
                  </label>
                  <div className="confidence-row">
                    <input
                      id="confidence"
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={draft.confidence ?? 85}
                      onChange={(e) => update("confidence", Number(e.target.value))}
                    />
                    <span className="confidence-row__value">{draft.confidence ?? 85} %</span>
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
                    Échéance claire (PI Review, date)
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
                    Sous influence du train / des équipes
                  </label>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="business-value">
                    Valeur business (1–10, attribuée par le Business Owner)
                  </label>
                  <div className="confidence-row">
                    <input
                      id="business-value"
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={draft.businessValue ?? 5}
                      onChange={(e) => update("businessValue", Number(e.target.value))}
                    />
                    <span className="confidence-row__value">{draft.businessValue ?? 5} / 10</span>
                  </div>
                  <span className="field__hint">
                    Métadonnée stockée et rappelée à l'export, non notée par le moteur.
                  </span>
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
