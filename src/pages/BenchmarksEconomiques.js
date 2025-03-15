import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';
import StateDisplay from '../components/StateDisplay';
// Importation du service de données au lieu des données directement
import { getBudgetData, getInvestissementsData, getStrategiesEsn } from '../services/dataService';

const BenchmarksEconomiques = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    budgetData: [],
    investissementsData: [],
    impactEconomique: { reductionCouts: [], attentesClients: [] },
    strategiesLeaders: []
  });
  
  useEffect(() => {
    try {
      setLoading(true);
      
      // Récupération des données via le service
      const budgetData = getBudgetData();
      const investissementsData = getInvestissementsData();
      const strategiesData = getStrategiesEsn();
      const { impactEconomique, strategiesLeaders } = strategiesData;
      
      setData({
        budgetData,
        investissementsData,
        impactEconomique,
        strategiesLeaders
      });
      
      setError(false);
    } catch (err) {
      console.error("Erreur lors du chargement des données économiques:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Gestion du rechargement de la page en cas d'erreur
  const handleRetry = () => {
    window.location.reload();
  };

  // Rendu pendant le chargement
  if (loading) {
    return <StateDisplay type="loading" theme="default" message="Chargement des benchmarks économiques..." />;
  }

  // Rendu en cas d'erreur
  if (error) {
    return (
      <StateDisplay 
        type="error" 
        theme="card"
        message="Impossible de charger les données économiques."
        onAction={handleRetry}
      />
    );
  }

  // Vérification si les données sont vides
  if (!data.budgetData || data.budgetData.length === 0) {
    return (
      <StateDisplay 
        type="empty" 
        theme="default" 
        message="Aucune donnée économique disponible."
      />
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
          {data.budgetData && data.budgetData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 40]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avant" name="Avant IA (%)" fill="#8884d8" />
                <Bar dataKey="apres" name="Après IA (%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <StateDisplay 
              type="empty" 
              theme="minimal" 
              message="Aucune donnée budgétaire disponible" 
            />
          )}
        </InfoCard>

        <InfoCard title="Investissements IA des ESN leaders">
          {data.investissementsData && data.investissementsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.investissementsData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent, label }) => `${name}: ${label}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.investissementsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <StateDisplay 
              type="empty" 
              theme="minimal" 
              message="Aucune donnée d'investissement disponible" 
            />
          )}
        </InfoCard>
      </div>

      {/* Statistiques d'impact économique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Impact sur les budgets IT" bgColor="blue">
          {data.impactEconomique.reductionCouts && data.impactEconomique.reductionCouts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {data.impactEconomique.reductionCouts.map((stat, idx) => (
                <StatCard 
                  key={idx}
                  title={stat.label} 
                  value={stat.value}
                  color={idx % 2 === 0 ? 'blue' : 'indigo'}
                />
              ))}
            </div>
          ) : (
            <StateDisplay 
              type="empty" 
              theme="minimal" 
              message="Aucune donnée d'impact sur les budgets" 
            />
          )}
        </InfoCard>

        <InfoCard title="Évolution des attentes clients" bgColor="purple">
          {data.impactEconomique.attentesClients && data.impactEconomique.attentesClients.length > 0 ? (
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              {data.impactEconomique.attentesClients.map((item, idx) => (
                <li key={idx} className="text-base">{item}</li>
              ))}
            </ul>
          ) : (
            <StateDisplay 
              type="empty" 
              theme="minimal" 
              message="Aucune donnée sur les attentes clients" 
            />
          )}
        </InfoCard>
      </div>

      {/* Stratégies des leaders */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Stratégies des ESN leaders</h2>
      {data.strategiesLeaders && data.strategiesLeaders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.strategiesLeaders.map((leader, idx) => (
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
      ) : (
        <StateDisplay 
          type="empty" 
          theme="default" 
          message="Aucune donnée sur les stratégies des leaders" 
        />
      )}

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