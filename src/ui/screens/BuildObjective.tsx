/**
 * Écran « Construire l'objectif » - 2e activité du Défi, à côté du QCM.
 *
 * Le QCM fait RECONNAÎTRE une bonne formulation ; celui-ci fait GÉNÉRER la sienne
 * en cinq temps (le pari, construire, l'épreuve, assembler, le miroir), puis la
 * confronte aux quatre formulations du même cas. Réutilise le corpus du Défi
 * (getChallengeQuizCases) : contexte, demande et miroir, sans duplication.
 *
 * Pas de score, pas de verdict stocké. La sortie, ce sont les mots de l'équipe.
 * Le niveau d'étayage (Guidé / Semi / Autonome) est un réglage de la
 * facilitatrice, choisi selon la maturité de l'équipe accompagnée.
 */

import { useMemo, useState } from "react";
import type { CoachUseCase } from "../../domain/ports";
import type { ObjectiveType } from "../../domain/types";
import { audienceForType } from "../../domain/types";
import type { ChallengeQuizCase } from "../../domain/challenge-quiz";
import {
  assembleTrame,
  buildRecap,
  emptyBricks,
  ETAYAGE_ORDER,
  ETAYAGE_LABELS,
  ETAYAGE_DESCRIPTIONS,
  type BuildBricks,
  type EtayageLevel,
} from "../../domain/build-objective";
import { BUILD_SCAFFOLD_FR } from "../../content/build-objective/scaffold.fr";
import { createContentRepository } from "../../content/repository";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";

const repo = createContentRepository();

const TYPE_LABELS: Record<ObjectiveType, string> = {
  sprint: "Sprint",
  pi: "Program Increment",
  "okr-equipe": "OKR équipe",
  "okr-entreprise": "OKR entreprise",
};

const STEP_LABELS = ["Le pari", "Construire", "L'épreuve", "Assembler", "Miroir"];

