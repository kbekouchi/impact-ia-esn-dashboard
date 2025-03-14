# Guide du Développeur

## Introduction

Ce guide est destiné aux développeurs travaillant sur le dashboard d'impact de l'IA sur les ESN. Il présente les bonnes pratiques à suivre, les conventions de code, et comment utiliser efficacement l'architecture mise en place.

## Architecture générale

L'application est structurée selon le modèle suivant :

```
Impact-IA-ESN-Dashboard/
├── docs/                    # Documentation technique
├── public/                  # Ressources statiques accessibles publiquement
├── src/                     # Code source de l'application
│   ├── components/          # Composants réutilisables
│   ├── data/                # Données sources (actuellement statiques, futurement JSON)
│   ├── pages/               # Composants de pages complètes
│   ├── services/            # Services d'application (dont le service de données)
│   ├── App.js               # Composant racine
│   └── index.js             # Point d'entrée de l'application
├── .gitignore               # Fichiers ignorés par git
├── package.json            # Dépendances et scripts
└── README.md               # Documentation générale
```

## Utilisation du Service de Données

Suite à la Phase 1 (Centralisation des données), toutes les données sont accessibles via le service de données (`src/services/dataService.js`). **N'importez jamais directement les fichiers de données** depuis le dossier `src/data/`.

### Bonnes pratiques

1. **Import des fonctions nécessaires uniquement** :

```javascript
// Bon : Import uniquement des fonctions nécessaires
import { getMetiersEtpComparaison, getBudgetData } from '../services/dataService';

// Éviter : Import de tout le service si vous n'utilisez que quelques fonctions
import dataService from '../services/dataService';
```

2. **Récupération des données au niveau du composant parent** :

```javascript
// Bon : Récupération au niveau du composant parent et passage aux enfants via props
const ParentComponent = () => {
  const metiersData = getMetiersData();
  
  return (
    <div>
      <ChildComponent data={metiersData} />
      <AnotherChild data={metiersData} />
    </div>
  );
};
```

3. **Structuration des imports** :

```javascript
// Imports React et librairies externes
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imports des composants locaux
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';

// Imports des services
import { getMetiersData, getBudgetData } from '../services/dataService';
```

## Ajout de Nouvelles Données

Pour ajouter de nouvelles données à l'application :

1. **Ajout des données sources** :
   - Ajoutez les données dans le fichier approprié sous `src/data/` ou créez un nouveau fichier
   - Exportez les données en utilisant `export const`

2. **Extension du service de données** :
   - Importez les nouvelles données dans `src/services/dataService.js`
   - Créez une fonction getter pour ces données
   - Ajoutez cette fonction à l'objet `dataService` exporté

3. **Utilisation dans les composants** :
   - Importez la nouvelle fonction getter dans vos composants
   - Récupérez et utilisez les données comme d'habitude

### Exemple d'ajout de nouvelles données

```javascript
// 1. Dans src/data/nouvellesDonnees.js
export const nouvellesDonnees = {
  // Vos données ici
};

// 2. Dans src/services/dataService.js
import { nouvellesDonnees } from '../data/nouvellesDonnees';

export const getNouvellesDonnees = () => nouvellesDonnees;

const dataService = {
  // Fonctions existantes...
  getNouvellesDonnees
};

// 3. Dans votre composant
import { getNouvellesDonnees } from '../services/dataService';

const MonComposant = () => {
  const donnees = getNouvellesDonnees();
  
  // Utilisation des données
};
```

## Préparation à la Phase 2

La Phase 2 (Chargement de fichiers JSON externes) changera la façon dont les données sont chargées, mais maintiendra la même interface de service. Pour préparer vos composants à cette transition :

1. **Respectez strictement l'interface du service de données** : N'accédez jamais directement aux propriétés spécifiques des données qui pourraient changer

2. **Soyez prêt pour l'asynchronicité** : Les fonctions du service passeront d'un retour synchrone à un retour asynchrone. Préparez vos composants à gérer les états de chargement et les erreurs :

```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      // En Phase 2, ces fonctions deviendront asynchrones
      const result = await getMetiersData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

if (loading) return <div>Chargement...</div>;
if (error) return <div>Erreur : {error.message}</div>;
```

## Conventions de Code

- **Nommage** : Utilisez camelCase pour les variables et fonctions, PascalCase pour les composants
- **Composants** : Préférez les composants fonctionnels avec hooks
- **Données** : Toujours accéder aux données via le service de données
- **Styles** : Utilisez les classes Tailwind CSS selon les conventions du projet
- **Commentaires** : Documentez les fonctions complexes et les décisions architecturales importantes

## Ressources

- [Documentation du service de données](./data-service.md)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org/en-US/api)
