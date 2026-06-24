import { describe, it, expect } from "vitest";
import {
  CHALLENGE_PASS_SCORE,
  buildChallengeQueue,
  canAdvance,
  nextIndex,
} from "./challenge";
import type { AnnotatedExample } from "../domain/ports";

const examples: AnnotatedExample[] = [
  {
    id: "a",
    verdict: "good",
    draft: { type: "sprint", text: "x", audience: "dev" },
    rationale: "",
  },
  {
    id: "b",
    verdict: "bad",
    draft: { type: "sprint", text: "y", audience: "dev" },
    rationale: "",
  },
  {
    id: "c",
    verdict: "bad",
    draft: { type: "sprint", text: "z", audience: "dev" },
    rationale: "",
  },
];

describe("buildChallengeQueue", () => {
  it("ne garde que les mauvais exemples", () => {
    const queue = buildChallengeQueue(examples);
    expect(queue.map((e) => e.id)).toEqual(["b", "c"]);
  });
});

describe("canAdvance", () => {
  it("accepte un score au seuil", () => {
    expect(canAdvance(CHALLENGE_PASS_SCORE)).toBe(true);
  });
  it("accepte un score au-dessus", () => {
    expect(canAdvance(95)).toBe(true);
  });
  it("refuse en dessous", () => {
    expect(canAdvance(79)).toBe(false);
  });
});

describe("nextIndex", () => {
  it("avance d'un cran", () => {
    expect(nextIndex(0, 3)).toBe(1);
  });
  it("retourne null en bout de queue", () => {
    expect(nextIndex(2, 3)).toBeNull();
  });
});
