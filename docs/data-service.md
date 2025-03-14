# Service de Données - Documentation

## Introduction

Le service de données est un composant central de l'architecture de l'application qui fournit un point d'accès unique à toutes les données utilisées dans le dashboard. Cette approche centralise et standardise l'accès aux données, facilitant ainsi la maintenance et l'évolution future vers des sources de données dynamiques.

## Architecture

Le service de données est organisé selon le principe de la "façade" (pattern Façade) :

```
   Components/Pages
         ↑
         ↓
    Data Service API
         ↑
         ↓
    Data Sources
```

- **Composants/Pages** : Consomment les données via l'API du service
- **Data Service API** : Fournit des méthodes standardisées d'accès aux données
- **Data Sources** : Actuellement des fichiers JavaScript statiques, mais à terme pourront être des sources externes (JSON, API, etc.)

## API du Service

Le service expose plusieurs fonctions getters pour récupérer différents types de données :

### Données sur les métiers

```javascript
getMetiersData() // Récupère toutes les données des métiers
getMetiersEtpComparaison() // Récupère les données de comparaison d'ETP
getMetiersProductivity() // Récupère les données de productivité
getDeveloppeurData() // Récupère les données spécifiques aux développeurs
getBusinessAnalystData() // Récupère les données spécifiques aux business analysts
getArchitecteData() // Récupère les données spécifiques aux architectes
getTesteurData() // Récupère les données spécifiques aux testeurs
getTendancesTransversales() // Récupère les tendances transversales à tous les métiers
```

### Données sur les benchmarks économiques

```javascript
getBudgetData() // Récupère les données sur les budgets
getInvestissementsData() // Récupère les données sur les investissements
getStrategiesLeaders() // Récupère les données sur les stratégies des leaders
getImpactEconomique() // Récupère les données sur l'impact économique
getStrategiesEsn() // Récupère les données combinées sur les stratégies et l'impact
getAdaptationStrategique() // Récupère les données sur l'adaptation stratégique
```

### Données sur les sources et la méthodologie

```javascript
getSourcesList() // Récupère la liste des sources
getMethodologie() // Récupère les données sur la méthodologie
```

## Exemples d'utilisation

### Import des fonctions spécifiques

```javascript
import { getMetiersEtpComparaison, getBudgetData } from '../services/dataService';

const MyComponent = () => {
  // Récupération des données via le service
  const etpComparaison = getMetiersEtpComparaison();
  const budgetData = getBudgetData();
  
  // Utilisation des données dans le composant
  return (
    <div>
      {/* Votre composant utilisant etpComparaison et budgetData */}
    </div>
  );
};
```

### Import du service complet

```javascript
import dataService from '../services/dataService';

const MyComponent = () => {
  // Récupération des données via le service
  const metiersData = dataService.getMetiersData();
  
  // Utilisation des données dans le composant
  return (
    <div>
      {/* Votre composant utilisant metiersData */}
    </div>
  );
};
```

## Extension du service

Pour ajouter de nouvelles données au service :

1. Ajoutez les données source dans le dossier approprié sous `src/data/`
2. Importez ces données dans le service de données (`src/services/dataService.js`)
3. Créez une ou plusieurs fonctions getter pour accéder à ces données
4. Ajoutez ces fonctions à l'objet `dataService` exporté

Exemple :

```javascript
// Dans src/data/nouvellesDonnees.js
export const nouvellesDonnees = { /* vos données */ };

// Dans src/services/dataService.js
import { nouvellesDonnees } from '../data/nouvellesDonnees';

// Ajouter la fonction getter
export const getNouvellesDonnees = () => nouvellesDonnees;

// Ajouter la fonction à l'objet exporté
const dataService = {
  // Fonctions existantes...
  getNouvellesDonnees
};
```

## Transition vers la Phase 2

La centralisation des données facilite la transition vers la Phase 2 (chargement de fichiers JSON externes). Les composants continueront à utiliser les mêmes fonctions du service de données, mais l'implémentation interne de ces fonctions changera pour charger les données à partir de fichiers JSON externes plutôt que des importations statiques.

Cela permettra de mettre à jour les données sans modifier le code de l'application, tout en maintenant la compatibilité avec l'interface existante du service.
