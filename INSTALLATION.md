# Guide d'installation - Impact IA ESN Dashboard

Ce guide détaille les étapes nécessaires pour installer, configurer et exécuter l'application Impact IA ESN Dashboard sur différents environnements.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (version 14.0.0 ou supérieure)
- **npm** (version 6.0.0 ou supérieure) ou **yarn** (version 1.22.0 ou supérieure)
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)

Vous pouvez vérifier les versions installées avec les commandes suivantes :

```bash
node -v
npm -v
# ou
yarn -v
```

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/kbekouchi/impact-ia-esn-dashboard.git
cd impact-ia-esn-dashboard
```

### 2. Installer les dépendances

Avec npm :

```bash
npm install
```

Ou avec yarn :

```bash
yarn install
```

## Exécution en mode développement

### Démarrer le serveur de développement

```bash
npm start
```

Ou avec yarn :

```bash
yarn start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

Le serveur de développement se rechargera automatiquement lorsque vous apporterez des modifications au code.

## Exécution des tests

```bash
npm test
```

Ou avec yarn :

```bash
yarn test
```

Cette commande lance les tests en mode interactif. Consultez la [documentation officielle de Create React App](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

## Création d'une version de production

Pour construire l'application pour la production :

```bash
npm run build
```

Ou avec yarn :

```bash
yarn build
```

Cette commande compile l'application pour la production dans le répertoire `build/`. Elle optimise la construction pour de meilleures performances, minifie le code et ajoute des hachages aux noms de fichiers.

## Déploiement

### Déploiement sur GitHub Pages

Pour déployer l'application sur GitHub Pages :

1. Ajoutez une entrée `"homepage"` dans votre `package.json` :

```json
"homepage": "https://kbekouchi.github.io/impact-ia-esn-dashboard"
```

2. Installez `gh-pages` :

```bash
npm install --save-dev gh-pages
```

3. Ajoutez les scripts suivants à votre `package.json` :

```json
"scripts": {
  // Autres scripts...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. Déployez l'application :

```bash
npm run deploy
```

### Déploiement sur un serveur web

Les fichiers générés dans le répertoire `build/` sont statiques et peuvent être déployés sur n'importe quel serveur web.

Pour un serveur Apache, copiez simplement les fichiers dans le répertoire racine du serveur web (généralement `/var/www/html/` sur Linux).

Pour Nginx, copiez les fichiers dans le répertoire défini dans la directive `root` de votre configuration de serveur.

### Utilisation de conteneurs Docker

Vous pouvez également conteneuriser l'application avec Docker :

1. Créez un fichier `Dockerfile` à la racine du projet :

```Dockerfile
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Construisez l'image Docker :

```bash
docker build -t impact-ia-esn-dashboard .
```

3. Exécutez le conteneur :

```bash
docker run -p 8080:80 impact-ia-esn-dashboard
```

L'application sera accessible à l'adresse [http://localhost:8080](http://localhost:8080).

## Résolution des problèmes courants

### Problème : L'application ne se lance pas correctement

**Solution :** Vérifiez que les dépendances sont correctement installées :

```bash
rm -rf node_modules
npm install
```

### Problème : Erreurs de compilation

**Solution :** Vérifiez que vous utilisez une version compatible de Node.js.

### Problème : Les graphiques ne s'affichent pas

**Solution :** Assurez-vous que la bibliothèque Recharts est correctement installée :

```bash
npm install recharts --save
```

## Ressources additionnelles

- [Documentation officielle de React](https://reactjs.org/docs/getting-started.html)
- [Documentation de Recharts](https://recharts.org/en-US/api)
- [Documentation de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation de React Router](https://reactrouter.com/web/guides/quick-start)

## Support

Si vous rencontrez des problèmes lors de l'installation ou de l'utilisation de l'application, veuillez créer une issue sur le dépôt GitHub.
