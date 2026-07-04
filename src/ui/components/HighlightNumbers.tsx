/**
 * Met en évidence les valeurs chiffrées (pourcentages, durées, ratios, comptes)
 * dans un texte pédagogique — ce sont elles qui rendent un objectif falsifiable,
 * donc la partie la plus "importante" à distinguer visuellement d'une lecture
 * uniforme (retour Lætitia, 2026-07-04, carte "Piège évité").
 *
 * Purement présentation : ne modifie jamais le texte, ne dérive aucune logique
 * pédagogique — un simple découpage par expression régulière suivi d'un
 * habillage visuel. Le contenu reste celui défini dans les corpus.
 */

import type { ReactNode } from "react";

// Lookbehind négatif : évite de couper un identifiant du type "p95" ou "v2" en
// matchant un chiffre en plein milieu (ex. "p9" + "5" séparés à tort).
const NUMBER_PATTERN =
  /((?<![A-Za-z0-9])\d+(?:[.,]\d+)?\s?\/\s?\d+(?:[.,]\d+)?|(?<![A-Za-z0-9])\d+(?:[.,]\d+)?\s?(?:%|ms|h|min|mn|secondes?|s\b|jours?|semaines?|mois|trimestres?)|(?<![A-Za-z0-9])\d+(?:[.,]\d+)?)/g;

interface Props {
  text: string;
}

export function HighlightNumbers({ text }: Props): ReactNode {
  const parts = text.split(NUMBER_PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="quiz-feedback__highlight">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
