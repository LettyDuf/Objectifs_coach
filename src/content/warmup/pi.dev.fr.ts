/**
 * Corpus d'échauffement output/outcome — PI × dev × FR.
 *
 * 10 verbes purs (niveau 1) + 10 mini-objectifs PI (niveau 2).
 * Vocabulaire adapté au niveau train SAFe : Business Owner, revue de PI,
 * cibles business à 8-12 semaines.
 *
 * L'ordre de présentation est randomisé à chaque lancement (composant Warmup).
 */

import type { WarmupCase } from "../../domain/warmup";

export const PI_DEV_WARMUP_FR: WarmupCase[] = [
  // ============================================================
  // Niveau 1 — verbes purs (orientation business à l'échelle PI)
  // ============================================================
  {
    id: "warmup.pi.l1.livrer",
    level: 1,
    kind: "verb",
    prompt: "Livrer",
    expected: "output",
    explanation:
      "À l'échelle PI comme ailleurs, « livrer » nomme une production. Aucun changement métier constaté.",
  },
  {
    id: "warmup.pi.l1.faire-passer",
    level: 1,
    kind: "verb",
    prompt: "Faire passer",
    expected: "outcome",
    explanation:
      "« Faire passer de X à Y » force à nommer une bascule mesurable. Outcome typique des objectifs de PI.",
  },
  {
    id: "warmup.pi.l1.migrer",
    level: 1,
    kind: "verb",
    prompt: "Migrer",
    expected: "output",
    explanation:
      "« Migrer » est une activité technique. Tant qu'on n'indique pas qui en profite et comment, c'est un output.",
  },
  {
    id: "warmup.pi.l1.atteindre",
    level: 1,
    kind: "verb",
    prompt: "Atteindre",
    expected: "outcome",
    explanation:
      "« Atteindre X » place le résultat dans une cible chiffrée. Sert bien les KPI de PI (NPS, taux d'activation, MRR…).",
  },
  {
    id: "warmup.pi.l1.refactorer",
    level: 1,
    kind: "verb",
    prompt: "Refactorer",
    expected: "output",
    explanation:
      "À l'échelle PI, refactoriser sans nommer le bénéfice (vélocité, stabilité, etc.) reste un output isolé.",
  },
  {
    id: "warmup.pi.l1.permettre",
    level: 1,
    kind: "verb",
    prompt: "Permettre à",
    expected: "outcome",
    explanation:
      "« Permettre à [segment de clients] de [faire X] » formule un objectif de PI côté valeur métier. Outcome.",
  },
  {
    id: "warmup.pi.l1.installer",
    level: 1,
    kind: "verb",
    prompt: "Installer",
    expected: "output",
    explanation:
      "Décrit l'installation d'un dispositif (process, système, organisation). Le dispositif est un moyen, l'objectif de PI doit nommer son effet métier.",
  },
  {
    id: "warmup.pi.l1.convertir",
    level: 1,
    kind: "verb",
    prompt: "Convertir",
    expected: "outcome",
    explanation:
      "« Convertir N % de [population] en [état] » est exactement la forme d'un outcome business — métrique de conversion, segment, état cible.",
  },
  {
    id: "warmup.pi.l1.stabiliser",
    level: 1,
    kind: "verb",
    prompt: "Stabiliser",
    expected: "output",
    explanation:
      "Action technique sans seuil ni mesure du bénéficiaire. Pour passer en outcome, il faudrait nommer la métrique (TMR, taux d'incidents…) et l'avant/après.",
  },
  {
    id: "warmup.pi.l1.reduire",
    level: 1,
    kind: "verb",
    prompt: "Réduire",
    expected: "outcome",
    explanation:
      "« Réduire X de A à B » porte mécaniquement la mesure. Verbe outcome qui structure les objectifs de PI de fiabilité, performance, churn…",
  },

  // ============================================================
  // Niveau 2 — mini-objectifs PI avec contexte
  // ============================================================
  {
    id: "warmup.pi.l2.livrer-marketplace",
    level: 2,
    kind: "objective",
    prompt: "Livrer la v1 de la marketplace.",
    expected: "output",
    explanation:
      "Aucune métrique d'adoption, aucun bénéficiaire mesuré. La marketplace pourrait être livrée et personne ne l'utiliser. Output.",
  },
  {
    id: "warmup.pi.l2.sso-self-serve",
    level: 2,
    kind: "objective",
    prompt: "Permettre à 80 % de nos clients entreprise d'activer le SSO en self-service d'ici la fin du PI.",
    expected: "outcome",
    explanation:
      "Bénéficiaire (clients entreprise), seuil (80 %), borne (fin de PI). Tous les ingrédients d'un outcome de PI engagé.",
  },
  {
    id: "warmup.pi.l2.churn-premium",
    level: 2,
    kind: "objective",
    prompt: "Faire passer le taux de churn mensuel des comptes premium de 4 % à 2,5 % avant la revue de PI.",
    expected: "outcome",
    explanation:
      "Indicateur clair, avant/après, échéance. Métrique business observable à la revue.",
  },
  {
    id: "warmup.pi.l2.stabiliser-platform",
    level: 2,
    kind: "objective",
    prompt: "Stabiliser la plateforme avant l'arrivée des nouveaux clients.",
    expected: "output",
    explanation:
      "« Stabiliser » sans seuil ni mesure. « Arrivée des nouveaux clients » donne un horizon mais aucune mesure du changement. Output déguisé.",
  },
  {
    id: "warmup.pi.l2.nps-intégration",
    level: 2,
    kind: "objective",
    prompt: "Augmenter le NPS du parcours d'intégration de 32 à 50 sur le dernier mois du PI.",
    expected: "outcome",
    explanation:
      "Métrique d'expérience (NPS), avant/après, fenêtre temporelle précise. Le verbe « augmenter » devient outcome grâce au contexte.",
  },
  {
    id: "warmup.pi.l2.refactor-tunnel",
    level: 2,
    kind: "objective",
    prompt: "Refactorer l'architecture du tunnel d'achat pour préparer la v3.",
    expected: "output",
    explanation:
      "Refactor + préparation. Aucune cible métier nommée. Le Business Owner ne saura pas à la revue de PI si l'objectif est atteint.",
  },
  {
    id: "warmup.pi.l2.contrats-enterprise",
    level: 2,
    kind: "objective",
    prompt: "Atteindre 100 contrats signés sur la nouvelle offre Enterprise d'ici la revue de PI.",
    expected: "outcome",
    explanation:
      "Seuil chiffré (100), métrique business (contrats signés), fenêtre (revue de PI). Outcome typique d'un train commercial.",
  },
  {
    id: "warmup.pi.l2.facturation",
    level: 2,
    kind: "objective",
    prompt: "Mettre en place le nouveau système de facturation d'ici la revue de PI.",
    expected: "output",
    explanation:
      "Le système mis en place est un livrable interne. Il faudrait nommer l'effet attendu (factures émises plus vite, erreurs réduites, équipes finance autonomes…) pour passer en outcome.",
  },
  {
    id: "warmup.pi.l2.cac-midmarket",
    level: 2,
    kind: "objective",
    prompt: "Diviser par 2 le coût d'acquisition d'un client mid-market d'ici la fin du PI.",
    expected: "outcome",
    explanation:
      "Métrique business (CAC), facteur de variation (par 2), segment (mid-market), fenêtre. Outcome PI exemplaire — c'est le langage du Business Owner.",
  },
];
