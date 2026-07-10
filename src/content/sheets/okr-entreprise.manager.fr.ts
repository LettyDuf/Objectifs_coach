/**
 * Fiches pédagogiques OKR entreprise × manager × FR.
 *
 * Contenu fondateur validé par Lætitia le 2026-07-04 (voir DECISIONS.md D53) :
 * tronc commun spécifique (cadence annuelle, échelle stratégique, dialogue
 * CODIR/équipes, cascade sans diktat) + 10 pièges nommés distincts de ceux
 * déjà couverts côté OKR équipe. Sources vérifiées (Doerr, Lamorte, Wodtke,
 * Castro, SAFe). Registre volontairement simple et concret (retour Lætitia :
 * "je veux des consignes et des conseils clairs et vulgarisés").
 */

import type { PedagogicalSheet } from "../../domain/ports";

export const OKR_ENTREPRISE_MANAGER_SHEETS_FR: PedagogicalSheet[] = [
  {
    id: "okr-entreprise.sheet.fondamentaux",
    themeId: "okr-entreprise.fondamentaux",
    icon: "okr",
    title: "Anatomie d'un bon OKR entreprise",
    heroPhrase:
      "Un bon OKR entreprise tient sur un post-it. Si personne ne peut le réciter trois mois après l'avoir entendu, il est trop compliqué.",
    intro: "",
    practiceCtaLabel: "Va rédiger un OKR entreprise",
    sections: [
      {
        heading: "Pourquoi c'est différent d'un OKR équipe",
        icon: "target",
        body: "Un OKR entreprise n'est pas un OKR équipe en plus gros. Il fixe le cap de toute l'organisation pour l'année, pas le travail d'un trimestre. Il est porté par le CODIR, qui en répond devant le board. Mais il ne se décide pas seul dans un bureau fermé : le CODIR discute avec les équipes avant de s'engager, pour vérifier que le cap est tenable.",
        bullets: [
          "Il dure un an, avec une vraie vérification chaque trimestre, pas une réécriture complète.",
          "Il parle à toute l'entreprise, du commercial au support, pas seulement à une équipe.",
          "Le CODIR en répond publiquement : si ça échoue, c'est lui qui explique pourquoi.",
        ],
      },
      {
        heading: "Comment le reconnaître",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "N'importe qui dans l'entreprise peut le répéter de mémoire, des mois après.",
          "Il a 3 à 5 preuves de réussite (les Résultats clés), pas seulement un chiffre financier.",
          "La revue trimestrielle change vraiment quelque chose : on ajuste, on reconnaît un retard, on apprend.",
        ],
      },
      {
        heading: "Le piège le plus fréquent",
        icon: "wrench",
        body: "Confondre l'Objective avec un chiffre financier. Le chiffre financier a sa place, mais en Résultat clé, pas en Objective. Un Objective doit donner une direction que tout le monde comprend, pas juste un montant à atteindre. Ce piège précis, l'Objective qui n'est qu'un chiffre financier, a sa fiche : « Le bilan financier déguisé ».",
      },
      {
        heading: "Source",
        kind: "source",
        body: "John Doerr, Measure What Matters (2018) : un Objective dit « quoi » atteindre de façon inspirante, les Résultats clés en sont la preuve chiffrée.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.financial-bilan-deguise",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "Le bilan financier déguisé en OKR",
    heroPhrase:
      "L'Objective n'est qu'un chiffre de chiffre d'affaires habillé en ambition. Personne hors des ventes ne sait quoi en faire.",
    intro: "",
    practiceCtaLabel: "Va redonner un cap à un Objective financier",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le CODIR a un vrai budget à défendre devant le board. La tentation est grande de recopier ce chiffre tel quel comme Objective. Mais un chiffre financier ne dit à personne comment y contribuer, sauf à l'équipe commerciale.",
        bullets: [
          "L'Objective se limite à un montant ou un pourcentage financier.",
          "Aucune équipe hors vente ne sait ce qu'elle doit faire pour y contribuer.",
          "Le « pourquoi » stratégique derrière ce chiffre n'est jamais expliqué.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "L'Objective ressemble à une ligne de budget, pas à une ambition.",
          "Seule l'équipe commerciale se sent concernée.",
          "Personne ne sait dire ce que ce chiffre change pour un client.",
        ],
      },
      {
        heading: "Remettre le chiffre à sa place",
        icon: "wrench",
        body: "Le chiffre financier reste un Résultat clé parmi d'autres, jamais l'Objective lui-même. L'Objective doit répondre à « pourquoi ce chiffre compte », pas juste « combien ».",
        examples: [
          {
            bad: "Atteindre 15 M€ d'ARR d'ici la fin de l'année.",
            good: "Devenir le partenaire de référence des PME sur notre segment. Résultats clés : ARR à 15 M€, churn sous 5 %, 3 études de cas clients publiques.",
            note: "Le chiffre reste là, mais il n'est plus seul et il sert une ambition plus large.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Felipe Castro, « An OKR should measure the outcome, not the work » (read.felipecastro.com).",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.gouffre-execution",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "Le gouffre entre l'ambition et la capacité",
    heroPhrase:
      "Le CODIR vise haut sans jamais demander aux équipes si c'est jouable. Le cap devient un slogan que personne ne peut suivre.",
    intro: "",
    practiceCtaLabel: "Va confronter une ambition à la capacité réelle",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le CODIR fixe une ambition seul, sans vérifier auprès de ceux qui devront la tenir si c'est réaliste. L'écart entre ce qui est annoncé et ce qui est faisable devient trop grand pour être comblé.",
        bullets: [
          "L'ambition est fixée avant toute discussion avec les équipes concernées.",
          "Personne n'a demandé aux équipes si l'objectif est atteignable avec les moyens actuels.",
          "L'écart entre l'annonce et la réalité se découvre après coup, trop tard.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Les équipes apprennent l'Objective en même temps que tout le monde, sans avoir été consultées.",
          "Dès l'annonce, plusieurs personnes pensent en privé que ce n'est pas possible.",
          "Aucun chiffre de capacité réelle (effectifs, budget, charge) n'a été confronté à l'ambition.",
        ],
      },
      {
        heading: "Sonder avant d'engager",
        icon: "wrench",
        body: "Avant d'engager le cap, sonder la faisabilité auprès des équipes ou de leurs représentants. Ajuster si besoin, puis seulement engager.",
        examples: [
          {
            bad: "Le CODIR annonce en réunion générale : « Nous doublons notre présence internationale cette année », sans avoir consulté les équipes qui devront l'exécuter.",
            good: "Le CODIR présente un projet de cap, recueille les retours des équipes sur la faisabilité pendant deux semaines, ajuste le rythme, puis annonce le cap engagé.",
            note: "Le cap ne change pas de nature, mais il devient tenable parce qu'il a été confronté au réel avant d'être figé.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Ben Lamorte, The OKRs Field Book (Wiley, 2022).",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.girouette-strategique",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "Le cap qui change sans prévenir",
    heroPhrase:
      "L'Objective de l'année change au gré des annonces de couloir. La revue trimestrielle qui devrait trancher n'a jamais lieu.",
    intro: "",
    practiceCtaLabel: "Va cadrer un changement de cap en cours d'année",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Le marché bouge, c'est normal. Le problème, c'est quand le cap change sans passer par la revue trimestrielle prévue pour ça. Chaque ajustement informel abîme un peu plus la confiance dans le cap annoncé.",
        bullets: [
          "Le cap change plusieurs fois dans le trimestre, hors de toute revue formelle.",
          "Les équipes apprennent le changement par un message informel, pas par une décision expliquée.",
          "Personne ne sait dire si le cap actuel est encore celui de janvier ou déjà le troisième de l'année.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Un message interne annonce une nouvelle priorité sans lien avec la revue prévue au calendrier.",
          "Les équipes ne savent plus quel Objective est le bon cette semaine.",
          "Aucune trace écrite n'explique pourquoi le cap a changé.",
        ],
      },
      {
        heading: "Ramener le changement dans le cadre prévu",
        icon: "wrench",
        body: "Garder les ajustements de cap dans le cadre de la revue trimestrielle prévue, même en retard. Documenter ce qui a changé et pourquoi, plutôt que d'annoncer un nouveau cap au fil de l'eau.",
        examples: [
          {
            bad: "Un concurrent bouge en avril ; le CODIR envoie un message interne annonçant une nouvelle priorité, sans revue ni explication.",
            good: "La revue trimestrielle est convoquée dès le mouvement du marché ; le CODIR documente ce qui change, décide si le cap annuel tient encore, communique sa décision et son raisonnement.",
            note: "Le marché peut bouger vite ; la décision, elle, reste posée et tracée.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Christina Wodtke, Radical Focus, sur le rituel de revue rythmée et documentée.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.mur-invisible",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "Le mur invisible entre l'entreprise et les équipes",
    heroPhrase:
      "Aucune équipe ne sait dire comment son travail sert le cap de l'entreprise. Les deux niveaux existent côte à côte, sans jamais se parler.",
    intro: "",
    practiceCtaLabel: "Va relier un OKR équipe au cap de l'entreprise",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "L'OKR entreprise donne un cap, mais si personne ne fait le lien avec le travail quotidien des équipes, il reste un objet du CODIR, déconnecté du reste de l'organisation.",
        bullets: [
          "Aucune équipe ne peut expliquer en une phrase comment elle contribue au cap de l'entreprise.",
          "L'OKR entreprise n'est jamais mentionné pendant les rituels d'équipe (revue, planning).",
          "Le lien entre les deux niveaux n'existe dans aucune conversation, ni imposée ni spontanée.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Demander à une équipe le cap de l'entreprise produit une hésitation ou une réponse approximative.",
          "L'OKR entreprise n'apparaît dans aucun support de travail des équipes.",
          "Les OKR équipe et l'OKR entreprise semblent parler de sujets complètement différents.",
        ],
      },
      {
        heading: "Créer le moment qui manque",
        icon: "wrench",
        body: "Créer un moment régulier où chaque équipe explicite, dans ses mots, comment son travail sert le cap de l'entreprise. Pas une case à cocher : une vraie conversation.",
        examples: [
          {
            bad: "L'OKR entreprise est publié sur l'intranet en janvier et jamais revisité ailleurs de l'année.",
            good: "Chaque équipe consacre 15 minutes en début de trimestre à formuler, dans ses mots, le lien entre son travail et le cap de l'entreprise.",
            note: "Le but n'est pas de forcer un lien artificiel partout, mais de vérifier que le lien existe et se dit.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Ben Lamorte, sur la nécessité d'un lien de sens maintenu par la conversation régulière entre niveaux.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.theatre-revue",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "Le théâtre de la revue trimestrielle",
    heroPhrase:
      "La revue existe au calendrier. Tout y est toujours vert. Rien n'y est jamais remis en question.",
    intro: "",
    practiceCtaLabel: "Va redonner du poids à une revue trimestrielle",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "La revue trimestrielle du CODIR a un vrai poids : c'est ce qui est raconté au board. Si elle ne sert qu'à confirmer que tout va bien, elle perd sa fonction, vérifier honnêtement si le cap tient.",
        bullets: [
          "Aucun Résultat clé n'est jamais revu à la baisse, quoi qu'il arrive.",
          "La revue dure quelques minutes, sans vraie discussion.",
          "Personne ne se souvient d'un apprentissage tiré d'une revue passée.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le compte rendu de la revue se ressemble d'un trimestre à l'autre, mot pour mot.",
          "Aucune décision concrète ne sort jamais de la revue.",
          "La revue sert à présenter des chiffres, pas à décider de quoi que ce soit.",
        ],
      },
      {
        heading: "Poser la question qui dérange",
        icon: "wrench",
        body: "Poser une question simple à chaque revue : qu'est-ce qu'on a appris ce trimestre, et qu'est-ce qu'on change en conséquence ? Si la réponse est toujours « rien », c'est le signal à corriger.",
        examples: [
          {
            bad: "La revue trimestrielle présente les chiffres en 10 minutes ; personne ne pose de question, la réunion suivante commence.",
            good: "La revue commence par : qu'est-ce qui a surpris ce trimestre ? Chaque Résultat clé en retard est discuté ouvertement, avec une décision explicite (on ajuste, on accepte le retard, on documente pourquoi).",
            note: "Une revue qui ne change jamais rien n'est plus une revue, c'est une présentation.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "John Doerr, Measure What Matters, sur les CFR (conversations régulières et sincères autour des objectifs).",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.jargon-codir",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "L'OKR que personne ne comprend hors CODIR",
    heroPhrase:
      "L'Objective est écrit dans la langue du CODIR : acronymes, chiffres de plan stratégique, formulations abstraites. Le reste de l'entreprise ne le comprend pas.",
    intro: "",
    practiceCtaLabel: "Va simplifier un Objective trop savant",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Un Objective doit pouvoir se répéter et se comprendre par n'importe qui dans l'entreprise. S'il est rédigé pour un public de dirigeants uniquement, il ne peut tout simplement pas remplir son rôle de cap partagé.",
        bullets: [
          "L'Objective contient des acronymes ou des termes que seul le CODIR comprend.",
          "Une personne hors CODIR ne peut pas expliquer l'Objective avec ses propres mots.",
          "Le langage utilisé vient d'un document stratégique interne, pas d'une conversation ordinaire.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Demander à une personne au hasard de reformuler l'Objective produit un silence ou une paraphrase mot pour mot.",
          "L'Objective ressemble à une phrase de rapport annuel, pas à une phrase qu'on dirait à voix haute.",
          "Personne ne le cite jamais spontanément dans une conversation de travail.",
        ],
      },
      {
        heading: "Le test de la reformulation",
        icon: "wrench",
        body: "Tester l'Objective en le faisant reformuler par quelqu'un qui n'était pas dans la pièce lors de sa rédaction. Si la reformulation trahit une incompréhension, simplifier.",
        examples: [
          {
            bad: "Objective : « Optimiser notre positionnement omnicanal pour capter la valeur incrémentale du segment PME dans un contexte de consolidation du marché. »",
            good: "Objective : « Devenir le partenaire de référence des PME sur notre marché. »",
            note: "La même ambition, mais dite comme on la dirait à un collègue, pas comme on l'écrirait dans un rapport.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Christina Wodtke, Radical Focus, citant Jeff Weiner (LinkedIn) : « quand tu es fatigué de le répéter, les gens commencent tout juste à l'entendre » [« when you are tired of saying it, people are starting to hear it »] — encore faut-il que la phrase soit simple à répéter.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.silo-comite",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "L'OKR écrit par un seul service",
    heroPhrase:
      "L'OKR entreprise est en réalité rédigé par une seule fonction, souvent la Finance ou les Ventes, puis imposé aux autres comme s'il venait de tous.",
    intro: "",
    practiceCtaLabel: "Va ouvrir la rédaction d'un OKR entreprise à plusieurs fonctions",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "L'OKR entreprise doit parler à toute l'organisation. S'il n'est écrit que par une fonction, il porte naturellement sa vision et ses priorités, pas celles de l'ensemble.",
        bullets: [
          "Une seule fonction a participé à la rédaction, les autres découvrent le résultat.",
          "Le vocabulaire et les priorités du document reflètent une seule culture métier.",
          "Les équipes hors de cette fonction ne se reconnaissent pas dans l'Objective.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Seule une fonction, souvent Finance ou Ventes, était présente à la rédaction.",
          "Le RH, le Support ou la R&D découvrent l'Objective en même temps que tout le monde.",
          "Des personnes de plusieurs services disent séparément que ça ne les concerne pas vraiment.",
        ],
      },
      {
        heading: "Ouvrir la rédaction",
        icon: "wrench",
        body: "Impliquer des personnes de plusieurs fonctions dès la rédaction, pas seulement au moment de la diffusion.",
        examples: [
          {
            bad: "L'Objective est rédigé en comité restreint Finance et direction générale, puis annoncé à toute l'entreprise en réunion générale.",
            good: "Un représentant de chaque grande fonction (Produit, Ventes, Support, RH) participe à un atelier de rédaction avant que le CODIR ne finalise l'Objective.",
            note: "Le CODIR garde la décision finale, mais l'ambition reflète plusieurs regards, pas un seul.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Ben Lamorte, sur le besoin de sponsors multi-fonctionnels dès la rédaction d'un OKR entreprise.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.objectif-perpetuel",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "L'objectif reconduit sans jamais se remettre en question",
    heroPhrase:
      "Le même Objective revient chaque année, avec juste les chiffres relevés un peu plus haut. Personne ne se demande si l'ambition est encore la bonne.",
    intro: "",
    practiceCtaLabel: "Va challenger un objectif reconduit par habitude",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Sur un cycle annuel, la routine s'installe plus facilement que sur un cycle trimestriel. Reconduire le même Objective par habitude, sans se reposer la question, c'est perdre l'occasion de vérifier si le cap est toujours pertinent.",
        bullets: [
          "Le même Objective revient d'année en année, seuls les chiffres changent.",
          "Personne ne se souvient de la dernière fois où le cap a été vraiment discuté.",
          "L'Objective ne reflète plus un choix récent, juste une habitude.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Le séminaire annuel se résume à ajuster des chiffres sur l'Objective de l'an dernier.",
          "Personne ne peut expliquer pourquoi ce cap précis reste le bon cette année.",
          "Le marché ou l'entreprise ont changé, mais pas l'Objective.",
        ],
      },
      {
        heading: "Reposer la question chaque année",
        icon: "wrench",
        body: "Chaque année, poser la question avant de reconduire quoi que ce soit : ce cap est-il encore le bon, ou juste le plus simple à reprendre ?",
        examples: [
          {
            bad: "Le séminaire annuel copie l'Objective de l'an dernier et augmente les chiffres de 10 %.",
            good: "Le séminaire annuel commence par une vraie question : qu'est-ce qui a changé cette année qui justifierait un autre cap ? Le cap précédent est reconduit seulement après cette discussion, pas par défaut.",
            note: "Reconduire un cap peut être la bonne décision, mais seulement si elle a été reprise consciemment, pas par automatisme.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Felipe Castro, sur le risque de pilotage automatique propre aux cycles longs.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.revue-sans-equipes",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "La revue du CODIR sans les équipes",
    heroPhrase:
      "Le CODIR fait sa revue trimestrielle entre lui. Les équipes, qui savent si le cap est encore tenable, ne sont jamais consultées.",
    intro: "",
    practiceCtaLabel: "Va préparer une revue avec l'avis des équipes",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Ce sont les équipes qui exécutent qui savent le mieux si la suite de l'année est réaliste. Une revue qui se tient sans jamais les entendre prend des décisions à l'aveugle sur la faisabilité réelle.",
        bullets: [
          "La revue trimestrielle réunit uniquement le CODIR, sans aucun retour des équipes.",
          "Les décisions prises en revue ne s'appuient sur aucune information de terrain récente.",
          "Les équipes apprennent les conclusions de la revue après coup, sans avoir été consultées avant.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Aucun représentant d'équipe n'est jamais invité ni consulté avant la revue.",
          "Les décisions de la revue surprennent les équipes qui doivent les exécuter.",
          "Le CODIR découvre après coup qu'une hypothèse de la revue était fausse sur le terrain.",
        ],
      },
      {
        heading: "Écouter avant de décider",
        icon: "wrench",
        body: "Recueillir un avis des équipes juste avant chaque revue trimestrielle : qu'est-ce qui est réaliste pour la suite, qu'est-ce qui ne l'est plus ?",
        examples: [
          {
            bad: "Le CODIR se réunit à huis clos, décide d'accélérer un chantier, sans avoir demandé aux équipes concernées si c'était tenable.",
            good: "Avant la revue, le CODIR recueille en une page l'avis des équipes concernées sur la faisabilité de la suite de l'année. La revue décide en connaissance de cause.",
            note: "Le CODIR garde la décision finale, mais elle s'appuie sur une vraie information, pas seulement sur des chiffres de tableau de bord.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Ben Lamorte, sur l'alignement construit par la conversation entre niveaux plutôt que par une revue en cercle fermé.",
      },
    ],
  },

  {
    id: "okr-entreprise.sheet.sans-proprietaire",
    isNamedPitfall: true,
    themeId: "okr-entreprise.pieges",
    icon: "warn",
    title: "L'OKR entreprise sans responsable identifié",
    heroPhrase:
      "« Le CODIR » est responsable de l'OKR entreprise. C'est-à-dire, en pratique, personne en particulier.",
    intro: "",
    practiceCtaLabel: "Va nommer un responsable pour un Résultat clé",
    sections: [
      {
        heading: "Pourquoi c'est piégeux",
        icon: "target",
        body: "Une responsabilité collective, sans nom associé à chaque Résultat clé, se dilue facilement. Si un Résultat clé dérape, personne ne se sent directement comptable de le remonter ou de le corriger.",
        bullets: [
          "Aucun nom n'est associé à chaque Résultat clé, seulement « le CODIR » en général.",
          "En cas de dérapage, personne ne se sent directement responsable de réagir.",
          "Les questions sur l'avancement d'un Résultat clé n'ont pas d'interlocuteur clair.",
        ],
      },
      {
        heading: "Comment ça se voit",
        icon: "warn",
        kind: "signals",
        body: "",
        bullets: [
          "Demander qui suit tel Résultat clé ne produit pas de réponse claire.",
          "Plusieurs membres du CODIR pensent chacun que c'est plutôt la responsabilité d'un autre.",
          "Un Résultat clé dérape pendant plusieurs semaines avant que quelqu'un ne s'en saisisse.",
        ],
      },
      {
        heading: "Nommer un responsable par Résultat clé",
        icon: "wrench",
        body: "Nommer un sponsor unique par Résultat clé au sein du CODIR, dès la rédaction de l'OKR entreprise.",
        examples: [
          {
            bad: "Les 4 Résultats clés de l'OKR entreprise sont suivis collectivement par le CODIR, sans répartition.",
            good: "Chacun des 4 Résultats clés a un membre du CODIR clairement identifié comme responsable de son suivi et de son alerte en cas de dérapage.",
            note: "La décision reste collégiale, mais le suivi, lui, a toujours un nom.",
          },
        ],
      },
      {
        heading: "Source",
        kind: "source",
        body: "Pratique du Scaled Agile Framework (SAFe) sur les thèmes stratégiques de portefeuille, chacun rattaché à un sponsor exécutif identifié.",
      },
    ],
  },
];
