/**
 * Compteur de session — éphémère, partagé entre écrans.
 *
 * Aucune persistance (cohérent D5 DECISIONS.md : usage atelier, éphémère par construction).
 * Le compteur compte les défis relevés (≥ 80 sur un mauvais exemple à réécrire), pas
 * tous les scores élevés — donne un signal concret et non gameable.
 */

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface SessionState {
  challengesSolved: number;
  bump: () => void;
  reset: () => void;
}

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [challengesSolved, setChallengesSolved] = useState(0);
  const bump = useCallback(() => setChallengesSolved((n) => n + 1), []);
  const reset = useCallback(() => setChallengesSolved(0), []);
  return (
    <SessionContext.Provider value={{ challengesSolved, bump, reset }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession doit être utilisé à l'intérieur d'un <SessionProvider>");
  return ctx;
}
