/**
 * App — racine de l'UI.
 *
 * Routage minimal par état React. Voir D9 : parcours mono-type.
 * Vague 1 (D15) : skip link, badge session sans remount, label width adaptatif.
 * D18/D19 : OKR à deux niveaux (équipe, entreprise), avec une page
 * intermédiaire `LevelSelector` quand l'utilisateur clique « OKR » sur la home.
 * D53 : OKR entreprise activé (revient sur D20, qui le marquait « à venir »).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { ObjectiveType } from "../domain/types";
import { buildCoach } from "../composition";
import { TypeSelector, type HomeChoice } from "./screens/TypeSelector";
import { ModeSelector } from "./screens/ModeSelector";
import { LevelSelector } from "./screens/LevelSelector";
import { SprintPractice } from "./screens/SprintPractice";
import { SprintLearn } from "./screens/SprintLearn";
// `Challenge` (rédaction libre) reste exporté pour compat historique mais n'est plus
// utilisé par le routing : tous les Défis passent par `ChallengeQuiz` depuis 2026-06-22.
import { ChallengeQuiz } from "./screens/ChallengeQuiz";
import { PitfallQuiz } from "./screens/PitfallQuiz";
import { Puzzle } from "./screens/Puzzle";
import { Analyse } from "./screens/Analyse";
import { PIPractice } from "./screens/PIPractice";
import { PILearn } from "./screens/PILearn";
import { OkrTeamPractice } from "./screens/OkrTeamPractice";
import { OkrTeamLearn } from "./screens/OkrTeamLearn";
import { OkrEnterprisePractice } from "./screens/OkrEnterprisePractice";
import { OkrEnterpriseLearn } from "./screens/OkrEnterpriseLearn";
import { SessionProvider, useSession } from "./SessionContext";

type Mode = "learn" | "practice" | "challenge" | "puzzle" | "analyse" | "pitfalls";

interface AppState {
  type: ObjectiveType | null;
  mode: Mode | null;
  /** Vrai quand l'utilisateur a cliqué « OKR » sur la home et qu'on attend le choix
   * du niveau (D19 — LevelSelector intermédiaire). */
  okrFamilyPending?: boolean;
  /** Thème sélectionné dans l'onglet Théorie du ModeSelector (D21). Présent uniquement
   * quand `mode === "learn"`. L'écran Théorie ouvre directement la galerie du thème. */
  themeId?: string | undefined;
}

export function App() {
  return (
    <SessionProvider>
      <AppShell />
    </SessionProvider>
  );
}

