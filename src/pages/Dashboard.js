import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import StatCard from '../components/StatCard';
import InfoCard from '../components/InfoCard';
import { metiersData } from '../data/metiersData';
import { budgetData, investissementsData } from '../data/benchmarksData';

const Dashboard = () => {
  // Moyenne des réductions d'effectifs
  const avgReduction = Math.round((60 + 60 + 70) / 3); // Moyenne des 3 métiers avec réduction

  // Format personnalisé pour afficher les valeurs avec un seul chiffre après la virgule
  const formatNumber = (value) => {
    return value.toFixed(1);
  };

  // Format personnalisé pour l'infobulle du graphique ETP
  const customTooltipETP = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-bold text-gray-700">{label}</p>
          <p className="text-blue-600">ETP avant IA: {formatNumber(payload[0].value)}</p>
          <p className="text-green-600">ETP après IA: {formatNumber(payload[1].value)}</p>
          <p className="text-gray-700 font-bold">
            Réduction: {metiersData.etpComparaison.find(item => item.name === label)?.reduction}
          </p>
        </div>
      );
    }
    return null;
  };

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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={metiersData.etpComparaison} 
              layout="vertical"
              margin={{ left: 200, right: 40, top: 30, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                domain={[0, 7]} 
                tickFormatter={formatNumber}
                label={{ value: 'Nombre d\'ETP', position: 'insideBottom', offset: -15 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={180}
                tick={{ fontSize: 16, fontWeight: 'bold' }}
                tickMargin={10}
              />
              <Tooltip content={customTooltipETP} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="avant" name="ETP avant IA" fill="#8884d8">
                <LabelList dataKey="avant" position="right" formatter={formatNumber} style={{ fontWeight: 'bold' }} />
              </Bar>
              <Bar dataKey="apres" name="ETP après IA" fill="#82ca9d">
                <LabelList dataKey="apres" position="right" formatter={formatNumber} style={{ fontWeight: 'bold' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </InfoCard>

        <InfoCard title="Évolution des budgets IT clients">
          <ResponsiveContainer width="100%" height={400}>
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

      {/* Productivité IA vs humain */}
      <InfoCard title="Productivité IA vs Développement humain" bgColor="indigo">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <p className="mb-4 text-gray-600">
              Découvrez une démonstration concrète du potentiel de transformation de l'IA : cette application 
              elle-même a été développée en quelques heures avec l'IA, alors qu'un développement humain 
              traditionnel aurait nécessité environ 38-40 jours de travail.
            </p>
            <p className="text-gray-600">
              Une analyse comparative détaillée montre un facteur d'accélération d'environ 80x, 
              avec une visualisation phase par phase des économies de temps réalisées.
            </p>
          </div>
          <Link to="/temps-economise" className="btn-primary whitespace-nowrap">
            Voir la comparaison
          </Link>
        </div>
      </InfoCard>

      {/* Méthodologie */}
      <InfoCard title="Méthodologie et Sources" bgColor="gray">
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <p className="mb-4 text-gray-600">
              Cette étude s'appuie sur des sources reconnues issues de cabinets de conseil et d'études sectorielles 
              (McKinsey, Gartner, WEF, BCG) et intègre les dernières données disponibles sur l'impact de l'IA 
              sur le secteur des services numériques.
            </p>
            <p className="text-gray-600">
              Notre approche méthodologique combine une analyse quantitative des impacts sur les effectifs et la 
              productivité avec une analyse qualitative des transformations des métiers et des modèles d'affaires.
            </p>
          </div>
          <Link to="/methodologie" className="btn-primary whitespace-nowrap">
            Consulter les sources
          </Link>
        </div>
      </InfoCard>
    </div>
  );
};

export default Dashboard;
