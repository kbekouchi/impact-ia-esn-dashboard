import React, { useState, useEffect } from 'react';
import InfoCard from '../components/InfoCard';
// Importation du service de données
import { getSourcesList, getMethodologie } from '../services/dataService';

// Composant de chargement
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

// Composant d'erreur
const ErrorMessage = ({ onRetry }) => (
  <div className="flex flex-col items-center py-8 text-center">
    <p className="text-red-600 font-semibold mb-4">Une erreur est survenue lors du chargement des données.</p>
    <button 
      onClick={onRetry} 
      className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded"
    >
      Réessayer
    </button>
  </div>
);

const Methodologie = () => {
  // États pour gérer les données, le chargement et les erreurs
  const [sourcesList, setSourcesList] = useState([]);
  const [methodologie, setMethodologie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Fonction pour charger les données
  const loadData = async () => {
    setLoading(true);
    setError(false);
    
    try {
      // Charger les données de façon asynchrone
      const sourcesListData = await getSourcesList();
      const methodologieData = await getMethodologie();
      
      setSourcesList(sourcesListData);
      setMethodologie(methodologieData);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      setError(true);
      setLoading(false);
    }
  };
  
  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);
  
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Afficher le spinner de chargement si les données sont en cours de chargement
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Méthodologie et Sources</h1>
          <p className="text-gray-600 max-w-3xl">
            Présentation de la démarche d'analyse et des sources utilisées pour l'étude de l'impact de l'IA
            sur les métiers des ESN et l'évolution nécessaire des modèles d'affaires.
          </p>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  // Afficher un message d'erreur si le chargement a échoué
  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Méthodologie et Sources</h1>
          <p className="text-gray-600 max-w-3xl">
            Présentation de la démarche d'analyse et des sources utilisées pour l'étude de l'impact de l'IA
            sur les métiers des ESN et l'évolution nécessaire des modèles d'affaires.
          </p>
        </div>
        <ErrorMessage onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Méthodologie et Sources</h1>
        <p className="text-gray-600 max-w-3xl">
          Présentation de la démarche d'analyse et des sources utilisées pour l'étude de l'impact de l'IA
          sur les métiers des ESN et l'évolution nécessaire des modèles d'affaires.
        </p>
      </div>

      {/* Démarche d'analyse */}
      <InfoCard title="Démarche d'analyse" bgColor="blue">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-blue-800">Approche méthodologique</h3>
          <p className="text-gray-700">
            L'analyse de l'impact de l'IA sur les ESN a été réalisée selon une approche multidimensionnelle
            combinant des données quantitatives d'études sectorielles et des analyses qualitatives 
            des transformations en cours. La méthodologie s'est appuyée sur :
          </p>
          <ol className="list-decimal pl-8 space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Analyse des études récentes (2023-2024)</span> de cabinets 
              de conseil reconnus (McKinsey, Gartner, BCG) sur l'impact de l'IA générative et agentique 
              sur les activités de service numérique.
            </li>
            <li>
              <span className="font-medium">Benchmarking des stratégies</span> des ESN leaders (Capgemini, 
              Accenture, Sopra Steria) face à la transformation IA.
            </li>
            <li>
              <span className="font-medium">Estimation des impacts quantitatifs</span> sur les effectifs 
              et la productivité par métier, en s'appuyant sur les données d'études spécifiques.
            </li>
            <li>
              <span className="font-medium">Analyse des budgets IT</span> et de leur évolution face à 
              l'intégration de l'IA générative dans les entreprises.
            </li>
            <li>
              <span className="font-medium">Élaboration de recommandations stratégiques</span> pour les 
              ESN basées sur les tendances observées et les facteurs de succès identifiés.
            </li>
          </ol>
        </div>
      </InfoCard>

      {/* Sources bibliographiques */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Sources bibliographiques</h2>
        <div className="space-y-6">
          {sourcesList.map((category, index) => (
            <InfoCard 
              key={index} 
              title={
                <button 
                  className="flex justify-between items-center w-full"
                  onClick={() => toggleCategory(category.category)}
                >
                  <span>{category.category}</span>
                  <span className="text-sm text-primary-600">
                    {expandedCategory === category.category ? "Réduire" : "Détails"}
                  </span>
                </button>
              } 
              bgColor="gray"
            >
              {expandedCategory === category.category ? (
                <div className="mt-2 space-y-6">
                  {category.sources.map((source, sourceIndex) => (
                    <div key={sourceIndex} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <h3 className="font-semibold text-gray-800">{source.title} ({source.year})</h3>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 text-sm hover:underline"
                      >
                        {source.url}
                      </a>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Données clés :</p>
                        <ul className="list-disc pl-6 mt-1 space-y-1 text-sm text-gray-600">
                          {source.key_data.map((data, dataIndex) => (
                            <li key={dataIndex}>{data}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">
                  {category.sources.length} source{category.sources.length > 1 ? 's' : ''} - 
                  Cliquez sur "Détails" pour voir les références complètes.
                </p>
              )}
            </InfoCard>
          ))}
        </div>
      </div>

      {/* Limitations de l'étude */}
      <InfoCard title="Limitations et considérations méthodologiques" bgColor="yellow">
        <div className="space-y-4">
          <p className="text-gray-700">
            Bien que cette analyse s'appuie sur des données issues d'études réputées, plusieurs limitations 
            doivent être prises en compte pour une interprétation juste des résultats :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Projections d'impact sur les effectifs :</span> Les estimations 
              de réduction d'ETP sont des moyennes sectorielles et peuvent varier considérablement selon 
              les spécificités des ESN (taille, positionnement, secteurs clients).
            </li>
            <li>
              <span className="font-medium">Temporalité :</span> L'adoption de l'IA générative étant récente, 
              les projections à 3-5 ans comportent une marge d'incertitude significative.
            </li>
            <li>
              <span className="font-medium">Hybridation métiers :</span> L'évolution des métiers IT se caractérise 
              par une hybridation croissante qui peut rendre moins pertinente l'analyse par métier "traditionnel".
            </li>
            <li>
              <span className="font-medium">Données quantitatives :</span> Certaines données sur l'impact 
              productif de l'IA proviennent d'études de cas spécifiques et leur généralisation doit être 
              considérée avec prudence.
            </li>
            <li>
              <span className="font-medium">Évolution rapide des technologies :</span> La rapidité d'évolution 
              des technologies d'IA pourrait accélérer ou modifier substantiellement les impacts estimés.
            </li>
          </ul>
        </div>
      </InfoCard>

      {/* Remerciements */}
      <InfoCard title="Remerciements" bgColor="green">
        <p className="text-gray-700">
          Cette étude a été réalisée avec le support de Claude, un assistant IA d'Anthropic, qui a contribué 
          à l'analyse des données et à la structuration des informations. Nous remercions également 
          toutes les organisations citées pour leurs études et publications qui ont permis d'alimenter 
          cette analyse.
        </p>
      </InfoCard>
    </div>
  );
};

export default Methodologie;
