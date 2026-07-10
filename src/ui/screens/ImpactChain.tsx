/**
 * Écran « Du trimestre au sprint » (La descente) — D61.
 *
 * Machine à états : liste des cas → intro (contexte + sceptique) → étapes de
 * descente (3 cartes + drapeau) → ligne de la revue de sprint (choisir le
 * maillon le plus haut montrable) → QCM final → fin (règle à retenir).
 * Les cas alerte sautent la ligne : le drapeau y est la bonne réponse.
 *
 * Toute la pédagogie vit dans le domaine (impact-chain.ts) et le corpus
 * (content/impact-chain) ; cet écran ne fait que dérouler.
 */

import { useState } from "react";
import type {
  ImpactChainCase,
  StepAnswer,
} from "../../domain/impact-chain";
import { answerOpensNext, evaluateStepAnswer } from "../../domain/impact-chain";
import { SPRINT_DEV_IMPACT_CHAIN_FR } from "../../content/impact-chain/sprint.dev.fr";
import { useSession } from "../SessionContext";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { Icon } from "../components/Icon";

interface Props {
  onExit: () => void;
}

type Phase = "list" | "intro" | "step" | "line" | "qcm" | "end";

const LEVELS: Array<[string, string]> = [
  ["Impact trimestriel", "visible au trimestre, le maillon du sponsor"],
  ["Outcome de sprint", "constatable à la revue, mesuré"],
  ["Output", "ce que l'équipe livre"],
  ["Acte technique", "le travail lui-même"],
];

