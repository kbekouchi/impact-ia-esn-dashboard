# Guide de dépannage pour les tests React

Ce document explique comment résoudre les problèmes courants rencontrés lors de l'écriture et de l'exécution des tests React.

## Problème : `toBeInTheDocument is not a function`

### Symptômes
```
TypeError: expect(...).toBeInTheDocument is not a function
```

### Causes
Ce problème se produit lorsque les matchers personnalisés de `@testing-library/jest-dom` ne sont pas correctement configurés.

### Solutions

1. **Vérifier le fichier setupTests.js**

   Assurez-vous que vous avez un fichier `src/setupTests.js` avec le contenu suivant :
   ```javascript
   import '@testing-library/jest-dom';
   ```

2. **Ajouter l'import dans le fichier de test**

   Ajoutez également l'import directement dans votre fichier de test pour plus de robustesse :
   ```javascript
   import '@testing-library/jest-dom';
   ```

3. **Vérifier les dépendances**

   Assurez-vous que `@testing-library/jest-dom` est correctement installé :
   ```bash
   npm install --save-dev @testing-library/jest-dom
   ```

## Problème : `Found multiple elements with the text: /pattern/i`

### Symptômes
```
Found multiple elements with the text: /chargement/i

Here are the matching elements:
<h3>Chargement en cours</h3>
<p>Veuillez patienter pendant le chargement des données.</p>
```

### Causes
Ce problème se produit lorsque vous utilisez une expression régulière qui correspond à plusieurs éléments dans le DOM.

### Solutions

1. **Utiliser un texte exact au lieu d'une expression régulière**

   ```javascript
   // Au lieu de
   expect(screen.getByText(/chargement/i)).toBeInTheDocument();
   
   // Utilisez
   expect(screen.getByText('Chargement en cours')).toBeInTheDocument();
   ```

2. **Utiliser une expression régulière plus précise**

   ```javascript
   expect(screen.getByText(/^Chargement en cours$/)).toBeInTheDocument();
   ```

3. **Utiliser getAllByText si vous voulez sélectionner plusieurs éléments**

   ```javascript
   const elements = screen.getAllByText(/chargement/i);
   expect(elements.length).toBe(2);
   ```

## Problème : `Warning: An update to Component inside a test was not wrapped in act(...)`

### Symptômes
```
Warning: An update to StateDisplay inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser.
```

### Causes
Ce problème se produit lorsque des mises à jour d'état React se produisent en dehors d'un bloc `act()`. React attend que toutes les mises à jour d'état soient enveloppées dans `act()` pour garantir que les tests reflètent fidèlement ce que l'utilisateur verrait.

### Solutions

1. **Envelopper le rendu des composants avec act()**

   ```javascript
   import { act } from '@testing-library/react';
   
   it('test something', async () => {
     await act(async () => {
       render(<MyComponent />);
     });
     
     // Assertions...
   });
   ```

2. **Envelopper les événements avec act()**

   ```javascript
   const button = screen.getByText('Cliquez-moi');
   
   await act(async () => {
     fireEvent.click(button);
   });
   ```

3. **Pour les états de chargement transitoires**

   Si vous voulez tester un état qui n'apparaît que pendant le chargement, vous pouvez bloquer la résolution des promesses :
   
   ```javascript
   // Empêcher la résolution de la promesse
   service.fetchData.mockImplementation(() => new Promise(() => {}));
   
   render(<MyComponent />);
   
   // L'état de chargement restera visible
   expect(screen.getByText('Chargement...')).toBeInTheDocument();
   ```

## Problème : Messages d'erreur dans la console pendant les tests

### Symptômes
```
console.error
  Erreur lors du chargement de la configuration: Error: Erreur de chargement config
```

### Causes
Des erreurs dans la console peuvent être attendues dans certains tests, par exemple lorsque vous testez le comportement en cas d'erreur.

### Solutions

1. **Utiliser un mock pour console.error**

   ```javascript
   let originalConsoleError;
   
   beforeAll(() => {
     originalConsoleError = console.error;
     console.error = jest.fn();
   });
   
   afterAll(() => {
     console.error = originalConsoleError;
   });
   ```

2. **Vérifier que l'erreur a été correctement journalisée**

   ```javascript
   expect(console.error).toHaveBeenCalledWith(
     'Erreur lors du chargement de la configuration:',
     expect.any(Error)
   );
   ```

## Ressources supplémentaires

- [React Testing Library - Documentation officielle](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM - Documentation officielle](https://github.com/testing-library/jest-dom)
- [Guide React sur les tests avec act()](https://reactjs.org/docs/test-utils.html#act)
- [Guide de Kent C. Dodds sur les tests React](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)