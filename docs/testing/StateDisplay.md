# Tests du composant StateDisplay


Ce document explique les bonnes pratiques pour tester le composant `StateDisplay` et résoudre les problèmes liés aux avertissements React Testing Library concernant les mises à jour d'état non encapsulées dans `act()`.

## Problèmes résolus

Lors des tests du composant `StateDisplay`, nous avons rencontré trois problèmes :

1. L'avertissement "not wrapped in act(...)":

```
Warning: An update to StateDisplay inside a test was not wrapped in act(...)
```

2. L'avertissement de dépréciation pour l'import de `act`:

```
Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.
```

3. Des erreurs de console lors du test du scénario d'erreur:

```
console.error
    Erreur lors du chargement de la configuration StateDisplay: Error: Erreur de chargement config
```

Ces problèmes affectent la clarté des résultats de test et peuvent masquer d'autres problèmes réels.

## Cause des problèmes

1. Le composant `StateDisplay` utilise `useEffect` pour charger la configuration de façon asynchrone via `getUiConfig()`. Dans les tests, ces mises à jour d'état asynchrones n'étaient pas correctement encapsulées, ce qui provoquait des avertissements car React Testing Library n'était pas en mesure de suivre ces changements d'état.

2. L'import de `act` depuis '@testing-library/react' est déprécié, car il utilise en interne la fonction depuis 'react-dom/test-utils' qui est elle-même dépréciée.

3. Le test qui simule une erreur de chargement provoque intentionnellement une erreur lors de l'appel à `getUiConfig()`. Cette erreur est correctement gérée par le composant mais est affichée dans la console, ce qui peut être distrayant lors de l'exécution des tests.

## Solutions

### 1. Pour les mises à jour d'état non encapsulées

La solution consiste à :

1. Envelopper les opérations de rendu dans des appels à `act(async () => {...})`
2. Envelopper les événements comme `fireEvent.click()` dans `act()` lorsqu'ils déclenchent des mises à jour d'état
3. Utiliser des techniques comme `waitFor()` pour attendre la fin des mises à jour asynchrones
4. Ajouter de petits délais à l'intérieur des blocs `act()` pour attendre que les mises à jour asynchrones se terminent

### 2. Pour l'import de `act`

La solution consiste à importer directement depuis 'react-dom/test-utils' (transitoire) ou idéalement de 'react', lorsque la version de React le permet:

```javascript
// Temporairement, utilisez ceci (toujours déprécié mais plus direct):
import { act } from 'react-dom/test-utils';

// Idéalement, lorsque la version de React est mise à jour:
import { act } from 'react';
```

### 3. Pour les erreurs de console lors des tests

La solution consiste à utiliser `jest.spyOn` pour masquer temporairement les erreurs de console pendant les tests où nous nous attendons à ce que des erreurs se produisent:

```javascript
// Dans le beforeEach
jest.spyOn(console, 'error').mockImplementation(() => {});

// Dans le afterEach
console.error.mockRestore();

// Ou spécifiquement dans un test
it('test avec erreur attendue', () => {
  // Masquer temporairement l'erreur de console pendant ce test
  const originalConsoleError = console.error;
  console.error = jest.fn();
  
  // ... test qui génère une erreur ...
  
  // Restaurer console.error
  console.error = originalConsoleError;
});
```

## Bonnes pratiques pour tester des composants avec des opérations asynchrones

1. **Importer `act` depuis la bonne source** : Utilisez `import { act } from 'react-dom/test-utils'` (ou idéalement `import { act } from 'react'` avec les versions plus récentes de React)

2. **Utiliser une expression régulière pour le texte** : Préférez `screen.getByText(/initialisation/i)` au lieu de `screen.getByText('Initialisation...')` pour être plus tolérant aux variations mineures du texte

3. **Contrôler le timing des promesses** : Utilisez des techniques comme la suivante pour contrôler le timing des promesses dans vos tests:

   ```javascript
   let resolvePromise;
   mockService.mockImplementation(() => new Promise(resolve => {
     resolvePromise = resolve;
   }));
   
   // Plus tard, quand vous êtes prêt à résoudre:
   resolvePromise(mockData);
   ```

4. **Attendre que les microtâches se terminent** : Ajoutez une petite attente dans les blocs `act()` pour donner le temps aux microtâches JavaScript de se terminer:

   ```javascript
   await act(async () => {
     render(<Component />);
     // Attendre que les mises à jour asynchrones se terminent
     await new Promise(resolve => setTimeout(resolve, 0));
   });
   ```

5. **Utiliser `waitFor` pour des conditions complexes** : Utilisez `waitFor()` lorsque vous avez besoin d'attendre qu'une condition spécifique soit remplie avant de continuer

6. **Masquer les erreurs de console attendues** : Pour les tests qui vont intentionnellement provoquer des erreurs, masquez les sorties de console pour garder les résultats de test propres:

   ```javascript
   // Avant le test
   jest.spyOn(console, 'error').mockImplementation(() => {});
   
   // Après le test
   console.error.mockRestore();
   ```

7. **Augmenter les timeouts pour les tests complexes** : Pour les tests qui incluent plusieurs opérations asynchrones, augmentez le timeout pour éviter les échecs de test prématurés:

   ```javascript
   await waitFor(() => {
     expect(element).toBeInTheDocument();
   }, { timeout: 2000 }); // Défaut: 1000ms
   ```

## Ressources utiles

- [Documentation Testing Library sur act()](https://testing-library.com/docs/react-testing-library/api/#act)
- [Guide React sur le test avec act()](https://reactjs.org/docs/test-utils.html#act)
- [Problèmes courants avec les tests asynchrones](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)
- [Migration des tests ReactDOM](https://react.dev/warnings/react-dom-test-utils) - Guide officiel pour migrer depuis react-dom/test-utils
- [Documentation Jest sur les mocks](https://jestjs.io/fr/docs/mock-functions)
=======
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
