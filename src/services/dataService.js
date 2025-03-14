/**
 * @fileoverview Service centralisé pour l'accès aux données de l'application.
 * 
 * Ce service sert de point d'accès unique à toutes les données utilisées par
 * l'application, facilitant ainsi la maintenance et l'évolution future vers des
 * sources de données dynamiques (Phase 2 et suivantes).
 * 
 * @module dataService
 * @author Karim Bekouchi
 * @version 1.0.0
 */

// Imports des sources de données
import { metiersData, tendancesTransversales } from '../data/metiersData';
import { budgetData, investissementsData, strategiesLeaders, impactEconomique, adaptationStrategique } from '../data/benchmarksData';
import { sourcesList } from '../data/sourcesList';

/**
 * Récupère l'ensemble des données sur les métiers.
 * @returns {Object} Objet contenant toutes les données des métiers.
 */
export const getMetiersData = () => metiersData;

/**
 * Récupère les données de comparaison d'ETP avant/après IA pour chaque métier.
 * @returns {Array<Object>} Tableau d'objets contenant les comparaisons d'ETP.
 * @property {string} name - Nom du métier.
 * @property {number} avant - Nombre d'ETP avant l'IA.
 * @property {number} apres - Nombre d'ETP après l'IA.
 * @property {string} reduction - Pourcentage de réduction des ETP.
 */
export const getMetiersEtpComparaison = () => metiersData.etpComparaison;

/**
 * Récupère les données de productivité par métier.
 * @returns {Array<Object>} Tableau d'objets contenant les gains de productivité.
 * @property {string} name - Nom du métier.
 * @property {number} value - Pourcentage de gain de productivité.
 */
export const getMetiersProductivity = () => metiersData.productivityData;

/**
 * Récupère les données spécifiques aux développeurs.
 * @returns {Object} Données détaillées sur l'impact de l'IA pour les développeurs.
 * @property {string} title - Titre du métier.
 * @property {string} description - Description de l'impact de l'IA.
 * @property {Array<Object>} stats - Statistiques clés.
 * @property {Array<string>} transformations - Transformations actuelles.
 * @property {Array<string>} projections - Projections futures.
 */
export const getDeveloppeurData = () => metiersData.developpeur;

/**
 * Récupère les données spécifiques aux business analysts.
 * @returns {Object} Données détaillées sur l'impact de l'IA pour les business analysts.
 * @property {string} title - Titre du métier.
 * @property {string} description - Description de l'impact de l'IA.
 * @property {Array<Object>} stats - Statistiques clés.
 * @property {Array<string>} transformations - Transformations actuelles.
 * @property {Array<string>} projections - Projections futures.
 */
export const getBusinessAnalystData = () => metiersData.businessAnalyst;

/**
 * Récupère les données spécifiques aux architectes.
 * @returns {Object} Données détaillées sur l'impact de l'IA pour les architectes.
 * @property {string} title - Titre du métier.
 * @property {string} description - Description de l'impact de l'IA.
 * @property {Array<Object>} stats - Statistiques clés.
 * @property {Array<string>} transformations - Transformations actuelles.
 * @property {Array<string>} projections - Projections futures.
 */
export const getArchitecteData = () => metiersData.architecte;

/**
 * Récupère les données spécifiques aux testeurs.
 * @returns {Object} Données détaillées sur l'impact de l'IA pour les testeurs.
 * @property {string} title - Titre du métier.
 * @property {string} description - Description de l'impact de l'IA.
 * @property {Array<Object>} stats - Statistiques clés.
 * @property {Array<string>} transformations - Transformations actuelles.
 * @property {Array<string>} projections - Projections futures.
 */
export const getTesteurData = () => metiersData.testeur;

/**
 * Récupère les tendances transversales à tous les métiers.
 * @returns {Object} Tendances transversales organisées par catégories.
 * @property {Array<string>} competences - Compétences émergentes.
 * @property {Array<string>} equipes - Transformation des équipes.
 * @property {Array<string>} defis - Défis de la transition.
 */
export const getTendancesTransversales = () => tendancesTransversales;

/**
 * Récupère les données sur l'évolution des budgets IT des clients.
 * @returns {Array<Object>} Tableau d'objets contenant les comparaisons de budgets.
 * @property {string} name - Catégorie de budget.
 * @property {number} avant - Pourcentage avant IA.
 * @property {number} apres - Pourcentage après IA.
 */
export const getBudgetData = () => budgetData;

/**
 * Récupère les données sur les investissements IA des ESN leaders.
 * @returns {Array<Object>} Tableau d'objets contenant les investissements.
 * @property {string} name - Nom de l'ESN.
 * @property {number} value - Montant d'investissement (en millions).
 * @property {string} label - Représentation formatée de l'investissement.
 * @property {string} duree - Durée de l'investissement.
 */
export const getInvestissementsData = () => investissementsData;

/**
 * Récupère les stratégies des ESN leaders.
 * @returns {Array<Object>} Tableau d'objets contenant les stratégies des leaders.
 * @property {string} name - Nom de l'ESN.
 * @property {string} investissement - Détails de l'investissement.
 * @property {Array<string>} actions - Actions stratégiques entreprises.
 */
export const getStrategiesLeaders = () => strategiesLeaders;

/**
 * Récupère les données sur l'impact économique de l'IA.
 * @returns {Object} Données détaillées sur l'impact économique.
 * @property {Array<Object>} reductionCouts - Données sur la réduction des coûts.
 * @property {Array<string>} attentesClients - Évolution des attentes clients.
 */
export const getImpactEconomique = () => impactEconomique;

/**
 * Récupère les données combinées sur les stratégies et l'impact économique.
 * @returns {Object} Données sur les stratégies et l'impact économique.
 * @property {Array<Object>} strategiesLeaders - Stratégies des ESN leaders.
 * @property {Object} impactEconomique - Données sur l'impact économique.
 */
export const getStrategiesEsn = () => ({ strategiesLeaders, impactEconomique });

/**
 * Récupère les données sur l'adaptation stratégique des ESN.
 * @returns {Object} Données sur l'adaptation stratégique.
 * @property {Array<string>} modeleEconomique - Évolution du modèle économique.
 * @property {Array<Object>} projections - Projections stratégiques.
 */
export const getAdaptationStrategique = () => adaptationStrategique;

/**
 * Récupère la liste des sources bibliographiques.
 * @returns {Array<Object>} Tableau d'objets contenant les sources par catégorie.
 * @property {string} category - Catégorie de la source.
 * @property {Array<Object>} sources - Sources bibliographiques.
 */
export const getSourcesList = () => sourcesList;

/**
 * Récupère les données sur la méthodologie.
 * Note: Cette fonction ne s'appuie pas sur une source externe existante,
 * elle crée directement un objet avec les informations de méthodologie.
 * @returns {Object} Données sur la méthodologie utilisée.
 * @property {string} approche - Description de l'approche méthodologique.
 */
export const getMethodologie = () => ({
  approche: "Analyse multidimensionnelle combinant des données quantitatives d'études sectorielles et des analyses qualitatives"
});

/**
 * Objet regroupant toutes les fonctions d'accès aux données.
 * Permet d'importer l'ensemble du service si nécessaire.
 * 
 * @example
 * import dataService from '../services/dataService';
 * const metiersData = dataService.getMetiersData();
 */
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
