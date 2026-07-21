/**
 * Échauffement « Fini n'est pas atteint » (refonte 2026-07, validée avec Lætitia).
 *
 * 1. Le déclic : on traduit output / outcome en clair, on montre le déplacement
 *    du regard (posture), on illustre par deux exemples à égalité, puis le test.
 * 2. Le tri : une phrase à la fois, à ranger en Output / Outcome / À compléter.
 *    Rétroaction = une question ou le test rejoué. Aucun score. On enchaîne
 *    autant de phrases qu'on veut ; le paquet se remélange, sans jamais deux
 *    réponses identiques de suite.
 *
 * Tout le contenu vit dans les données (declic.fr.ts + les corpus de tri).
 */

import { Fragment, useState } from "react";
import type {
  WarmupCase,
  WarmupAnswer,
  WarmupDeclicTerm,
} from "../../domain/warmup";
import { orderVaried } from "../../domain/warmup";
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

function Tri({ cases }: { cases: WarmupCase[] }) {
  const [pool, setPool] = useState<WarmupCase[]>(() => orderVaried(cases));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<WarmupAnswer | null>(null);
  const [locked, setLocked] = useState(false);
  const [txt, setTxt] = useState("");

  const cur = pool[idx];
  if (!cur) return null;

  const good = chosen !== null && chosen === cur.expected;
  const showComplete = cur.expected === "complete" && chosen !== null;

  function choose(k: WarmupAnswer) {
    if (locked || !cur) return;
    setChosen(k);
    if (k === cur.expected && cur.expected !== "complete") setLocked(true);
  }

  function next() {
    let np = idx + 1;
    if (np >= pool.length) {
      setPool(orderVaried(cases));
      np = 0;
    }
    setIdx(np);
    setChosen(null);
    setLocked(false);
    setTxt("");
  }

  return (
    <div className="warmup__item">
      <div className="warmup__item-prompt">{cur.prompt}</div>
      <div className="warmup__choices" role="group" aria-label="Output, outcome, ou à compléter">
        {CHOICES.map((ch) => {
          const state =
            chosen === ch.key
              ? ch.key === cur.expected
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
          {good ? cur.feedbackGood : cur.feedbackAsk}
        </div>
      )}

      {showComplete && (
        <div className="warmup__complete">
          <label className="warmup__complete-label" htmlFor="warmup-cp">
            {cur.completePrompt}
          </label>
          <input
            id="warmup-cp"
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

      {chosen !== null && (
        <button type="button" className="warmup__next" onClick={next}>
          Phrase suivante ›
        </button>
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
            <div className="warmup__exhead">
              <span className="warmup__exdir" aria-hidden="true">↩</span> Je parle de mon geste
            </div>
            <div className="warmup__exhead">
              <span className="warmup__exdir" aria-hidden="true">→</span> Je parle de l'effet
            </div>
            {d.examples.map((ex, i) => (
              <Fragment key={i}>
                <div className="warmup__excell">
                  <b>{ex.output}</b>
                </div>
                <div className="warmup__excell">
                  <b>{ex.outcome}</b>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="warmup__testbox">
          Un seul test pour trancher : <b>{d.test}</b>
        </div>
      </section>

      {/* ============ 2. À TOI, UNE PHRASE À LA FOIS ============ */}
      <section className="warmup__tri" aria-label="À toi, avec le test">
        <h3 className="warmup__tri-title">Une phrase à la fois. Applique la question.</h3>
        <Tri cases={cases} />
        <div className="warmup__reflex">
          Le réflexe à emporter : tout le travail fait, est-ce pour autant atteint ?
        </div>
        <div className="warmup__noscore">
          Aucun score. Enchaîne autant de phrases que tu veux ; le paquet se remélange quand tu en as fait le tour.
        </div>
      </section>

      {endSlot}
    </div>
  );
}
