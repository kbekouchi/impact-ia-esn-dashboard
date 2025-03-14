# Documentation du composant StateDisplay

Le composant `StateDisplay` fournit un moyen standardisé et configurable d'afficher les différents états de l'interface utilisateur (chargement, erreur, vide, succès) dans toute l'application.

## Objectif

Uniformiser et centraliser la configuration des affichages d'état pour garantir une expérience utilisateur cohérente tout en facilitant les modifications sans toucher au code.

## Configuration

La configuration du composant est stockée dans le fichier `public/data/ui-config.json` sous la clé `components.stateDisplay`. Cette configuration inclut :

- Des styles de conteneur
- Des configurations pour chaque type d'état (loading, error, empty, success)
- Des thèmes alternatifs (minimal, card) pour différents contextes d'affichage

## Utilisation de base

```jsx
import StateDisplay from '../components/StateDisplay';

// Affichage d'un état de chargement
<StateDisplay state="loading" />

// Affichage d'un message d'erreur avec action
<StateDisplay 
  state="error" 
  onAction={() => handleRetry()} 
/>

// Affichage d'un état vide
<StateDisplay state="empty" />

// Affichage d'un message de succès
<StateDisplay state="success" />
```

## Propriétés (Props)

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `state` | string | 'loading' | État à afficher ('loading', 'error', 'empty', 'success') |
| `message` | string | - | Message personnalisé (remplace celui configuré) |
| `title` | string | - | Titre personnalisé (remplace celui configuré) |
| `onAction` | function | - | Fonction à exécuter lorsque l'utilisateur clique sur le bouton d'action |
| `fullHeight` | boolean | true | Si vrai, prend toute la hauteur disponible |
| `theme` | string | 'default' | Thème à utiliser ('default', 'minimal', 'card') |

## Thèmes disponibles

### Thème par défaut
Affichage standard pour les états principaux, avec icône, titre, message et éventuellement une action.

### Thème minimal
Version compacte pour les espaces limités, idéal pour être intégré dans d'autres composants.

```jsx
<StateDisplay state="loading" theme="minimal" fullHeight={false} />
```

### Thème card
Affichage avec fond blanc et ombre portée, adapté pour les sections principales.

```jsx
<StateDisplay state="error" theme="card" />
```

## Personnalisation via la configuration

Pour modifier l'apparence des affichages d'état, vous pouvez éditer le fichier `public/data/ui-config.json`. Voici un exemple de modification :

```json
"stateDisplay": {
  "states": {
    "loading": {
      "icon": {
        "color": "text-indigo-600"  // Changer la couleur du spinner
      },
      "text": {
        "classes": "text-gray-600 font-semibold"  // Modifier le style du texte
      }
    }
  }
}
```

## Gestion des messages

Les messages affichés sont chargés depuis le fichier `public/data/error-messages.json`. Vous pouvez modifier ces messages sans toucher au code.

## Exemples d'utilisation

### Dans une page lors du chargement des données

```jsx
// Dans une page ou un composant
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchSomeData();
      setData(result);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

if (loading) {
  return <StateDisplay state="loading" />;
}

if (error) {
  return <StateDisplay state="error" onAction={() => window.location.reload()} />;
}

if (data.length === 0) {
  return <StateDisplay state="empty" />;
}

// Rendu normal avec les données...
```

### Dans un conteneur avec le thème minimal

```jsx
<InfoCard title="Données importantes">
  {isLoading ? (
    <StateDisplay state="loading" theme="minimal" fullHeight={false} />
  ) : data.length === 0 ? (
    <StateDisplay state="empty" theme="minimal" fullHeight={false} />
  ) : (
    // Contenu normal
  )}
</InfoCard>
```

## Icônes disponibles

Le composant utilise `react-icons/fa` pour les icônes. Les types d'icônes suivants sont configurés :

- `spinner` - FaSpinner (pour l'état de chargement)
- `exclamation-triangle` - FaExclamationTriangle (pour les erreurs)
- `exclamation` - FaExclamation (pour les avertissements)
- `check-circle` - FaCheckCircle (pour les succès)
- `folder-open` - FaFolderOpen (pour les états vides)

## Extension

Pour ajouter de nouveaux états ou thèmes, modifiez les fichiers suivants :

1. `public/data/ui-config.json` - Ajoutez la configuration pour le nouvel état
2. `public/data/error-messages.json` - Ajoutez les messages correspondants
3. `src/components/StateDisplay.js` - Si nécessaire, ajoutez la prise en charge des nouvelles icônes