/** Shuffle Fisher-Yates non destructif (ordre des propositions à travailler). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

interface Props {
  coach: CoachUseCase;
  type: ObjectiveType;
  onExit: () => void;
}

export function BuildObjective({ type, onExit }: Props) {
  const scaffold = BUILD_SCAFFOLD_FR[type];
  const typeLabel = TYPE_LABELS[type];
  const source = useMemo(
    () => repo.getChallengeQuizCases(type, audienceForType(type)),
    [type],
  );
  const [cases] = useState<ChallengeQuizCase[]>(() => shuffle(source));
  const [caseIndex, setCaseIndex] = useState(0);
  const [etayage, setEtayage] = useState<EtayageLevel>("guide");
  const [step, setStep] = useState(1);
  const [bricks, setBricks] = useState<BuildBricks>(emptyBricks());
  const [pari, setPari] = useState("");
  const [objTexte, setObjTexte] = useState("");
  const [objFinal, setObjFinal] = useState("");

  if (cases.length === 0) {
    return (
      <Screen
        header={{ title: `Construire l'objectif · ${typeLabel}`, lede: "Aucun cas disponible." }}
        body={{ variant: "single", primary: <Zone variant="primary"><p>Reviens plus tard.</p></Zone> }}
        actions={{ right: <button className="btn" onClick={onExit}>Retour</button> }}
      />
    );
  }

  const c = cases[caseIndex]!;

  function set<K extends keyof BuildBricks>(k: K, v: string) {
    setBricks((b) => ({ ...b, [k]: v }));
  }

  function goStep(n: number) {
    if (n === 4 && etayage === "guide") {
      setObjTexte((prev) => (prev.trim() ? prev : assembleTrame(bricks)));
    }
    if (n === 5) {
      setObjFinal((prev) => (prev.trim() ? prev : objTexte));
    }
    setStep(n);
  }

  function resetCase() {
    setStep(1);
    setBricks(emptyBricks());
    setPari("");
    setObjTexte("");
    setObjFinal("");
  }

  function nextCase() {
    setCaseIndex((i) => (i + 1) % cases.length);
    resetCase();
  }

  const proposedLabel = type === "okr-equipe" ? "le Résultat clé proposé" : "l'objectif proposé";

  return (
    <Screen
      header={{
        eyebrow: <span>{typeLabel} · {c.teamLabel}</span>,
        title: "Construire l'objectif, pas le reconnaître",
        lede: "On part de la valeur, on bâtit brique par brique, puis on confronte au miroir. Aucun score : la sortie, ce sont vos mots.",
        actions: (
          <button className="btn" onClick={onExit} type="button">Quitter</button>
        ),
      }}
      body={{
        variant: "single",
        primary: (
          <Zone variant="primary">
            <div className={`bo__facilo ${step > 1 ? "bo__facilo--mini" : ""}`}>
              <span className="bo__facilo-lab">Réglage de la facilitatrice · niveau d'étayage</span>
              <div className="bo__seg" role="group" aria-label="Niveau d'étayage">
                {ETAYAGE_ORDER.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`bo__segbtn ${etayage === lvl ? "is-sel" : ""}`}
                    aria-pressed={etayage === lvl}
                    onClick={() => setEtayage(lvl)}
                  >
                    {ETAYAGE_LABELS[lvl]}
                  </button>
                ))}
              </div>
              <p className="bo__facilo-desc">{ETAYAGE_DESCRIPTIONS[etayage]}</p>
            </div>

            <ol className="bo__steps" aria-label="Étapes">
              {STEP_LABELS.map((lab, i) => {
                const n = i + 1;
                const state = n === step ? "is-active" : n < step ? "is-done" : "";
                return (
                  <li key={lab} className={`bo__step ${state}`}>
                    <span className="bo__step-n">{n}</span> {lab}
                  </li>
                );
              })}
            </ol>

            <div className="bo__case">
              {c.metrics && c.metrics.length > 0 && (
                <ul className="bo__metrics">
                  {c.metrics.map((m) => (
                    <li key={m.label} className="bo__metric">
                      <span className="bo__metric-lab">{m.label}</span>
                      <b className="bo__metric-val">{m.value}</b>
                    </li>
                  ))}
                </ul>
              )}
              <div className="bo__demande">
                <span className="bo__demande-lab">La demande, {proposedLabel} à retravailler</span>
                <p className="bo__demande-txt">« {c.proposedObjective} »</p>
              </div>
            </div>

            {step === 1 && (
              <section className="bo__stp">
                <h3 className="bo__q">Votre objectif, tout de suite, en une phrase</h3>
                <p className="bo__hint">Sans réfléchir longtemps : comment le diriez-vous aujourd'hui ? On garde cette phrase de côté, on la comparera à la fin. Souvent, la première version décrit une tâche : c'est normal, et c'est instructif.</p>
                <textarea
                  className="bo__ta"
                  value={pari}
                  onChange={(e) => setPari(e.target.value)}
                  placeholder="Votre première formulation, à chaud..."
                />
                <div className="bo__actions">
                  <button className="btn btn--primary" onClick={() => goStep(2)}>Maintenant, décortiquons ›</button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="bo__stp">
                <h3 className="bo__q">Construisons, brique par brique</h3>
                <p className="bo__hint">On répond avec ses mots. On part de la valeur, pas de nos outils.</p>

                <div className="bo__groupe">Le cap</div>
                <div className="bo__brique">
                  <label className="bo__qq" htmlFor="bo-besoin">Pour qui, et qu'est-ce que ça lui coûte aujourd'hui ?</label>
                  <p className="bo__why">Un bon objectif sert quelqu'un. Ce quelqu'un peut être l'équipe elle-même (l'astreinte, le support débordé).</p>
                  <input id="bo-besoin" type="text" value={bricks.besoin} onChange={(e) => set("besoin", e.target.value)} placeholder="Ex. le support et les clients, qui subissent les pannes" />
                </div>
                <div className="bo__brique">
                  <span className="bo__qq">Que veut-on changer pour eux ?</span>
                  <p className="bo__why">Dites-le d'abord avec vos mots, puis choisissez un verbe de variation : il pointe une quantité, donc il appelle une mesure.</p>
                  <div className="bo__seg bo__seg--wrap">
                    {scaffold.verbes.map((v) => (
                      <button key={v} type="button" className={`bo__segbtn ${bricks.verbe === v ? "is-sel" : ""}`} aria-pressed={bricks.verbe === v} onClick={() => set("verbe", v)}>{v}</button>
                    ))}
                  </div>
                  <input type="text" value={bricks.quoi} onChange={(e) => set("quoi", e.target.value)} placeholder="Quoi ? l'état ou le résultat visé (ex. les incidents du module commande)" />
                  <div className="bo__avoid">À éviter ici : améliorer, optimiser, mieux, renforcer, stabiliser.</div>
                  <div className="bo__lecon"><b>Pourquoi les éviter ?</b> « Améliorer », c'est « rendre meilleur » : un jugement de valeur. Meilleur pour qui, et qui en décide ? Un verbe de variation pointe une quantité qui monte ou qui descend : on la mesure, et le résultat se constate sans discussion.</div>
                </div>

                <div className="bo__groupe">La preuve</div>
                <div className="bo__brique">
                  <label className="bo__qq" htmlFor="bo-obs">À quoi le verra-t-on, sans demander à ceux qui ont fait le travail ?</label>
                  <p className="bo__why">Le fait observable qui tranche la discussion. Si seul celui qui a fait le travail peut dire que « c'est mieux », ce n'est pas un indicateur.</p>
                  <input id="bo-obs" type="text" value={bricks.observable} onChange={(e) => set("observable", e.target.value)} placeholder="Ex. le nombre d'incidents remontés par la supervision" />
                </div>
                <div className="bo__brique">
                  <span className="bo__qq">De combien à combien ? Et d'où sort le chiffre de départ ?</span>
                  <p className="bo__why">Un avant et un après chiffrés. Le point de départ doit venir d'une mesure réelle, pas d'une estimation en l'air.</p>
                  <div className="bo__duo">
                    <span className="bo__lbl">de</span>
                    <input type="text" className="bo__num" value={bricks.from} onChange={(e) => set("from", e.target.value)} placeholder="14" />
                    <span className="bo__lbl">à</span>
                    <input type="text" className="bo__num" value={bricks.to} onChange={(e) => set("to", e.target.value)} placeholder="5" />
                  </div>
                  <input type="text" value={bricks.baseline} onChange={(e) => set("baseline", e.target.value)} placeholder="D'où sort le chiffre de départ ? (ex. moyenne des 4 dernières semaines)" />
                </div>

                <div className="bo__groupe">Le cadre</div>
                <div className="bo__brique">
                  <span className="bo__qq">Pour quand, et quelles sont nos chances d'y arriver ?</span>
                  <p className="bo__why">Un objectif est borné dans le temps. On doit se sentir plutôt confiants, pas jouer un pari : si l'échéance dépasse la fenêtre, découper ou réduire.</p>
                  <div className="bo__seg bo__seg--wrap">
                    {scaffold.echeanceOptions.map((o) => (
                      <button key={o.value} type="button" className={`bo__segbtn ${bricks.echeance === o.value ? "is-sel" : ""}`} aria-pressed={bricks.echeance === o.value} onClick={() => set("echeance", o.value)}>{o.label}</button>
                    ))}
                  </div>
                  <input type="text" value={bricks.chances} onChange={(e) => set("chances", e.target.value)} placeholder="Honnêtement, nos chances d'y arriver à cette date ?" />
                  <input type="text" value={bricks.decoupe} onChange={(e) => set("decoupe", e.target.value)} placeholder="Si l'échéance dépasse : quel premier morceau plus petit livrer d'abord ?" />
                </div>

                <div className="bo__actions">
                  <button className="btn" onClick={() => goStep(1)}>‹ Retour</button>
                  <button className="btn btn--primary" onClick={() => goStep(3)}>Passons l'objectif à l'épreuve ›</button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="bo__stp">
                <h3 className="bo__q">Trois tests, à l'oral, avant de figer</h3>
                <p className="bo__hint">On ne remplit rien ici. On éprouve ce qu'on vient de construire. L'outil ne juge pas ; c'est l'équipe qui tranche.</p>
                <div className="bo__epreuve"><b>1. Est-ce bien nous qui pouvons faire bouger ce chiffre ?</b><span>Qu'est-ce qui dépend de l'équipe, qu'est-ce qui n'en dépend pas ?</span></div>
                <div className="bo__epreuve"><b>2. Une seule phrase, sans « et » qui cache deux résultats ?</b><span>Un but unique, récitable de mémoire. S'il y a deux changements, n'en garder qu'un.</span></div>
                <div className="bo__epreuve"><b>3. Si on livrait tout sans que le chiffre bouge, dirait-on que c'est atteint ?</b><span>Si la réponse est « oui », c'est une tâche déguisée. Un bon objectif répond « non ».</span></div>
                <div className="bo__actions">
                  <button className="btn" onClick={() => goStep(2)}>‹ Retour</button>
                  <button className="btn btn--primary" onClick={() => goStep(4)}>Assembler notre phrase ›</button>
                </div>
              </section>
            )}

            {step === 4 && (
              <section className="bo__stp">
                <h3 className="bo__q">L'outil regroupe vos briques. À vous de composer.</h3>
                {etayage !== "auto" && (
                  <dl className="bo__recap">
                    {buildRecap(bricks).map((it) => (
                      <div key={it.label} className="bo__recap-row">
                        <dt>{it.label}</dt>
                        <dd>{it.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {etayage === "guide" && (
                  <div className="bo__trame">
                    <span className="bo__trame-lab">Trame de départ, remplie avec vos mots</span>
                    <p>{assembleTrame(bricks)}</p>
                  </div>
                )}
                <p className="bo__aide">
                  {etayage === "guide"
                    ? "Niveau Guidé : la trame amorce la phrase. Votre objectif reste le vôtre, ajustez-le."
                    : etayage === "semi"
                      ? "Niveau Semi-autonome : vos briques sont là, sans gabarit. À vous d'assembler la phrase."
                      : "Niveau Autonome : page blanche. Écrivez votre objectif, puis vérifiez-le avec les questions déjà travaillées."}
                </p>
                <textarea
                  className="bo__ta"
                  value={objTexte}
                  onChange={(e) => setObjTexte(e.target.value)}
                  placeholder={etayage === "guide" ? "" : "Composez votre objectif à partir de vos briques..."}
                />
                <div className="bo__compare">
                  <div className="bo__compare-b"><span className="bo__compare-lab">Votre pari de départ</span><p>{pari.trim() || "(rien noté)"}</p></div>
                  <div className="bo__compare-b bo__compare-b--after"><span className="bo__compare-lab">Après construction</span><p>{objTexte.trim() || "(à composer)"}</p></div>
                </div>
                <p className="bo__hint">Qu'est-ce qui a changé entre les deux, et pourquoi ? C'est là que se voit ce que l'équipe a appris.</p>
                <div className="bo__actions">
                  <button className="btn" onClick={() => goStep(3)}>‹ Retour</button>
                  <button className="btn btn--primary" onClick={() => goStep(5)}>Confronter au miroir ›</button>
                </div>
              </section>
            )}

            {step === 5 && (
              <section className="bo__stp">
                <div className="bo__yours"><span className="bo__yours-lab">Votre objectif</span><p>{objTexte.trim() || "(à composer)"}</p></div>
                <p className="bo__hint">Ces quatre formulations disent-elles la même chose que la vôtre ? Aucune n'est « la réponse » : elles servent à éprouver la vôtre.</p>
                <div className="bo__mirror">
                  {c.options.map((o) => (
                    <div key={o.id} className="bo__mrow">
                      <p className="bo__mtxt">{o.text}</p>
                      <p className="bo__mwhy">{o.explanation}</p>
                    </div>
                  ))}
                </div>
                <ul className="bo__guiding">
                  <li>Laquelle pourriez-vous cocher un matin en disant : c'est vrai, maintenant ?</li>
                  <li>Laquelle sauriez-vous vérifier sans demander à personne où en est le travail ?</li>
                </ul>
                <textarea
                  className="bo__ta"
                  value={objFinal}
                  onChange={(e) => setObjFinal(e.target.value)}
                  placeholder="Votre phrase scellée, corrigée si vous le décidez"
                />
                <div className="bo__yours bo__yours--sealed"><span className="bo__yours-lab">Scellé : l'objectif de l'équipe</span><p>{objFinal.trim() || "(à sceller)"}</p></div>
                <p className="bo__noscore">Aucun score, aucun verdict, aucune bonne réponse stockée. La sortie, ce sont vos mots.</p>
                <div className="bo__actions">
                  <button className="btn" onClick={resetCase}>Recommencer ce cas</button>
                  <button className="btn btn--primary" onClick={nextCase}>Autre proposition à travailler ›</button>
                </div>
              </section>
            )}
          </Zone>
        ),
      }}
    />
  );
}
