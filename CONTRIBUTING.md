# Guide de contribution - Impact IA ESN Dashboard

Nous sommes ravis que vous envisagiez de contribuer au projet Impact IA ESN Dashboard ! Ce document vous guidera dans le processus de contribution.

## Code de conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite qui vise à garantir une communauté accueillante et respectueuse pour tous les contributeurs.

## Comment contribuer

### Signaler des bugs

Si vous découvrez un bug dans l'application, veuillez ouvrir une issue en suivant ces étapes :

1. Vérifiez d'abord que le bug n'a pas déjà été signalé
2. Utilisez le modèle de rapport de bug fourni
3. Incluez autant de détails que possible :
   - Étapes pour reproduire le problème
   - Comportement attendu vs comportement observé
   - Captures d'écran si pertinent
   - Environnement (navigateur, système d'exploitation, etc.)

### Proposer des améliorations

Pour proposer une nouvelle fonctionnalité ou une amélioration :

1. Ouvrez une issue avec le modèle "Proposition d'amélioration"
2. Décrivez clairement la fonctionnalité et son cas d'utilisation
3. Expliquez pourquoi cette fonctionnalité serait bénéfique pour le projet
4. Si possible, proposez une approche pour l'implémentation

### Contribuer au code

Pour contribuer directement au code du projet :

1. **Fork du dépôt** : Créez votre propre copie du dépôt sur GitHub
2. **Créez une branche** : 
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```
   ou
   ```bash
   git checkout -b fix/correction-bug
   ```
3. **Implémentez vos modifications** : Suivez les conventions de code du projet
4. **Testez vos changements** : Assurez-vous que vos modifications fonctionnent correctement
5. **Commitez vos changements** :
   ```bash
   git commit -m "Description concise des changements"
   ```
6. **Poussez vers votre fork** :
   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```
7. **Créez une Pull Request** : Depuis votre fork vers la branche principale du dépôt original

## Processus de développement

### Branches

- `main` : La branche de production, toujours stable
- `develop` : La branche de développement, où toutes les fonctionnalités sont fusionnées avant la release
- `feature/*` : Branches pour les nouvelles fonctionnalités
- `fix/*` : Branches pour les corrections de bugs
- `docs/*` : Branches pour les mises à jour de documentation

### Conventions de code

#### Style général

- Indentation : 2 espaces
- Utilisez des points-virgules à la fin des instructions
- Utilisez des guillemets simples pour les chaînes de caractères
- Utilisez la syntaxe ES6+ lorsque c'est pertinent

#### Nommage

- Utilisez `camelCase` pour les variables et fonctions
- Utilisez `PascalCase` pour les composants React
- Utilisez `UPPER_SNAKE_CASE` pour les constantes
- Utilisez des noms descriptifs et évitez les abréviations ambiguës

#### Structure des composants React

- Un composant par fichier
- Exportez les composants comme `export default`
- Utilisez des composants fonctionnels avec hooks plutôt que des composants de classe
- Importez les styles ou CSS modules en haut du fichier

#### Commentaires

- Commentez votre code lorsque la logique n'est pas évidente
- Utilisez JSDoc pour documenter les fonctions publiques
- Évitez les commentaires évidents qui ne font que répéter le code

### Tests

Nous encourageons l'ajout de tests pour les nouvelles fonctionnalités et les corrections de bugs :

- Tests unitaires pour les fonctions et composants isolés
- Tests d'intégration pour les interactions entre composants
- Tests end-to-end pour les flux utilisateur critiques

### Révision de code

Toutes les Pull Requests seront examinées par au moins un membre de l'équipe. Nous recherchons :

- La qualité du code et le respect des conventions
- La présence de tests appropriés
- La documentation des changements
- L'absence de régressions ou de bugs

## Mise à jour des données et analyses

Si vous souhaitez mettre à jour les données ou les analyses présentées dans l'application :

1. Assurez-vous que les nouvelles données proviennent de sources fiables
2. Documentez clairement les sources dans les fichiers appropriés
3. Mettez à jour la section Méthodologie si nécessaire
4. Expliquez les changements d'interprétation ou d'analyse dans votre Pull Request

## Documentation

La documentation est essentielle pour maintenir ce projet accessible :

- Mettez à jour les fichiers README.md, DOCUMENTATION.md ou autres documents pertinents
- Documentez les nouvelles fonctionnalités ou changements d'API
- Ajoutez des commentaires dans le code pour les parties complexes

## Questions

Si vous avez des questions sur la façon de contribuer, n'hésitez pas à ouvrir une issue avec l'étiquette "question".

Merci de contribuer à Impact IA ESN Dashboard !
