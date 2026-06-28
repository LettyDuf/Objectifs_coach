/**
 * Écran Puzzle — Plateau de cartes (D25).
 *
 * Métaphore : on choisit des cartes dans une main et on les pose sur les
 * zones d'un plateau. 6 zones fixes (4 obligatoires + 2 bonus), 1 carte par
 * zone. Cartes-pièges (distractor) acceptées (D14) mais marquées d'un picto
 * « risque ».
 *
 * Mécanique :
 *   - clic sur une carte de la main → snap dans la zone correspondant à sa
 *     catégorie (CATEGORY_TO_SLOT). Si la zone contient déjà une carte, elle
 *     est remplacée.
 *   - clic sur la croix d'une carte posée → vide la zone.
 *   - animation slide-in 180 ms ease-out à chaque dépôt (D24).
 *
 * Évaluation :
 *   - se déclenche dès que les 4 zones obligatoires sont remplies ET que
 *     tous les champs chiffrés sont saisis (cf. isComplete mode plateau).
 *   - score affiché uniquement dans le panneau Évaluation (pas dans la
 *     barre d'actions sticky) pour éviter la redondance.
 */

import { useEffect, useMemo, useState } from "react";

import type { CoachUseCase } from "../../domain/ports";
import type {
  PuzzleBlock,
  PuzzleCategory,
  PuzzleSet,
  PlacedBlock,
  SlotKey,
} from "../../domain/puzzle/types";
import {
  CATEGORY_TO_SLOT,
  REQUIRED_SLOTS,
} from "../../domain/puzzle/types";
import type {
  ObjectiveDraft,
  ObjectiveType,
  OkrTeamDraft,
  PiClass,
  PiDraft,
  SprintDraft,
} from "../../domain/types";
import { createContentRepository } from "../../content/repository";
import {
  assembleSentence,
  isComplete,
  newInstanceId,
} from "../../domain/puzzle/assemble";
import { toMarkdown } from "../../adapters/export";
import { useSession } from "../SessionContext";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";
import { PhraseSkeleton } from "../composer/PhraseSkeleton";
import { HandCard } from "../composer/HandCard";

interface Props {
  coach: CoachUseCase;
  initialType: ObjectiveType;
  onTypeChange: (type: ObjectiveType) => void;
  onExit: () => void;
}

const repo = createContentRepository();


/** Types d'objectif pour lesquels un corpus puzzle existe (V1 actuel). */
const AVAILABLE_TYPES: ObjectiveType[] = ["sprint", "pi", "okr-equipe"];

const TYPE_LABELS: Record<ObjectiveType, string> = {
  sprint: "Sprint",
  pi: "Program Increment",
  "okr-equipe": "OKR équipe",
  "okr-entreprise": "OKR entreprise",
};

/** Onglets de la main : ordre d'apparition + libellé court. */
const HAND_TABS: Array<{ category: PuzzleCategory; label: string }> = [
  { category: "action", label: "Verbes" },
  { category: "indicator", label: "Indicateurs" },
  { category: "variation", label: "Variations" },
  { category: "context", label: "Contextes" },
  { category: "preposition", label: "Liaisons" },
  { category: "timeReference", label: "Échéances" },
];



