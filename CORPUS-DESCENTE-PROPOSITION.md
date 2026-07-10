# Corpus « Du trimestre au sprint » (La descente) : proposition v1 à valider

> Statut : VALIDÉ par Lætitia le 2026-07-08, intégré (D61). Source de vérité : `src/content/impact-chain/sprint.dev.fr.ts` ; ce fichier est l'archive du cadrage.
> Exercice du groupe « Situations réelles » de S'entraîner (module Sprint).
> Sous-titre de l'exercice : « Visible à la revue de sprint ».
> Mécanique validée sur MVP jouable : sceptique, descente maillon par maillon,
> ligne de la revue de sprint (choisir le maillon le plus haut montrable), QCM final, drapeau.
> Vocabulaire : simple partout ; leading/lagging cités une seule fois en aparté (cas 1).

---

## Cas 1 : Les tickets du paiement (chaîne)

**Équipe** : Checkout
**Objectif du trimestre (OKR)** : Réduire les tickets support liés au paiement de 220 à 120 par mois d'ici la fin du trimestre.
**Métriques** : Tickets paiement par mois : 220 · Échecs de paiement sans message clair : 40 % · Résolution moyenne d'un ticket : 2 jours
**Le sceptique** : « Très bien. Et à la revue de sprint, tu me montres quoi ? »

### Étape 1 : « Pour que les tickets baissent d'ici la fin du trimestre, qu'est-ce qui doit bouger avant ? »
- ✅ **La part des échecs de paiement sans message clair passe de 40 % à 10 %.**
  Un client qui comprend pourquoi son paiement a échoué corrige seul et n'ouvre pas de ticket. Mesurable dès la mise en production : constatable à la revue. (Aparté culture : on dit qu'un tel indicateur est « leading », il bouge avant l'impact ; les tickets, eux, sont « lagging », ils bougent après.)
- ❌ Le nouveau centre d'aide est en ligne.
  C'est une livraison : elle dit ce que l'équipe a fait, pas ce qui a changé. Un centre d'aide peut être en ligne et ne rien changer aux tickets.
- ❌ La satisfaction client (CSAT) remonte de 3,4 à 4,2.
  Effet encore plus lointain que les tickets : il bougera après eux, pas avant. Hors d'influence visible d'ici la revue de sprint.
- 🚩 Drapeau (mauvaise pioche ici) : Pas ici : la chaîne tient, il existe un maillon constatable d'ici la revue (regarde la métrique des 40 %). Garde le drapeau pour le jour où il n'y en a vraiment pas.

### Étape 2 : « Et pour que la part d'échecs sans message clair baisse, qu'est-ce que l'équipe livre ? »
- ✅ **Des messages d'explication sur les 5 échecs les plus fréquents, en production.**
  Une livraison précise et bornée, qui alimente directement le maillon du dessus.
- ❌ Refactorer le module de paiement.
  Du travail sur le code, sans lien nommé avec les échecs mal expliqués. On ne saura pas si ça a servi.
- ❌ La refonte complète du parcours de paiement.
  Peut-être utile un jour, mais rien de fini dans le sprint : rien à montrer à la revue.
- 🚩 Drapeau : Pas ici : il existe une livraison finissable dans le sprint qui nourrit le maillon du dessus.

### Ligne de la revue de sprint : « Quel est le maillon le plus haut que tu peux montrer à la revue ? »
- 🔴 Impact trimestriel (tickets 220 → 120 par mois) : Hors d'influence sur un sprint : les tickets mettront des semaines à refléter le changement. C'est le maillon du sponsor, pas celui du sprint.
- 🟢 Outcome de sprint (échecs sans message 40 % → 10 %) : Oui. Livré tôt dans le sprint, l'indicateur bouge avant la revue : tu montres une mesure, pas une promesse.
- 🟡 Output (messages en production) : Prudent, et parfois c'est la réalité. Mais si tu livres tôt dans le sprint, tu peux viser le maillon du dessus et montrer une mesure. À débattre en équipe.

### QCM final : « Alors, quel objectif de sprint écris-tu ? »
- ❌ Mettre en production les nouveaux messages d'erreur d'ici la fin du sprint. (Le maillon livraison : nécessaire, mais l'objectif ne dit pas ce qui change.)
- ✅ **Réduire la part des échecs de paiement sans message clair de 40 % à 10 % d'ici la fin du sprint.** (Le maillon juste sous la ligne de la revue : constatable, sous influence, chiffré. Et il nourrit visiblement l'objectif du trimestre.)
- ❌ Réduire les tickets support paiement de 220 à 120 par mois d'ici la fin du sprint. (L'objectif du trimestre recopié dans le sprint : personne ne pourra le constater à l'échelle d'un sprint.)