export function ImpactChain({ onExit }: Props) {
  const cases = SPRINT_DEV_IMPACT_CHAIN_FR;
  const session = useSession();
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>("list");
  const [stepIdx, setStepIdx] = useState(0);
  const [answer, setAnswer] = useState<StepAnswer | null>(null);
  const [lineIdx, setLineIdx] = useState<number | null>(null);
  const [qcmIdx, setQcmIdx] = useState<number | null>(null);
  const [completed, setCompleted] = useState<ReadonlySet<string>>(new Set());

  const c = cases[caseIdx]!;

  function startCase(idx: number) {
    setCaseIdx(idx);
    setPhase("intro");
    setStepIdx(0);
    setAnswer(null);
    setLineIdx(null);
    setQcmIdx(null);
  }

  function nextFromStep() {
    const step = c.steps[stepIdx]!;
    if (step.flagIsCorrect) {
      setPhase("qcm");
      return;
    }
    if (stepIdx < c.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      setAnswer(null);
      return;
    }
    setPhase(c.line ? "line" : "qcm");
  }

  function finishCase() {
    if (!completed.has(c.id)) {
      setCompleted(new Set([...completed, c.id]));
      session.bump();
    }
    setPhase("end");
  }

  return (
    <Screen
      header={{
        eyebrow: <span>Sprint · S'entraîner · Du trimestre au sprint</span>,
        title: "Du trimestre au sprint",
        lede: "Visible à la revue de sprint ? Descends la chaîne d'impact maillon par maillon, du sponsor jusqu'à ta revue.",
        actions: (
          <button className="btn" onClick={phase === "list" ? onExit : () => setPhase("list")}>
            {phase === "list" ? "‹ Retour aux exercices" : "‹ Tous les cas"}
          </button>
        ),
      }}
      body={{
        variant: "single",
        primary: (
          <Zone variant="primary">
            {phase === "list" && (
              <div className="dchain__list">
                <p className="dchain__lede">
                  Quatre situations. À chaque fois, un sponsor, un objectif de trimestre, et la
                  même question : qu'est-ce que tu montres à la revue de sprint ?
                </p>
                <ul className="dchain__cases" role="list">
                  {cases.map((cc, i) => (
                    <li key={cc.id}>
                      <button type="button" className="card-button" onClick={() => startCase(i)}>
                        <span className="card-button__icon" aria-hidden="true">
                          <span className="drill-num drill-num--situation">
                            {completed.has(cc.id) ? <Icon name="good" size={16} /> : i + 1}
                          </span>
                        </span>
                        <span className="card-button__label">{cc.title}</span>
                        <span className="card-button__desc">{cc.team}</span>
                        <span className="card-button__cta">
                          {completed.has(cc.id) ? "Rejouer ›" : "Commencer ›"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {phase !== "list" && (
              <>
                <ContextCard c={c} />
                {phase === "intro" && (
                  <>
                    <SkepticBubble text={c.skepticQuestion} />
                    <div className="dchain__levels" role="note">
                      {LEVELS.map(([label, hint]) => (
                        <span key={label} className="dchain__level">
                          <strong>{label}</strong> : {hint}
                        </span>
                      ))}
                    </div>
                    <button className="btn btn--primary" onClick={() => setPhase("step")}>
                      Commencer la descente ›
                    </button>
                  </>
                )}

                {(phase === "step" || phase === "line" || phase === "end") && (
                  <ChainView c={c} upTo={phase === "step" ? stepIdx : c.steps.length} />
                )}

                {phase === "step" && (
                  <StepView
                    c={c}
                    stepIdx={stepIdx}
                    answer={answer}
                    onAnswer={setAnswer}
                    onNext={nextFromStep}
                  />
                )}

                {phase === "line" && c.line && (
                  <LineView
                    line={c.line}
                    picked={lineIdx}
                    onPick={setLineIdx}
                    onNext={() => setPhase("qcm")}
                  />
                )}

                {phase === "qcm" && (
                  <QcmView c={c} picked={qcmIdx} onPick={setQcmIdx} onNext={finishCase} />
                )}

                {phase === "end" && (
                  <>
                    <div className={`dchain__fb dchain__fb--${c.kind === "alerte" ? "warn" : "good"}`} role="status">
                      <p className="dchain__fb-title">La règle à retenir</p>
                      <p className="dchain__fb-text">{c.endRule}</p>
                    </div>
                    <p className="dchain__composer-hint">
                      Envie d'écrire le tien ? Le mode Composer t'attend avec le squelette complet.
                    </p>
                    <div className="dchain__actions">
                      <button className="btn" onClick={() => startCase(caseIdx)}>
                        Rejouer ce cas
                      </button>
                      {caseIdx < cases.length - 1 ? (
                        <button className="btn btn--primary" onClick={() => startCase(caseIdx + 1)}>
                          Cas suivant ›
                        </button>
                      ) : (
                        <button className="btn btn--primary" onClick={() => setPhase("list")}>
                          Tous les cas ›
                        </button>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </Zone>
        ),
      }}
      actions={{
        left: (
          <button className="btn" onClick={onExit}>
            Quitter
          </button>
        ),
      }}
    />
  );
}

function ContextCard({ c }: { c: ImpactChainCase }) {
  return (
    <div className="dchain__context">
      <p className="dchain__context-kicker">
        {c.team} · {c.objectiveLabel}
      </p>
      <p className="dchain__context-objective">{c.quarterlyObjective}</p>
      <p className="dchain__context-metrics">
        {c.metrics.map((m) => (
          <span key={m} className="dchain__metric">
            {m}
          </span>
        ))}
      </p>
    </div>
  );
}

function SkepticBubble({ text }: { text: string }) {
  return (
    <div className="dchain__skeptic">
      <span className="dchain__skeptic-avatar" aria-hidden="true">
        <Icon name="challenge" size={18} />
      </span>
      <div className="dchain__skeptic-bubble">
        <span className="dchain__skeptic-name">Le sceptique</span>
        <p className="dchain__skeptic-text">« {text} »</p>
      </div>
    </div>
  );
}

/** La chaîne construite : l'objectif du trimestre + les maillons accrochés. */
function ChainView({ c, upTo }: { c: ImpactChainCase; upTo: number }) {
  return (
    <div className="dchain__chain" aria-label="La chaîne, du trimestre vers le sprint">
      <div className="dchain__maillon">
        <span className="dchain__chip dchain__chip--tri">Impact trimestriel</span>
        <p>{c.quarterlyObjective}</p>
      </div>
      {c.steps.slice(0, upTo).map(
        (s) =>
          s.chainText && (
            <div key={s.id} className="dchain__maillon dchain__maillon--linked">
              <span
                className={`dchain__chip ${s.chainChip === "Livraison" ? "dchain__chip--liv" : "dchain__chip--out"}`}
              >
                {s.chainChip}
              </span>
              <p>{s.chainText}.</p>
            </div>
          ),
      )}
    </div>
  );
}

function StepView({
  c,
  stepIdx,
  answer,
  onAnswer,
  onNext,
}: {
  c: ImpactChainCase;
  stepIdx: number;
  answer: StepAnswer | null;
  onAnswer: (a: StepAnswer) => void;
  onNext: () => void;
}) {
  const step = c.steps[stepIdx]!;
  const verdict = answer !== null ? evaluateStepAnswer(step, answer) : null;
  const canNext = answerOpensNext(step, answer);
  return (
    <section aria-live="polite">
      <p className="dchain__question">{step.question}</p>
      <div role="group" aria-label="Cartes réponse">
        {step.options.map((o, i) => (
          <button
            key={o.id}
            type="button"
            className={`dchain__choice ${
              answer === i ? (o.correct ? "dchain__choice--good" : "dchain__choice--bad") : ""
            }`}
            onClick={() => onAnswer(i)}
          >
            {o.text}
          </button>
        ))}
      </div>
      {verdict && (
        <div
          className={`dchain__fb dchain__fb--${
            verdict.correct ? "good" : answer === "flag" ? "warn" : "bad"
          }`}
          role="status"
        >
          <p className="dchain__fb-text">{verdict.feedback}</p>
        </div>
      )}
      <div className="dchain__actions dchain__actions--split">
        <button
          type="button"
          className={`dchain__flag ${answer === "flag" ? "dchain__flag--raised" : ""}`}
          onClick={() => onAnswer("flag")}
        >
          <Icon name="warn" size={14} /> Stop : rien n'est constatable ici, l'objectif du
          trimestre est flou
        </button>
        {canNext && (
          <button className="btn btn--primary" onClick={onNext}>
            {step.flagIsCorrect ? "Parler au sponsor ›" : "Accrocher le maillon ›"}
          </button>
        )}
      </div>
    </section>
  );
}

function LineView({
  line,
  picked,
  onPick,
  onNext,
}: {
  line: NonNullable<ImpactChainCase["line"]>;
  picked: number | null;
  onPick: (i: number) => void;
  onNext: () => void;
}) {
  const chosen = picked !== null ? line[picked]! : null;
  return (
    <section aria-live="polite">
      <p className="dchain__question">
        À la revue de sprint : quel est le maillon le plus haut que tu peux montrer ?
      </p>
      <div role="group" aria-label="Maillons de la chaîne">
        {line.map((l, i) => (
          <button
            key={l.label}
            type="button"
            className={`dchain__choice ${picked === i ? `dchain__choice--${l.verdict}` : ""}`}
            onClick={() => onPick(i)}
          >
            <strong>{l.label}</strong> : {l.detail}
          </button>
        ))}
      </div>
      {chosen && (
        <div className={`dchain__fb dchain__fb--${chosen.verdict}`} role="status">
          <p className="dchain__fb-text">{chosen.feedback}</p>
        </div>
      )}
      {chosen?.verdict === "good" && (
        <div className="dchain__actions">
          <button className="btn btn--primary" onClick={onNext}>
            Écrire l'objectif de sprint ›
          </button>
        </div>
      )}
    </section>
  );
}

function QcmView({
  c,
  picked,
  onPick,
  onNext,
}: {
  c: ImpactChainCase;
  picked: number | null;
  onPick: (i: number) => void;
  onNext: () => void;
}) {
  const chosen = picked !== null ? c.finalQcmOptions[picked]! : null;
  return (
    <section aria-live="polite">
      <p className="dchain__question">{c.finalQcmQuestion}</p>
      <div role="group" aria-label="Formulations proposées">
        {c.finalQcmOptions.map((o, i) => (
          <button
            key={o.id}
            type="button"
            className={`dchain__choice ${
              picked === i ? (o.correct ? "dchain__choice--good" : "dchain__choice--bad") : ""
            } ${chosen && !chosen.correct && o.correct ? "dchain__choice--reveal" : ""}`}
            onClick={() => onPick(i)}
          >
            {o.text}
          </button>
        ))}
      </div>
      {chosen && (
        <div className={`dchain__fb dchain__fb--${chosen.correct ? "good" : "bad"}`} role="status">
          <p className="dchain__fb-text">{chosen.explanation}</p>
        </div>
      )}
      {chosen && (
        <div className="dchain__actions">
          <button className="btn btn--primary" onClick={onNext}>
            Voir la chaîne complète ›
          </button>
        </div>
      )}
    </section>
  );
}
