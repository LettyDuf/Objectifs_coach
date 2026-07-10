/**
 * Corpus « Du trimestre au sprint » (La descente) — Sprint × dev × FR.
 *
 * 4 cas validés par Lætitia le 2026-07-08 (CORPUS-DESCENTE-PROPOSITION.md) :
 * 3 chaînes complètes + 1 cas alerte où le drapeau est la bonne réponse.
 * Vocabulaire : on parle en sprint (revue de sprint), jamais en jours
 * calendaires ; leading/lagging cités une seule fois en aparté (cas 1).
 */

import type { ImpactChainCase } from "../../domain/impact-chain";

const SKEPTIC = "Très bien. Et à la revue de sprint, tu me montres quoi ?";

export const SPRINT_DEV_IMPACT_CHAIN_FR: ImpactChainCase[] = [
  {
    id: "descente.sprint.tickets-paiement",
    kind: "chaine",
    title: "Les tickets du paiement",
    team: "Équipe Checkout",
    objectiveLabel: "objectif du trimestre (OKR)",
    quarterlyObjective:
      "Réduire les tickets support liés au paiement de 220 à 120 par mois d'ici la fin du trimestre.",
    metrics: [
      "Tickets paiement par mois : 220",
      "Échecs de paiement sans message clair : 40 %",
      "Résolution moyenne d'un ticket : 2 jours",
    ],
    skepticQuestion: SKEPTIC,
    steps: [
      {
        id: "descente.sprint.tickets.step1",
        question:
          "Pour que les tickets baissent d'ici la fin du trimestre, qu'est-ce qui doit bouger avant ?",
        options: [
          {
            id: "a",
            text: "La part des échecs de paiement sans message clair passe de 40 % à 10 %.",
            correct: true,
            explanation:
              "Un client qui comprend pourquoi son paiement a échoué corrige seul et n'ouvre pas de ticket. Mesurable dès la mise en production : constatable à la revue. (Pour la culture : un indicateur qui bouge avant l'impact est dit « leading » ; les tickets, qui bougent après, sont « lagging ».)",
          },
          {
            id: "b",
            text: "Le nouveau centre d'aide est en ligne.",
            correct: false,
            explanation:
              "C'est une livraison : elle dit ce que l'équipe a fait, pas ce qui a changé. Un centre d'aide peut être en ligne et ne rien changer aux tickets.",
          },
          {
            id: "c",
            text: "La satisfaction client (CSAT) remonte de 3,4 à 4,2.",
            correct: false,
            explanation:
              "Effet encore plus lointain que les tickets : il bougera après eux, pas avant. Hors d'influence visible d'ici la revue de sprint.",
          },
        ],
        flagFeedback:
          "Pas ici : la chaîne tient, il existe un maillon constatable d'ici la revue (regarde la métrique des 40 %). Garde le drapeau pour le jour où il n'y en a vraiment pas.",
        chainText: "La part des échecs de paiement sans message clair passe de 40 % à 10 %",
        chainChip: "Constatable à la revue",
      },
      {
        id: "descente.sprint.tickets.step2",
        question:
          "Et pour que la part d'échecs sans message clair baisse, qu'est-ce que l'équipe livre ?",
        options: [
          {
            id: "a",
            text: "Des messages d'explication sur les 5 échecs les plus fréquents, en production.",
            correct: true,
            explanation:
              "Une livraison précise et bornée, qui alimente directement le maillon du dessus.",
          },
          {
            id: "b",
            text: "Refactorer le module de paiement.",
            correct: false,
            explanation:
              "Du travail sur le code, sans lien nommé avec les échecs mal expliqués. On ne saura pas si ça a servi.",
          },
          {
            id: "c",
            text: "La refonte complète du parcours de paiement.",
            correct: false,
            explanation:
              "Peut-être utile un jour, mais rien de fini dans le sprint : rien à montrer à la revue.",
          },
        ],
        flagFeedback:
          "Pas ici : il existe une livraison finissable dans le sprint qui nourrit le maillon du dessus.",
        chainText: "Messages d'explication sur les 5 échecs les plus fréquents, en production",
        chainChip: "Livraison",
      },
    ],
    line: [
      {
        label: "Impact trimestriel",
        detail: "les tickets passent de 220 à 120 par mois",
        verdict: "bad",
        feedback:
          "Hors d'influence sur un sprint : les tickets mettront des semaines à refléter le changement. C'est le maillon du sponsor, pas celui du sprint.",
      },
      {
        label: "Outcome de sprint",
        detail: "les échecs sans message clair passent de 40 % à 10 %",
        verdict: "good",
        feedback:
          "Oui. Livré tôt dans le sprint, l'indicateur bouge avant la revue : tu montres une mesure, pas une promesse.",
      },
      {
        label: "Output",
        detail: "les messages des 5 échecs sont en production",
        verdict: "warn",
        feedback:
          "Prudent, et parfois c'est la réalité. Mais si tu livres tôt, tu peux viser le maillon du dessus et montrer une mesure. À débattre en équipe.",
      },
    ],
    finalQcmQuestion: "Alors, quel objectif de sprint écris-tu ?",
    finalQcmOptions: [
      {
        id: "a",
        text: "Mettre en production les nouveaux messages d'erreur d'ici la fin du sprint.",
        correct: false,
        explanation: "Le maillon livraison : nécessaire, mais l'objectif ne dit pas ce qui change.",
      },
      {
        id: "b",
        text: "Réduire la part des échecs de paiement sans message clair de 40 % à 10 % d'ici la fin du sprint.",
        correct: true,
        explanation:
          "Le maillon juste sous la ligne de la revue : constatable, sous influence, chiffré. Et il nourrit visiblement l'objectif du trimestre.",
      },
      {
        id: "c",
        text: "Réduire les tickets support paiement de 220 à 120 par mois d'ici la fin du sprint.",
        correct: false,
        explanation:
          "L'objectif du trimestre recopié dans le sprint : personne ne pourra le constater à l'échelle d'un sprint.",
      },
    ],
    endRule:
      "Le bon objectif de sprint vise le maillon juste sous la ligne de la revue de sprint. Le trimestre garde l'impact, le sprint montre une mesure qui y mène.",
  },

  {
    id: "descente.sprint.activation",
    kind: "chaine",
    title: "L'activation des nouveaux comptes",
    team: "Équipe Intégration (SaaS)",
    objectiveLabel: "objectif du trimestre (OKR)",
    quarterlyObjective:
      "Faire passer l'activation des nouveaux comptes à J+30 de 30 % à 45 % d'ici la fin du trimestre.",
    metrics: [
      "Activation à J+30 : 30 %",
      "Comptes créés par mois : 900",
      "Nouveaux comptes qui n'invitent personne en première semaine : 72 %",
    ],
    skepticQuestion: SKEPTIC,
    steps: [
      {
        id: "descente.sprint.activation.step1",
        question: "Pour que l'activation à J+30 monte, qu'est-ce qui doit bouger avant ?",
        options: [
          {
            id: "a",
            text: "La part des nouveaux comptes qui invitent au moins un collègue en première semaine passe de 28 % à 40 %.",
            correct: true,
            explanation:
              "Un compte qui travaille à plusieurs revient. Et la première semaine se mesure vite : livré tôt, l'indicateur bouge avant la revue.",
          },
          {
            id: "b",
            text: "Le nouvel écran d'invitation est en production.",
            correct: false,
            explanation:
              "Une livraison. Elle peut être en ligne et ne convaincre personne d'inviter qui que ce soit.",
          },
          {
            id: "c",
            text: "Le revenu récurrent mensuel augmente de 8 %.",
            correct: false,
            explanation:
              "Très loin dans la chaîne : il bougera bien après l'activation. Hors d'influence à l'échelle d'un sprint.",
          },
        ],
        flagFeedback:
          "Pas ici : la métrique des invitations en première semaine est constatable dans le sprint. La chaîne tient.",
        chainText:
          "La part des nouveaux comptes qui invitent un collègue en première semaine passe de 28 % à 40 %",
        chainChip: "Constatable à la revue",
      },
      {
        id: "descente.sprint.activation.step2",
        question:
          "Et pour que plus de nouveaux comptes invitent un collègue, qu'est-ce que l'équipe livre ?",
        options: [
          {
            id: "a",
            text: "Une invitation proposée à la fin de la création du premier projet, avec un message pré-rempli.",
            correct: true,
            explanation:
              "Une livraison précise, au bon moment du parcours, qui alimente directement le maillon du dessus.",
          },
          {
            id: "b",
            text: "Améliorer le code de l'intégration des nouveaux comptes.",
            correct: false,
            explanation: "« Améliorer » ne dit ni quoi, ni pour qui, ni comment on le verra.",
          },
          {
            id: "c",
            text: "La refonte complète du parcours d'accueil.",
            correct: false,
            explanation: "Trop gros pour un sprint : rien de fini à montrer à la revue.",
          },
        ],
        flagFeedback: "Pas ici : une livraison finissable dans le sprint existe.",
        chainText:
          "Invitation proposée à la fin de la création du premier projet, message pré-rempli",
        chainChip: "Livraison",
      },
    ],
    line: [
      {
        label: "Impact trimestriel",
        detail: "l'activation à J+30 passe de 30 % à 45 %",
        verdict: "bad",
        feedback:
          "Il faut 30 jours pour mesurer J+30 : plus long que le sprint lui-même. Mathématiquement invisible à la revue, même si tout se passe bien.",
      },
      {
        label: "Outcome de sprint",
        detail: "les invitations en première semaine passent de 28 % à 40 %",
        verdict: "good",
        feedback: "Oui : la fenêtre de mesure tient dans le sprint si tu livres tôt.",
      },
      {
        label: "Output",
        detail: "l'écran d'invitation est en production",
        verdict: "warn",
        feedback:
          "Prudent. Livre tôt et tu pourras montrer la mesure du dessus plutôt qu'une copie d'écran.",
      },
    ],
    finalQcmQuestion: "Alors, quel objectif de sprint écris-tu ?",
    finalQcmOptions: [
      {
        id: "a",
        text: "Livrer le nouvel écran d'invitation d'ici la fin du sprint.",
        correct: false,
        explanation: "Une livraison : on ne saura pas si elle change quelque chose.",
      },
      {
        id: "b",
        text: "Faire passer la part des nouveaux comptes qui invitent un collègue en première semaine de 28 % à 40 % d'ici la fin du sprint.",
        correct: true,
        explanation:
          "Constatable à la revue, sous influence, chiffré, et branché sur l'objectif du trimestre.",
      },
      {
        id: "c",
        text: "Faire passer l'activation à J+30 de 30 % à 45 % d'ici la fin du sprint.",
        correct: false,
        explanation: "La recopie du trimestre : invérifiable à l'échelle d'un sprint.",
      },
    ],
    endRule:
      "Le bon objectif de sprint vise le maillon juste sous la ligne de la revue de sprint. Le trimestre garde l'impact, le sprint montre une mesure qui y mène.",
  },

  {
    id: "descente.sprint.astreinte",
    kind: "chaine",
    title: "Les réveils d'astreinte",
    team: "Équipe Plateforme",
    objectiveLabel: "objectif du trimestre (objectif de PI)",
    quarterlyObjective:
      "Réduire les réveils d'astreinte la nuit de 12 à 3 par mois d'ici la fin du trimestre.",
    metrics: [
      "Réveils par mois : 12",
      "Dont fausses alertes du superviseur : 7",
      "Temps de rétablissement moyen : 40 min",
    ],
    skepticQuestion: SKEPTIC,
    steps: [
      {
        id: "descente.sprint.astreinte.step1",
        question:
          "Pour que les réveils passent de 12 à 3 par mois, qu'est-ce qui doit bouger avant ?",
        options: [
          {
            id: "a",
            text: "Zéro fausse alerte du superviseur sur toute la durée du sprint.",
            correct: true,
            explanation:
              "La cause n°1 des réveils, mesurée sur la fenêtre du sprint : constatable à la revue. Et oui, le bénéficiaire peut être l'équipe : ce qui compte, c'est la mesure.",
          },
          {
            id: "b",
            text: "Les règles d'alerte sont réécrites et déployées.",
            correct: false,
            explanation:
              "Une livraison. Des règles réécrites peuvent encore réveiller tout le monde.",
          },
          {
            id: "c",
            text: "La satisfaction de l'équipe d'astreinte remonte dans l'enquête interne annuelle.",
            correct: false,
            explanation:
              "L'enquête est annuelle : rien à constater ce trimestre, encore moins dans un sprint.",
          },
        ],
        flagFeedback:
          "Pas ici : les fausses alertes se comptent chaque nuit, la chaîne tient très bien.",
        chainText: "Zéro fausse alerte du superviseur sur toute la durée du sprint",
        chainChip: "Constatable à la revue",
      },
      {
        id: "descente.sprint.astreinte.step2",
        question: "Et pour arriver à zéro fausse alerte, qu'est-ce que l'équipe livre ?",
        options: [
          {
            id: "a",
            text: "Les 7 règles d'alerte fautives recalibrées avec des seuils testés, en production.",
            correct: true,
            explanation:
              "Ciblé sur la cause identifiée, finissable dans le sprint, branché sur le maillon du dessus.",
          },
          {
            id: "b",
            text: "Nettoyer la configuration du superviseur.",
            correct: false,
            explanation:
              "« Nettoyer » ne nomme ni les règles, ni le résultat attendu : invérifiable.",
          },
          {
            id: "c",
            text: "Migrer toute la supervision vers un nouvel outil.",
            correct: false,
            explanation: "Un chantier de trimestre, pas de sprint : rien de fini à la revue.",
          },
        ],
        flagFeedback: "Pas ici : la livraison ciblée existe et tient dans le sprint.",
        chainText: "Les 7 règles d'alerte fautives recalibrées avec des seuils testés, en production",
        chainChip: "Livraison",
      },
    ],
    line: [
      {
        label: "Impact trimestriel",
        detail: "les réveils passent de 12 à 3 par mois",
        verdict: "bad",
        feedback:
          "Il faudra des mois de nuits calmes pour le constater. Maillon du sponsor.",
      },
      {
        label: "Outcome de sprint",
        detail: "zéro fausse alerte sur la durée du sprint",
        verdict: "good",
        feedback: "Oui : la fenêtre de mesure est exactement celle du sprint.",
      },
      {
        label: "Output",
        detail: "les 7 règles recalibrées sont en production",
        verdict: "warn",
        feedback:
          "Prudent. Recalibre en début de sprint et tu montreras des nuits sans fausse alerte plutôt qu'un déploiement.",
      },
    ],
    finalQcmQuestion: "Alors, quel objectif de sprint écris-tu ?",
    finalQcmOptions: [
      {
        id: "a",
        text: "Recalibrer les 7 règles d'alerte d'ici la fin du sprint.",
        correct: false,
        explanation: "La livraison, pas son effet.",
      },
      {
        id: "b",
        text: "Réduire les fausses alertes du superviseur à zéro sur la durée du sprint.",
        correct: true,
        explanation:
          "Mesuré sur la fenêtre du sprint, sous influence, et le lien avec les réveils du trimestre saute aux yeux.",
      },
      {
        id: "c",
        text: "Réduire les réveils d'astreinte de 12 à 3 par mois d'ici la fin du sprint.",
        correct: false,
        explanation: "Recopie du trimestre, invérifiable à l'échelle d'un sprint.",
      },
    ],
    endRule:
      "Le bon objectif de sprint vise le maillon juste sous la ligne de la revue de sprint. Le trimestre garde l'impact, le sprint montre une mesure qui y mène.",
  },

  {
    id: "descente.sprint.reference-marche",
    kind: "alerte",
    title: "La référence du marché",
    team: "Équipe Expérience client",
    objectiveLabel: "objectif du trimestre (annoncé par le sponsor)",
    quarterlyObjective:
      "Devenir la référence de notre marché en expérience client d'ici la fin du trimestre.",
    metrics: [
      "Aucun indicateur défini",
      "Enquête de satisfaction : annuelle (prochaine dans 8 mois)",
      "Part de marché : mesurée au semestre",
    ],
    skepticQuestion: SKEPTIC,
    steps: [
      {
        id: "descente.sprint.reference.step1",
        question: "Pour devenir la référence du marché, qu'est-ce qui doit bouger avant ?",
        flagIsCorrect: true,
        options: [
          {
            id: "a",
            text: "L'enquête de satisfaction annuelle nous classe premiers.",
            correct: false,
            explanation:
              "Elle a lieu dans 8 mois : rien à constater ce trimestre, encore moins dans un sprint. Aucune carte ne tient ici... il reste une option en bas.",
          },
          {
            id: "b",
            text: "Le nouveau programme de fidélité est lancé.",
            correct: false,
            explanation:
              "Un lancement est une livraison, et personne n'a dit ce qu'il doit changer ni comment on le verra. Regarde l'option en bas.",
          },
          {
            id: "c",
            text: "La part de marché gagne 2 points.",
            correct: false,
            explanation:
              "Mesurée au semestre et dépendante des concurrents : hors d'influence. Il reste une option en bas.",
          },
        ],
        flagFeedback:
          "Exactement. Rien n'est constatable entre le sprint et ce trimestre : pas d'indicateur, pas de mesure avant 8 mois. Le problème n'est pas ton sprint, c'est l'objectif trimestriel qui est flou. Quand aucun maillon ne tient, on remonte le problème au lieu de faire semblant.",
        chainText: "",
        chainChip: "",
      },
    ],
    finalQcmQuestion: "Que proposes-tu au sponsor ?",
    finalQcmOptions: [
      {
        id: "a",
        text: "« Choisissons ensemble un indicateur mesurable ce trimestre (réclamations, taux de recommandation...), et je te propose un objectif de sprint qui le fait bouger. »",
        correct: true,
        explanation:
          "Tu ne refuses pas l'ambition : tu demandes le maillon qui la rend pilotable.",
      },
      {
        id: "b",
        text: "« On prend l'objectif tel quel, l'équipe fera de son mieux. »",
        correct: false,
        explanation:
          "Personne ne saura jamais si c'est atteint : objectif invérifiable, frustration garantie des deux côtés.",
      },
      {
        id: "c",
        text: "« On recopie l'objectif dans nos objectifs de sprint pour montrer l'alignement. »",
        correct: false,
        explanation: "Recopier du flou ne l'aligne pas, ça le propage.",
      },
    ],
    endRule:
      "Quand aucun maillon n'est constatable entre le sprint et le trimestre, le signal d'alerte est la bonne réponse : c'est l'objectif trimestriel qu'il faut retravailler, pas ton sprint. La phrase à oser : « donne-moi un indicateur, je te donne un objectif de sprint ».",
  },
];
