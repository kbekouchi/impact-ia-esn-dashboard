import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';
// Importation du service de données
import { getBudgetData, getInvestissementsData, getStrategiesEsn } from '../services/dataService';

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

const BenchmarksEconomiques = () => {
  // États pour gérer les données, le chargement et les erreurs
  const [budgetData, setBudgetData] = useState([]);
  const [investissementsData, setInvestissementsData] = useState([]);
  const [strategiesData, setStrategiesData] = useState({ impactEconomique: { reductionCouts: [], attentesClients: [] }, strategiesLeaders: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Fonction pour charger les données
  const loadData = async () => {
    setLoading(true);
    setError(false);
    
    try {
      // Charger les données de façon asynchrone
      const budgetDataRes = await getBudgetData();
      const investissementsDataRes = await getInvestissementsData();
      const strategiesDataRes = await getStrategiesEsn();
      
      setBudgetData(budgetDataRes);
      setInvestissementsData(investissementsDataRes);
      setStrategiesData(strategiesDataRes);
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
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Extraire les données de l'objet strategiesData
  const { impactEconomique, strategiesLeaders } = strategiesData;

  // Afficher le spinner de chargement si les données sont en cours de chargement
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Benchmarks économiques</h1>
          <p className="text-gray-600 max-w-3xl">
            Analyse comparative des stratégies des ESN leaders face à l'IA et de l'évolution des 
            budgets IT des clients. Projections économiques pour les années à venir.
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
          <h1 className="text-3xl font-bold text-gray-800">Benchmarks économiques</h1>
          <p className="text-gray-600 max-w-3xl">
            Analyse comparative des stratégies des ESN leaders face à l'IA et de l'évolution des 
            budgets IT des clients. Projections économiques pour les années à venir.
          </p>
        </div>
        <ErrorMessage onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Benchmarks économiques</h1>
        <p className="text-gray-600 max-w-3xl">
          Analyse comparative des stratégies des ESN leaders face à l'IA et de l'évolution des 
          budgets IT des clients. Projections économiques pour les années à venir.
        </p>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Évolution des budgets IT clients">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 40]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="avant" name="Avant IA (%)" fill="#8884d8" />
              <Bar dataKey="apres" name="Après IA (%)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </InfoCard>

        <InfoCard title="Investissements IA des ESN leaders">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={investissementsData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent, label }) => `${name}: ${label}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {investissementsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </InfoCard>
      </div>

      {/* Statistiques d'impact économique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Impact sur les budgets IT" bgColor="blue">
          <div className="grid grid-cols-2 gap-4">
            {impactEconomique.reductionCouts.map((stat, idx) => (
              <StatCard 
                key={idx}
                title={stat.label} 
                value={stat.value}
                color={idx % 2 === 0 ? 'blue' : 'indigo'}
              />
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Évolution des attentes clients" bgColor="purple">
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            {impactEconomique.attentesClients.map((item, idx) => (
              <li key={idx} className="text-base">{item}</li>
            ))}
          </ul>
        </InfoCard>
      </div>

      {/* Stratégies des leaders */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Stratégies des ESN leaders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {strategiesLeaders.map((leader, idx) => (
          <InfoCard 
            key={idx} 
            title={leader.name} 
            bgColor={idx === 0 ? 'blue' : idx === 1 ? 'green' : 'indigo'}
          >
            <p className="font-bold text-lg mb-3">{leader.investissement}</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {leader.actions.map((action, actionIdx) => (
                <li key={actionIdx}>{action}</li>
              ))}
            </ul>
          </InfoCard>
        ))}
      </div>

      {/* Analyse spécifique Capgemini */}
      <InfoCard title="Focus: Stratégie Capgemini" bgColor="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Investissement de 2 milliards €</h3>
            <p className="text-gray-700 mb-4">
              Capgemini a annoncé en 2023 un investissement de 2 milliards d'euros sur 3 ans dans l'IA générative,
              démontrant une stratégie offensive de positionnement sur ce marché en pleine croissance.
            </p>
            <h4 className="font-medium text-gray-800 mb-2">Objectifs stratégiques:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
              <li>Devenir le leader européen dans l'IA générative appliquée</li>
              <li>Transformer 80% de ses offres de services actuelles</li>
              <li>Créer une nouvelle division dédiée avec 30 000 experts</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Enseignements pour les ESN</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-800">Nécessité d'investir massivement</h4>
                <p className="text-sm text-gray-700">Les leaders consacrent 3-5% de leur CA à l'IA</p>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Focus sur la formation</h4>
                <p className="text-sm text-gray-700">Requalification profonde des équipes existantes</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <h4 className="font-medium text-yellow-800">Création d'actifs propriétaires</h4>
                <p className="text-sm text-gray-700">Développement d'IP et d'outils distinctifs</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-md">
                <h4 className="font-medium text-purple-800">Partenariats stratégiques</h4>
                <p className="text-sm text-gray-700">Alliances avec les fournisseurs de modèles IA</p>
              </div>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default BenchmarksEconomiques;
