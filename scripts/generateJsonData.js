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