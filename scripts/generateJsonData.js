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

// 1. Fichiers pour les données des métiers

// Extraire les données de base des métiers
const metiers = {
  etpComparaison: metiersData.etpComparaison,
  productivityData: metiersData.productivityData
};
writeJsonFile('metiers.json', metiers);

// Fichiers individuels pour chaque métier
writeJsonFile('metiers-developpeur.json', metiersData.developpeur);
writeJsonFile('metiers-businessanalyst.json', metiersData.businessAnalyst);
writeJsonFile('metiers-architecte.json', metiersData.architecte);
writeJsonFile('metiers-testeur.json', metiersData.testeur);

// Tendances transversales
writeJsonFile('tendances.json', tendancesTransversales);

// 2. Fichiers pour les données de benchmarks
writeJsonFile('budget.json', budgetData);
writeJsonFile('investissements.json', investissementsData);
writeJsonFile('strategies-leaders.json', strategiesLeaders);
writeJsonFile('impact-economique.json', impactEconomique);
writeJsonFile('adaptation-strategique.json', adaptationStrategique);

// 3. Fichiers pour les autres données
writeJsonFile('sources.json', sourcesList);

// Créer des données de méthodologie plus complètes
const methodologie = {
  approche: "Analyse multidimensionnelle combinant des données quantitatives d'études sectorielles et des analyses qualitatives",
  etapes: [
    "Analyse des études récentes (2023-2024) de cabinets de conseil reconnus",
    "Benchmarking des stratégies des ESN leaders face à la transformation IA",
    "Estimation des impacts quantitatifs sur les effectifs et la productivité par métier",
    "Analyse des budgets IT et de leur évolution face à l'intégration de l'IA générative",
    "Élaboration de recommandations stratégiques pour les ESN"
  ],
  limitations: [
    "Projections d'impact sur les effectifs variables selon les spécificités des ESN",
    "Temporalité et incertitude des projections à 3-5 ans",
    "Hybridation métiers rendant moins pertinente l'analyse par métier traditionnel",
    "Généralisation prudente des données quantitatives sur l'impact productif",
    "Évolution rapide des technologies d'IA pouvant modifier les impacts estimés"
  ],
  remerciements: "Cette étude a été réalisée avec le support de Claude, un assistant IA d'Anthropic, qui a contribué à l'analyse des données et à la structuration des informations."
};
writeJsonFile('methodologie.json', methodologie);

console.log('Génération des fichiers JSON terminée avec succès.');

// Afficher un récapitulatif des fichiers générés
console.log('\nRécapitulatif des fichiers JSON générés:');
const jsonFiles = fs.readdirSync(outputDir).filter(file => file.endsWith('.json'));
jsonFiles.sort().forEach(file => {
  const stats = fs.statSync(path.join(outputDir, file));
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`- ${file} (${sizeKB} KB)`);
});
