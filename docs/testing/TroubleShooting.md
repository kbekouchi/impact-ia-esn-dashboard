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
