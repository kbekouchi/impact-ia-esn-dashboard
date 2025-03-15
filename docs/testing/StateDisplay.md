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

### Ajout d'un nouveau thème

Pour ajouter un nouveau thème, ajoutez une nouvelle entrée dans la section `themes` :

```javascript
themes: {
  default: { /* ... */ },
  minimal: { /* ... */ },
  card: { // Nouveau thème "card"
    container: 'flex flex-col items-center justify-center rounded-lg shadow-md p-6',
    iconWrapper: 'mb-3',
    title: 'text-xl font-bold text-gray-800',
    message: 'text-base text-gray-600 text-center',
    action: 'mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
  }
}
```

### Ajout d'un nouvel état

Pour ajouter un nouvel état, ajoutez une nouvelle entrée dans la section `states` :

```javascript
states: {
  loading: { /* ... */ },
  error: { /* ... */ },
  empty: { /* ... */ },
  success: { /* ... */ },
  warning: { // Nouvel état "warning"
    default: {
      icon: 'FaExclamationCircle',
      iconClass: 'text-yellow-500',
      title: 'Attention',
      message: 'Certaines données ne sont pas disponibles',
      containerClass: 'bg-yellow-50'
    },
    minimal: {
      icon: 'FaExclamationCircle',
      iconClass: 'text-yellow-500',
      message: 'Attention: données partielles',
      containerClass: 'bg-yellow-50'
    }
  }
}
```

N'oubliez pas de mettre à jour les PropTypes dans le composant `StateDisplay.js` si vous ajoutez un nouvel état :

```javascript
StateDisplay.propTypes = {
  type: PropTypes.oneOf(['loading', 'error', 'empty', 'success', 'warning']), // Ajout de 'warning'
  // Autres PropTypes...
};
```

### Ajout d'un nouveau test

Pour tester un nouveau thème ou état, ajoutez un nouveau test :

```javascript
it('affiche correctement un état d\'avertissement', async () => {
  await act(async () => {
    render(<StateDisplay type="warning" />);
  });
  
  await waitFor(() => {
    expect(screen.getByText('Attention')).toBeInTheDocument();
  });
  
  expect(screen.getByText('Certaines données ne sont pas disponibles')).toBeInTheDocument();
});
```

## Tests de cas spéciaux

### Test de l'état de chargement initial

Pour tester l'état de chargement initial, nous utilisons une technique spéciale pour bloquer la résolution de la promesse :

```javascript
it('affiche un état de chargement initial pendant le chargement de la configuration', async () => {
  // Bloquer temporairement la résolution de la promesse
  dataService.getUiConfig.mockImplementation(() => new Promise(() => {}));
  
  render(<StateDisplay type="loading" />);
  
  // Vérifier que l'état de chargement initial est affiché
  expect(screen.getByText('Initialisation...')).toBeInTheDocument();
});
```

### Test des erreurs de chargement

Pour tester le comportement en cas d'erreur, nous simulons une erreur lors du chargement de la configuration :

```javascript
it('utilise la configuration de fallback en cas d\'erreur de chargement', async () => {
  // Simuler une erreur lors du chargement de la configuration
  dataService.getUiConfig.mockRejectedValue(new Error('Erreur de chargement config'));
  
  await act(async () => {
    render(<StateDisplay type="loading" />);
  });
  
  await waitFor(() => {
    expect(screen.queryByText('Chargement test')).not.toBeInTheDocument();
    expect(screen.getByText('Chargement en cours')).toBeInTheDocument();
  });
});
```

## Conseils supplémentaires

- **Toujours exécuter les tests** après avoir modifié les données de test pour s'assurer que tout fonctionne correctement.
- **Utiliser `act()`** pour envelopper les opérations asynchrones comme le rendu des composants et les événements.
- **Utiliser `waitFor()`** pour attendre que des éléments apparaissent dans le DOM.
- **Désactiver les messages d'erreur de console** pendant les tests en utilisant les mocks de `console.error`.
