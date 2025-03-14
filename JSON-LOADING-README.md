# Chargement de fichiers JSON externes

Ce document décrit l'implémentation du chargement de fichiers JSON externes pour le dashboard d'impact de l'IA sur les ESN. Cette fonctionnalité permet de mettre à jour les données sans redéploiement complet du code source.

## Architecture et fonctionnement

### 1. Génération des fichiers JSON

Un script utilitaire `scripts/generateJsonData.js` a été créé pour convertir les données JavaScript en fichiers JSON. Ce script :

- Importe les données depuis les fichiers JS existants
- Crée le répertoire `public/data/` s'il n'existe pas
- Génère plusieurs fichiers JSON dans ce répertoire, un pour chaque type de données :
  - `metiers.json` : Données sur les métiers et leur transformation
  - `tendances.json` : Tendances transversales à tous les métiers
  - `budget.json` : Données sur l'évolution des budgets IT
  - `investissements.json` : Investissements IA des ESN leaders
  - `strategies-leaders.json` : Stratégies des ESN leaders
  - `impact-economique.json` : Impact économique de l'IA
  - `adaptation-strategique.json` : Stratégies d'adaptation
  - `sources.json` : Sources bibliographiques
  - `methodologie.json` : Description de la méthodologie

### 2. Service de données asynchrone

Le service `dataService.js` a été modifié pour charger les données de façon asynchrone depuis les fichiers JSON, avec plusieurs améliorations :

- **Chargement asynchrone** : Les méthodes retournent des Promises qui résolvent avec les données
- **Mécanisme de cache** : Pour éviter de recharger inutilement les mêmes données
- **TTL (Time To Live)** : Le cache expire après 5 minutes
- **Fallback sur données en dur** : En cas d'échec du chargement des fichiers JSON
- **Gestion des erreurs** : Logging des erreurs en console et utilisation du fallback

### 3. Adaptation des composants React

Les composants ont été adaptés pour gérer l'asynchronicité des données :

- Utilisation des hooks `useState` et `useEffect` pour gérer le chargement
- Gestion des états de chargement et d'erreur
- Affichage de spinners pendant le chargement
- Messages d'erreur avec possibilité de réessayer
- Conditionnement du rendu sur la disponibilité des données

## Avantages de cette approche

1. **Mise à jour des données facilitée** : Il suffit de modifier les fichiers JSON sans recompiler l'application
2. **Maintien de la compatibilité** : Le système de fallback assure que l'application fonctionne même en cas de problème
3. **Robustesse accrue** : Gestion des erreurs, des chargements et des états intermédiaires
4. **Expérience utilisateur améliorée** : Indicateurs de chargement explicites
5. **Performance optimisée** : Mise en cache des données pour éviter les requêtes répétitives

## Comment utiliser cette fonctionnalité

### Générer les fichiers JSON

```bash
npm run generate-json
```

Ce script va créer ou mettre à jour tous les fichiers JSON dans le dossier `public/data/`.

### Démarrer l'application avec génération automatique

```bash
npm run dev
```

Ce script génère d'abord les fichiers JSON puis démarre l'application.

### Build avec génération automatique

```bash
npm run build
```

Le script de build a été modifié pour générer automatiquement les fichiers JSON avant la compilation.

## Modification des données

Pour modifier les données :

1. Vous pouvez éditer directement les fichiers JSON dans le dossier `public/data/`
2. Ou vous pouvez modifier les fichiers JavaScript sources et régénérer les JSON

La deuxième approche est recommandée pour conserver une source unique de vérité.

## Évolutions futures

Cette implémentation constitue la Phase 2 du plan de transformation de l'architecture des données. Les prochaines phases pourraient inclure :

- **Phase 3** : Implémentation d'une API simple
- **Phase 4** : Interface d'administration pour modifier les données

Ces phases pourront s'appuyer sur la structure mise en place dans cette implémentation.
