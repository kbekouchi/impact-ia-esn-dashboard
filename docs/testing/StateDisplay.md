# Tests du composant StateDisplay

Ce document explique les bonnes pratiques pour tester le composant `StateDisplay` et résoudre les problèmes liés aux avertissements React Testing Library concernant les mises à jour d'état non encapsulées dans `act()`.

## Problème résolu

Lors des tests du composant `StateDisplay`, nous avons rencontré l'avertissement suivant :

```
Warning: An update to StateDisplay inside a test was not wrapped in act(...)
```

Cet avertissement se produit lorsque React effectue des mises à jour d'état pendant les tests qui ne sont pas correctement gérées dans la configuration du test.

## Cause du problème

Le composant `StateDisplay` utilise `useEffect` pour charger la configuration de façon asynchrone via `getUiConfig()`. Dans les tests, ces mises à jour d'état asynchrones n'étaient pas correctement encapsulées, ce qui provoquait des avertissements car React Testing Library n'était pas en mesure de suivre ces changements d'état.

## Solution

La solution consiste à :

1. Importer explicitement `act` depuis `@testing-library/react`
2. Envelopper les opérations de rendu dans des appels à `act(async () => {...})`
3. Envelopper les événements comme `fireEvent.click()` dans `act()` lorsqu'ils déclenchent des mises à jour d'état
4. Utiliser des techniques comme `waitFor()` pour attendre la fin des mises à jour asynchrones

### Exemple

```javascript
// Avant
it('affiche un état de chargement initial pendant le chargement de la configuration', () => {
    render(<StateDisplay type="loading" />);
    expect(screen.getByText('Initialisation...')).toBeInTheDocument();
});

// Après
it('affiche un état de chargement initial pendant le chargement de la configuration', async () => {
    await act(async () => {
        render(<StateDisplay type="loading" />);
    });
    
    expect(screen.getByText('Initialisation...')).toBeInTheDocument();
});
```

## Bonnes pratiques pour tester des composants avec des opérations asynchrones

1. Toujours envelopper les opérations de rendu dans `act()` lorsque le composant effectue des opérations asynchrones
2. Préférer la syntaxe `async/await` avec `act(async () => {...})` pour une meilleure lisibilité
3. Mocker les services externes qui renvoient des promesses pour contrôler le flux d'exécution des tests
4. Utiliser `waitFor()` pour attendre que certaines conditions soient remplies avant de continuer
5. Éviter les tests qui dépendent du timing exact des opérations asynchrones, ce qui peut rendre les tests instables

## Ressources utiles

- [Documentation Testing Library sur act()](https://testing-library.com/docs/react-testing-library/api/#act)
- [Guide React sur le test avec act()](https://reactjs.org/docs/test-utils.html#act)
- [Problèmes courants avec les tests asynchrones](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)
