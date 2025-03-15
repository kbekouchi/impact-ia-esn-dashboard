# Guide des tests automatisés

Ce document explique comment fonctionnent les tests automatisés dans ce projet et comment les modifier.

## Structure des tests

Les tests sont organisés par composant dans des fichiers séparés dans le dossier `src/components/__tests__/`. Chaque fichier de test suit le nommage `ComponentName.test.js`.

## Technologies utilisées

- **Jest** : Framework de test principal
- **React Testing Library** : Bibliothèque pour tester les composants React
- **jest-dom** : Extensions de Jest pour tester le DOM

## Configuration de l'environnement de test

L'environnement de test est configuré dans le fichier `src/setupTests.js`. Ce fichier importe automatiquement les matchers personnalisés de `@testing-library/jest-dom` pour tous les tests.

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';
```

## Exécution des tests

Pour exécuter les tests :

```bash
npm test
```

Pour exécuter un test spécifique :

```bash
npm test -- ComponentName
```

## Structure d'un fichier de test

Voici la structure typique d'un fichier de test :

```javascript
// Imports
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from '../Component';

// Mocks des dépendances
jest.mock('../../services/someService', () => ({
  someFunction: jest.fn()
}));

// Suite de tests
describe('Component Name', () => {
  // Configuration avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // Tests individuels
  it('devrait faire quelque chose', () => {
    render(<Component />);
    expect(screen.getByText('Texte attendu')).toBeInTheDocument();
  });
});
```