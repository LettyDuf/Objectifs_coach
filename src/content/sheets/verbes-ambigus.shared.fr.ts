/**
 * Fiche partagée « Les verbes ambigus » (retour d'atelier 2026-07-08).
 *
 * Un même contenu, décliné dans le thème « fondamentaux » de chaque module :
 * la confusion (« pourquoi stabiliser est un output alors qu'il y a un
 * avant/après ? ») est transverse aux 4 types d'objectifs. Contenu validé
 * par Lætitia le 2026-07-08. La factory évite la duplication du texte tout
 * en laissant chaque module ranger la fiche dans son propre thème.
 */

import type { PedagogicalSheet } from "../../domain/ports";

export function makeVerbesAmbigusSheet(id: string, themeId: string): PedagogicalSheet {
  return {
    id,
    themeId,
    icon: "warn",
    title: "Les verbes ambigus",
    heroPhrase: "« Stabiliser », d'accord. Mais qui le verra ?",
    intro:
      "Certains verbes sonnent comme des résultats parce qu'ils décrivent un avant et un après : stabiliser, fiabiliser, sécuriser, accélérer, simplifier, moderniser. Le piège n'est pas dans le verbe. Il est dans la question qu'on oublie de poser.",
    sections: [
      {
        heading: "Le malentendu",
        icon: "warn",
        body:
          "« Stabiliser, il y a bien une différence entre avant et après. Pourquoi ce serait un output ? » L'objection est légitime. La réponse : parce que sans mesure, cette différence reste un jugement. À la fin du sprint, qui décide que la plateforme est « stable » ? Ceux qui ont fait le travail, en regardant leur travail. Un jugement ne se conteste pas, une mesure si.",
      },
      {
        heading: "La question test",
        icon: "target",
        body:
          "Devant un verbe qui promet un changement, pose une seule question : comment le constatera-t-on, sans demander à ceux qui ont fait le travail ? Un outcome se lit dans une mesure : des incidents qui passent de 14 à 5, un temps de rétablissement qui fond. Le bénéficiaire peut être le client, le support, ou l'équipe elle-même : une astreinte qui dort la nuit est un vrai bénéfice. Ce qui disqualifie un objectif, ce n'est pas d'être son propre bénéficiaire, c'est de se juger sans mesure.",
        examples: [
          {
            bad: "Stabiliser la plateforme.",
            good: "Faire passer les incidents de production de 14 à 5 par semaine d'ici la fin du sprint.",
            note: "Même intention, mais maintenant n'importe qui peut vérifier sans demander à l'équipe.",
          },
        ],
      },
      {
        heading: "Trois familles de verbes",
        icon: "learn",
        body: "Pour classer un verbe rapidement, regarde ce qu'il prend pour objet.",
        bullets: [
          "Les verbes d'activité (livrer, coder, installer, déployer) : ils décrivent le travail. Output, presque toujours.",
          "Les verbes de variation (réduire, faire passer, convertir) : ils appellent une mesure et un sens. Bien accompagnés, ils portent un outcome.",
          "Les verbes de promesse (stabiliser, sécuriser, simplifier, moderniser) : ils annoncent un changement sans dire comment on le verra. Ambigus tant que la mesure et le bénéficiaire manquent.",
        ],
      },
    ],
  };
}
