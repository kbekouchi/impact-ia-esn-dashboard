/**
 * Script de génération des fichiers JSON à partir des données en dur du code source
 * 
 * Ce script extrait les données en dur du code source et génère les fichiers JSON
 * correspondants dans le dossier public/data.
 * 
 * Utilisation: 
 * node scripts/generateJsonData.js
 */

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Chemin vers le dossier public/data
const DATA_DIR = path.join(__dirname, '../public/data');

// Assurons-nous que le dossier existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Fonction pour formater le JSON avec prettier
async function formatJson(json) {
  try {
    return await prettier.format(JSON.stringify(json, null, 2), { parser: 'json' });
  } catch (error) {
    console.error('Erreur lors du formatage JSON:', error);
    return JSON.stringify(json, null, 2);
  }
}

// Fonction pour écrire un fichier JSON
async function writeJsonFile(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const formattedJson = await formatJson(data);
    fs.writeFileSync(filePath, formattedJson);
    console.log(`Fichier créé: ${filePath}`);
  } catch (error) {
    console.error(`Erreur lors de l'écriture du fichier ${filename}:`, error);
  }
}

// Extraction des données du fichier Layout.js pour nav-config.json
async function generateNavConfig() {
  try {
    const layoutPath = path.join(__dirname, '../src/components/Layout.js');
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    // Extraction du titre et sous-titre de l'application
    const appTitleMatch = layoutContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    const appSubtitleMatch = layoutContent.match(/<p[^>]*>(.*?)<\/p>/);
    
    const appTitle = appTitleMatch ? appTitleMatch[1].trim() : 'Impact IA ESN';
    const appSubtitle = appSubtitleMatch ? appSubtitleMatch[1].trim() : 'Dashboard stratégique';
    
    // Extraction des éléments de menu
    const menuItemsRegex = /<NavLink[^>]*to="([^"]*)"[^>]*>\s*<([^\s>]*)[^>]*\/>\s*<span>(.*?)<\/span>\s*<\/NavLink>/g;
    const menuItems = [];
    
    let match;
    while ((match = menuItemsRegex.exec(layoutContent)) !== null) {
      const path = match[1];
      const icon = match[2];
      const label = match[3].trim();
      
      menuItems.push({
        id: path.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'dashboard',
        path,
        label,
        icon,
        isExact: path === '/'
      });
    }
    
    const navConfig = {
      appTitle,
      appSubtitle,
      menuItems
    };
    
    await writeJsonFile('nav-config.json', navConfig);
  } catch (error) {
    console.error('Erreur lors de la génération de nav-config.json:', error);
  }
}

// Génération des données UI des pages à partir des fichiers de pages
async function generateUiTexts() {
  try {
    const pagesDir = path.join(__dirname, '../src/pages');
    const pageFiles = fs.readdirSync(pagesDir);
    
    const uiTexts = {
      pages: {},
      components: {
        tooltips: {},
        errors: {
          dataLoad: "Une erreur est survenue lors du chargement des données.",
          retry: "Réessayer",
          noData: "Aucune donnée disponible."
        },
        statCards: {},
        charts: {}
      }
    };
    
    for (const pageFile of pageFiles) {
      if (!pageFile.endsWith('.js')) continue;
      
      const pageName = pageFile.replace('.js', '');
      const pagePath = path.join(pagesDir, pageFile);
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // Extraction du titre et de la description
      const titleMatch = pageContent.match(/<h1[^>]*>(.*?)<\/h1>/);
      const descriptionMatch = pageContent.match(/<p[^>]*class="[^"]*text-gray-600[^"]*"[^>]*>(.*?)<\/p>/);
      
      uiTexts.pages[pageName.charAt(0).toLowerCase() + pageName.slice(1)] = {
        title: titleMatch ? titleMatch[1].trim() : pageName,
        description: descriptionMatch ? descriptionMatch[1].trim() : ''
      };
      
      // Pour la page Dashboard, extraire plus d'informations
      if (pageName === 'Dashboard') {
        // Extraction des titres et descriptions des sections
        const statCardsMatch = pageContent.match(/<StatCard[^>]*title="([^"]*)"[^>]*value="([^"]*)"[^>]*description="([^"]*)"[^>]*color="([^"]*)"/g);
        
        if (statCardsMatch) {
          statCardsMatch.forEach(card => {
            const titleMatch = card.match(/title="([^"]*)"/);
            const descriptionMatch = card.match(/description="([^"]*)"/);
            
            if (titleMatch && descriptionMatch) {
              const title = titleMatch[1];
              const description = descriptionMatch[1];
              const titleKey = title.toLowerCase().replace(/\s+/g, '') + 'Title';
              const descriptionKey = title.toLowerCase().replace(/\s+/g, '') + 'Description';
              
              uiTexts.components.statCards[titleKey] = title;
              uiTexts.components.statCards[descriptionKey] = description;
            }
          });
        }
        
        // Extraction des titres des graphiques
        const infoCardMatch = pageContent.match(/<InfoCard[^>]*title="([^"]*)"/g);
        
        if (infoCardMatch) {
          infoCardMatch.forEach((card, index) => {
            const titleMatch = card.match(/title="([^"]*)"/);
            
            if (titleMatch) {
              const title = titleMatch[1];
              
              if (title.includes('ETP')) {
                uiTexts.components.charts.etpTitle = title;
              } else if (title.includes('budget')) {
                uiTexts.components.charts.budgetsTitle = title;
              }
            }
          });
        }
      }
    }
    
    // Ajouter certaines valeurs en dur pour les charts
    uiTexts.components.charts.etpAvant = "ETP avant IA";
    uiTexts.components.charts.etpApres = "ETP après IA";
    uiTexts.components.charts.budgetAvant = "Avant IA (%)";
    uiTexts.components.charts.budgetApres = "Après IA (%)";
    uiTexts.components.charts.reduction = "Réduction";
    
    // Ajouter des tooltips
    uiTexts.components.tooltips.etpChart = "Équivalent Temps Plein - Mesure l'impact sur les ressources humaines";
    
    await writeJsonFile('ui-texts.json', uiTexts);
  } catch (error) {
    console.error('Erreur lors de la génération de ui-texts.json:', error);
  }
}

