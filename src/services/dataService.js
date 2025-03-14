// Service centralisé pour l'accès aux données
import { metiersData, tendancesTransversales } from '../data/metiersData';
import { budgetData, investissementsData, strategiesLeaders, impactEconomique, adaptationStrategique } from '../data/benchmarksData';
import { sourcesList, methodologie } from '../data/sourcesList';

/**
 * Service centralisé pour accéder aux données de l'application
 * Ce service sert de point d'accès unique aux données, facilitant
 * la future transition vers des données chargées dynamiquement
 */

// Données sur les métiers
export const getMetiersData = () => metiersData;
export const getMetiersEtpComparaison = () => metiersData.etpComparaison;
export const getMetiersProductivity = () => metiersData.productivityData;
export const getDeveloppeurData = () => metiersData.developpeur;
export const getBusinessAnalystData = () => metiersData.businessAnalyst;
export const getArchitecteData = () => metiersData.architecte;
export const getTesteurData = () => metiersData.testeur;
export const getTendancesTransversales = () => tendancesTransversales;

// Données sur les benchmarks économiques
export const getBudgetData = () => budgetData;
export const getInvestissementsData = () => investissementsData;
export const getStrategiesLeaders = () => strategiesLeaders;
export const getImpactEconomique = () => impactEconomique;
export const getStrategiesEsn = () => ({ strategiesLeaders, impactEconomique });
export const getAdaptationStrategique = () => adaptationStrategique;

// Données sur les sources et la méthodologie
export const getSourcesList = () => sourcesList;
export const getMethodologie = () => methodologie;

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