export function Puzzle({ coach, initialType, onTypeChange, onExit }: Props) {
  const [type, setType] = useState<ObjectiveType>(initialType);
  const set: PuzzleSet | null = useMemo(
    () => repo.getPuzzleSet(type, "dev", "hard"),
    [type],
  );

  const [placed, setPlaced] = useState<PlacedBlock[]>([]);
  const [piClass, setPiClass] = useState<PiClass>("committed");
  const [businessValue, setBusinessValue] = useState<number>(5);
  const [solvedThisRound, setSolvedThisRound] = useState(false);
  const [activeTab, setActiveTab] = useState<PuzzleCategory>("action");
  const [teamContext, setTeamContext] = useState<string>("");
  const session = useSession();

  function changeType(next: ObjectiveType) {
    setType(next);
    setPlaced([]);
    setSolvedThisRound(false);
    setActiveTab("action");
    onTypeChange(next);
  }

  /** Pose une carte dans la zone correspondant à sa catégorie.
   *  Si la zone contient déjà une carte, elle est remplacée. */
  function playCard(block: PuzzleBlock) {
    const slot = CATEGORY_TO_SLOT[block.category];
    setPlaced((prev) => {
      const others = prev.filter((p) => p.slotKey !== slot);
      return [
        ...others,
        {
          instanceId: newInstanceId(),
          block,
          values:
            block.kind === "numericField" ? Array(block.fieldCount).fill("") : [],
          slotKey: slot,
        },
      ];
    });
    setSolvedThisRound(false);
  }

  function removeSlot(slot: SlotKey) {
    setPlaced((p) => p.filter((b) => b.slotKey !== slot));
    setSolvedThisRound(false);
  }

  function updateFieldValue(slot: SlotKey, fieldIndex: number, value: string) {
    setPlaced((p) =>
      p.map((b) => {
        if (b.slotKey !== slot) return b;
        const next = [...b.values];
        next[fieldIndex] = value;
        return { ...b, values: next };
      }),
    );
    setSolvedThisRound(false);
  }

  function reset() {
    setPlaced([]);
    setSolvedThisRound(false);
  }

  const sentence = assembleSentence(placed);
  const ready = isComplete(placed);

  /** Construit le draft selon le type sélectionné. */
  function buildDraft(): ObjectiveDraft {
    if (type === "pi") {
      const piDraft: PiDraft = {
        type: "pi",
        text: sentence,
        audience: "dev",
        confidence: piClass === "committed" ? 90 : 50,
        hasExplicitDeadline: true,
        isUnderTeamInfluence: true,
        piClass,
        businessValue,
      };
      return piDraft;
    }
    if (type === "okr-equipe") {
      const okrDraft: OkrTeamDraft = {
        type: "okr-equipe",
        text: "Objectif qualitatif de l'équipe (défini hors puzzle).",
        audience: "dev",
        hasExplicitDeadline: true,
        isUnderTeamInfluence: true,
        keyResults: [
          { text: sentence, confidence: 60 },
          { text: "Faire passer le NPS de 28 à 50 d'ici la fin du trimestre.", confidence: 60 },
          {
            text: "Réduire le temps d'intégration d'une nouvelle équipe de 4 h à 1 h d'ici la fin du trimestre.",
            confidence: 60,
          },
        ],
      };
      return okrDraft;
    }
    const sprintDraft: SprintDraft = {
      type: "sprint",
      text: sentence,
      audience: "dev",
      confidence: 80,
      hasExplicitDeadline: true,
      isUnderTeamInfluence: true,
    };
    return sprintDraft;
  }

  // D26 : pas de score moteur affiché. Le bump session se déclenche dès que
  // la phrase est composée (4 zones obligatoires + champs chiffrés), sans
  // exiger un seuil normatif. useEffect pour ne pas appeler setState pendant
  // le render (anti-pattern React).
  useEffect(() => {
    if (ready && !solvedThisRound) {
      session.bump();
      setSolvedThisRound(true);
    }
  }, [ready, solvedThisRound, session]);

  const [copyLabel, setCopyLabel] = useState<string>("Copier");

  async function handleCopy() {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(sentence);
      setCopyLabel("Copié ✓");
      window.setTimeout(() => setCopyLabel("Copier"), 1800);
    } catch {
      setCopyLabel("Échec");
      window.setTimeout(() => setCopyLabel("Copier"), 1800);
    }
  }

  function handleExportMd() {
    if (!ready) return;
    const draft = buildDraft();
    const result = coach.evaluate(draft);
    let md = toMarkdown(draft, result);
    const context = teamContext.trim();
    if (context) {
      md = `> Pour : ${context}\n\n` + md;
    }
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `objectif-${type}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (!set) {
    return (
      <Screen
        header={{
          eyebrow: <span>Composer · {TYPE_LABELS[type]}</span>,
          title: "Composer indisponible",
          lede: "Aucun corpus n'est défini pour ce type d'objectif.",
        }}
        body={{
          variant: "single",
          primary: (
            <Zone variant="primary">
              <p>Reviens plus tard ou change de type d'objectif.</p>
            </Zone>
          ),
        }}
        actions={{ left: <button className="btn" onClick={onExit}>Quitter</button> }}
      />
    );
  }

  // Index des slots remplis pour rendu rapide
  const placedBySlot = new Map<SlotKey, PlacedBlock>();
  for (const p of placed) {
    if (p.slotKey) placedBySlot.set(p.slotKey, p);
  }

  const coreFilled = REQUIRED_SLOTS.filter((s) => placedBySlot.has(s)).length;
  const trapCount = placed.filter((p) => p.block.quality === "distractor").length;

  return (
    <Screen
      header={{
        eyebrow: <span>Composer · {TYPE_LABELS[type]}</span>,
        title: `Compose un objectif ${TYPE_LABELS[type]}`,
        lede:
          "Assistant pour rédiger un vrai objectif d'équipe. Choisis tes cartes, l'outil te guide. 4 zones obligatoires, 2 bonus.",
        actions: (
          <>
            <fieldset className="puzzle-type-toggle">
              <legend className="sr-only">Type d'objectif</legend>
              {AVAILABLE_TYPES.map((t) => (
                <label key={t} className="field__check" style={{ marginBottom: 0 }}>
                  <input
                    type="radio"
                    name="puzzle-type"
                    checked={type === t}
                    onChange={() => changeType(t)}
                  />
                  <span>{TYPE_LABELS[t]}</span>
                </label>
              ))}
            </fieldset>
            <button className="btn btn--sm" onClick={reset} disabled={placed.length === 0}>
              Tout retirer
            </button>
          </>
        ),
      }}
      body={{
        variant: "single",
        primary: (
          <Zone variant="primary">
            {/* Contexte d'équipe : optionnel, librement saisi, apparaîtra dans l'export. */}
            <div className="composer-team">
              <label htmlFor="composer-team-input" className="composer-team__label">
                Pour quelle équipe composes-tu cet objectif ?
              </label>
              <input
                id="composer-team-input"
                type="text"
                className="composer-team__input"
                placeholder="Ex. Fondations TI · authentification (optionnel)"
                value={teamContext}
                onChange={(e) => setTeamContext(e.target.value)}
                maxLength={120}
              />
            </div>

            {/* Métadonnées PI repliées par défaut */}
            {type === "pi" && (
              <details className="puzzle-meta">
                <summary className="puzzle-meta__summary">
                  Paramètres PI
                  <span className="puzzle-meta__inline">
                    {piClass === "committed" ? "Engagé" : "Stretch"} · Valeur business {businessValue} / 10
                  </span>
                </summary>
                <div className="puzzle-meta__body">
                  <fieldset className="field-group">
                    <legend className="sr-only">Classe PI</legend>
                    <div className="field">
                      <span className="field__label">Classe</span>
                      <label className="field__check">
                        <input
                          type="radio"
                          name="pi-class"
                          checked={piClass === "committed"}
                          onChange={() => setPiClass("committed")}
                        />
                        <span>Engagé (engagement)</span>
                      </label>
                      <label className="field__check">
                        <input
                          type="radio"
                          name="pi-class"
                          checked={piClass === "stretch"}
                          onChange={() => setPiClass("stretch")}
                        />
                        <span>Stretch (ambition haute)</span>
                      </label>
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="pi-business-value">
                        Valeur business
                      </label>
                      <div className="confidence-row">
                        <input
                          id="pi-business-value"
                          type="range"
                          min={1}
                          max={10}
                          step={1}
                          value={businessValue}
                          onChange={(e) => setBusinessValue(Number(e.target.value))}
                        />
                        <span className="confidence-row__value">{businessValue} / 10</span>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </details>
            )}

            {/* Plateau = squelette de phrase à trous. Chaque zone est une pill
                colorée soulignée (vide en italique muted, remplie avec le texte
                de la carte). Inspiré du pattern .bricks__phrase--skeleton des
                fiches théoriques pour cohérence visuelle. */}
            <section className="puzzle-skeleton" aria-label="Squelette de la phrase">
              <h3 className="puzzle-skeleton__heading">Ta phrase à construire</h3>
              <div className="puzzle-skeleton__phrase">
                <PhraseSkeleton
                  placedBySlot={placedBySlot}
                  onRemove={removeSlot}
                  onUpdateField={updateFieldValue}
                />
              </div>
              {placed.length > 0 && (
                <div className="puzzle-skeleton__meta">
                  <span className="puzzle-skeleton__counter">
                    {coreFilled} / 4 zones obligatoires
                  </span>
                  {trapCount > 0 && (
                    <span className="puzzle-skeleton__trap-count" title="Cartes à risque posées">
                      <span aria-hidden="true">!</span>
                      {trapCount} carte{trapCount > 1 ? "s" : ""} à risque
                    </span>
                  )}
                </div>
              )}
            </section>

            {/* Main : onglets de catégorie + cartes cliquables */}
            <section className="puzzle-hand" aria-label="Main de cartes">
              <div className="puzzle-hand__head">
                <h3 className="puzzle-hand__heading">Ta main de cartes</h3>
                <span className="puzzle-hand__hint">Clique une carte pour la jouer</span>
              </div>
              <div className="puzzle-hand__tabs" role="tablist">
                {HAND_TABS.map((tab) => {
                  const slot = CATEGORY_TO_SLOT[tab.category];
                  const isFilled = placedBySlot.has(slot);
                  const isActive = activeTab === tab.category;
                  return (
                    <button
                      key={tab.category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`puzzle-hand__tab puzzle-hand__tab--${tab.category}${isActive ? " is-active" : ""}${isFilled ? " is-filled" : ""}`}
                      onClick={() => setActiveTab(tab.category)}
                    >
                      <span>{tab.label}</span>
                      {isFilled && (
                        <span className="puzzle-hand__tab-dot" aria-label="zone remplie">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="puzzle-hand__deck" role="tabpanel">
                {set.blocksByCategory[activeTab]
                  .filter((b) => b.quality !== "distractor")
                  .map((block) => (
                    <HandCard
                      key={block.id}
                      block={block}
                      onPlay={() => playCard(block)}
                    />
                  ))}
              </div>
            </section>
          </Zone>
        ),
      }}
      actions={{
        left: (
          <button className="btn" onClick={onExit}>
            Quitter
          </button>
        ),
        status: (
          <span className="composer-status">
            {placed.length === 0
              ? "Choisis une carte dans ta main pour commencer."
              : !ready
                ? coreFilled < REQUIRED_SLOTS.length
                  ? `${coreFilled} / 4 zones obligatoires remplies.`
                  : "Plus qu'à remplir les champs chiffrés."
                : "Ton objectif est prêt."}
          </span>
        ),
        right: (
          <div className="composer-actions">
            <button
              type="button"
              className="btn"
              onClick={handleCopy}
              disabled={!ready}
              title={ready ? "Copier l'objectif dans le presse-papier" : "Disponible quand les 4 zones obligatoires sont remplies"}
            >
              {copyLabel}
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleExportMd}
              disabled={!ready}
              title={ready ? "Télécharger l'objectif en Markdown" : "Disponible quand les 4 zones obligatoires sont remplies"}
            >
              Exporter en Markdown
            </button>
          </div>
        ),
      }}
    />
  );
}




