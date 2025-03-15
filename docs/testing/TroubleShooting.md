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
