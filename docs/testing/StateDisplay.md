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

### Configuration des thèmes

Chaque thème définit les classes CSS à utiliser pour les différents éléments du composant :

```javascript
default: {
  container: 'flex flex-col items-center justify-center', // Classes pour le conteneur
  iconWrapper: 'mb-4', // Classes pour le wrapper d'icône
  title: 'text-lg font-bold', // Classes pour le titre
  message: 'text-base text-center', // Classes pour le message
  action: 'bg-blue-600 text-white' // Classes pour le bouton d'action
}
```

### Configuration des états

Chaque état peut avoir plusieurs configurations selon le thème :

```javascript
loading: {
  default: {
    icon: 'FaSpinner', // Nom de l'icône à utiliser
    iconClass: 'animate-spin text-blue-600', // Classes CSS pour l'icône
    title: 'Chargement test', // Titre à afficher
    message: 'Message de chargement test', // Message à afficher
    containerClass: 'bg-blue-50' // Classes supplémentaires pour le conteneur
  },
  minimal: {
    // Configuration pour le thème minimal
    icon: 'FaSpinner',
    iconClass: 'animate-spin',
    message: 'Chargement minimal...',
    containerClass: 'bg-blue-50'
  }
}
```

## Comment modifier les données de test

### Modification d'un thème existant

Pour modifier un thème existant, localisez la section correspondante dans l'objet `mockConfig` et modifiez les propriétés souhaitées :

```javascript
themes: {
  default: {
    container: 'flex flex-col items-center justify-center p-4', // Ajout de padding
    iconWrapper: 'mb-6', // Augmentation de la marge inférieure
    // Autres propriétés...
  }
}
```

### Modification d'un état existant

Pour modifier un état existant, localisez la section correspondante et modifiez les propriétés :

```javascript
loading: {
  default: {
    icon: 'FaSpinner',
    iconClass: 'animate-spin text-indigo-600', // Changement de couleur
    title: 'Chargement en cours...', // Modification du titre
    message: 'Veuillez patienter', // Modification du message
    containerClass: 'bg-indigo-50' // Changement de couleur d'arrière-plan
  }
}
```