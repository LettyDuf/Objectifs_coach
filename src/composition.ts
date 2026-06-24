/**
 * Composition root — où le domaine et les adaptateurs sont câblés.
 *
 * Une seule fonction `buildCoach()` retourne le port d'entrée (CoachUseCase) prêt à
 * être consommé par n'importe quel adaptateur driving (UI React, CLI, tests).
 *
 * Aucun composant React ne doit instancier le moteur directement : ils appellent
 * `buildCoach()`. Si un jour on remplace l'implémentation du repository (par exemple
 * pour charger le contenu depuis une API), on ne touche qu'à ce fichier.
 */

import { createCoachEngine } from "./domain/engine";
import { createContentRepository } from "./content/repository";
import type { CoachUseCase } from "./domain/ports";

export function buildCoach(): CoachUseCase {
  const repository = createContentRepository();
  return createCoachEngine(() => repository.getHeuristicsConfig());
}
