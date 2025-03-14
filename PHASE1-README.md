# Phase 1: Centralisation des données statiques

## Description

Cette phase a pour objectif de centraliser l'accès aux données de l'application via un service dédié, afin de faciliter les futures évolutions vers des sources de données dynamiques.

## Modifications apportées

1. **Création d'un service centralisé d'accès aux données**
   - Ajout du répertoire `src/services/`
   - Création du fichier `src/services/dataService.js` qui fournit des fonctions d'accès pour toutes les données

2. **Mise à jour des composants**
   - Les pages ne font plus d'imports directs depuis les fichiers de données
   - Chaque page utilise maintenant le service de données pour récupérer les informations nécessaires

3. **Préparation pour les phases futures**
   - Structure permettant d'ajouter facilement un chargement asynchrone des données
   - Isolation des données du code de l'interface utilisateur

## Pages modifiées

- `Dashboard.js`
- `MetiersTransformation.js`
- `BenchmarksEconomiques.js`
- `StrategieAdaptation.js`
- `Methodologie.js`

## Comment tester

1. Vérifiez que l'application fonctionne exactement comme avant, sans changements visibles pour l'utilisateur
2. Vérifiez que tous les graphiques, tableaux et zones de texte affichent les mêmes données qu'avant

## Avantages de cette approche

- **Découplage** : Les composants ne dépendent plus directement des fichiers de données
- **Maintenance facilitée** : Un point d'accès unique pour toutes les données
- **Évolutivité** : Préparation pour la Phase 2 (données JSON externes) et les phases ultérieures
- **Flexibilité** : Possibilité d'ajouter des traitements sur les données dans le service (ex: formatage, filtrage)

## Étapes suivantes

Après validation de cette phase, vous pourrez passer à la Phase 2 pour externaliser les données dans des fichiers JSON et les charger dynamiquement, sans avoir à modifier les composants.