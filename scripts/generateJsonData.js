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