// Génération des messages d'erreur
async function generateErrorMessages() {
  try {
    const errorMessages = {
      data: {
        loading: "Chargement des données en cours...",
        loadError: "Une erreur est survenue lors du chargement des données.",
        retry: "Réessayer",
        noData: "Aucune donnée disponible.",
        dataOutdated: "Les données affichées pourraient ne pas être à jour."
      },
      auth: {
        unauthorized: "Vous n'êtes pas autorisé à accéder à cette ressource.",
        sessionExpired: "Votre session a expiré. Veuillez vous reconnecter.",
        loginError: "Erreur lors de la connexion. Veuillez réessayer."
      },
      navigation: {
        pageNotFound: "La page demandée n'existe pas.",
        returnHome: "Retourner à l'accueil",
        navigationError: "Erreur de navigation. Veuillez réessayer."
      },
      validation: {
        required: "Ce champ est requis.",
        invalidFormat: "Format invalide.",
        numberRequired: "Ce champ doit contenir un nombre.",
        minValue: "La valeur doit être supérieure à {min}.",
        maxValue: "La valeur doit être inférieure à {max}.",
        minLength: "Ce champ doit contenir au moins {min} caractères.",
        maxLength: "Ce champ doit contenir au maximum {max} caractères."
      },
      actions: {
        saveError: "Erreur lors de l'enregistrement. Veuillez réessayer.",
        saveSuccess: "Enregistrement réussi.",
        deleteError: "Erreur lors de la suppression. Veuillez réessayer.",
        deleteSuccess: "Suppression réussie.",
        updateError: "Erreur lors de la mise à jour. Veuillez réessayer.",
        updateSuccess: "Mise à jour réussie.",
        exportError: "Erreur lors de l'exportation. Veuillez réessayer.",
        exportSuccess: "Exportation réussie."
      },
      connection: {
        offline: "Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent ne pas être disponibles.",
        reconnecting: "Tentative de reconnexion...",
        connectionError: "Erreur de connexion au serveur.",
        slowConnection: "Connexion lente détectée."
      },
      generic: {
        error: "Une erreur est survenue.",
        success: "Opération réussie.",
        warning: "Attention!",
        info: "Information",
        confirm: "Êtes-vous sûr de vouloir effectuer cette action?"
      },
      statusCodes: {
        400: "Requête incorrecte.",
        401: "Non autorisé.",
        403: "Accès refusé.",
        404: "Ressource non trouvée.",
        500: "Erreur interne du serveur.",
        503: "Service temporairement indisponible."
      }
    };
    
    await writeJsonFile('error-messages.json', errorMessages);
  } catch (error) {
    console.error('Erreur lors de la génération de error-messages.json:', error);
  }
}

