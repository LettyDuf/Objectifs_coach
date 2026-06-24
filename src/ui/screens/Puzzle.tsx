/**
 * Écran Puzzle générique — multi-type (Sprint / PI / OKR).
 *
 * Voir D16 : un seul composant, sélecteur de type interne. La pédagogie du puzzle
 * s'exerce par contraste entre les types (la grammaire est universelle, le vocabulaire
 * change selon l'échelle).
 *
 * Métadonnées spécifiques affichées conditionnellement :
 *   - Sprint : aucune.
 *   - PI : sélecteur classe (committed/stretch) + valeur business 1-10.
 *   - OKR : à venir (KR multiples).
 *
 * Synchronisation : si l'utilisateur change de type ici, l'état d'app reflète le
 * nouveau type pour cohérence du fil d'Ariane (callback `onTypeChange`).
 */

import { useId, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  useDraggable,
  useDroppable,
  type Announcements,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSwappingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { CoachUseCase } from "../../domain/ports";
import type {
  PuzzleBlock,
  PuzzleCategory,
  PuzzleSet,
  PlacedBlock,
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
import { assembleSentence, isComplete, newInstanceId } from "../../domain/puzzle/assemble";
import { EvaluationPanel } from "../components/EvaluationPanel";
import { useSession } from "../SessionContext";
import { Screen } from "../layout/Screen";
import { Zone } from "../layout/Zone";

interface Props {
  coach: CoachUseCase;
  initialType: ObjectiveType;
  onTypeChange: (type: ObjectiveType) => void;
  onExit: () => void;
}

const repo = createContentRepository();

const CATEGORY_LABELS: Record<PuzzleCategory, string> = {
  action: "1. Action",
  indicator: "2. Indicateur",
  variation: "3. Variation",
  context: "4. Contexte",
  preposition: "5. Préposition",
  timeReference: "6. Repère temporel",
};

const CATEGORY_ORDER: PuzzleCategory[] = [
  "action",
  "indicator",
  "variation",
  "context",
  "preposition",
  "timeReference",
];

const PASS_SCORE = 80;

const DND_INSTRUCTIONS = {
  draggable:
    "Pour saisir un bloc, appuie sur Espace ou Entrée. Utilise les flèches pour déplacer, Espace pour déposer, Échap pour annuler. Tu peux aussi utiliser le bouton « + » à côté de chaque bloc.",
};

/** Types d'objectif pour lesquels un corpus puzzle existe (V1 actuel). */
const AVAILABLE_TYPES: ObjectiveType[] = ["sprint", "pi", "okr-equipe"];

const TYPE_LABELS: Record<ObjectiveType, string> = {
  sprint: "Sprint",
  pi: "Program Increment",
  "okr-equipe": "OKR équipe",
  "okr-entreprise": "OKR entreprise",
};

export function Puzzle({ coach, initialType, onTypeChange, onExit }: Props) {
  const typeRadioName = useId();
  const piClassRadioName = useId();

  const [type, setType] = useState<ObjectiveType>(initialType);
  const set: PuzzleSet | null = useMemo(
    () => repo.getPuzzleSet(type, "dev", "hard"),
    [type],
  );

  const [placed, setPlaced] = useState<PlacedBlock[]>([]);
  const [piClass, setPiClass] = useState<PiClass>("committed");
  const [businessValue, setBusinessValue] = useState<number>(5);
  const [solvedThisRound, setSolvedThisRound] = useState(false);
  const session = useSession();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function changeType(next: ObjectiveType) {
    setType(next);
    setPlaced([]); // vide la zone : pas de pollution croisée entre types
    setSolvedThisRound(false);
    onTypeChange(next);
  }

  function addBlock(block: PuzzleBlock) {
    setPlaced((p) => [
      ...p,
      {
        instanceId: newInstanceId(),
        block,
        values: block.kind === "numericField" ? Array(block.fieldCount).fill("") : [],
      },
    ]);
    setSolvedThisRound(false);
  }

  function removeBlock(instanceId: string) {
    setPlaced((p) => p.filter((b) => b.instanceId !== instanceId));
    setSolvedThisRound(false);
  }

  function updateFieldValue(instanceId: string, fieldIndex: number, value: string) {
    setPlaced((p) =>
      p.map((b) => {
        if (b.instanceId !== instanceId) return b;
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (
      typeof active.id === "string" &&
      active.id.startsWith("placed-") &&
      typeof over.id === "string" &&
      over.id.startsWith("placed-")
    ) {
      const oldIndex = placed.findIndex((p) => `placed-${p.instanceId}` === active.id);
      const newIndex = placed.findIndex((p) => `placed-${p.instanceId}` === over.id);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setPlaced((p) => arrayMove(p, oldIndex, newIndex));
      }
      return;
    }
    if (
      typeof active.id === "string" &&
      active.id.startsWith("source-") &&
      typeof over.id === "string" &&
      (over.id === "target-zone" || over.id.startsWith("placed-"))
    ) {
      const sourceBlock = findSourceBlock(set, active.id.replace(/^source-/, ""));
      if (sourceBlock) addBlock(sourceBlock);
    }
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Bloc ${String(active.id)} saisi.`;
    },
    onDragOver({ active, over }) {
      if (over) return `Bloc ${String(active.id)} survole ${String(over.id)}.`;
      return undefined;
    },
    onDragEnd({ active, over }) {
      if (over) return `Bloc ${String(active.id)} déposé dans ${String(over.id)}.`;
      return `Bloc ${String(active.id)} relâché hors de toute zone.`;
    },
    onDragCancel({ active }) {
      return `Déplacement du bloc ${String(active.id)} annulé.`;
    },
  };

  const sentence = assembleSentence(placed);
  const ready = placed.length > 0 && isComplete(placed);

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
      // Le puzzle OKR assemble UN Key Result (l'Objective est qualitatif et n'est pas
      // « assemblable » par blocs). On présente le KR comme l'élément central et on
      // injecte 2 KR « repères » bons pour respecter la contrainte 3-5 KR sans
      // perturber l'évaluation pédagogique de la grammaire du KR assemblé.
      const okrDraft: OkrTeamDraft = {
        type: "okr-equipe",
        text: "Objective qualitatif de l'équipe (défini hors puzzle).",
        audience: "dev",
        hasExplicitDeadline: true,
        isUnderTeamInfluence: true,
        keyResults: [
          { text: sentence, confidence: 60 },
          { text: "Faire passer le NPS de 28 à 50 d'ici la fin du trimestre.", confidence: 60 },
          {
            text: "Réduire le temps d'onboarding d'une nouvelle équipe de 4 h à 1 h d'ici la fin du trimestre.",
            confidence: 60,
          },
        ],
      };
      return okrDraft;
    }
    // Sprint par défaut
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

  const result = ready ? coach.evaluate(buildDraft()) : null;

  if (result && result.score >= PASS_SCORE && !solvedThisRound) {
    queueMicrotask(() => {
      if (!solvedThisRound) {
        session.bump();
        setSolvedThisRound(true);
      }
    });
  }

  if (!set) {
    return (
      <Screen
        header={{
          eyebrow: <span>Puzzle · {TYPE_LABELS[type]}</span>,
          title: "Puzzle indisponible",
          lede: "Aucun corpus de puzzle n'est défini pour ce type d'objectif.",
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      accessibility={{ announcements, screenReaderInstructions: DND_INSTRUCTIONS }}
    >
      <Screen
        header={{
          eyebrow: <span>Puzzle · {TYPE_LABELS[type]}</span>,
          title: `Assemble un objectif ${TYPE_LABELS[type]}`,
          lede:
            "La grammaire d'un bon objectif est la même partout : verbe, indicateur, variation chiffrée, contexte, échéance. Le vocabulaire change selon le type. Bascule pour comparer.",
          actions: (
            <>
              <fieldset className="puzzle-type-toggle" style={{ border: 0, padding: 0, margin: 0, display: "flex", gap: "var(--space-2)" }}>
                <legend className="sr-only">Type d'objectif</legend>
                {AVAILABLE_TYPES.map((t) => (
                  <label key={t} className="field__check" style={{ marginBottom: 0 }}>
                    <input
                      type="radio"
                      name={typeRadioName}
                      checked={type === t}
                      onChange={() => changeType(t)}
                    />
                    <span>{TYPE_LABELS[t]}</span>
                  </label>
                ))}
              </fieldset>
              <button className="btn btn--sm" onClick={reset} disabled={placed.length === 0}>
                Vider
              </button>
            </>
          ),
        }}
        body={{
          variant: "source-aside",
          primary: (
            <div className="puzzle-source">
              {/* Métadonnées spécifiques au type (PI : classe + valeur business). */}
              {type === "pi" && (
                <fieldset className="field-group" style={{ gridColumn: "1 / -1", marginBottom: "var(--space-3)" }}>
                  <legend className="field-group__legend">Métadonnées PI</legend>
                  <div className="field">
                    <span className="field__label">Classe</span>
                    <label className="field__check">
                      <input
                        type="radio"
                        name={piClassRadioName}
                        checked={piClass === "committed"}
                        onChange={() => setPiClass("committed")}
                      />
                      <span>Committed (engagement)</span>
                    </label>
                    <label className="field__check">
                      <input
                        type="radio"
                        name={piClassRadioName}
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
                  <div />
                </fieldset>
              )}

              {CATEGORY_ORDER.map((cat) => (
                <div key={cat} className="puzzle-source__column">
                  <h3 className="puzzle-source__title">{CATEGORY_LABELS[cat]}</h3>
                  <div className="puzzle-source__blocks">
                    {set.blocksByCategory[cat].map((block) => (
                      <SourceBlockRow key={block.id} block={block} onAdd={() => addBlock(block)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
          context: (
            <Zone variant="context" aria-label="Zone d'assemblage et évaluation">
              <TargetZone placed={placed} onRemove={removeBlock} onUpdateField={updateFieldValue} />

              <div className="puzzle-output">
                <h3 className="puzzle-output__heading">Phrase assemblée</h3>
                <p className="puzzle-output__sentence">{sentence || "(vide)"}</p>
                {!ready && placed.length > 0 && (
                  <p className="puzzle-output__hint">
                    Remplis tous les champs chiffrés pour déclencher l'évaluation.
                  </p>
                )}
              </div>

              <EvaluationPanel result={result} />
            </Zone>
          ),
        }}
        actions={{
          left: (
            <button className="btn" onClick={onExit}>
              Quitter le puzzle
            </button>
          ),
          status: result ? (
            <span
              className={`score-chip score-chip--${result.overallStatus}`}
              aria-label={`Score ${result.score} sur 100`}
            >
              <span className="score-chip__label">Score</span>
              {result.score} / 100
            </span>
          ) : placed.length === 0 ? (
            <span>Glisse un bloc dans la zone d'assemblage pour commencer.</span>
          ) : (
            <span>Remplis tous les champs chiffrés pour déclencher l'évaluation.</span>
          ),
        }}
      />
    </DndContext>
  );
}

function findSourceBlock(set: PuzzleSet | null, blockId: string): PuzzleBlock | null {
  if (!set) return null;
  for (const cat of CATEGORY_ORDER) {
    const found = set.blocksByCategory[cat].find((b) => b.id === blockId);
    if (found) return found;
  }
  return null;
}

function SourceBlockRow({ block, onAdd }: { block: PuzzleBlock; onAdd: () => void }) {
  const label = block.kind === "text" ? block.text || "(vide)" : block.template;
  return (
    <div className="puzzle-source__block-row">
      <SourceBlock block={block} label={label} />
      <button
        type="button"
        className="puzzle-block__add"
        onClick={onAdd}
        aria-label={`Ajouter le bloc « ${label} » à la zone d'assemblage`}
        title="Ajouter à la zone"
      >
        +
      </button>
    </div>
  );
}

function SourceBlock({ block, label }: { block: PuzzleBlock; label: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `source-${block.id}`,
  });
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <span
      ref={setNodeRef}
      style={style}
      className="puzzle-block puzzle-block--source"
      {...attributes}
      {...listeners}
      aria-label={`Bloc à glisser : ${label}`}
    >
      {label}
    </span>
  );
}

function TargetZone({
  placed,
  onRemove,
  onUpdateField,
}: {
  placed: PlacedBlock[];
  onRemove: (instanceId: string) => void;
  onUpdateField: (instanceId: string, fieldIndex: number, value: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "target-zone" });
  return (
    <div
      ref={setNodeRef}
      className={`puzzle-target ${isOver ? "puzzle-target--over" : ""}`}
      aria-label="Zone d'assemblage de la phrase"
    >
      <SortableContext
        items={placed.map((p) => `placed-${p.instanceId}`)}
        strategy={rectSwappingStrategy}
      >
        {placed.length === 0 && (
          <p className="puzzle-target__empty">
            Glisse un bloc ici (ou clique sur « + » à côté d'un bloc) pour commencer.
          </p>
        )}
        {placed.map((p) => (
          <PlacedBlockView
            key={p.instanceId}
            placed={p}
            onRemove={() => onRemove(p.instanceId)}
            onUpdateField={(idx, val) => onUpdateField(p.instanceId, idx, val)}
          />
        ))}
      </SortableContext>
    </div>
  );
}

function PlacedBlockView({
  placed,
  onRemove,
  onUpdateField,
}: {
  placed: PlacedBlock;
  onRemove: () => void;
  onUpdateField: (fieldIndex: number, value: string) => void;
}) {
  const id = `placed-${placed.instanceId}`;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const { block } = placed;
  const label = block.kind === "text" ? block.text || "(vide)" : block.template;

  return (
    <div ref={setNodeRef} style={style} className="puzzle-block puzzle-block--placed">
      <span
        className="puzzle-block__handle"
        aria-label={`Déplacer le bloc ${label}`}
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </span>
      <span className="puzzle-block__content">
        {block.kind === "text" ? (
          block.text || <em>(vide)</em>
        ) : (
          renderTemplateWithInputs(block.template, block.fieldCount, placed.values, onUpdateField)
        )}
      </span>
      <button
        type="button"
        className="puzzle-block__remove"
        aria-label={`Retirer le bloc ${label}`}
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  );
}

function fieldLabelFor(template: string, fieldCount: 1 | 2, fieldIndex: number): string {
  if (template.includes("de [X] à [Y]")) {
    return fieldIndex === 0 ? "Valeur de départ" : "Valeur cible";
  }
  if (template.startsWith("par [X]")) return "Facteur (par combien)";
  if (template.startsWith("à [X]")) return "Valeur cible à atteindre";
  if (template.includes("[X] %")) return "Pourcentage de variation";
  return fieldCount === 1 ? "Valeur chiffrée" : `Valeur ${fieldIndex + 1}`;
}

function renderTemplateWithInputs(
  template: string,
  fieldCount: 1 | 2,
  values: string[],
  onChange: (fieldIndex: number, value: string) => void,
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = template;
  const placeholders: Array<"[X]" | "[Y]"> = ["[X]", "[Y]"];
  let placeholderIdx = 0;
  let key = 0;
  while (placeholderIdx < fieldCount) {
    const ph = placeholders[placeholderIdx]!;
    const at = remaining.indexOf(ph);
    if (at === -1) break;
    if (at > 0) parts.push(<span key={`t-${key++}`}>{remaining.slice(0, at)}</span>);
    const currentIdx = placeholderIdx;
    parts.push(
      <input
        key={`i-${currentIdx}`}
        type="text"
        inputMode="numeric"
        className="puzzle-block__field"
        value={values[currentIdx] ?? ""}
        onChange={(e) => onChange(currentIdx, e.target.value)}
        aria-label={fieldLabelFor(template, fieldCount, currentIdx)}
        placeholder={ph}
      />,
    );
    remaining = remaining.slice(at + ph.length);
    placeholderIdx += 1;
  }
  if (remaining.length > 0) parts.push(<span key={`t-end`}>{remaining}</span>);
  return parts;
}
