/**
 * OKR équipe S'entraîner — menu de mini-exercices par partie d'objectif.
 *
 * Réplique du pattern SprintPractice (D28). Les 5 exercices sont actifs
 * (corpus Indicateur/Variation/Échéance/Contexte existaient depuis le
 * 2026-06-28 mais n'avaient jamais été câblés dans cet écran — dette
 * découverte le 2026-07-04 en construisant OKR entreprise, corrigée ici).
 */

import { useMemo, useState } from "react";

import type { CoachUseCase } from "../../domain/ports";
import { createContentRepository } from "../../content/repository";
import { Warmup } from "../components/Warmup";
import { Drill } from "../components/Drill";
import { OKR_EQUIPE_INDICATOR_DRILL_FR } from "../../content/drills/okr-equipe.indicator.fr";
import { OKR_EQUIPE_VARIATION_DRILL_FR } from "../../content/drills/okr-equipe.variation.fr";
import { OKR_EQUIPE_ECHEANCE_DRILL_FR } from "../../content/drills/okr-equipe.echeance.fr";
import { OKR_EQUIPE_CONTEXTE_DRILL_FR } from "../../content/drills/okr-equipe.contexte.fr";
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
    title: "Le verbe d'un KR",
    desc: "Output ou outcome ? Apprends à reconnaître le verbe qui décrit un changement à atteindre.",
    status: "active",
  },
  {
    key: "indicateur",
    num: "2",
    title: "L'indicateur du KR",
    desc: "Indicateur opérationnel, health metric ou concept flou ? Repère ce qui se mesure trimestriellement.",
    status: "active",
  },
  {
    key: "variation",
    num: "3",
    title: "La variation chiffrée",
    desc: "Précise ou vague ? Un KR sans valeur de référence ni cible ne tient pas.",
    status: "active",
  },
  {
    key: "echeance",
    num: "4",
    title: "L'échéance trimestrielle",
    desc: "Fin de trimestre, mois précis ? Bornes valides pour un KR.",
    status: "active",
  },
  {
    key: "contexte",
    num: "5",
    title: "Le contexte",
    desc: "Qui est le vrai bénéficiaire ? L'utilisateur, l'équipe arrimée, la direction ?",
    status: "active",
  },
];

const repo = createContentRepository();

export function OkrTeamPractice(_props: Props) {
  const warmupCases = useMemo(() => repo.getWarmupCases("okr-equipe", "dev"), []);
  const [activeDrill, setActiveDrill] = useState<DrillKey | null>(null);

  const drillConfigs = {
    indicateur: {
      corpus: OKR_EQUIPE_INDICATOR_DRILL_FR,
      title: "L'indicateur : opérationnel, health metric ou flou ?",
      lede: "Un indicateur opérationnel se mesure trimestriellement sans ambiguïté. Une health metric (seuil à maintenir) est un garde-fou, pas un KR.",
    },
    variation: {
      corpus: OKR_EQUIPE_VARIATION_DRILL_FR,
      title: "La variation chiffrée : précise ou vague ?",
      lede: "Coche tous les fragments précis dans la grille. Les vagues, laisse-les.",
    },
    echeance: {
      corpus: OKR_EQUIPE_ECHEANCE_DRILL_FR,
      title: "L'échéance : bornée ou floue ?",
      lede: "Coche toutes les échéances précises dans la grille. Les floues, laisse-les.",
    },
    contexte: {
      corpus: OKR_EQUIPE_CONTEXTE_DRILL_FR,
      title: "Le contexte : qui est le vrai bénéficiaire ?",
      lede: "Pour chaque KR, identifie la personne ou le groupe dont la vie change quand le résultat est atteint.",
    },
  } as const;

  if (activeDrill && activeDrill !== "verbe") {
    const cfg = drillConfigs[activeDrill];
    return (
      <Screen
        header={{
          eyebrow: <span>OKR équipe · S'entraîner · {DRILLS.find((d) => d.key === activeDrill)?.title}</span>,
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

  if (activeDrill === "verbe") {
    return (
      <Screen
        header={{
          eyebrow: <span>OKR équipe · S'entraîner · Verbe</span>,
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
                key="warmup-verbe-okr"
                cases={warmupCases}
                skipIntro
                endSlot={
                  <NextDrillsList currentKey="verbe" onChoose={(k) => setActiveDrill(k)} />
                }
              />
            </Zone>
          ),
        }}
      />
    );
  }

  return (
    <Screen
      header={{
        eyebrow: <span>OKR équipe · S'entraîner</span>,
        title: "Choisis l'exercice qui te parle",
        lede:
          "Un Résultat clé solide est fait de 5 pièces. Travaille celle que tu veux renforcer.",
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
      <h4 className="next-drills__title">Travaille une autre partie du KR</h4>
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
