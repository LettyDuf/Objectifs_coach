/**
 * Worksheet guidé « Maintenance : trouver la valeur » (option 1 du cadrage
 * du 2026-07-04, D44). Contrairement au QCM (D40), l'utilisatrice travaille
 * sur SA propre tâche de maintenance, en texte libre. Pas de jugement, pas
 * de score — même doctrine que Composer (D26) : on fait émerger, on ne
 * corrige pas une erreur.
 *
 * Les 3 questions posées sont dérivées de la section « Trois questions à se
 * poser » de la fiche Théorie `sprint.sheet.maintenance-value` (zéro contenu
 * dupliqué) ; seule la question 0 (décrire la tâche) est un texte d'accroche
 * propre à cet écran, pas une donnée pédagogique.
 */

import { useMemo, useState } from "react";

import { createContentRepository } from "../../content/repository";
import { buildMaintenanceDraftSentence, type MaintenanceWorksheetAnswers } from "../../domain/maintenance-worksheet";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";

interface Props {
  onExit: () => void;
}

const repo = createContentRepository();
const EMPTY_ANSWERS: MaintenanceWorksheetAnswers = { task: "", beneficiary: "", change: "", measure: "" };

/** Récupère les 3 questions déjà validées dans la fiche Théorie — zéro doublon de contenu. */
function useMaintenanceQuestions(): string[] {
  return useMemo(() => {
    const sheets = repo.getSheets("sprint", "dev");
    const sheet = sheets.find((s) => s.id === "sprint.sheet.maintenance-value");
    const section = sheet?.sections.find((sec) => sec.heading === "Trois questions à se poser");
    return section?.bullets ?? [];
  }, []);
}

type Step = 0 | 1 | 2 | 3 | 4;

export function MaintenanceWorksheet({ onExit }: Props) {
  const questions = useMaintenanceQuestions();
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<MaintenanceWorksheetAnswers>(EMPTY_ANSWERS);
  const [copyLabel, setCopyLabel] = useState("Copier le brouillon");

  const draft = useMemo(() => buildMaintenanceDraftSentence(answers), [answers]);

  function restart() {
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
    setCopyLabel("Copier le brouillon");
  }

  async function handleCopy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopyLabel("Copié ✓");
      window.setTimeout(() => setCopyLabel("Copier le brouillon"), 1800);
    } catch {
      setCopyLabel("Échec");
      window.setTimeout(() => setCopyLabel("Copier le brouillon"), 1800);
    }
  }

  const stepConfig: { title: string; lede: string; field: keyof MaintenanceWorksheetAnswers; placeholder: string }[] = [
    {
      title: "Décris ta tâche de maintenance",
      lede: "En quelques mots, le travail tel qu'il t'a été demandé — pas besoin de le reformuler tout de suite.",
      field: "task",
      placeholder: "Ex. Préparer et exécuter le test de reprise annuel en staging.",
    },
    {
      title: "Question 1",
      lede: questions[0] ?? "",
      field: "beneficiary",
      placeholder: "Ex. l'équipe d'astreinte, les utilisateurs finaux, l'équipe support…",
    },
    {
      title: "Question 2",
      lede: questions[1] ?? "",
      field: "change",
      placeholder: "Ex. l'astreinte détecte les vrais incidents plus vite.",
    },
    {
      title: "Question 3",
      lede: questions[2] ?? "",
      field: "measure",
      placeholder: "Ex. le nombre d'écarts critiques non résolus au test de reprise.",
    },
  ];

  if (step === 4) {
    return (
      <Screen
        header={{
          eyebrow: <span>Maintenance · Mon propre cas · Récapitulatif</span>,
          title: "Voici ce qui ressort",
          lede: "Pas un verdict — un brouillon à retravailler. Relis-le, ajuste-le, ou reprends une réponse.",
          actions: (
            <button className="btn" onClick={onExit} type="button">
              Quitter
            </button>
          ),
        }}
        body={{
          variant: "single",
          primary: (
            <Zone variant="primary" title="Tes réponses">
              <dl className="pitfall-feedback">
                <div className="pitfall-feedback__item">
                  <dt>Bénéficiaire</dt>
                  <dd>{answers.beneficiary.trim() || "(non précisé)"}</dd>
                </div>
                <div className="pitfall-feedback__item">
                  <dt>Changement constatable</dt>
                  <dd>{answers.change.trim() || "(non précisé)"}</dd>
                </div>
                <div className="pitfall-feedback__item">
                  <dt>Mesure</dt>
                  <dd>{answers.measure.trim() || "(non précisée)"}</dd>
                </div>
              </dl>

              {draft ? (
                <>
                  <p style={{ marginTop: "var(--space-4)", fontWeight: 500 }}>Brouillon assemblé</p>
                  <blockquote className="quiz-context__quote">« {draft} »</blockquote>
                  <button type="button" className="btn btn--ghost btn--sm" onClick={handleCopy}>
                    {copyLabel}
                  </button>
                </>
              ) : (
                <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)" }}>
                  Renseigne au moins le bénéficiaire et le changement pour voir un brouillon assemblé.
                </p>
              )}
            </Zone>
          ),
        }}
        actions={{
          left: (
            <button className="btn" onClick={onExit} type="button">
              Quitter
            </button>
          ),
          right: (
            <button className="btn btn--primary" onClick={restart} type="button">
              Recommencer ›
            </button>
          ),
        }}
      />
    );
  }

  const current = stepConfig[step]!;

  return (
    <Screen
      header={{
        eyebrow: <span>Maintenance · Mon propre cas · Étape {step + 1} / 4</span>,
        title: current.title,
        lede: current.lede,
        actions: (
          <button className="btn" onClick={onExit} type="button">
            Quitter
          </button>
        ),
      }}
      body={{
        variant: "single",
        primary: (
          <Zone variant="primary">
            <label htmlFor="maint-worksheet-textarea" className="analyse-input__label">
              Réponds en quelques mots, à ta façon — rien n'est noté.
            </label>
            <textarea
              id="maint-worksheet-textarea"
              className="analyse-input__textarea"
              rows={4}
              value={answers[current.field]}
              placeholder={current.placeholder}
              onChange={(e) => setAnswers((a) => ({ ...a, [current.field]: e.target.value }))}
            />
          </Zone>
        ),
      }}
      actions={{
        left:
          step > 0 ? (
            <button className="btn" onClick={() => setStep((s) => (s - 1) as Step)} type="button">
              ‹ Précédent
            </button>
          ) : (
            <button className="btn" onClick={onExit} type="button">
              Quitter
            </button>
          ),
        right: (
          <button className="btn btn--primary" onClick={() => setStep((s) => (s + 1) as Step)} type="button">
            {step < 3 ? "Suivant ›" : "Voir le récap ›"}
          </button>
        ),
      }}
    />
  );
}
