import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BuildObjective } from "./BuildObjective";
import type { CoachUseCase } from "../../domain/ports";

const coach = {} as unknown as CoachUseCase;

function renderScreen() {
  render(<BuildObjective coach={coach} type="sprint" onExit={() => {}} />);
}

describe("BuildObjective (Construire l'objectif)", () => {
  it("propose les trois niveaux d'étayage et démarre au pari", () => {
    renderScreen();
    expect(screen.getByRole("button", { name: "Guidé" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Semi-autonome" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Autonome" })).toBeInTheDocument();
    expect(screen.getByText(/Votre objectif, tout de suite/)).toBeInTheDocument();
  });

  it("déroule les cinq temps jusqu'au miroir, sans score", async () => {
    const user = userEvent.setup();
    renderScreen();

    await user.click(screen.getByRole("button", { name: /décortiquons/i }));
    expect(screen.getByText("Construisons, brique par brique")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Réduire" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /à l'épreuve/i }));
    expect(screen.getByText(/Trois tests, à l'oral/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Assembler notre phrase/i }));
    expect(screen.getByText(/regroupe vos briques/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Confronter au miroir/i }));
    expect(screen.getByText(/Aucun score, aucun verdict/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Autre proposition à travailler/i }),
    ).toBeInTheDocument();
  });
});
