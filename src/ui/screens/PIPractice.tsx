/**
 * PI S'entraîner — menu de mini-exercices par partie d'objectif.
 *
 * Réplique du pattern SprintPractice (D28). V1 MVP : seule la carte « Verbe »
 * est active (réutilise le Warmup PI existant). Les 4 autres sont marquées
 * "à venir" tant que les corpus PI dédiés (Indicateur, Variation, Échéance,
 * Contexte) n'auront pas été produits et validés.
 */

import { useMemo, useState } from "react";

import type { CoachUseCase } from "../../domain/ports";
import { createContentRepository } from "../../content/repository";
import { Warmup } from "../components/Warmup";
import { Drill } from "../components/Drill";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { PI_INDICATOR_DRILL_FR } from "../../content/drills/pi.indicator.fr";
import { PI_VARIATION_DRILL_FR } from "../../content/drills/pi.variation.fr";
import { PI_ECHEANCE_DRILL_FR } from "../../content/drills/pi.echeance.fr";
import { PI_CONTEXTE_DRILL_FR } from "../../content/drills/pi.contexte.fr";

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
    desc: "Output ou outcome ? Apprends à reconnaître le verbe qui décrit un effet à l'échelle du PI.",
    status: "active",
  },
  {
    key: "indicateur",
    num: "2",
    title: "L'indicateur",
    desc: "Indicateur opérationnel ou concept-parapluie ? Repère ce qui est mesurable à la revue de PI.",
    status: "active",
  },
  {
    key: "variation",
    num: "3",
    title: "La variation chiffrée",
    desc: "Précise ou vague ? Distingue les seuils chiffrés des adverbes flous.",
    status: "active",
  },
  {
    key: "echeance",
    num: "4",
    title: "L'échéance",
    desc: "Revue de PI, fin de PI, événement PI Planning ? Reconnaître les bornes valides.",
    status: "active",
  },
  {
    key: "contexte",
    num: "5",
    title: "Le contexte",
    desc: "Qui est le vrai bénéficiaire à l'échelle du train ? Apprends à identifier pour qui ça change.",
    status: "active",
  },
];

const repo = createContentRepository();

export function PIPractice(_props: Props) {
  const warmupCases = useMemo(() => repo.getWarmupCases("pi", "dev"), []);
  const [activeDrill, setActiveDrill] = useState<DrillKey | null>(null);

  // Vue d'un exercice plein écran : Indicateur / Variation / Échéance / Contexte
  const drillConfigs = {
    indicateur: { corpus: PI_INDICATOR_DRILL_FR, title: "L'indicateur : opérationnel ou flou ?", lede: "Un bon indicateur PI se mesure avec exactitude à la revue de PI." },
    variation: { corpus: PI_VARIATION_DRILL_FR, title: "La variation chiffrée : précise ou vague ?", lede: "Coche les variations chiffrées exploitables. Les vagues, laisse-les." },
    echeance: { corpus: PI_ECHEANCE_DRILL_FR, title: "L'échéance PI : bornée ou floue ?", lede: "Revue de PI, fin de PI, PI Planning N+1, mi-PI : les bornes valides." },
    contexte: { corpus: PI_CONTEXTE_DRILL_FR, title: "Le contexte : qui est le vrai bénéficiaire ?", lede: "À l'échelle d'un PI, distingue le porteur (qui livre) du bénéficiaire (qui en profite)." },
  } as const;

  if (activeDrill && activeDrill !== "verbe") {
    const cfg = drillConfigs[activeDrill];
    return (
      <Screen
        header={{
          eyebrow: <span>PI · S'entraîner · {DRILLS.find((d) => d.key === activeDrill)?.title}</span>,
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
              <Drill key={activeDrill} corpus={cfg.corpus} />
            </Zone>
          ),
        }}
      />
    );
  }

  // Vue d'un exercice plein écran : Verbe
  if (activeDrill === "verbe") {
    return (
      <Screen
        header={{
          eyebrow: <span>PI · S'entraîner · Verbe</span>,
          title: "Output ou outcome ?",
          lede: "Fini n'est pas atteint : distingue ce que tu fais (output) de ce que ça change vraiment, pour quelqu'un (outcome).",
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
              <Warmup
                key="warmup-verbe-pi"
                cases={warmupCases}
                skipIntro
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
        eyebrow: <span>PI · S'entraîner</span>,
        title: "Choisis l'exercice qui te parle",
        lede:
          "Un objectif PI solide est fait de 5 pièces. Travaille celle que tu veux renforcer.",
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
