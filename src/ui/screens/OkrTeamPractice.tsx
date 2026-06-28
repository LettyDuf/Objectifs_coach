/**
 * OKR équipe S'entraîner — menu de mini-exercices par partie d'objectif.
 *
 * Réplique du pattern SprintPractice (D28). V1 MVP : seule la carte « Verbe »
 * est active (réutilise le Warmup OKR équipe existant). Les 4 autres sont
 * marquées "à venir" tant que les corpus OKR dédiés (Indicateur, Variation,
 * Échéance, Contexte) n'auront pas été produits et validés.
 */

import { useMemo, useState } from "react";

import type { CoachUseCase } from "../../domain/ports";
import { createContentRepository } from "../../content/repository";
import { Warmup } from "../components/Warmup";
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
    status: "todo",
  },
  {
    key: "variation",
    num: "3",
    title: "La variation chiffrée",
    desc: "Précise ou vague ? Un KR sans valeur de référence ni cible ne tient pas.",
    status: "todo",
  },
  {
    key: "echeance",
    num: "4",
    title: "L'échéance trimestrielle",
    desc: "Fin de trimestre, mois précis ? Bornes valides pour un KR.",
    status: "todo",
  },
  {
    key: "contexte",
    num: "5",
    title: "Le contexte",
    desc: "Qui est le vrai bénéficiaire ? L'utilisateur, l'équipe arrimée, la direction ?",
    status: "todo",
  },
];

const repo = createContentRepository();

export function OkrTeamPractice(_props: Props) {
  const warmupCases = useMemo(() => repo.getWarmupCases("okr-equipe", "dev"), []);
  const [activeDrill, setActiveDrill] = useState<DrillKey | null>(null);

  if (activeDrill === "verbe") {
    return (
      <Screen
        header={{
          eyebrow: <span>OKR équipe · S'entraîner · Verbe</span>,
          title: "Le verbe d'un KR : output ou outcome ?",
          lede:
            "Un KR vise un changement mesurable, pas une livraison. Entraîne-toi à reconnaître la distinction.",
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
                  <strong>Si le verbe décrit ce que tu fais</strong>, c'est un <em>output</em>.
                  <br />
                  <strong>S'il décrit ce qui change après</strong>, c'est un <em>outcome</em>.
                </p>
                <p className="warmup__rule-aside">
                  Un bon KR vise un <em>outcome</em> mesurable, jamais un livrable ni une tâche.
                </p>
              </div>
              <Warmup
                key="warmup-verbe-okr"
                cases={warmupCases}
                skipIntro
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
