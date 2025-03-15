# Tests du composant StateDisplay

Ce document détaille comment les tests du composant `StateDisplay` sont structurés et comment modifier les données de test.

## Aperçu du composant

Le composant `StateDisplay` est utilisé pour afficher différents états (chargement, erreur, vide, succès) de manière configurable. Il prend en charge :
- Différents types d'états
- Différents thèmes
- Personnalisation des messages et des titres
- Actions personnalisées

## Structure des tests

Les tests du composant `StateDisplay` se trouvent dans `src/components/__tests__/StateDisplay.test.js`. Ces tests vérifient :

1. L'affichage de l'état de chargement initial
2. L'affichage correct des différents types d'états
3. La personnalisation des messages et titres
4. L'utilisation des différents thèmes
5. Le comportement en cas d'erreur de chargement de la configuration

## Données de test

Les données de test sont définies dans un objet `mockConfig` au début du fichier de test. Cet objet simule la configuration qui serait normalement chargée depuis le serveur.

### Structure de l'objet mockConfig

```javascript
const mockConfig = {
  components: {
    stateDisplay: {
      themes: {
        // Configuration des thèmes
        default: { /* propriétés du thème par défaut */ },
        minimal: { /* propriétés du thème minimal */ }
      },
      states: {
        // Configuration des différents états
        loading: { /* configurations spécifiques à l'état de chargement */ },
        error: { /* configurations spécifiques à l'état d'erreur */ },
        empty: { /* configurations spécifiques à l'état vide */ },
        success: { /* configurations spécifiques à l'état de succès */ }
      }
    }
  }
};
```