# Bonnes pratiques pour les tests React

Ce document présente les bonnes pratiques à suivre pour éviter les problèmes courants lors de l'écriture de tests pour les composants React.

## Configuration de l'environnement de test

### 1. Configuration correcte de Jest avec React Testing Library

Assurez-vous que votre fichier `setupTests.js` importe correctement les extensions nécessaires :

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';
```

### 2. Import des matchers dans les fichiers de test

En plus de la configuration globale, il est recommandé d'importer explicitement les matchers dans chaque fichier de test pour une meilleure robustesse :

```javascript
import '@testing-library/jest-dom';
```

## Test des composants avec des états asynchrones

### 1. Utilisation correcte de `act()`

React recommande d'utiliser `act()` pour envelopper les opérations qui causent des mises à jour d'état :

```javascript
import { act } from '@testing-library/react';

it('test avec des mises à jour d\'état', async () => {
  await act(async () => {
    render(<MonComposant />);
  });
  
  // Vérifications...
});
```

### 2. Test des états transitoires

Pour tester des états qui n'apparaissent que temporairement (comme les écrans de chargement), vous pouvez bloquer la résolution des promesses :

```javascript
it('affiche un indicateur de chargement', () => {
  // Empêcher la résolution de la promesse
  someService.fetchData.mockImplementation(() => new Promise(() => {}));
  
  render(<MonComposant />);
  
  // Vérifier l'état de chargement
  expect(screen.getByText('Chargement...')).toBeInTheDocument();
});
```

### 3. Attendre que des éléments apparaissent avec `waitFor()`

Pour les éléments qui apparaissent après une opération asynchrone :

```javascript
await waitFor(() => {
  expect(screen.getByText('Données chargées')).toBeInTheDocument();
});
```

## Éviter les erreurs dans la console pendant les tests

### 1. Mock de console.error

Pour les tests qui provoquent intentionnellement des erreurs, mockez `console.error` :

```javascript
let originalConsoleError;

beforeAll(() => {
  originalConsoleError = console.error;
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

it('gère correctement les erreurs', async () => {
  // Test qui génère des erreurs...
  
  // Vérifier que l'erreur a été journalisée
  expect(console.error).toHaveBeenCalledWith(
    expect.stringContaining('message d\'erreur attendu'),
    expect.any(Error)
  );
});
```

## Pièges courants à éviter

### 1. Expression régulière trop générique

Évitez les expressions régulières trop génériques qui pourraient correspondre à plusieurs éléments :

```javascript
// Problématique - pourrait correspondre à plusieurs éléments
expect(screen.getByText(/chargement/i)).toBeInTheDocument();

// Préférable - plus spécifique
expect(screen.getByText('Chargement en cours')).toBeInTheDocument();

// Alternative avec regex plus précise
expect(screen.getByText(/^Chargement en cours$/)).toBeInTheDocument();
```

### 2. Réactions aux warnings React

Ne négligez pas les avertissements React concernant les mises à jour d'état non enveloppées dans `act()`. Ces avertissements indiquent souvent des problèmes potentiels dans vos tests.

### 3. Tests fragiles dépendant de l'ordre d'exécution

Évitez de créer des tests qui dépendent de l'ordre d'exécution ou de l'état global. Chaque test devrait être indépendant.

## Debugging des tests

### 1. Visualiser le DOM rendu

Pour déboguer les problèmes de sélection d'éléments, affichez le DOM rendu :

```javascript
console.log(prettyDOM(container));
```

### 2. Vérifier les éléments disponibles

Si vous ne trouvez pas un élément, vérifiez tous les éléments disponibles :

```javascript
console.log(screen.debug());
```

### 3. Augmenter le timeout pour les tests asynchrones

Pour les tests qui prennent plus de temps :

```javascript
jest.setTimeout(10000); // Augmente le timeout à 10 secondes
```
