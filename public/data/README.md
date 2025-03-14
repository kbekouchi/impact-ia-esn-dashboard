# Données Externalisées

Ce répertoire contient tous les fichiers JSON de données externalisées de l'application.

## Structure des fichiers

- `ui-texts.json` : Textes d'interface utilisateur
- `error-messages.json` : Messages d'erreur et textes d'état
- `ui-config.json` : Configuration de l'interface (couleurs, tailles, etc.)
- `charts-config.json` : Configuration des graphiques
- `nav-config.json` : Structure et textes de navigation
- `app-config.json` : Configuration globale
- Données spécifiques aux pages:
  - `dashboard-data.json`
  - `strategy-data.json`
  - `metiers-data.json`
  - etc.

## Mode de fonctionnement

Les données sont chargées dynamiquement par l'application via des appels AJAX depuis le dossier `public/data/`. En cas d'échec de chargement, l'application utilise des valeurs par défaut configurées dans le service de données.
