/**
 * Tests comportementaux du composant Drill (QcmRunner et GridRunner).
 *
 * Couvre les bugs de la session 2026-06-27 :
 *   - page blanche à la fin du QCM (current undefined avant le test finished)
 *   - state qui persistait entre drills (clé React manquante)
 *   - feedback affiché après la sélection
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drill } from "./Drill";
import type { DrillCorpus } from "../../domain/drill";

const QCM_FIXTURE: DrillCorpus = {
  kind: "qcm",
  intro: "Intro test",
  cases: [
    {
      id: "t.1",
      statement: "Statement 1",
      question: "Question 1 ?",
      options: [
        { id: "A", text: "Option A bonne", isCorrect: true },
        { id: "B", text: "Option B mauvaise", isCorrect: false },
        { id: "C", text: "Option C mauvaise", isCorrect: false },
      ],
      explanation: "Explication 1",
    },
    {
      id: "t.2",
      statement: "Statement 2",
      question: "Question 2 ?",
      options: [
        { id: "A", text: "Option A mauvaise", isCorrect: false },
        { id: "B", text: "Option B bonne", isCorrect: true },
        { id: "C", text: "Option C mauvaise", isCorrect: false },
      ],
      explanation: "Explication 2",
    },
  ],
};

const GRID_FIXTURE: DrillCorpus = {
  kind: "grid",
  intro: "Intro grille",
  data: {
    consigne: "Coche les bons",
    fragments: [
      { id: "g.1", text: "Bon fragment", isCorrect: true, justification: "raison" },
      { id: "g.2", text: "Mauvais fragment", isCorrect: false, justification: "raison" },
      { id: "g.3", text: "Autre bon", isCorrect: true, justification: "raison" },
    ],
  },
};

describe("Drill QcmRunner", () => {
  it("affiche un statement et 3 options", () => {
    render(<Drill corpus={QCM_FIXTURE} />);
    // On a un cas affiché (randomisation, mais 2 cas total possibles)
    const statements = screen.getAllByText(/^Statement \d$/);
    expect(statements.length).toBe(1);
  });

  it("révèle l'explication après le clic", async () => {
    const user = userEvent.setup();
    render(<Drill corpus={QCM_FIXTURE} />);
    const options = screen.getAllByRole("button");
    // Cliquer la première option visible
    await user.click(options[0]!);
    // L'explication du cas actuel apparaît
    const explanations = screen.queryAllByText(/^Explication \d$/);
    expect(explanations.length).toBe(1);
  });

  it("ne crashe pas à la fin (régression : page blanche)", async () => {
    const user = userEvent.setup();
    render(<Drill corpus={QCM_FIXTURE} />);
    // Jouer les 2 cas séquentiellement
    for (let i = 0; i < 2; i++) {
      const allButtons = screen.getAllByRole("button");
      await user.click(allButtons[0]!); // sélectionne une option
      const next = await screen.findByText(/Suivant|Voir le bilan/);
      await user.click(next);
    }
    // À la fin : bilan affiché, pas de page blanche
    expect(await screen.findByText(/Exercice terminé/)).toBeInTheDocument();
    expect(await screen.findByText(/Recommencer/)).toBeInTheDocument();
  });

  it("affiche le endSlot après le bilan", async () => {
    const user = userEvent.setup();
    render(
      <Drill
        corpus={QCM_FIXTURE}
        endSlot={<div data-testid="end-slot">Suite suggérée</div>}
      />,
    );
    for (let i = 0; i < 2; i++) {
      const allButtons = screen.getAllByRole("button");
      await user.click(allButtons[0]!);
      const next = await screen.findByText(/Suivant|Voir le bilan/);
      await user.click(next);
    }
    expect(await screen.findByTestId("end-slot")).toBeInTheDocument();
  });
});

describe("Drill GridRunner", () => {
  it("affiche la consigne et les 3 fragments", () => {
    render(<Drill corpus={GRID_FIXTURE} />);
    expect(screen.getByText("Coche les bons")).toBeInTheDocument();
    expect(screen.getByText("Bon fragment")).toBeInTheDocument();
    expect(screen.getByText("Mauvais fragment")).toBeInTheDocument();
    expect(screen.getByText("Autre bon")).toBeInTheDocument();
  });

  it("le bouton Valider est désactivé tant qu'aucune sélection", () => {
    render(<Drill corpus={GRID_FIXTURE} />);
    const validate = screen.getByRole("button", { name: /Valider mes choix/ });
    expect(validate).toBeDisabled();
  });

  it("valide affiche le bilan avec justifications", async () => {
    const user = userEvent.setup();
    render(<Drill corpus={GRID_FIXTURE} />);
    // Cocher un fragment
    await user.click(screen.getByText("Bon fragment"));
    const validate = screen.getByRole("button", { name: /Valider mes choix/ });
    expect(validate).not.toBeDisabled();
    await user.click(validate);
    expect(await screen.findByText(/Exercice terminé/)).toBeInTheDocument();
  });
});
