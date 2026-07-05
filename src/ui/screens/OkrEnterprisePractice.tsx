/**
 * OKR entreprise S'entraîner — menu de mini-exercices par partie d'un Résultat clé.
 *
 * Réplique SprintPractice.tsx / OkrTeamPractice.tsx (D28), audience "manager".
 * Contrairement à OkrTeamPractice (où 4 des 5 exercices restent "à venir"),
 * les 5 exercices sont actifs dès la livraison : le corpus complet
 * (Indicateur, Variation, Échéance, Contexte, Verbe) a été rédigé et testé
 * en même temps que le module (voir D53 DECISIONS.md).
 */

import { useMemo, useState } from "react";

import type { CoachUseCase } from "../../domain/ports";
import { createContentRepository } from "../../content/repository";
import { Warmup } from "../components/Warmup";
import { Drill } from "../components/Drill";
import { OKR_ENTREPRISE_MANAGER_INDICATOR_FR } from "../../content/drills/okr-entreprise.indicator.fr";
import { OKR_ENTREPRISE_MANAGER_VARIATION_FR } from "../../content/drills/okr-entreprise.variation.fr";
import { OKR_ENTREPRISE_MANAGER_ECHEANCE_FR } from "../../content/drills/okr-entreprise.echeance.fr";
import { OKR_ENTREPRISE_MANAGER_CONTEXTE_FR } from "../../content/drills/okr-entreprise.contexte.fr";
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
    title: "Le verbe d'un Résultat clé",
    desc: "Output ou outcome ? Apprends à reconnaître le verbe qui décrit un changement à atteindre, à l'échelle entreprise.",
    status: "active",
  },
  {
    key: "indicateur",
    num: "2",
    title: "L'indicateur du Résultat clé",
    desc: "Indicateur mesurable ou health metric déguisée ? Repère ce qui se vérifie sans ambiguïté en revue.",
    status: "active",
  },
  {
    key: "variation",
    num: "3",
    title: "La variation chiffrée",
    desc: "Précise ou vague ? Un Résultat clé sans valeur de référence ni cible ne tient pas.",
    status: "active",
  },
  {
    key: "echeance",
    num: "4",
    title: "L'échéance annuelle",
    desc: "Fin d'année, jalon trimestriel ? Bornes valides pour un Résultat clé entreprise.",
    status: "active",
  },
  {
    key: "contexte",
    num: "5",
    title: "Le contexte",
    desc: "Qui est le vrai bénéficiaire ? Le client, le salarié, ou l'entreprise elle-même.",
    status: "active",
  },
];

const repo = createContentRepository();

export function OkrEnterprisePractice(_props: Props) {
  const warmupCases = useMemo(() => repo.getWarmupCases("okr-entreprise", "manager"), []);
  const [activeDrill, setActiveDrill] = useState<DrillKey | null>(null);

  const drillConfigs = {
    indicateur: {
      corpus: OKR_ENTREPRISE_MANAGER_INDICATOR_FR,
      title: "L'indicateur : mesurable ou health metric ?",
      lede: "Un indicateur de Résultat clé entreprise se mesure avec exactitude. Une health metric (seuil à préserver) est un garde-fou, pas un Résultat clé.",
    },
    variation: {
      corpus: OKR_ENTREPRISE_MANAGER_VARIATION_FR,
      title: "La variation chiffrée : précise ou vague ?",
      lede: "Coche tous les fragments qui donnent une valeur de référence et une cible. Les vagues, laisse-les.",
    },
    echeance: {
      corpus: OKR_ENTREPRISE_MANAGER_ECHEANCE_FR,
      title: "L'échéance : bornée ou floue ?",
      lede: "Coche toutes les échéances bornées à l'échelle d'un OKR entreprise (annuel, jalon trimestriel). Les floues, laisse-les.",
    },
    contexte: {
      corpus: OKR_ENTREPRISE_MANAGER_CONTEXTE_FR,
      title: "Le contexte : qui est le vrai bénéficiaire ?",
      lede: "Pour chaque Résultat clé, identifie qui vit le changement mesuré : client, salarié, ou l'entreprise elle-même.",
    },
  } as const;

  if (activeDrill && activeDrill !== "verbe") {
    const cfg = drillConfigs[activeDrill];
    return (
      <Screen
        header={{
          eyebrow: <span>OKR entreprise · S'entraîner · {DRILLS.find((d) => d.key === activeDrill)?.title}</span>,
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
          eyebrow: <span>OKR entreprise · S'entraîner · Verbe</span>,
          title: "Le verbe d'un Résultat clé : output ou outcome ?",
          lede:
            "Un Résultat clé vise un changement mesurable, pas une livraison. Entraîne-toi à reconnaître la distinction à l'échelle entreprise.",
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
              <div className="warmup__rule warmup__rule--standalone" role="note">
                <p>
                  <strong>Si le verbe décrit ce que fait l'entreprise</strong>, c'est un <em>output</em>.
                  <br />
                  <strong>S'il décrit ce qui change après</strong>, c'est un <em>outcome</em>.
                </p>
                <p className="warmup__rule-aside">
                  Un bon Résultat clé vise un <em>outcome</em> mesurable, jamais un projet ni une activité.
                </p>
              </div>
              <Warmup
                key="warmup-verbe-okr-entreprise"
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
        eyebrow: <span>OKR entreprise · S'entraîner</span>,
        title: "Choisis l'exercice qui te parle",
        lede:
          "Un Résultat clé entreprise solide est fait de 5 pièces. Travaille celle que tu veux renforcer.",
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
      <h4 className="next-drills__title">Travaille une autre partie du Résultat clé</h4>
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