// Génération de charts-config.json
async function generateChartsConfig() {
  try {
    const chartsConfig = {
      colors: {
        primary: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"],
        blue: ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8"],
        green: ["#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d"],
        red: ["#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c"],
        purple: ["#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7", "#9333ea", "#7e22ce"],
        amber: ["#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706"],
        gray: ["#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563"]
      },
      etpComparisonChart: {
        layout: "vertical",
        height: 480,
        margin: {
          top: 10,
          right: 30,
          bottom: 10,
          left: 0
        },
        domain: [0, 7],
        yAxisWidth: 105,
        stroke: "3 3",
        bars: [
          {
            dataKey: "avant",
            name: "ETP avant IA",
            fill: "#8884d8",
            labelPosition: "right"
          },
          {
            dataKey: "apres",
            name: "ETP après IA",
            fill: "#82ca9d",
            labelPosition: "right"
          }
        ]
      },
      budgetChart: {
        height: 480,
        margin: {
          top: 10,
          right: 5,
          bottom: 10,
          left: 0
        },
        domain: [0, 40],
        stroke: "3 3",
        legendHeight: 25,
        bars: [
          {
            dataKey: "avant",
            name: "Avant IA (%)",
            fill: "#8884d8"
          },
          {
            dataKey: "apres",
            name: "Après IA (%)",
            fill: "#82ca9d"
          }
        ]
      },
      productivityChart: {
        height: 400,
        margin: {
          top: 10,
          right: 30,
          bottom: 30,
          left: 10
        },
        domain: [0, 100],
        stroke: "3 3",
        lines: [
          {
            dataKey: "avant",
            name: "Productivité avant IA",
            stroke: "#8884d8",
            strokeWidth: 2
          },
          {
            dataKey: "apres",
            name: "Productivité avec IA",
            stroke: "#82ca9d",
            strokeWidth: 2
          }
        ]
      }
    };
    
    await writeJsonFile('charts-config.json', chartsConfig);
  } catch (error) {
    console.error('Erreur lors de la génération de charts-config.json:', error);
  }
}

// Génération des données du dashboard
async function generateDashboardData() {
  try {
    const dashboardPath = path.join(__dirname, '../src/pages/Dashboard.js');
    const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
    
    // Extraction des statistiques (StatCard)
    const statRegex = /<StatCard[^>]*title="([^"]*)"[^>]*value="([^"]*)"[^>]*description="([^"]*)"[^>]*color="([^"]*)"/g;
    const stats = {};
    
    let statMatch;
    while ((statMatch = statRegex.exec(dashboardContent)) !== null) {
      const title = statMatch[1];
      const value = statMatch[2];
      const description = statMatch[3];
      const color = statMatch[4];
      
      const keyName = title.toLowerCase().replace(/\s+/g, '').replace(/%/g, '').replace(/é/g, 'e');
      
      stats[keyName] = {
        value: parseInt(value.replace(/[^0-9]/g, '')),
        unit: value.includes('%') ? '%' : '',
        description,
        color
      };
      
      if (value.startsWith('+')) {
        stats[keyName].prefix = '+';
      }
    }
    
    // Données complètes du dashboard
    const dashboardData = {
      stats,
      etpComparaison: [
        {
          "name": "Développeur",
          "avant": 5.3,
          "apres": 2.1,
          "reduction": "60%"
        },
        {
          "name": "Business Analyst",
          "avant": 4.2,
          "apres": 1.7,
          "reduction": "60%"
        },
        {
          "name": "Testeur",
          "avant": 3.8,
          "apres": 1.1,
          "reduction": "70%"
        },
        {
          "name": "Architecte",
          "avant": 2.5,
          "apres": 1.5,
          "reduction": "40%"
        },
        {
          "name": "Chef de Projet",
          "avant": 3.2,
          "apres": 2.2,
          "reduction": "30%"
        },
        {
          "name": "DevOps",
          "avant": 2.1,
          "apres": 1.5,
          "reduction": "25%"
        }
      ],
      budgetData: [
        {
          "name": "IA/ML",
          "avant": 12,
          "apres": 32
        },
        {
          "name": "Cloud",
          "avant": 25,
          "apres": 35
        },
        {
          "name": "Sécurité",
          "avant": 18,
          "apres": 24
        },
        {
          "name": "Dev. Legacy",
          "avant": 30,
          "apres": 10
        },
        {
          "name": "Infra. On-Premise",
          "avant": 15,
          "apres": 8
        }
      ],
      highlightedContent: {
        architectesStudy: {
          title: "Impact de l'IA sur les architectes informatiques",
          badge: "Étude exclusive",
          description: "Découvrez notre analyse approfondie sur l'impact spécifique de l'IA sur les différents types d'architectes informatiques.",
          details: "Cette étude détaille l'évolution du rôle de 6 types d'architectes (SI, Applicatif, Système, Cloud, Données et Sécurité) face à l'IA, avec des projections à 2, 5 et 10 ans et des recommandations de développement professionnel.",
          features: [
            "Analyse des tâches automatisables par profil",
            "Évolution des compétences clés requises",
            "Projections d'impact par spécialisation",
            "Recommandations de formation ciblées"
          ],
          linkUrl: "/architectes-impact",
          linkText: "Accéder à l'étude",
          bgColor: "amber"
        },
        productivityComparison: {
          title: "Productivité IA vs Développement humain",
          description: "Découvrez une démonstration concrète du potentiel de transformation de l'IA : cette application elle-même a été développée en quelques heures avec l'IA, alors qu'un développement humain traditionnel aurait nécessité environ 38-40 jours de travail.",
          details: "Une analyse comparative détaillée montre un facteur d'accélération d'environ 80x, avec une visualisation phase par phase des économies de temps réalisées.",
          linkUrl: "/temps-economise",
          linkText: "Voir la comparaison",
          bgColor: "indigo"
        }
      }
    };
    
    await writeJsonFile('dashboard-data.json', dashboardData);
  } catch (error) {
    console.error('Erreur lors de la génération de dashboard-data.json:', error);
  }
}

