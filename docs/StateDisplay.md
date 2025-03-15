# Guide d'utilisation du composant StateDisplay

Le composant `StateDisplay` est un composant générique pour afficher les différents états de l'application (chargement, erreur, vide, succès) de manière standardisée et configurable.

## Objectif

Ce composant vise à créer une cohérence visuelle à travers l'application en centralisant la configuration des affichages d'état dans le fichier `ui-config.json`. Il permet de :

- Standardiser l'apparence des états (chargement, erreur, vide, succès)
- Faciliter la personnalisation sans toucher au code
- Réduire la duplication
- Supporter différents thèmes et variations

## Utilisation de base

```jsx
import StateDisplay from '../components/StateDisplay';

// Afficher un état de chargement
<StateDisplay type="loading" />

// Afficher un message d'erreur avec action
<StateDisplay 
  type="error" 
  onAction={() => window.location.reload()} 
/>

// Afficher un état vide avec message personnalisé
<StateDisplay 
  type="empty" 
  message="Aucune donnée disponible pour cette section" 
/>

// Afficher un message de succès avec thème card
<StateDisplay 
  type="success" 
  theme="card" 
  message="Les données ont été enregistrées avec succès" 
/>
```

## Props disponibles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `'loading'` | Type d'état à afficher: `'loading'`, `'error'`, `'empty'`, `'success'` |
| `theme` | string | `'default'` | Thème à utiliser: `'default'`, `'minimal'`, `'card'` |
| `message` | string | - | Message personnalisé (remplace celui par défaut) |
| `title` | string | - | Titre personnalisé (remplace celui par défaut) |
| `onAction` | function | - | Fonction à exécuter lors du clic sur le bouton d'action |
| `actionText` | string | - | Texte du bouton d'action (remplace celui par défaut) |
| `className` | string | `''` | Classes CSS supplémentaires pour le conteneur |

## Configuration

La configuration des états est définie dans le fichier `public/data/ui-config.json` sous la clé `components.stateDisplay`. Elle comprend deux sections principales :

### 1. Thèmes

Chaque thème définit la structure de base et les classes CSS pour les différents éléments :

```json
"themes": {
  "default": {
    "container": "flex flex-col items-center justify-center p-4 rounded-lg min-h-[200px]",
    "iconWrapper": "mb-4",
    "title": "text-lg font-bold mb-2",
    "message": "text-base text-center mb-4",
    "action": "inline-block px-4 py-2 bg-blue-600 text-white..."
  },
  "minimal": {
    // Configuration pour le thème minimal
  },
  "card": {
    // Configuration pour le thème card
  }
}
```

### 2. États

Chaque état (`loading`, `error`, `empty`, `success`) a des configurations spécifiques pour chaque thème :

```json
"states": {
  "loading": {
    "default": {
      "icon": "FaSpinner",
      "iconClass": "animate-spin text-3xl text-blue-600",
      "title": "Chargement en cours",
      "message": "Veuillez patienter pendant le chargement des données.",
      "containerClass": "bg-blue-50"
    },
    "minimal": {
      // Configuration minimale pour le chargement
    },
    "card": {
      // Configuration card pour le chargement
    }
  },
  // Configurations pour "error", "empty" et "success"
}
```

## Exemples d'utilisation

### État de chargement

```jsx
// État de chargement par défaut
<StateDisplay type="loading" />

// État de chargement avec style minimal
<StateDisplay type="loading" theme="minimal" />

// État de chargement avec message personnalisé
<StateDisplay 
  type="loading" 
  message="Chargement des données de l'utilisateur..." 
/>
```

### Message d'erreur

```jsx
// Message d'erreur simple
<StateDisplay type="error" />

// Message d'erreur avec action de rechargement
<StateDisplay 
  type="error" 
  onAction={() => window.location.reload()} 
  actionText="Réessayer" 
/>

// Message d'erreur avec thème card et message personnalisé
<StateDisplay 
  type="error" 
  theme="card" 
  message="Impossible de se connecter au serveur" 
  title="Erreur de connexion" 
/>
```

### État vide

```jsx
// État vide par défaut
<StateDisplay type="empty" />

// État vide avec message et titre personnalisés
<StateDisplay 
  type="empty" 
  title="Aucun résultat" 
  message="Aucun résultat ne correspond à votre recherche" 
/>

// État vide avec action
<StateDisplay 
  type="empty" 
  theme="card" 
  message="Votre panier est vide" 
  onAction={() => navigate('/products')} 
  actionText="Explorer nos produits" 
/>
```

### Message de succès

```jsx
// Message de succès simple
<StateDisplay type="success" />

// Message de succès avec thème card et message personnalisé
<StateDisplay 
  type="success" 
  theme="card" 
  message="Votre commande a été traitée avec succès" 
  title="Commande confirmée" 
/>
```

## Personnalisation

Pour ajouter de nouveaux thèmes ou états, modifiez le fichier `ui-config.json` en suivant la structure existante.

### Ajouter un nouveau thème

1. Ajoutez une nouvelle entrée dans la section `themes`
2. Assurez-vous de définir tous les éléments nécessaires (container, iconWrapper, title, message, action)
3. Mettez à jour chaque état pour inclure des configurations pour ce nouveau thème

### Ajouter un nouvel état

1. Ajoutez une nouvelle entrée dans la section `states`
2. Définissez des configurations pour chaque thème existant
3. Assurez-vous de spécifier l'icône à utiliser

## Bonnes pratiques

- Utilisez `StateDisplay` pour tous les états de chargement, d'erreur, vides et de succès dans l'application
- Personnalisez les messages pour qu'ils soient contextuels et informatifs
- Ajoutez des actions lorsque cela est pertinent pour aider l'utilisateur à résoudre les problèmes
- Utilisez le thème le plus approprié en fonction du contexte (minimal pour les petits espaces, card pour les sections principales)
- Conservez la cohérence en utilisant le même thème pour le même type de contenu

## Dépannage

Si la configuration ne semble pas être appliquée, vérifiez que :

1. Le fichier `ui-config.json` est correctement formaté (JSON valide)
2. La structure de configuration respecte la structure attendue
3. Le service de données est correctement configuré pour charger le fichier
4. Les types et thèmes spécifiés existent dans la configuration

En cas d'erreur de chargement de la configuration, le composant utilise une configuration par défaut fallback.