# Tests du composant StateDisplay

Ce document explique les bonnes pratiques pour tester le composant `StateDisplay` et résoudre les problèmes liés aux avertissements React Testing Library concernant les mises à jour d'état non encapsulées dans `act()`.

## Problèmes résolus

Lors des tests du composant `StateDisplay`, nous avons rencontré deux problèmes :

1. L'avertissement "not wrapped in act(...)":

```
Warning: An update to StateDisplay inside a test was not wrapped in act(...)
```

2. L'avertissement de dépréciation pour l'import de `act`:

```
Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.
```

Ces avertissements se produisent lorsque React effectue des mises à jour d'état pendant les tests qui ne sont pas correctement gérées dans la configuration du test ou lorsqu'on utilise des API dépréciées.

## Cause des problèmes

1. Le composant `StateDisplay` utilise `useEffect` pour charger la configuration de façon asynchrone via `getUiConfig()`. Dans les tests, ces mises à jour d'état asynchrones n'étaient pas correctement encapsulées, ce qui provoquait des avertissements car React Testing Library n'était pas en mesure de suivre ces changements d'état.

2. L'import de `act` depuis '@testing-library/react' est déprécié, car il utilise en interne la fonction depuis 'react-dom/test-utils' qui est elle-même dépréciée.

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

### Exemple de correctifs

```javascript
// Avant
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

it('affiche un état de chargement initial pendant le chargement de la configuration', () => {
    render(<StateDisplay type="loading" />);
    expect(screen.getByText('Initialisation...')).toBeInTheDocument();
});

// Après
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

it('affiche un état de chargement initial pendant le chargement de la configuration', async () => {
    // Bloquer la résolution de la promesse pour maintenir l'état de chargement
    let resolvePromise;
    dataService.getUiConfig.mockImplementation(() => new Promise(resolve => {
      resolvePromise = resolve; // On ne résout pas immédiatement la promesse
    }));
    
    // Utiliser act pour envelopper l'opération de rendu
    await act(async () => {
      render(<StateDisplay type="loading" />);
    });
    
    // Pendant que la promesse n'est pas résolue, on devrait voir l'état initial
    expect(screen.getByText(/initialisation/i)).toBeInTheDocument();
}
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

## Ressources utiles

- [Documentation Testing Library sur act()](https://testing-library.com/docs/react-testing-library/api/#act)
- [Guide React sur le test avec act()](https://reactjs.org/docs/test-utils.html#act)
- [Problèmes courants avec les tests asynchrones](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)
- [Migration des tests ReactDOM](https://react.dev/warnings/react-dom-test-utils) - Guide officiel pour migrer depuis react-dom/test-utils
