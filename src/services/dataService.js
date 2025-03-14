// Service centralisé pour l'accès aux données
import axios from 'axios';
import { metiersData, tendancesTransversales } from '../data/metiersData';
import { budgetData, investissementsData, strategiesLeaders, impactEconomique, adaptationStrategique } from '../data/benchmarksData';
import { sourcesList } from '../data/sourcesList';

/**
 * Service centralisé pour accéder aux données de l'application
 * Ce service utilise les données chargées dynamiquement à partir des fichiers JSON
 * avec une solution de repli sur les données en dur si le chargement échoue
 */

// Cache pour stocker les données chargées
const dataCache = {};

// Durée de vie du cache (en ms) - 24h par défaut
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Fonction pour vérifier si le cache est valide
const isCacheValid = (key) => {
  if (!dataCache[key]) return false;
  const now = new Date().getTime();
  return now - dataCache[key].timestamp < CACHE_DURATION;
};

// Fonction pour charger un fichier JSON avec cache
const loadJsonData = async (filename) => {
  // Vérifier si les données sont en cache et valides
  if (isCacheValid(filename)) {
    return dataCache[filename].data;
  }

  try {
    // Charger les données depuis le fichier JSON
    const response = await axios.get(`/data/${filename}`);
    
    // Mettre en cache avec un timestamp
    dataCache[filename] = {
      data: response.data,
      timestamp: new Date().getTime()
    };
    
    return response.data;
  } catch (error) {
    console.error(`Erreur lors du chargement de ${filename}:`, error);
    // Retourner null en cas d'erreur, les méthodes de récupération
    // utiliseront les données de repli
    return null;
  }
};

// Fonction pour récupérer les textes d'interface
export const getUiTexts = async () => {
  const uiTexts = await loadJsonData('ui-texts.json');
  return uiTexts || { pages: {}, components: {} };
};

// Fonction pour récupérer la configuration UI
export const getUiConfig = async () => {
  const uiConfig = await loadJsonData('ui-config.json');
  return uiConfig || { theme: {}, layout: {}, components: {} };
};

// Fonction pour récupérer la configuration des graphiques
export const getChartsConfig = async () => {
  const chartsConfig = await loadJsonData('charts-config.json');
  return chartsConfig || { colors: {}, etpComparisonChart: {}, budgetChart: {} };
};

// Fonction pour récupérer la configuration de navigation
export const getNavConfig = async () => {
  const navConfig = await loadJsonData('nav-config.json');
  return navConfig || { appTitle: "Impact IA ESN", appSubtitle: "Dashboard stratégique", menuItems: [] };
};

// Fonction pour récupérer les messages d'erreur
export const getErrorMessages = async () => {
  const errorMessages = await loadJsonData('error-messages.json');
  return errorMessages || { data: {}, auth: {}, navigation: {} };
};

// Fonction pour récupérer les données du dashboard
export const getDashboardData = async () => {
  const dashboardData = await loadJsonData('dashboard-data.json');
  return dashboardData || {
    stats: {},
    etpComparaison: getMetiersEtpComparaison(),
    budgetData: getBudgetData()
  };
};

// Données sur les métiers (avec fallback sur les données en dur)
export const getMetiersData = () => metiersData;
export const getMetiersEtpComparaison = () => metiersData.etpComparaison;
export const getMetiersProductivity = () => metiersData.productivityData;
export const getDeveloppeurData = () => metiersData.developpeur;
export const getBusinessAnalystData = () => metiersData.businessAnalyst;
export const getArchitecteData = () => metiersData.architecte;
export const getTesteurData = () => metiersData.testeur;
export const getTendancesTransversales = () => tendancesTransversales;

// Données sur les benchmarks économiques (avec fallback sur les données en dur)
export const getBudgetData = () => budgetData;
export const getInvestissementsData = () => investissementsData;
export const getStrategiesLeaders = () => strategiesLeaders;
export const getImpactEconomique = () => impactEconomique;
export const getStrategiesEsn = () => ({ strategiesLeaders, impactEconomique });
export const getAdaptationStrategique = () => adaptationStrategique;

// Données sur les sources et la méthodologie (avec fallback sur les données en dur)
export const getSourcesList = () => sourcesList;
export const getMethodologie = () => ({
  approche: "Analyse multidimensionnelle combinant des données quantitatives d'études sectorielles et des analyses qualitatives"
});

// Export d'un objet contenant toutes les fonctions pour faciliter les imports
const dataService = {
  // Nouvelles fonctions pour les données externalisées
  getUiTexts,
  getUiConfig,
  getChartsConfig,
  getNavConfig,
  getErrorMessages,
  getDashboardData,
  
  // Fonctions héritées (avec fallback sur les données en dur)
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