function AppShell() {
  const [state, setState] = useState<AppState>({ type: null, mode: null });
  const coach = useMemo(() => buildCoach(), []);
  const session = useSession();

  function selectHomeChoice(choice: HomeChoice) {
    if (choice === "okr-family") {
      setState({ type: null, mode: null, okrFamilyPending: true });
    } else {
      setState({ type: choice, mode: null });
    }
  }

  function selectOkrLevel(level: ObjectiveType) {
    setState({ type: level, mode: null });
  }

  function selectMode(mode: Mode) {
    setState((s) => ({ ...s, mode, themeId: undefined }));
  }

  function selectTheme(themeId: string) {
    setState((s) => ({ ...s, mode: "learn", themeId }));
  }

  function goHome() {
    setState({ type: null, mode: null });
  }

  function backToModes() {
    setState((s) => ({ ...s, mode: null }));
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>

      <header className="app__header">
        <div>
          <h1 className="app__title">Coach Objectifs</h1>
          <nav className="app__breadcrumb" aria-label="Fil d'Ariane">
            {state.type === null && !state.okrFamilyPending && <span>Accueil</span>}
            {state.type === null && state.okrFamilyPending && (
              <>
                <button onClick={goHome}>Accueil</button>
                {" › "}
                <span>OKR</span>
              </>
            )}
            {state.type !== null && (
              <>
                <button onClick={goHome}>Accueil</button>
                {" › "}
                {state.mode === null ? (
                  <span>{labelForType(state.type)}</span>
                ) : (
                  <>
                    <button onClick={backToModes}>{labelForType(state.type)}</button>
                    {" › "}
                    <span>{labelForMode(state.mode)}</span>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
        <SessionBadge count={session.challengesSolved} />
      </header>

      <main
        id="main-content"
        className={`app__main ${isScreenFrame(state) ? "app__main--bare" : ""}`}
      >
        {state.type === null && !state.okrFamilyPending && (
          <TypeSelector
            onSelect={selectHomeChoice}
            onExplore={() => setState({ type: "sprint", mode: "learn" })}
          />
        )}

        {state.type === null && state.okrFamilyPending && (
          <LevelSelector onSelectLevel={selectOkrLevel} onBack={goHome} />
        )}

        {state.type !== null && state.mode === null && (
          <ModeSelector
            typeLabel={labelForType(state.type)}
            objectiveType={state.type}
            onSelect={selectMode}
            onSelectTheme={selectTheme}
          />
        )}

        {state.type === "sprint" && state.mode === "practice" && (
          <SprintPractice coach={coach} />
        )}

        {state.type === "sprint" && state.mode === "learn" && (
          <SprintLearn
            coach={coach}
            themeId={state.themeId}
            onBack={backToModes}
            onEvaluateExample={() => setState({ type: "sprint", mode: "practice" })}
          />
        )}

        {/* Défi : QCM enrichi pour les 3 types (Sprint, PI, OKR équipe). Le composant
            `Challenge` (rédaction libre) reste exporté pour compat mais n'est plus
            atteignable depuis le routing principal. */}
        {state.type === "sprint" && state.mode === "challenge" && (
          <ChallengeQuiz coach={coach} type="sprint" onExit={backToModes} />
        )}

        {state.type === "pi" && state.mode === "challenge" && (
          <ChallengeQuiz coach={coach} type="pi" onExit={backToModes} />
        )}

        {state.type === "okr-equipe" && state.mode === "challenge" && (
          <ChallengeQuiz coach={coach} type="okr-equipe" onExit={backToModes} />
        )}

        {state.type === "pi" && state.mode === "practice" && <PIPractice coach={coach} />}

        {state.type === "pi" && state.mode === "learn" && (
          <PILearn
            coach={coach}
            themeId={state.themeId}
            onBack={backToModes}
            onEvaluateExample={() => setState({ type: "pi", mode: "practice" })}
          />
        )}

        {state.type === "okr-equipe" && state.mode === "practice" && (
          <OkrTeamPractice coach={coach} />
        )}

        {state.type === "okr-equipe" && state.mode === "learn" && (
          <OkrTeamLearn
            coach={coach}
            themeId={state.themeId}
            onBack={backToModes}
            onEvaluateExample={() => setState({ type: "okr-equipe", mode: "practice" })}
          />
        )}

        {state.type === "okr-entreprise" && state.mode === "challenge" && (
          <ChallengeQuiz coach={coach} type="okr-entreprise" onExit={backToModes} />
        )}

        {state.type === "okr-entreprise" && state.mode === "practice" && (
          <OkrEnterprisePractice coach={coach} />
        )}

        {state.type === "okr-entreprise" && state.mode === "learn" && (
          <OkrEnterpriseLearn
            coach={coach}
            themeId={state.themeId}
            onBack={backToModes}
            onEvaluateExample={() => setState({ type: "okr-entreprise", mode: "practice" })}
          />
        )}

        {/* Puzzle générique multi-type — voir D16. Accessible depuis Sprint, PI, OKR équipe
            ou OKR entreprise ; le sélecteur interne (cloisonné par audience, D53) permet la
            bascule rapide et resynchronise le state d'app. */}
        {state.type !== null && state.mode === "puzzle" && (
          <Puzzle
            coach={coach}
            initialType={state.type}
            onTypeChange={(newType) => setState({ type: newType, mode: "puzzle" })}
            onExit={backToModes}
          />
        )}

        {state.type !== null && state.mode === "analyse" && (
          <Analyse
            initialType={state.type}
            onTypeChange={(newType) => setState({ type: newType, mode: "analyse" })}
            onExit={backToModes}
          />
        )}

        {/* Anti-patterns : reconnaître un piège nommé à partir d'un mauvais exemple
            déjà enseigné en Théorie. Mono-type comme ChallengeQuiz (pas d'exception
            à D9) — un routage par type, pas de sélecteur interne. */}
        {state.type === "sprint" && state.mode === "pitfalls" && (
          <PitfallQuiz type="sprint" onExit={backToModes} onGoToTheme={selectTheme} />
        )}

        {state.type === "pi" && state.mode === "pitfalls" && (
          <PitfallQuiz type="pi" onExit={backToModes} onGoToTheme={selectTheme} />
        )}

        {state.type === "okr-equipe" && state.mode === "pitfalls" && (
          <PitfallQuiz type="okr-equipe" onExit={backToModes} onGoToTheme={selectTheme} />
        )}

        {state.type === "okr-entreprise" && state.mode === "pitfalls" && (
          <PitfallQuiz type="okr-entreprise" onExit={backToModes} onGoToTheme={selectTheme} />
        )}
      </main>
    </div>
  );
}

/**
 * Badge de session. Anime via classe ajoutée puis retirée, sans remount —
 * cohérent avec WCAG 4.1.3 (S5 audit a11y).
 */
function SessionBadge({ count }: { count: number }) {
  const [bumping, setBumping] = useState(false);
  const previousCount = useRef(count);

  useEffect(() => {
    if (count > previousCount.current) {
      setBumping(true);
      const timer = window.setTimeout(() => setBumping(false), 360);
      previousCount.current = count;
      return () => window.clearTimeout(timer);
    }
    previousCount.current = count;
  }, [count]);

  return (
    <div
      className={`session-badge ${count > 0 ? "session-badge--active" : ""} ${bumping ? "session-badge--bumping" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="session-badge__icon" aria-hidden="true">★</span>
      <span className="session-badge__count">{count}</span>
      <span>défi{count > 1 ? "s" : ""} relevé{count > 1 ? "s" : ""}</span>
    </div>
  );
}

/** Écrans qui consomment déjà le gabarit Screen (D17) — ne pas appliquer le padding du shell. */
function isScreenFrame(state: AppState): boolean {
  // Sélecteurs et page intermédiaire OKR : toujours Screen
  if (state.type === null) return true;
  if (state.mode === null) return true;
  // Sprint, PI et OKR entreprise : tous les écrans consomment déjà Screen (D17).
  if (state.type === "sprint" || state.type === "pi" || state.type === "okr-entreprise") {
    return true;
  }
  // OKR équipe : Practice et Learn migrés (Challenge/Puzzle/Analyse restent à vérifier,
  // hors périmètre de D53 — cf. STATUS.md).
  if (state.type === "okr-equipe") {
    return state.mode === "practice" || state.mode === "learn" || state.mode === "pitfalls";
  }
  return false;
}

function labelForType(type: ObjectiveType): string {
  switch (type) {
    case "sprint": return "Sprint";
    case "pi": return "Program Increment";
    case "okr-equipe": return "OKR équipe";
    case "okr-entreprise": return "OKR entreprise";
  }
}

function labelForMode(mode: Mode): string {
  switch (mode) {
    case "learn": return "Apprendre";
    case "practice": return "S'entraîner";
    case "challenge": return "Défi";
    case "puzzle": return "Composer";
    case "analyse": return "Analyser un objectif";
    case "pitfalls": return "Anti-patterns";
  }
}
