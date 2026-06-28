/**
 * Sprint S'entraîner — menu de mini-exercices par partie d'objectif.
 *
 * Refonte 2026-06-27 : on remplace l'étape « écrire à blanc » par un menu
 * de 5 mini-exercices, un par partie d'objectif (Verbe, Indicateur, Variation,
 * Échéance, Contexte). L'utilisateur choisit la partie qu'il veut travailler.
 * V1 MVP : seule la carte « Verbe » est active (réutilise le Warmup existant).
 * Les 4 autres sont visibles mais marquées « à venir » tant que les corpus
 * ne sont pas validés.
 */

import { useMemo, useState } from "react";

import type { CoachUseCase } from "../../domain/ports";
import { createContentRepository } from "../../content/repository";
import { Warmup } from "../components/Warmup";
import { Drill } from "../components/Drill";
import { SPRINT_INDICATOR_DRILL_FR } from "../../content/drills/sprint.indicator.fr";
import { SPRINT_VARIATION_DRILL_FR } from "../../content/drills/sprint.variation.fr";
import { SPRINT_ECHEANCE_DRILL_FR } from "../../content/drills/sprint.echeance.fr";
import { SPRINT_CONTEXTE_DRILL_FR } from "../../content/drills/sprint.contexte.fr";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";

interface Props {
  coach: CoachUseCase;
}

type DrillKey = "verbe" | "indicateur" | "variation" | "echeance" | "contexte";

interface DrillDef {
  key: DrillKey;
  num: string;
  title: string;
  desc: string;
  status: "active" | "todo";
}

const DRILLS: DrillDef[] = [
  {
    key: "verbe",
    num: "1",
    title: "Le verbe",
    desc: "Output ou outcome ? Apprends à reconnaître le verbe qui décrit un effet plutôt qu'une livraison.",
    status: "active",
  },
  {
    key: "indicateur",
    num: "2",
    title: "L'indicateur",
    desc: "Indicateur opérationnel ou concept-parapluie ? Repère ce qui est mesurable sans ambiguïté.",
    status: "active",
  },
  {
    key: "variation",
    num: "3",
    title: "La variation chiffrée",
    desc: "Précise ou vague ? Distingue les chiffres opposables des adverbes flous.",
    status: "active",
  },
  {
    key: "echeance",
    num: "4",
    title: "L'échéance",
    desc: "Bornée ou floue ? Reconnaître une date, un sprint nommé, un événement Scrum.",
    status: "active",
  },
  {
    key: "contexte",
    num: "5",
    title: "Le contexte",
    desc: "Qui est le vrai bénéficiaire de l'objectif ? Apprends à identifier pour qui ça change.",
    status: "active",
  },
];

const repo = createContentRepository();