---

## Cas 2 : L'activation des nouveaux comptes (chaîne)

**Équipe** : Intégration (produit SaaS)
**Objectif du trimestre (OKR)** : Faire passer l'activation des nouveaux comptes à J+30 de 30 % à 45 % d'ici la fin du trimestre.
**Métriques** : Activation à J+30 : 30 % · Comptes créés par mois : 900 · Nouveaux comptes qui n'invitent aucun collègue en première semaine : 72 %
**Le sceptique** : « Très bien. Et à la revue de sprint, tu me montres quoi ? »

### Étape 1 : « Pour que l'activation à J+30 monte, qu'est-ce qui doit bouger avant ? »
- ✅ **La part des nouveaux comptes qui invitent au moins un collègue en première semaine passe de 28 % à 40 %.**
  Un compte qui travaille à plusieurs revient. Et la première semaine se mesure vite : livré tôt, l'indicateur bouge avant la revue.
- ❌ Le nouvel écran d'invitation est en production.
  Une livraison. Elle peut être en ligne et ne convaincre personne d'inviter qui que ce soit.
- ❌ Le revenu récurrent mensuel augmente de 8 %.
  Très loin dans la chaîne : il bougera bien après l'activation. Hors d'influence à l'échelle d'un sprint.
- 🚩 Drapeau : Pas ici : la métrique des invitations en première semaine est constatable dans le sprint. La chaîne tient.

### Étape 2 : « Et pour que plus de nouveaux comptes invitent un collègue, qu'est-ce que l'équipe livre ? »
- ✅ **Une invitation proposée à la fin de la création du premier projet, avec un message pré-rempli.**
  Une livraison précise, au bon moment du parcours, qui alimente directement le maillon du dessus.
- ❌ Améliorer le code de l'intégration des nouveaux comptes.
  « Améliorer » ne dit ni quoi, ni pour qui, ni comment on le verra.
- ❌ La refonte complète du parcours d'accueil.
  Trop gros pour un sprint : rien de fini à montrer à la revue.
- 🚩 Drapeau : Pas ici : une livraison finissable dans le sprint existe.

### Ligne de la revue de sprint
- 🔴 Impact trimestriel (activation J+30 : 30 % → 45 %) : Il faut 30 jours pour mesurer J+30 : plus long que le sprint lui-même. Mathématiquement invisible à la revue, même si tout se passe bien.
- 🟢 Outcome de sprint (invitations en première semaine : 28 % → 40 %) : Oui : la fenêtre de mesure tient dans le sprint si tu livres tôt.
- 🟡 Output (écran d'invitation en production) : Prudent. Livre tôt et tu pourras montrer la mesure du dessus plutôt qu'une copie d'écran.

### QCM final
- ❌ Livrer le nouvel écran d'invitation d'ici la fin du sprint. (Une livraison : on ne saura pas si elle change quelque chose.)
- ✅ **Faire passer la part des nouveaux comptes qui invitent un collègue en première semaine de 28 % à 40 % d'ici la fin du sprint.** (Constatable à la revue, sous influence, chiffré, et branché sur l'objectif du trimestre.)
- ❌ Faire passer l'activation à J+30 de 30 % à 45 % d'ici la fin du sprint. (La recopie du trimestre : invérifiable à l'échelle d'un sprint.)

---

## Cas 3 : Les réveils d'astreinte (chaîne)

**Équipe** : Plateforme
**Objectif du trimestre (objectif de PI)** : Réduire les réveils d'astreinte la nuit de 12 à 3 par mois d'ici la fin du trimestre.
**Métriques** : Réveils par mois : 12 · Dont fausses alertes du superviseur : 7 · Temps de rétablissement moyen : 40 min
**Le sceptique** : « Très bien. Et à la revue de sprint, tu me montres quoi ? »

### Étape 1 : « Pour que les réveils passent de 12 à 3 par mois, qu'est-ce qui doit bouger avant ? »
- ✅ **Zéro fausse alerte du superviseur sur toute la durée du sprint.**
  La cause n°1 des réveils, mesurée sur la fenêtre du sprint : constatable à la revue, et le bénéficiaire dort déjà mieux. (Oui, le bénéficiaire peut être l'équipe : ce qui compte, c'est la mesure.)
- ❌ Les règles d'alerte sont réécrites et déployées.
  Une livraison. Des règles réécrites peuvent encore réveiller tout le monde.
- ❌ La satisfaction de l'équipe d'astreinte remonte dans l'enquête interne annuelle.
  L'enquête est annuelle : rien à constater ce trimestre, encore moins dans un sprint.
