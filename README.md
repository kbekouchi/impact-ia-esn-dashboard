
// Ceci est juste pour permettre la fusion (il n'y a pas de fonction directe de fusion PR)
=======
# Impact de l'IA sur les ESN - Dashboard

Dashboard interactif présentant l'impact de l'IA sur les métiers des ESN et l'évolution nécessaire du modèle d'affaires.

## Architecture de l'application

Cette application est construite avec React et utilise les technologies suivantes :

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur
- **React Router** : Gestion des routes et de la navigation
- **Tailwind CSS** : Framework CSS utilitaire pour le style
- **Recharts** : Bibliothèque de visualisation de données pour React
- **Axios** : Client HTTP pour effectuer des requêtes API

L'application est organisée selon les principes suivants :

1. **Composants réutilisables** : Dans le dossier `src/components`
2. **Pages** : Dans le dossier `src/pages`
3. **Services** : Dans le dossier `src/services` (pour les appels API et la logique métier)
4. **Données** : Dans le dossier `src/data` (pour les données statiques ou simulées)

## Documentation

- [Documentation des tests](./docs/testing/index.md) - Guide complet sur les tests automatisés

## Gestion des données

Les données sont gérées de plusieurs façons :

1. **Données statiques** : Importées directement depuis les fichiers JSON dans `src/data`
2. **Données simulées** : Générées dynamiquement avec le script `scripts/generateJsonData.js`
3. **Données d'API** : Récupérées via les services dans `src/services`

## Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage de l'application en mode développement
npm start

# Construction pour la production
npm run build

# Exécution des tests
npm test

# Génération des données de test
npm run generate-json
```

## Structure des dossiers

```
impact-ia-esn-dashboard/
├── public/               # Fichiers statiques et index.html
├── src/                  # Code source
│   ├── components/       # Composants React réutilisables
│   ├── data/             # Données statiques et mocks
│   ├── pages/            # Composants de page
│   ├── services/         # Services pour les appels API
│   ├── utils/            # Fonctions utilitaires
│   ├── App.js            # Composant principal
│   ├── index.js          # Point d'entrée
│   └── setupTests.js     # Configuration des tests
├── scripts/              # Scripts utilitaires
└── package.json          # Dépendances et scripts npm
```

## Contribution

Toute contribution est la bienvenue. Veuillez ouvrir une issue pour discuter des modifications importantes avant de soumettre une pull request.

