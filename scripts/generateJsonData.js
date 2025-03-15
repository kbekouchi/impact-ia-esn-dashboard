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