export function SprintPractice(_props: Props) {
  const warmupCases = useMemo(() => repo.getWarmupCases("sprint", "dev"), []);
  const [activeDrill, setActiveDrill] = useState<DrillKey | null>(null);

  // Vue d'un exercice plein écran : Indicateur / Variation / Échéance / Contexte
  const drillConfigs = {
    indicateur: { corpus: SPRINT_INDICATOR_DRILL_FR, title: "L'indicateur : opérationnel ou flou ?", lede: "Un indicateur opérationnel est précis et univoque. Apprends à le distinguer d'un concept-parapluie." },
    variation: { corpus: SPRINT_VARIATION_DRILL_FR, title: "La variation chiffrée : précise ou vague ?", lede: "Coche tous les fragments précis dans la grille. Les vagues, laisse-les." },
    echeance: { corpus: SPRINT_ECHEANCE_DRILL_FR, title: "L'échéance : bornée ou floue ?", lede: "Coche toutes les échéances précises dans la grille. Les floues, laisse-les." },
    contexte: { corpus: SPRINT_CONTEXTE_DRILL_FR, title: "Le contexte : qui est le vrai bénéficiaire ?", lede: "Pour chaque objectif, identifie la personne ou le groupe dont la vie change quand l'objectif est atteint." },
  } as const;

  if (activeDrill && activeDrill !== "verbe") {
    const cfg = drillConfigs[activeDrill];
    return (
      <Screen
        header={{
          eyebrow: <span>Sprint · S'entraîner · {DRILLS.find((d) => d.key === activeDrill)?.title}</span>,
          title: cfg.title,
          lede: cfg.lede,
          actions: (
            <button className="btn" onClick={() => setActiveDrill(null)}>
              ‹ Retour aux exercices
            </button>
          ),
        }}
        body={{
          variant: "single",
          primary: (
            <Zone variant="primary">
              <Drill
                key={activeDrill}
                corpus={cfg.corpus}
                endSlot={<NextDrillsList currentKey={activeDrill} onChoose={(k) => setActiveDrill(k)} />}
              />
            </Zone>
          ),
        }}
      />
    );
  }

  // Vue d'un exercice plein écran
  if (activeDrill === "verbe") {
    return (
      <Screen
        header={{
          eyebrow: <span>Sprint · S'entraîner · Verbe</span>,
          title: "Le verbe : output ou outcome ?",
          lede:
            "Si le verbe décrit ce que tu fais, c'est un output. S'il décrit ce qui change après, c'est un outcome. Entraîne-toi à les distinguer.",
          actions: (
            <button className="btn" onClick={() => setActiveDrill(null)}>
              ‹ Retour aux exercices
            </button>
          ),
        }}
        body={{
          variant: "single",
          primary: (
            <Zone variant="primary">
              {/* Encart règle persistant (extrait du warmup) : reste visible
                  pendant tout l'exercice pour éviter le clic intro redondant. */}
              <div className="warmup__rule warmup__rule--standalone" role="note">
                <p>
                  <strong>Si le verbe décrit ce que tu fais</strong>, c'est un <em>output</em>.
                  <br />
                  <strong>S'il décrit ce qui change après</strong>, c'est un <em>outcome</em>.
                </p>
                <p className="warmup__rule-aside">
                  Un bon objectif vise un <em>outcome</em> : un effet mesurable côté utilisateur ou métier.
                </p>
              </div>
              <Warmup
                key="warmup-verbe"
                cases={warmupCases}
                skipIntro
                endSlot={
                  <NextDrillsList
                    currentKey="verbe"
                    onChoose={(k) => setActiveDrill(k)}
                  />
                }
              />
            </Zone>
          ),
        }}
      />
    );
  }

  // Menu par défaut
  return (
    <Screen
      header={{
        eyebrow: <span>Sprint · S'entraîner</span>,
        title: "Choisis l'exercice qui te parle",
        lede:
          "Un objectif solide est fait de 5 pièces. Travaille celle que tu veux renforcer. Chaque exercice prend 2 à 3 minutes.",
      }}
      body={{
        variant: "single",
        primary: (
          <ul className="drills-grid" role="list">
            {DRILLS.map((d) => (
              <li key={d.key}>
                <DrillCard drill={d} onStart={() => setActiveDrill(d.key)} />
              </li>
            ))}
          </ul>
        ),
      }}
    />
  );
}

function DrillCard({
  drill,
  onStart,
}: {
  drill: DrillDef;
  onStart: () => void;
}) {
  const isActive = drill.status === "active";
  return (
    <button
      type="button"
      className={`card-button${isActive ? "" : " card-button--disabled"}`}
      onClick={onStart}
      disabled={!isActive}
      aria-label={`Exercice : ${drill.title}`}
    >
      <span className="card-button__icon" aria-hidden="true">
        <span className="drill-num">{drill.num}</span>
      </span>
      <span className="card-button__label">{drill.title}</span>
      <span className="card-button__desc">{drill.desc}</span>
      <span className="card-button__cta">
        {isActive ? "Commencer ›" : "Bientôt disponible"}
      </span>
    </button>
  );
}

/** Liste compacte des autres exercices, proposée à la fin d'un drill. */
function NextDrillsList({
  currentKey,
  onChoose,
}: {
  currentKey: DrillKey;
  onChoose: (key: DrillKey) => void;
}) {
  const others = DRILLS.filter((d) => d.key !== currentKey);
  return (
    <section className="next-drills" aria-label="Autres exercices">
      <h4 className="next-drills__title">Travaille une autre partie de l'objectif</h4>
      <ul className="next-drills__list" role="list">
        {others.map((d) => {
          const isActive = d.status === "active";
          return (
            <li key={d.key}>
              <button
                type="button"
                className={`next-drill${isActive ? "" : " next-drill--disabled"}`}
                onClick={() => onChoose(d.key)}
                disabled={!isActive}
              >
                <span className="next-drill__num">{d.num}</span>
                <span className="next-drill__title">{d.title}</span>
                <span className="next-drill__cta">
                  {isActive ? "Commencer ›" : "à venir"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

