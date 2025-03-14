// Service centralisé pour l'accès aux données
import { metiersData, tendancesTransversales } from '../data/metiersData';
import { budgetData, investissementsData, strategiesLeaders, impactEconomique, adaptationStrategique } from '../data/benchmarksData';
import { sourcesList } from '../data/sourcesList';

/**
 * Service centralisé pour accéder aux données de l'application
 * Ce service gère le chargement des données depuis des fichiers JSON externes,
 * avec un fallback sur les données en dur en cas d'échec.
 */

// Cache pour éviter de recharger les données inutilement
const cache = {
  metiersData: null,
  tendancesTransversales: null,
  budgetData: null,
  investissementsData: null,
  strategiesLeaders: null,
  impactEconomique: null,
  adaptationStrategique: null,
  sourcesList: null,
  methodologie: null,
  // Horodatage des derniers chargements pour implémenter un TTL
  timestamps: {}
};

// Durée de validité du cache en millisecondes (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

/**
 * Charge un fichier JSON depuis le serveur
 * @param {string} filename - Nom du fichier JSON à charger
 * @returns {Promise<any>} - Données JSON chargées
 */
const loadJsonFile = async (filename) => {
  try {
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Erreur lors du chargement du fichier ${filename}:`, error);
    throw error;
  }
};

/**
 * Récupère des données du cache ou les charge depuis le serveur
 * @param {string} key - Clé de cache
 * @param {string} filename - Nom du fichier JSON
 * @param {any} fallbackData - Données de secours en cas d'échec
 * @returns {Promise<any>} - Données
 */
const getDataWithCache = async (key, filename, fallbackData) => {
  // Vérifier si les données sont dans le cache et sont encore valides
  const now = Date.now();
  if (
    cache[key] !== null &&
    cache.timestamps[key] &&
    now - cache.timestamps[key] < CACHE_TTL
  ) {
    return cache[key];
  }

  // Essayer de charger les données depuis le fichier JSON
  try {
    const data = await loadJsonFile(filename);
    cache[key] = data;
    cache.timestamps[key] = now;
    return data;
  } catch (error) {
    // En cas d'échec, utiliser les données de secours
    console.warn(`Utilisation des données en dur pour ${key} suite à une erreur.`);
    cache[key] = fallbackData;
    cache.timestamps[key] = now;
    return fallbackData;
  }
};

// Fonctions asynchrones pour récupérer les données
export const getMetiersData = async () => {
  return await getDataWithCache('metiersData', 'metiers.json', metiersData);
};

export const getMetiersEtpComparaison = async () => {
  const data = await getMetiersData();
  return data.etpComparaison || metiersData.etpComparaison;
};

export const getMetiersProductivity = async () => {
  const data = await getMetiersData();
  return data.productivityData || metiersData.productivityData;
};

export const getDeveloppeurData = async () => {
  const data = await getMetiersData();
  return data.developpeur || metiersData.developpeur;
};

export const getBusinessAnalystData = async () => {
  const data = await getMetiersData();
  return data.businessAnalyst || metiersData.businessAnalyst;
};

export const getArchitecteData = async () => {
  const data = await getMetiersData();
  return data.architecte || metiersData.architecte;
};

export const getTesteurData = async () => {
  const data = await getMetiersData();
  return data.testeur || metiersData.testeur;
};

export const getTendancesTransversales = async () => {
  return await getDataWithCache('tendancesTransversales', 'tendances.json', tendancesTransversales);
};

export const getBudgetData = async () => {
  return await getDataWithCache('budgetData', 'budget.json', budgetData);
};

export const getInvestissementsData = async () => {
  return await getDataWithCache('investissementsData', 'investissements.json', investissementsData);
};

export const getStrategiesLeaders = async () => {
  return await getDataWithCache('strategiesLeaders', 'strategies-leaders.json', strategiesLeaders);
};

export const getImpactEconomique = async () => {
  return await getDataWithCache('impactEconomique', 'impact-economique.json', impactEconomique);
};

export const getStrategiesEsn = async () => {
  const strategies = await getStrategiesLeaders();
  const impact = await getImpactEconomique();
  return { strategiesLeaders: strategies, impactEconomique: impact };
};

export const getAdaptationStrategique = async () => {
  return await getDataWithCache('adaptationStrategique', 'adaptation-strategique.json', adaptationStrategique);
};

export const getSourcesList = async () => {
  return await getDataWithCache('sourcesList', 'sources.json', sourcesList);
};

export const getMethodologie = async () => {
  return await getDataWithCache('methodologie', 'methodologie.json', {
    approche: "Analyse multidimensionnelle combinant des données quantitatives d'études sectorielles et des analyses qualitatives"
  });
};

// Export d'un objet contenant toutes les fonctions pour faciliter les imports
const dataService = {
  getMetiersData,
  getMetiersEtpComparaison,
  getMetiersProductivity,
  getDeveloppeurData,
  getBusinessAnalystData,
  getArchitecteData,
  getTesteurData,
  getTendancesTransversales,
  getBudgetData,
  getInvestissementsData,
  getStrategiesLeaders,
  getImpactEconomique,
  getStrategiesEsn,
  getAdaptationStrategique,
  getSourcesList,
  getMethodologie
};

export default dataService;
