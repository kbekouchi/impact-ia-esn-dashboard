# Documentation des tests

Bienvenue dans la documentation des tests pour le projet impact-ia-esn-dashboard. Cette documentation vous aidera à comprendre comment les tests sont organisés et comment les modifier.

## Table des matières

1. [Guide général des tests](./README.md)
   * Présentation de la structure des tests
   * Technologies utilisées
   * Comment exécuter les tests

2. [Tests du composant StateDisplay](./StateDisplay.md)
   * Structure des données de test
   * Comment modifier les thèmes et états
   * Comment ajouter de nouveaux thèmes et états
   * Tests de cas spéciaux

3. [Bonnes pratiques](./BestPractices.md)
   * Configuration de l'environnement de test
   * Test des composants avec des états asynchrones
   * Éviter les erreurs dans la console
   * Pièges courants à éviter

4. [Guide de dépannage](./TroubleShooting.md)
   * Résolution du problème `toBeInTheDocument is not a function`
   * Résolution du problème des sélecteurs multiples
   * Correction des avertissements liés à `act()`
   * Suppression des messages d'erreur dans la console

## Problèmes résolus

Cette documentation a été créée suite à la résolution des problèmes suivants :

- **Issue #61** : Tests échouant avec l'erreur `TypeError: expect(...).toBeInTheDocument is not a function`
- **Issue #63** : Erreur avec la sélection par expression régulière `Found multiple elements with the text: /chargement/i`
- **Issue #64** : Problème avec le test de l'état de chargement initial lors de l'utilisation de `act()`

## Contributions

Si vous trouvez des erreurs ou des améliorations possibles dans les tests ou dans cette documentation, n'hésitez pas à ouvrir une issue ou une pull request.