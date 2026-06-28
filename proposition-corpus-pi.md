# Corpus mini-exercices PI — V1 (panel SAFe)

Pour validation en bloc avant intégration. Produit par sous-agent expert Lean-Agile / SAFe francophone. Vocabulaire diversifié (banque, e-commerce, plateforme, télécoms, public, RH, finance, données).

---

## 1. Indicateur — QCM 1 parmi 3 (10 cas)

**Promesse pédagogique** : distinguer un indicateur qui se mesure avec exactitude (sans place pour l'interprétation) d'un concept-parapluie flou.

**Question type posée à l'utilisateur pour chaque cas** : *« Quel indicateur se mesure avec exactitude, sans place pour l'interprétation ? »*

| # | Objectif PI | a | b | c | Bonne | Justification |
|---|---|---|---|---|---|---|
| 1 | Améliorer la performance du parcours de souscription en ligne (banque) | **Délai moyen de souscription bout-en-bout en minutes, mesuré à la PI Review** | Fluidité du parcours | Satisfaction des conseillers | a | Une durée chiffrée se mesure ; « fluidité » reste interprétable. |
| 2 | Réduire la dette technique du train paiement | Sentiment des équipes sur la qualité du code | **Nombre de composants critiques sortis de la liste de dette, sur 42 identifiés** | Modernisation du socle | b | Compte borné sur une liste connue, vérifiable à la PI Review. |
| 3 | Fiabiliser les livraisons du train e-commerce | **Taux d'incidents bloquants en production par mois (cible inférieure à 2)** | Robustesse perçue | Maturité opérationnelle | a | Taux mensuel mesurable ; les deux autres sont des étiquettes. |
| 4 | Préparer le train données à l'arrivée d'un nouveau métier | Anticipation du besoin | Couverture | **Nombre de jeux de données documentés et exposés via le catalogue, cible 25** | c | Compte observable ; « couverture » sans périmètre reste flou. |
| 5 | Renforcer l'accompagnement des agents en centre de relation client (télécoms) | Score de qualité d'écoute | **Temps moyen de prise en charge d'un appel en secondes, baseline 240** | Engagement des agents | b | Durée chiffrée auditable ; « score d'écoute » non défini ici. |
| 6 | Augmenter l'autonomie des collectivités sur le portail public | **Part de démarches finalisées sans contact agent, cible 60 %** | Simplicité | Lisibilité | a | Ratio observable sur les démarches du portail. |
| 7 | Sécuriser la plateforme de données RH | Posture sécurité renforcée | Conformité accrue | **Nombre de vulnérabilités critiques ouvertes, cible zéro en fin de PI** | c | Compte de vulnérabilités traçable dans l'outil de scan. |
| 8 | Accélérer la mise à disposition d'environnements pour les équipes du train plateforme | **Délai médian de provisionnement d'un environnement, baseline 5 jours, cible 1 jour** | Réactivité du socle | Modernité de l'outillage | a | Durée mesurable par les tickets de provisionnement. |
| 9 | Améliorer la conversion sur le tunnel d'abonnement e-commerce | Attractivité du tunnel | Engagement visiteurs | **Taux de finalisation du tunnel sur visiteurs entrés, cible 18 %** | c | Ratio direct ; les autres sont des concepts marketing larges. |
| 10 | Réduire le délai de clôture comptable mensuelle (finance) | Efficience du process | **Délai entre fin de mois et clôture validée, en jours ouvrés, cible 4** | Maîtrise des opérations | b | Délai chiffré observable chaque mois pendant le PI. |

**Répartition bonnes réponses** : a = 4 (1, 3, 6, 8), b = 3 (2, 5, 10), c = 3 (4, 7, 9). Équilibré.

---

## 2. Variation chiffrée — Grille à sélection multiple (8 fragments)

**Consigne** : cocher les variations chiffrées exploitables sur un PI.

| # | Fragment | À cocher ? |
|---|---|---|
| 1 | Passer de 240 à 180 secondes sur le temps moyen de prise en charge d'appel | Oui |
| 2 | Améliorer sensiblement la satisfaction des grands comptes | Non |
| 3 | Diviser par 2 le nombre d'incidents bloquants en production, baseline 8 par mois | Oui |
| 4 | Renforcer la robustesse de la plateforme de paiement | Non |
| 5 | Atteindre 60 % de démarches publiques finalisées sans contact agent, baseline 42 % | Oui |
| 6 | Faire progresser l'autonomie des équipes métiers | Non |
| 7 | Faire baisser le délai de clôture comptable de 7 à 4 jours ouvrés | Oui |
| 8 | Avoir un impact significatif sur la dette technique | Non |

**Fragments précis attendus** : 1, 3, 5, 7. Vagues : 2, 4, 6, 8.

---

## 3. Échéance — Grille à sélection multiple (8 fragments)

**Consigne** : cocher les échéances bornées valides à l'échelle d'un PI.

| # | Fragment | À cocher ? |
|---|---|---|
| 1 | Démontré à la PI Review du 28 mars | Oui |
| 2 | Sur la durée du programme | Non |
| 3 | Avant le PI Planning N+1 | Oui |
| 4 | Dès que possible | Non |
| 5 | Mesuré en fin de PI sur les données de la dernière itération | Oui |
| 6 | Dans les prochains PI | Non |
| 7 | Atteint au plus tard mi-PI, soit semaine 6 | Oui |
| 8 | Rapidement après le démarrage | Non |

**Fragments bornés attendus** : 1, 3, 5, 7. Floues : 2, 4, 6, 8.

---

## 4. Contexte — QCM 1 parmi 4 (8 cas)

**Promesse pédagogique** : identifier le vrai bénéficiaire d'un objectif PI. Spécificité SAFe : le bénéficiaire peut être interne (autre train arrimé, équipe outillage) ou externe (clients). Toujours distinguer le porteur (qui livre) du bénéficiaire (qui en profite).

| # | Objectif PI | a | b | c | d | Bonne | Justification |
|---|---|---|---|---|---|---|---|
| 1 | Le train paiement expose une nouvelle interface de règlement instantané pour que le train e-commerce l'intègre dans le tunnel | Clients finaux du e-commerce | **Train e-commerce qui consomme l'interface** | Équipe paiement qui produit | Direction financière | b | À la livraison du PI, c'est le train e-commerce qui peut avancer ; les clients n'en profitent qu'après son intégration. |
| 2 | Le train données livre un catalogue exposé permettant aux équipes marketing d'auto-servir leurs segments | **Équipes marketing utilisatrices du catalogue** | Équipe données productrice | Clients ciblés par les campagnes | Direction data | a | Le bénéfice direct au terme du PI est l'autonomie des équipes marketing ; le reste est aval. |
| 3 | Le train plateforme réduit à 1 jour le délai de provisionnement d'environnements pour les huit trains clients | Équipes du train plateforme | Direction technique | **Trains applicatifs clients du provisionnement** | Clients finaux | c | Les bénéficiaires sont les trains applicatifs qui gagnent du temps de livraison ; la plateforme est le porteur. |
| 4 | Le train libre-service public ouvre la démarche de changement d'adresse en ligne sans passage en mairie | **Usagers du service public** | Agents d'accueil | Direction des services numériques | Équipe portail | a | Le service rendu sort à la PI Review et bénéficie aux usagers ; les agents sont impactés mais pas la cible. |
| 5 | Le train outillage livre un pipeline de déploiement standardisé aux équipes du train banque en ligne | Direction informatique | **Train banque en ligne consommateur du pipeline** | Clients de la banque | Équipe outillage | b | Le bénéficiaire intermédiaire au terme du PI est le train consommateur ; les clients n'en sentiront l'effet qu'après. |
| 6 | Le train relation client télécoms réduit le temps moyen de prise en charge d'appel de 240 à 180 secondes | **Abonnés appelants** | Conseillers du centre | Direction service client | Équipe outils conseillers | a | Le bénéfice perçu à la PI Review est sur le client appelant ; le conseiller est l'acteur, pas le bénéficiaire visé. |
| 7 | Le train conformité RH livre un module de gestion des consentements utilisé par les autres trains traitant des données salariés | Salariés concernés par les données | **Autres trains qui consomment le module de consentements** | Direction juridique | Équipe conformité | b | Au terme du PI, ce sont les autres trains qui peuvent traiter les données conformément ; les salariés en bénéficient en aval. |
| 8 | Le train e-commerce porte un objectif de hausse du taux de finalisation du tunnel d'abonnement à 18 % | Équipe tunnel | Direction marketing | **Visiteurs qui s'abonnent plus facilement** | Service client | c | L'effet observable du PI est ressenti par les visiteurs convertis ; les autres sont porteurs ou observateurs. |

**Répartition bonnes réponses** : a = 3 (2, 4, 6), b = 3 (1, 5, 7), c = 2 (3, 8), d = 0. Diversifié.

**Cas avec bénéficiaire interne arrimé (spécificité SAFe)** : 1, 2, 3, 5, 7. Cinq cas sur huit, suffisant pour ancrer la doctrine.

---

## Domaines couverts

Banque, e-commerce, plateforme technique, télécoms, service public, RH, finance, données. Diversification volontaire pour parler à plusieurs profils de trains.

---

## À ta validation

- « OK pour tout » → j'intègre.
- « OK sauf [n° + remplacement] » → j'intègre avec tes corrections.
- « Reprends [section] avec [angle] » → je relance un round d'expertise ciblé.