- 🚩 Drapeau : Pas ici : les fausses alertes se comptent chaque nuit, la chaîne tient très bien.

### Étape 2 : « Et pour arriver à zéro fausse alerte, qu'est-ce que l'équipe livre ? »
- ✅ **Les 7 règles d'alerte fautives recalibrées avec des seuils testés, en production.**
  Ciblé sur la cause identifiée, finissable dans le sprint, branché sur le maillon du dessus.
- ❌ Nettoyer la configuration du superviseur.
  « Nettoyer » ne nomme ni les règles, ni le résultat attendu : invérifiable.
- ❌ Migrer toute la supervision vers un nouvel outil.
  Un chantier de trimestre, pas de sprint : rien de fini à la revue.
- 🚩 Drapeau : Pas ici : la livraison ciblée existe et tient dans le sprint.

### Ligne de la revue de sprint
- 🔴 Impact trimestriel (réveils 12 → 3 par mois) : Il faudra des mois de nuits calmes pour le constater. Maillon du sponsor.
- 🟢 Outcome de sprint (zéro fausse alerte sur la durée du sprint) : Oui : la fenêtre de mesure est exactement celle du sprint.
- 🟡 Output (7 règles recalibrées en production) : Prudent. Recalibre en début de sprint et tu montreras des nuits sans fausse alerte plutôt qu'un déploiement.

### QCM final
- ❌ Recalibrer les 7 règles d'alerte d'ici la fin du sprint. (La livraison, pas son effet.)
- ✅ **Réduire les fausses alertes du superviseur à zéro sur la durée du sprint.** (Mesuré sur la fenêtre du sprint, sous influence, et le lien avec les réveils du trimestre saute aux yeux.)
- ❌ Réduire les réveils d'astreinte de 12 à 3 par mois d'ici la fin du sprint. (Recopie du trimestre, invérifiable à l'échelle d'un sprint.)

---

## Cas 4 : La référence du marché (ALERTE : le drapeau est la bonne réponse)

**Équipe** : Expérience client
**Objectif du trimestre (annoncé par le sponsor)** : Devenir la référence de notre marché en expérience client d'ici la fin du trimestre.
**Métriques** : Aucun indicateur défini · Enquête de satisfaction : annuelle (prochaine dans 8 mois) · Part de marché : mesurée au semestre
**Le sceptique** : « Très bien. Et à la revue de sprint, tu me montres quoi ? »

### Étape unique : « Pour devenir la référence du marché, qu'est-ce qui doit bouger avant ? »
- ❌ L'enquête de satisfaction annuelle nous classe premiers.
  Elle a lieu dans 8 mois : rien à constater ce trimestre, encore moins dans un sprint. Aucune carte ne tient ici... il reste une option en bas.
- ❌ Le nouveau programme de fidélité est lancé.
  Un lancement est une livraison, et personne n'a dit ce qu'il doit changer ni comment on le verra. Regarde l'option en bas.
- ❌ La part de marché gagne 2 points.
  Mesurée au semestre et dépendante des concurrents : hors d'influence. Il reste une option en bas.
- 🚩✅ **Drapeau (BONNE réponse)** : Exactement. Rien n'est constatable entre le sprint et ce trimestre : pas d'indicateur, pas de mesure avant 8 mois. Le problème n'est pas ton sprint, c'est l'objectif trimestriel qui est flou. Quand aucun maillon ne tient, on remonte le problème au lieu de faire semblant.

### QCM final : « Que proposes-tu au sponsor ? »
- ✅ **« Choisissons ensemble un indicateur mesurable ce trimestre (réclamations, taux de recommandation...), et je te propose un objectif de sprint qui le fait bouger. »** (Tu ne refuses pas l'ambition : tu demandes le maillon qui la rend pilotable.)
- ❌ « On prend l'objectif tel quel, l'équipe fera de son mieux. » (Personne ne saura jamais si c'est atteint : objectif invérifiable, frustration garantie des deux côtés.)
- ❌ « On recopie l'objectif dans nos objectifs de sprint pour montrer l'alignement. » (Recopier du flou ne l'aligne pas, ça le propage.)

### Règle de fin (cas 4)
Quand aucun maillon n'est constatable entre le sprint et le trimestre, le signal d'alerte est la bonne réponse : c'est l'objectif trimestriel qu'il faut retravailler, pas ton sprint. La phrase à oser : « donne-moi un indicateur, je te donne un objectif de sprint ».

---

## Règle de fin (cas 1 à 3)
Le bon objectif de sprint vise le maillon juste sous la ligne de la revue de sprint. Le trimestre garde l'impact, le sprint montre une mesure qui y mène.
