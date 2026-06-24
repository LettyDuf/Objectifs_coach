/**
 * Écran S'entraîner — OKR équipe.
 *
 * Spécificité OKR : un Objective + N Key Results (3 à 5). Chaque KR a son texte et
 * sa confiance estimée (cible 50-70 %). Le moteur évalue l'ensemble (le critère
 * `crediblyAmbitious` s'appuie sur la moyenne des confiances KR, voir engine.ts).
 *
 * Réutilise le gabarit Screen et `EvaluationPanel`, comme SprintPractice et PIPractice.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { CoachUseCase } from "../../domain/ports";
import type { EvaluationResult, KeyResultDraft, OkrTeamDraft } from "../../domain/types";
import { EvaluationPanel } from "../components/EvaluationPanel";
import { Warmup } from "../components/Warmup";
import { OkrPracticeExamples } from "../components/OkrPracticeExamples";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { toJson, toMarkdown } from "../../adapters/export";
import { createContentRepository } from "../../content/repository";

const repo = createContentRepository();

interface Props {
  coach: CoachUseCase;
}

const INITIAL: OkrTeamDraft = {
  type: "okr-equipe",
  text: "",
  audience: "dev",
  hasExplicitDeadline: false,
  isUnderTeamInfluence: false,
  keyResults: [
    { text: "", confidence: 60 },
    { text: "", confidence: 60 },
    { text: "", confidence: 60 },
  ],
};

const MAX_KR = 5;
const MIN_KR = 3;

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

export function OkrTeamPractice({ coach }: Props) {
  const [draft, setDraft] = useState<OkrTeamDraft>(INITIAL);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const warmupCases = useMemo(() => repo.getWarmupCases("okr-equipe", "dev"), []);
  const examples = useMemo(() => repo.getExamples("okr-equipe", "dev"), []);

  const hasContent =
    draft.text.trim().length > 0 || draft.keyResults.some((kr) => kr.text.trim().length > 0);

  const result = useMemo(() => {
    if (!hasContent) return null;
    return coach.evaluate(draft);
  }, [draft, coach, hasContent]);

  // Diff entre versions
  const previousResult = useRef<EvaluationResult | null>(null);
  const displayedPrevious = previousResult.current;
  useEffect(() => {
    if (result) previousResult.current = result;
  }, [result]);

  function updateObjective(text: string) {
    setDraft((d) => ({ ...d, text }));
  }

  function updateKr(index: number, patch: Partial<KeyResultDraft>) {
    setDraft((d) => ({
      ...d,
      keyResults: d.keyResults.map((kr, i) => (i === index ? { ...kr, ...patch } : kr)),
    }));
  }

  function addKr() {
    if (draft.keyResults.length >= MAX_KR) return;
    setDraft((d) => ({
      ...d,
      keyResults: [...d.keyResults, { text: "", confidence: 60 }],
    }));
  }

  function removeKr(index: number) {
    setDraft((d) => ({
      ...d,
      keyResults: d.keyResults.filter((_, i) => i !== index),
    }));
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
    downloadFile("okr-equipe.md", toMarkdown(draft, result), "text/markdown;charset=utf-8");
    flash(".md téléchargé.");
  }

  function handleDownloadJson() {
    if (!result) return;
    downloadFile(
      "okr-equipe.json",
      toJson(draft, result),
      "application/json;charset=utf-8",
    );
    flash(".json téléchargé.");
  }

  return (
    <Screen
      header={{
        eyebrow: <span>OKR équipe · S'entraîner</span>,
        title: "Écris ton OKR équipe",
        lede:
          "Un Objective qualitatif (sans chiffre), puis 3 à 5 Key Results mesurables. Diagnostic en direct à droite.",
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
                  <span className="practice-step__title">Inspire-toi d'OKR annotés</span>
                  <span className="practice-step__hint">optionnel</span>
                </summary>
                <div className="practice-step__body">
                  <OkrPracticeExamples coach={coach} examples={examples} />
                </div>
              </details>
            )}

          <Zone
            variant="primary"
            title="3 · Écris ton OKR équipe (trimestre)"
            meta={
              hasContent
                ? `${draft.keyResults.length} Key Result${draft.keyResults.length > 1 ? "s" : ""}`
                : undefined
            }
          >
            {/* Objective */}
            <div className="field">
              <label className="field__label" htmlFor="okr-objective">
                Objective — qualitatif, inspirant, mémorisable
              </label>
              <textarea
                id="okr-objective"
                className={`field__textarea ${!draft.text ? "field__textarea--invite" : ""}`}
                placeholder="Ex. Devenir l'outil de référence des équipes data pour l'observabilité."
                value={draft.text}
                onChange={(e) => updateObjective(e.target.value)}
                style={{ minHeight: 100, fontSize: "var(--font-size-md)" }}
                aria-label="Objective de l'OKR"
              />
              <span className="field__hint">
                Pas de chiffre dans l'Objective : les chiffres sont l'affaire des Key Results.
              </span>
            </div>

            {/* Key Results */}
            <div style={{ marginTop: "var(--space-5)" }}>
              <h3 className="zone__title">Key Results</h3>
              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-muted)",
                  margin: "0 0 var(--space-3)",
                }}
              >
                Vise 3 à 5 KR. Chacun chiffré, chacun outcome (pas un projet). Confiance cible :
                50 à 70 %.
              </p>

              {draft.keyResults.map((kr, index) => (
                <fieldset
                  key={index}
                  className="field-group"
                  style={{
                    marginBottom: "var(--space-3)",
                    padding: "var(--space-3)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-surface)",
                  }}
                >
                  <legend
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: 600,
                      padding: "0 var(--space-2)",
                    }}
                  >
                    KR {index + 1}
                  </legend>
                  <div className="field">
                    <label className="field__label" htmlFor={`kr-text-${index}`}>
                      Énoncé du Key Result
                    </label>
                    <textarea
                      id={`kr-text-${index}`}
                      className="field__textarea"
                      placeholder="Ex. Faire passer le NPS de 28 à 50 d'ici fin du trimestre."
                      value={kr.text}
                      onChange={(e) => updateKr(index, { text: e.target.value })}
                      style={{ minHeight: 60 }}
                      aria-label={`Texte du Key Result ${index + 1}`}
                    />
                  </div>
                  <div className="field" style={{ marginTop: "var(--space-3)" }}>
                    <label className="field__label" htmlFor={`kr-conf-${index}`}>
                      Confiance estimée (50 à 70 % attendu)
                    </label>
                    <div className="confidence-row">
                      <input
                        id={`kr-conf-${index}`}
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={kr.confidence ?? 60}
                        onChange={(e) =>
                          updateKr(index, { confidence: Number(e.target.value) })
                        }
                      />
                      <span className="confidence-row__value">{kr.confidence ?? 60} %</span>
                    </div>
                  </div>
                  {draft.keyResults.length > 1 && (
                    <div style={{ marginTop: "var(--space-2)", textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn--link"
                        onClick={() => removeKr(index)}
                        aria-label={`Retirer le Key Result ${index + 1}`}
                      >
                        Retirer ce KR
                      </button>
                    </div>
                  )}
                </fieldset>
              ))}

              {draft.keyResults.length < MAX_KR && (
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={addKr}
                  style={{ marginTop: "var(--space-2)" }}
                >
                  + Ajouter un Key Result
                </button>
              )}

              {draft.keyResults.length < MIN_KR && (
                <p
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-warn)",
                    marginTop: "var(--space-2)",
                  }}
                >
                  Un OKR demande au moins {MIN_KR} Key Results pour matérialiser l'Objective.
                </p>
              )}
            </div>

            {/* Paramètres complémentaires */}
            <details
              style={{
                marginTop: "var(--space-5)",
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
                <div className="field__check">
                  <input
                    id="okr-deadline"
                    type="checkbox"
                    checked={draft.hasExplicitDeadline ?? false}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, hasExplicitDeadline: e.target.checked }))
                    }
                  />
                  <label htmlFor="okr-deadline" className="field__label">
                    Échéance trimestrielle explicite (date ou nom du trimestre)
                  </label>
                </div>
                <div className="field__check">
                  <input
                    id="okr-influence"
                    type="checkbox"
                    checked={draft.isUnderTeamInfluence ?? false}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, isUnderTeamInfluence: e.target.checked }))
                    }
                  />
                  <label htmlFor="okr-influence" className="field__label">
                    L'équipe a réellement le pouvoir d'agir sur ces résultats
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
          <span>Écris ton Objective ou un KR pour déclencher l'évaluation.</span>
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
