import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import InfoCard from '../components/InfoCard';
import { metiersData } from '../data/metiersData';
import { budgetData, investissementsData } from '../data/benchmarksData';

const Dashboard = () => {
  // Moyenne des réductions d'effectifs
  const avgReduction = Math.round((60 + 60 + 70) / 3); // Moyenne des 3 métiers avec réduction

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Impact de l'IA sur les ESN</h1>
        <p className="text-gray-600 max-w-3xl">
          Dashboard stratégique présentant l'impact de l'IA générative et agentique sur les métiers 
          des ESN et l'évolution nécessaire de leur modèle d'affaires.
        </p>
      </div>

      {/* Statistiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Réduction moyenne ETP" 
          value={`${avgReduction}%`} 
          description="Réduction moyenne des effectifs sur les métiers impactés"
          color="red"
        />
        <StatCard 
          title="Productivité développeurs" 
          value="+55%" 
          description="Gain de productivité des développeurs avec l'IA"
          color="green"
        />
        <StatCard 
          title="Budgets IA clients" 
          value="+81%" 
          description="Entreprises augmentant leur budget IA"
          color="blue"
        />
        <StatCard 
          title="Requalification" 
          value="80%" 
          description="Effectifs à requalifier d'ici 2027"
          color="purple"
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Impact sur les ETP par métier">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metiersData.etpComparaison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 7]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="avant" name="ETP avant IA" fill="#8884d8" />
              <Bar dataKey="apres" name="ETP après IA" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </InfoCard>

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
      </div>

      {/* Sections principales - Accès rapide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Métiers en transformation" bgColor="blue">
          <p className="mb-4 text-gray-600">
            Analyse détaillée de l'impact de l'IA sur les métiers des ESN : développeurs, 
            business analysts, architectes et testeurs.
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
            <li>Réduction de 60-70% des ETP</li>
            <li>Productivité +37% à +65%</li>
            <li>Automatisation 30-75% des tâches</li>
          </ul>
          <Link to="/metiers-transformation" className="btn-primary inline-block">
            Voir l'analyse complète
          </Link>
        </InfoCard>

        <InfoCard title="Benchmarks économiques" bgColor="green">
          <p className="mb-4 text-gray-600">
            Comparaison des stratégies des ESN leaders et analyse de l'évolution des 
            budgets IT des clients face à l'IA.
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
            <li>Investissements majeurs des leaders</li>
            <li>Évolution des attentes clients</li>
            <li>Réorientation des budgets IT</li>
          </ul>
          <Link to="/benchmarks-economiques" className="btn-primary inline-block">
            Explorer les benchmarks
          </Link>
        </InfoCard>

        <InfoCard title="Stratégie d'adaptation" bgColor="purple">
          <p className="mb-4 text-gray-600">
            Recommandations stratégiques pour les ESN face à la transformation 
            du marché par l'IA.
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
            <li>Évolution du modèle économique</li>
            <li>Nouvelles offres et positionnement</li>
            <li>Plans de transformation 2024-2027</li>
          </ul>
          <Link to="/strategie-adaptation" className="btn-primary inline-block">
            Consulter les recommandations
          </Link>
        </InfoCard>
      </div>
    </div>
  );
};

export default Dashboard;
