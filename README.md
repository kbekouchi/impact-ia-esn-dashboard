# Impact IA ESN Dashboard

Dashboard stratégique présentant l'impact de l'IA générative et agentique sur les métiers des ESN et l'évolution nécessaire de leur modèle d'affaires.

## Fonctionnalités

- Visualisation de l'impact de l'IA sur différents métiers des ESN
- Benchmarks économiques et évolution des budgets IT face à l'IA
- Analyse détaillée de l'impact sur les architectes
- Stratégies d'adaptation recommandées
- Comparaison de productivité entre l'IA et le développement humain
- Affichages d'état configurables (chargement, erreur, vide, succès)

## Structure du projet

Le projet est structuré comme suit :

```
/
├── public/
│   ├── data/         # Fichiers JSON externalisés
│   │   ├── app-config.json
│   │   ├── charts-config.json
│   │   ├── dashboard-data.json
│   │   ├── error-messages.json
│   │   ├── nav-config.json
│   │   ├── ui-config.json
│   │   └── ui-texts.json
│   └── index.html
├── src/
│   ├── components/   # Composants réutilisables
│   │   ├── StateDisplay.js  # Composant d'affichage d'état configurable
│   │   ├── InfoCard.js
│   │   └── StatCard.js
│   ├── data/         # Fichiers de données (fallback)
│   ├── pages/        # Pages de l'application
│   ├── services/     # Services d'accès aux données
│   └── App.js        # Point d'entrée de l'application
├── docs/             # Documentation du projet
│   └── StateDisplay.md  # Guide d'utilisation des affichages d'état
└── scripts/
    └── generateJsonData.js  # Script de génération des fichiers JSON
```

## Architecture des données

L'application utilise une architecture de données externalisées pour faciliter la maintenance et les mises à jour. Toutes les données sont chargées dynamiquement à partir des fichiers JSON dans le dossier `public/data/`.

- **Configuration de l'interface** : `ui-config.json` et `ui-texts.json`
- **Configuration de navigation** : `nav-config.json`
- **Données spécifiques aux pages** : `dashboard-data.json`, etc.
- **Messages d'erreur** : `error-messages.json`
- **Configuration des graphiques** : `charts-config.json`
- **Configuration des affichages d'état** : Section dans `ui-config.json`

En cas d'échec de chargement des fichiers JSON, l'application dispose d'un mécanisme de fallback sur les données en dur définies dans le dossier `src/data/`.

## Composants réutilisables

### StateDisplay

Le composant `StateDisplay` permet d'afficher de manière cohérente les différents états de l'application (chargement, erreur, vide, succès). Son apparence est entièrement configurable via `ui-config.json`.

```jsx
// Exemple d'utilisation
import StateDisplay from '../components/StateDisplay';

// Affichage d'un état de chargement
<StateDisplay type="loading" />

// Affichage d'une erreur avec action
<StateDisplay 
  type="error" 
  theme="card"
  onAction={() => window.location.reload()} 
/>

// Affichage d'un état vide avec message personnalisé
<StateDisplay 
  type="empty" 
  message="Aucune donnée disponible pour cette section" 
/>
```

Pour plus de détails, consultez la [documentation complète](./docs/StateDisplay.md).

## Génération des fichiers JSON

Pour générer ou mettre à jour les fichiers JSON à partir des données en dur :

```bash
npm run generate-json
```

Ce script analyse le code source pour extraire les textes d'interface, les configurations et les données, puis génère les fichiers JSON correspondants dans le dossier `public/data/`.

## Extension des fonctionnalités

Pour ajouter une nouvelle page ou fonctionnalité :

1. Créer le composant de page correspondant dans `src/pages/`
2. Ajouter les textes et configurations dans les fichiers JSON appropriés
3. Ajouter la route dans `app-config.json`
4. Mettre à jour le service de données pour charger les nouvelles données

## Développement

### Prérequis

- Node.js 14+
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/kbekouchi/impact-ia-esn-dashboard.git
cd impact-ia-esn-dashboard

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).
