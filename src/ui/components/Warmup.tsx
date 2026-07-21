/**
 * Échauffement « Fini n'est pas atteint » (refonte 2026-07, validée avec Lætitia).
 *
 * Deux temps sur un même écran :
 *   1. Le déclic — on traduit output / outcome en clair, on montre le
 *      déplacement du regard (posture), puis le test unique.
 *   2. Le tri — quelques phrases à ranger en Output / Outcome / À compléter.
 *      La rétroaction est une question ou le test qu'on rejoue. Aucun score.
 *
 * Le contenu vit dans les données (declic.fr.ts + les corpus de tri) ; ce
 * composant ne fait que l'afficher et comparer le choix à la bonne case.
 */

import { Fragment, useState } from "react";
import type {
  WarmupCase,
  WarmupAnswer,
  WarmupDeclicTerm,
} from "../../domain/warmup";
import { WARMUP_DECLIC_FR } from "../../content/warmup/declic.fr";

interface Props {
  cases: WarmupCase[];
  /** Conservé pour compatibilité des écrans Practice ; le déclic tient lieu d'intro. */
  skipIntro?: boolean;
  /** Conservé pour compatibilité ; plus de stats de score dans la refonte. */
  onComplete?: (stats: { total: number }) => void;
  /** Contenu rendu à la fin (liste des exercices suivants). */
  endSlot?: import("react").ReactNode;
}

const CHOICES: Array<{ key: WarmupAnswer; label: string; sub: string; mid?: boolean }> = [
  { key: "output", label: "Output", sub: "ce que je fais" },
  { key: "outcome", label: "Outcome", sub: "ce que ça change" },
  { key: "complete", label: "À compléter", sub: "il manque la mesure", mid: true },
];

function DefCard({ t, tone }: { t: WarmupDeclicTerm; tone: "out" | "oc" }) {
  return (
    <div className={"warmup__def warmup__def--" + tone}>
      <div className="warmup__def-term">
        {t.term}
        <span className="warmup__def-gloss">{t.gloss}</span>
      </div>
      <div className="warmup__def-def">{t.def}</div>
      <div className={"warmup__def-posture warmup__def-posture--" + tone}>{t.posture}</div>
    </div>
  );
}

function TriItem({ c }: { c: WarmupCase }) {
  const [chosen, setChosen] = useState<WarmupAnswer | null>(null);
  const [locked, setLocked] = useState(false);
  const [txt, setTxt] = useState("");

  const good = chosen !== null && chosen === c.expected;
  const showComplete = c.expected === "complete" && chosen !== null;

  function choose(k: WarmupAnswer) {
    if (locked) return;
    setChosen(k);
    // On verrouille seulement quand une bonne réponse binaire est trouvée.
    if (k === c.expected && c.expected !== "complete") setLocked(true);
  }

  return (
    <div className="warmup__item" data-testid={"warmup-item-" + c.id}>
      <div className="warmup__item-prompt">{c.prompt}</div>
      <div className="warmup__choices" role="group" aria-label="Output, outcome, ou à compléter">
        {CHOICES.map((ch) => {
          const state =
            chosen === ch.key
              ? ch.key === c.expected
                ? " warmup__choice--ok"
                : " warmup__choice--no"
              : "";
          return (
            <button
              key={ch.key}
              type="button"
              className={"warmup__choice" + (ch.mid ? " warmup__choice--mid" : "") + state}
              disabled={locked}
              onClick={() => choose(ch.key)}
            >
              {ch.label}
              <span className="warmup__choice-sub">{ch.sub}</span>
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <div
          className={"warmup__fb " + (good ? "warmup__fb--good" : "warmup__fb--ask")}
          role="status"
        >
          {good ? c.feedbackGood : c.feedbackAsk}
        </div>
      )}

      {showComplete && (
        <div className="warmup__complete">
          <label className="warmup__complete-label" htmlFor={"cp-" + c.id}>
            {c.completePrompt}
          </label>
          <input
            id={"cp-" + c.id}
            type="text"
            className="warmup__complete-input"
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder="Ex. l'auditeur sécurité : plus aucun compte orphelin actif"
          />
          {txt.trim().length >= 3 && (
            <div className="warmup__trans">
              Regardez : en ajoutant « <b>{txt}</b> », la promesse devient un outcome.
              Maintenant quelqu'un d'autre peut le constater, sans vous demander.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Warmup({ cases, endSlot }: Props) {
  const d = WARMUP_DECLIC_FR;

  return (
    <div className="warmup">
      {/* ============ 1. LE DÉCLIC ============ */}
      <section className="warmup__declic" aria-label="Les deux mots, en clair">
        <p className="warmup__intro">
          Deux mots reviennent tout le temps, souvent en anglais. Traduisons-les
          simplement, une fois pour toutes.
        </p>

        <div className="warmup__defduo">
          <DefCard t={d.output} tone="out" />
          <DefCard t={d.outcome} tone="oc" />
        </div>

        <p className="warmup__bridge">{d.bridge}</p>

        <div className="warmup__exemple">
          <div className="warmup__ex-lab">{d.examplesLabel}</div>
          <div className="warmup__extab">
            <div className="warmup__exhead warmup__exhead--out">
              Je parle de mon geste<span>output, le regard sur moi</span>
            </div>
            <div className="warmup__exhead warmup__exhead--oc">
              Je parle de ce que ça change<span>outcome, le regard sur l'autre</span>
            </div>
            {d.examples.map((ex, i) => (
              <Fragment key={i}>
                <div className="warmup__excell warmup__excell--out">
                  <b>{ex.output}</b>
                </div>
                <div className="warmup__excell warmup__excell--oc">
                  <b>{ex.outcome}</b>
                  {ex.note && <span>{ex.note}</span>}
                </div>
              </Fragment>
            ))}
          </div>
          <div className="warmup__punch">{d.examplesPunch}</div>
        </div>

        <div className="warmup__testbox">
          Un seul test pour trancher : <b>{d.test}</b>
        </div>
      </section>

      {/* ============ 2. À TOI DE TRIER ============ */}
      <section className="warmup__tri" aria-label="À toi, avec le test">
        <h3 className="warmup__tri-title">À toi. Applique la question.</h3>
        {cases.map((c) => (
          <TriItem key={c.id} c={c} />
        ))}
        <div className="warmup__reflex">
          Le réflexe à emporter : tout le travail fait, est-ce pour autant atteint ?
        </div>
        <div className="warmup__noscore">
          Aucun score. La rétroaction est une question, ou le test qu'on rejoue.
        </div>
      </section>

      {endSlot}
    </div>
  );
}