// Génération des données d'app-config.json
async function generateAppConfig() {
  try {
    const appConfig = {
      appName: "Impact IA ESN Dashboard",
      version: "1.0.0",
      description: "Dashboard stratégique présentant l'impact de l'IA générative et agentique sur les métiers des ESN et l'évolution nécessaire de leur modèle d'affaires.",
      author: "kbekouchi",
      settings: {
        defaultPageTitle: "Impact IA ESN",
        defaultLanguage: "fr",
        dataRefreshInterval: 3600000,
        enableAnalytics: false,
        enableCache: true,
        cacheExpiration: 86400000
      },
      routes: [
        {
          path: "/",
          component: "Dashboard",
          exact: true,
          dataFiles: ["dashboard-data.json"]
        },
        {
          path: "/metiers-transformation",
          component: "MetiersTransformation",
          exact: false,
          dataFiles: ["metiers-data.json"]
        },
        {
          path: "/benchmarks-economiques",
          component: "BenchmarksEconomiques",
          exact: false,
          dataFiles: ["benchmarks-data.json"]
        },
        {
          path: "/strategie-adaptation",
          component: "StrategieAdaptation",
          exact: false,
          dataFiles: ["strategie-data.json"]
        },
        {
          path: "/methodologie",
          component: "Methodologie",
          exact: false,
          dataFiles: ["sources-list.json"]
        },
        {
          path: "/temps-economise",
          component: "TempsEconomise",
          exact: false,
          dataFiles: ["temps-economise-data.json"]
        },
        {
          path: "/architectes-impact",
          component: "ArchitectesImpact",
          exact: false,
          dataFiles: ["architectes-data.json"]
        },
        {
          path: "/architectes-documentation",
          component: "ArchitectesDocumentation",
          exact: false,
          dataFiles: ["architectes-documentation-data.json"]
        }
      ],
      dataFiles: {
        ui: [
          "ui-texts.json",
          "ui-config.json",
          "charts-config.json",
          "nav-config.json"
        ],
        content: [
          "dashboard-data.json",
          "metiers-data.json",
          "benchmarks-data.json",
          "strategie-data.json",
          "temps-economise-data.json",
          "architectes-data.json",
          "architectes-documentation-data.json",
          "sources-list.json"
        ]
      },
      fallbackSettings: {
        useLocalFallback: true,
        showErrorMessages: true,
        retryCount: 3,
        retryDelay: 1000
      }
    };
    
    await writeJsonFile('app-config.json', appConfig);
  } catch (error) {
    console.error('Erreur lors de la génération de app-config.json:', error);
  }
}

// Exécution de toutes les fonctions de génération
async function generateAllFiles() {
  console.log('Début de la génération des fichiers JSON...');
  
  await generateNavConfig();
  await generateUiTexts();
  await generateUiConfig();
  await generateDashboardData();
  await generateAppConfig();
  await generateErrorMessages();
  await generateChartsConfig();
  
  console.log('Génération des fichiers JSON terminée avec succès!');
}

// Lancement du script
generateAllFiles();