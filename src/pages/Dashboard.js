import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import StatCard from '../components/StatCard';
import InfoCard from '../components/InfoCard';
import { getUiTexts, getDashboardData, getChartsConfig } from '../services/dataService';
import { FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      reductionEtp: { value: 63, unit: '%', description: 'Réduction moyenne des effectifs sur les métiers impactés', color: 'red' },
      productiviteDev: { value: 55, unit: '%', description: 'Gain de productivité des développeurs avec l\'IA', color: 'green', prefix: '+' },
      budgetsIa: { value: 81, unit: '%', description: 'Entreprises augmentant leur budget IA', color: 'blue', prefix: '+' },
      requalification: { value: 80, unit: '%', description: 'Effectifs à requalifier d\'ici 2027', color: 'purple' }
    },
    etpComparaison: [],
    budgetData: []
  });
  
  const [texts, setTexts] = useState({
    pages: {
      dashboard: {
        title: "Impact de l'IA sur les ESN",
        description: "Dashboard stratégique présentant l'impact de l'IA générative et agentique sur les métiers des ESN et l'évolution nécessaire de leur modèle d'affaires."
      }
    },
    components: {
      charts: {
        etpTitle: "Impact sur les ETP par métier",
        budgetsTitle: "Évolution des budgets IT clients"
      }
    }
  });
  
  const [chartsConfig, setChartsConfig] = useState({
    etpComparisonChart: {
      layout: "vertical",
      height: 480,
      domain: [0, 7]
    },
    budgetChart: {
      height: 480,
      domain: [0, 40]
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          <p className="text-blue-600">{texts.components.charts.etpAvant || "ETP avant IA"}: {formatNumber(payload[0].value)}</p>
          <p className="text-green-600">{texts.components.charts.etpApres || "ETP après IA"}: {formatNumber(payload[1].value)}</p>
          <p className="text-gray-700 font-bold">
            {texts.components.charts.reduction || "Réduction"}: {data.etpComparaison.find(item => item.name === label)?.reduction}
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les données
        const dashboardData = await getDashboardData();
        const uiTexts = await getUiTexts();
        const chartsCfg = await getChartsConfig();
        
        // Mettre à jour les états avec les données chargées
        if (dashboardData) setData(dashboardData);
        if (uiTexts) setTexts(uiTexts);
        if (chartsCfg) setChartsConfig(chartsCfg);
        
        setError(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Rendu pendant le chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  // Rendu en cas d'erreur
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <FaExclamationTriangle className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Erreur de chargement</h2>
          <p>Impossible de charger les données du dashboard.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Préparer les valeurs des StatCards
  const statCards = Object.entries(data.stats).map(([key, stat]) => ({
    key,
    title: texts.components.statCards?.[`${key}Title`] || stat.title || key,
    value: `${stat.prefix || ''}${stat.value}${stat.unit || ''}`,
    description: texts.components.statCards?.[`${key}Description`] || stat.description,
    color: stat.color
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">{texts.pages.dashboard.title}</h1>
        <p className="text-gray-600 max-w-3xl">
          {texts.pages.dashboard.description}
        </p>
      </div>

      {/* Statistiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(stat => (
          <StatCard 
            key={stat.key}
            title={stat.title} 
            value={stat.value} 
            description={stat.description}
            color={stat.color}
          />
        ))}
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title={texts.components.charts.etpTitle}>
          <div style={{ height: chartsConfig.etpComparisonChart?.height || '480px', width: '100%', padding: '0', margin: '0' }} className="w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data.etpComparaison} 
                layout={chartsConfig.etpComparisonChart?.layout || "vertical"}
                margin={{ 
                  left: 0, 
                  right: 30, 
                  top: 10, 
                  bottom: 10,
                  ...chartsConfig.etpComparisonChart?.margin 
                }}
              >
                <CartesianGrid strokeDasharray={chartsConfig.etpComparisonChart?.stroke || "3 3"} />
                <XAxis 
                  type="number" 
                  domain={chartsConfig.etpComparisonChart?.domain || [0, 7]} 
                  tickFormatter={formatNumber}
                  fontSize={12}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={chartsConfig.etpComparisonChart?.yAxisWidth || 105}
                  tick={{ fontSize: 12, fontWeight: 'bold' }}
                  tickMargin={5}
                />
                <Tooltip content={customTooltipETP} />
                <Legend 
                  wrapperStyle={{ paddingTop: 5 }} 
                  height={25}
                />
                <Bar 
                  dataKey="avant" 
                  name={texts.components.charts.etpAvant || "ETP avant IA"} 
                  fill={chartsConfig.etpComparisonChart?.bars?.[0]?.fill || "#8884d8"}
                >
                  <LabelList dataKey="avant" position="right" formatter={formatNumber} />
                </Bar>
                <Bar 
                  dataKey="apres" 
                  name={texts.components.charts.etpApres || "ETP après IA"} 
                  fill={chartsConfig.etpComparisonChart?.bars?.[1]?.fill || "#82ca9d"}
                >
                  <LabelList dataKey="apres" position="right" formatter={formatNumber} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InfoCard>

        <InfoCard title={texts.components.charts.budgetsTitle}>
          <div style={{ height: chartsConfig.budgetChart?.height || '480px', width: '100%', padding: '0', margin: '0' }} className="w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data.budgetData}
                margin={{ 
                  left: 0, 
                  right: 5, 
                  top: 10, 
                  bottom: 10,
                  ...chartsConfig.budgetChart?.margin 
                }}
              >
                <CartesianGrid strokeDasharray={chartsConfig.budgetChart?.stroke || "3 3"} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis 
                  domain={chartsConfig.budgetChart?.domain || [0, 40]} 
                  tick={{ fontSize: 12 }} 
                />
                <Tooltip />
                <Legend height={chartsConfig.budgetChart?.legendHeight || 25} wrapperStyle={{ paddingTop: 5 }} />
                <Bar 
                  dataKey="avant" 
                  name={texts.components.charts.budgetAvant || "Avant IA (%)"} 
                  fill={chartsConfig.budgetChart?.bars?.[0]?.fill || "#8884d8"} 
                />
                <Bar 
                  dataKey="apres" 
                  name={texts.components.charts.budgetApres || "Après IA (%)"} 
                  fill={chartsConfig.budgetChart?.bars?.[1]?.fill || "#82ca9d"} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InfoCard>
      </div>