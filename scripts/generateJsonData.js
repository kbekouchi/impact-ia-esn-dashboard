// Script pour convertir les données JS en fichiers JSON
const fs = require('fs');
const path = require('path');

// Importation des données
const { metiersData, tendancesTransversales } = require('../src/data/metiersData');
const { 
  budgetData, 
  investissementsData, 
  strategiesLeaders, 
  impactEconomique, 
  adaptationStrategique 
} = require('../src/data/benchmarksData');
const { sourcesList } = require('../src/data/sourcesList');

// Fonction d'aide pour créer le répertoire s'il n'existe pas
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`Répertoire créé: ${directory}`);
  }
}

// Fonction pour écrire les données dans un fichier JSON
function writeJsonFile(filename, data) {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Fichier généré: ${filePath}`);
}

// Définir le répertoire de sortie
const outputDir = path.join(__dirname, '../public/data');
ensureDirectoryExists(outputDir);

// Générer les fichiers JSON
console.log('Génération des fichiers JSON...');

// Fichiers pour les données des métiers
writeJsonFile('metiers.json', metiersData);
writeJsonFile('tendances.json', tendancesTransversales);

// Fichiers pour les données de benchmarks
writeJsonFile('budget.json', budgetData);
writeJsonFile('investissements.json', investissementsData);
writeJsonFile('strategies-leaders.json', strategiesLeaders);
writeJsonFile('impact-economique.json', impactEconomique);
writeJsonFile('adaptation-strategique.json', adaptationStrategique);

// Fichier pour les sources
writeJsonFile('sources.json', sourcesList);
writeJsonFile('methodologie.json', {
  approche: "Analyse multidimensionnelle combinant des données quantitatives d'études sectorielles et des analyses qualitatives"
});

console.log('Génération des fichiers JSON terminée avec succès.');
