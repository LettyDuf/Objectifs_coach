/**
 * Fiches du thème transverse « Posture et valeurs » (D21).
 *
 * Six valeurs qui rendent la rédaction d'objectifs honnête, partagées entre les
 * trois modules (Sprint, PI, OKR équipe). Le thème `valeurs.posture` est inscrit
 * en première position de l'onglet Théorie de chaque module — la posture pose
 * le cadre avant le technique.
 *
 * Injection : le repository ajoute ces 6 fiches aux 3 modules au niveau de
 * l'indexation (cf. `repository.ts`). Pas de duplication côté contenu.
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const POSTURE_VALEURS_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "shared.values.transparence",
    themeId: "valeurs.posture",
    icon: "good",
    title: "Transparence",
    heroPhrase:
      "Nommer ce qu'on ne sait pas. L'incertitude assumée vaut mieux que le flou qui rassure.",
    intro: "",
    practiceCtaLabel: "Va rédiger un objectif transparent",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Le flou (« optimiser », « renforcer », « significativement ») rassure ceux qui le prononcent et désarme ceux qui l'écoutent. Personne ne saura à la fin si l'objectif est atteint, donc personne n'aura à rendre compte. La transparence inverse ce contrat : on dit ce qu'on sait, on chiffre ce qu'on peut, on nomme ce qu'on ignore.",
        bullets: [
          "Une métrique nommée vaut mieux qu'une intention partagée.",
          "« Je ne sais pas encore » est une réponse transparente, pas une faute.",
          "Le flou est rarement modeste : il cache souvent une absence de pensée.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "good",
        body: "",
        bullets: [
          "Présence d'au moins un chiffre ou d'une référence vérifiable.",
          "Les hypothèses sous-jacentes sont nommées (« on suppose que… »).",
          "Le calibrage de confiance est déclaré, pas implicite.",
        ],
      },
      {
        heading: "Comment l'incarner",
        icon: "wrench",
        body: "Devant chaque mot flou, demander « tu veux dire quoi, concrètement, mesurable comment ? » et écrire la réponse comme nouvel objectif. Si la réponse est « je ne sais pas », c'est un sujet de discovery, pas un objectif d'engagement.",
        examples: [
          {
            bad: "Renforcer l'expérience utilisateur sur le module commande.",
            good: "Faire passer le CSAT du module commande de 3,2 à 4,1 d'ici fin de sprint, ou ouvrir un spike d'une semaine pour comprendre ce qui le bloque.",
            note: "Soit on chiffre, soit on assume qu'on cherche encore. Pas d'entre-deux.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Doctrine outcome-over-output convergente chez Christina Wodtke, Marty Cagan et la communauté Lean Startup. Le flou comme stratégie d'évitement est documenté dans Lencioni (Five Dysfunctions of a Team).",
      },
    ],
  },

  {
    id: "shared.values.honnetete-calibrage",
    themeId: "valeurs.posture",
    icon: "good",
    title: "Honnêteté du calibrage",
    heroPhrase:
      "Dire ce qu'on pense vraiment de ses chances de succès. Ni 100 %, ni vague.",
    intro: "",
    practiceCtaLabel: "Va déclarer ta confiance honnêtement",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Deux dérives opposées sabotent le calibrage : la sur-confiance qui sabote la crédibilité (l'objectif passé en committed à 50 % détruit la confiance au PI suivant), et le sandbagging qui se réserve une marge facile (le KR à 100 % de confiance n'apprend rien). L'honnêteté du calibrage est le contrat invisible qui fait fonctionner OKR et SAFe.",
        bullets: [
          "Calibrer trop haut, c'est promettre ce qu'on ne pourra pas tenir.",
          "Calibrer trop bas, c'est se voler un apprentissage potentiel.",
          "Le bon calibrage demande du courage : il rend la prévision falsifiable.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "good",
        body: "",
        bullets: [
          "Une fourchette de confiance est déclarée explicitement (« on est à 60-70 % »).",
          "Le calibrage est réajusté à mi-parcours quand de nouveaux signaux arrivent.",
          "Personne ne pense « je dirai 90 % pour qu'on me laisse tranquille ».",
        ],
      },
      {
        heading: "Comment l'incarner",
        icon: "wrench",
        body: "Avant de figer le calibrage, poser la question : « si nous étions tous payés à dire la vérité maintenant, qui mettrait quel chiffre ? » Utiliser le confidence vote anonyme quand l'équipe a tendance à converger artificiellement.",
        examples: [
          {
            bad: "Committed à 100 % sur un objectif qu'on n'a jamais réussi à atteindre dans les 3 derniers PI.",
            good: "Stretch à 50 % sur le même objectif, avec un plan B chiffré si on n'y arrive pas avant la PI Review.",
            note: "Le wording n'est pas magique : c'est le chiffre de confiance qui matérialise l'engagement.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Christina Wodtke sur le sandbagging (eleganthack.com). Ben Lamorte sur le confidence vote (The OKRs Field Book). SAFe sur le ROAM et le confidence vote en PI Planning.",
      },
    ],
  },

  {
    id: "shared.values.co-construction",
    themeId: "valeurs.posture",
    icon: "good",
    title: "Co-construction",
    heroPhrase:
      "L'objectif est négocié, pas dicté. Ni par le PO seul, ni par le manager seul, ni par les Devs seuls.",
    intro: "",
    practiceCtaLabel: "Va co-construire un objectif",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Un objectif imposé est inerte. L'équipe l'exécute parce qu'il faut bien faire quelque chose, mais elle n'y croit pas. À la moindre difficulté, elle abandonne sans regret. Un objectif co-construit, à l'inverse, devient un engagement personnel : chacun le défend parce que chacun a participé à le poser.",
        bullets: [
          "Le PO apporte le cap, l'équipe apporte la faisabilité, le management apporte le contexte stratégique.",
          "Sans la voix des Devs, on s'engage sur ce qu'on ne sait pas livrer.",
          "Sans la voix du PO, on livre ce qui ne sert à personne.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "good",
        body: "",
        bullets: [
          "Chacun a parlé au moins une fois pendant la rédaction.",
          "Les désaccords ont été exprimés, pas étouffés.",
          "La formulation finale est rédigée à plusieurs voix, pas par une seule.",
        ],
      },
      {
        heading: "Comment l'incarner",
        icon: "wrench",
        body: "Faire un tour de table avant de figer. Respecter les silences (quelqu'un qui se tait n'est pas d'accord, il cherche ses mots). Utiliser un vote de confiance final. Inviter explicitement les juniors et les voix discrètes à se prononcer.",
        examples: [
          {
            bad: "Le manager arrive avec l'objectif déjà rédigé et demande « ça vous va ? ». Tout le monde hoche la tête.",
            good: "Le manager énonce le contexte stratégique (5 min), puis se tait. L'équipe propose 2-3 reformulations possibles, vote, ajuste.",
            note: "La parole du chef éteint la discussion. La discussion produit l'engagement.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Scrum Guide 2020 sur la co-création par l'équipe Scrum. Christina Wodtke : « OKRs are great bottom up, not just top down. » Patrick Lencioni sur la culture de confiance comme préalable au désaccord productif.",
      },
    ],
  },

  {
    id: "shared.values.service-beneficiaire",
    themeId: "valeurs.posture",
    icon: "good",
    title: "Service du bénéficiaire",
    heroPhrase:
      "L'utilisateur passe avant le confort de l'équipe. Le refactor sans bénéficiaire nommé est un caprice.",
    intro: "",
    practiceCtaLabel: "Va nommer le bénéficiaire de ton objectif",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "La vélocité est une ressource finie. La dépenser sur un objectif qui ne change rien chez personne, c'est la perdre. Cette valeur protège contre les objectifs auto-centrés (vélocité, propreté du code, « on se sent mieux ») qui se déguisent en travail utile. Elle ne dit pas qu'on ne fait jamais de technique, elle dit qu'on nomme l'effet attendu côté bénéficiaire.",
        bullets: [
          "Un refactor a un bénéficiaire : l'équipe qui livrera plus vite, les ops qui dormiront mieux, l'utilisateur qui aura moins de bugs.",
          "Si on ne peut pas nommer le bénéficiaire et l'effet, le travail est probablement un caprice.",
          "Le bénéficiaire n'est pas toujours l'utilisateur final : c'est parfois l'équipe support, le commercial, l'oncall.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "good",
        body: "",
        bullets: [
          "Un bénéficiaire est nommé dans l'objectif (« pour les nouveaux utilisateurs », « pour l'équipe oncall »).",
          "L'effet attendu est formulé côté bénéficiaire, pas côté équipe.",
          "La mesure se fait côté bénéficiaire (NPS, CSAT, temps gagné).",
        ],
      },
      {
        heading: "Comment l'incarner",
        icon: "wrench",
        body: "Avant de figer un objectif, faire le test « qui en profite hors de l'équipe ? ». Si la liste est vide, reformuler. Si elle est vide pour de bon, accepter que ce travail n'est peut-être pas prioritaire ce cycle.",
        examples: [
          {
            bad: "Refactorer le module de gestion des permissions.",
            good: "Permettre aux administrateurs clients de modifier les rôles utilisateurs en moins de 30 secondes (vs 4 min aujourd'hui).",
            note: "Le refactor reste possible, mais comme moyen au service du bénéficiaire, pas comme fin en soi.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Marty Cagan (Inspired) sur la centralité du client dans la discovery produit. Christina Wodtke sur la mesure outcome-based.",
      },
    ],
  },

  {
    id: "shared.values.apprentissage",
    themeId: "valeurs.posture",
    icon: "good",
    title: "Apprentissage",
    heroPhrase:
      "Un objectif raté qui apprend vaut mieux qu'un objectif atteint sans apprendre.",
    intro: "",
    practiceCtaLabel: "Va isoler l'hypothèse de ton objectif",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "La pire issue d'un cycle n'est pas l'échec, c'est l'absence d'apprentissage. Un objectif atteint sans surprise confirme ce qu'on savait déjà ; un objectif raté qui modifie le sprint suivant fait progresser l'équipe et le produit. Cette valeur protège contre le sandbagging et l'auto-félicitation.",
        bullets: [
          "L'objectif porte une hypothèse vérifiable, pas une certitude.",
          "Le succès se mesure aussi à ce qu'on a appris, pas seulement à la cible atteinte.",
          "Un objectif qui ne pouvait pas échouer n'avait pas grand-chose à apprendre.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "good",
        body: "",
        bullets: [
          "L'hypothèse sous-jacente est nommée (« on suppose que X bouge Y »).",
          "Les rétros parlent de ce qui a été appris, pas juste de ce qui a été fait.",
          "Un objectif raté est analysé, pas occulté.",
        ],
      },
      {
        heading: "Comment l'incarner",
        icon: "wrench",
        body: "Poser la question « qu'est-ce qu'on va apprendre avec ce cycle, indépendamment de l'atteinte ? » avant de figer l'objectif. Isoler l'hypothèse de la métrique : qu'est-ce qu'on testera vraiment ?",
        examples: [
          {
            bad: "Faire passer le NPS de 28 à 32 d'ici fin de trimestre (on sait que les améliorations UX en cours suffiront).",
            good: "Faire passer le NPS de 28 à 50 d'ici fin de trimestre. Hypothèse testée : les UX écran principal ont plus d'impact que les écrans secondaires.",
            note: "Le second objectif est plus ambitieux et plus apprenant. S'il rate, l'équipe sait quoi creuser au cycle suivant.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Eric Ries, Lean Startup, sur l'apprentissage validé comme unité de progrès. Marty Cagan sur la discovery produit. Christina Wodtke sur la posture d'apprentissage en OKR.",
      },
    ],
  },

  {
    id: "shared.values.courage-desaccord",
    themeId: "valeurs.posture",
    icon: "good",
    title: "Courage du désaccord",
    heroPhrase:
      "Dire non aux objectifs creux, demander des reformulations, porter un dissensus. Hocher la tête sape l'équipe.",
    intro: "",
    practiceCtaLabel: "Va poser une objection constructive",
    sections: [
      {
        heading: "Pourquoi",
        icon: "target",
        body: "Un consensus mou produit un objectif mou. Quand personne n'ose dire « cet objectif n'est pas clair », « ce calibrage est faux », « ce KR est un projet déguisé », l'équipe se condamne à exécuter un mauvais cap pendant tout un cycle. Le courage du désaccord est ce qui transforme un atelier de rédaction en débat productif.",
        bullets: [
          "Hocher la tête poliment est une trahison de l'équipe.",
          "Une objection non exprimée devient un mauvais résultat à l'arrivée.",
          "Le dissensus, exprimé tôt et calmement, économise des semaines de mauvais travail.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "good",
        body: "",
        bullets: [
          "Au moins une objection est posée pendant la rédaction.",
          "Les juniors et les voix discrètes sont sollicités explicitement.",
          "Le confidence vote anonyme révèle parfois des écarts que la discussion publique cachait.",
        ],
      },
      {
        heading: "Comment l'incarner",
        icon: "wrench",
        body: "Créer un espace de désaccord sûr : interdire les sarcasmes, accueillir chaque objection comme un cadeau (« merci de l'avoir dit »). Poser la question « qui n'est pas convaincu ? » en fin de rédaction. Pour SAFe : utiliser le ROAM honnêtement. Pour OKR : insister sur le confidence vote.",
        examples: [
          {
            bad: "Le facilitateur lit l'objectif et demande « tout le monde est d'accord ? ». Silence interprété comme assentiment.",
            good: "Le facilitateur lit l'objectif puis demande « qui a une réserve, même petite ? Tour de table obligatoire. ». Les objections sont notées et adressées une à une.",
            note: "Le silence n'est pas un accord. Le silence est un trou dans le contrat.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Patrick Lencioni, The Five Dysfunctions of a Team, chapitre sur l'absence de désaccord productif. SAFe sur le ROAM et le confidence vote en PI Planning. Ben Lamorte sur le devoir de l'équipe coachée.",
      },
    ],
  },
];
