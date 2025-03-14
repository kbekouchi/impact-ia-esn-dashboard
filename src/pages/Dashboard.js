import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import StatCard from '../components/StatCard';
import InfoCard from '../components/InfoCard';
import StateDisplay from '../components/StateDisplay';
import { getUiTexts, getDashboardData, getChartsConfig } from '../services/dataService';

const Dashboard = () => {
  const [data, setData] = useState({
    stats: {
      reductionEtp: { value: 63, unit: '%', description: 'Réduction moyenne des effectifs sur les métiers impactés', color: 'red' },
      productiviteDev: { value: 55, unit: '%', description: 'Gain de productivité des développeurs avec l\'IA', color: 'green', prefix: '+' },
      budgetsIa: { value: 81, unit: '%', description: 'Entreprises augmentant leur budget IA', color: 'blue', prefix: '+' },
      requalification: { value: 80, unit: '%', description: 'Effectifs à requalifier d\'ici 2027', color: 'purple' }
    },
    etpComparaison: [],
    budgetData: [],
    highlightedContent: {},
    quickLinks: []
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

  // Rendu pendant le chargement ou en cas d'erreur avec le nouveau composant StateDisplay
  if (loading) {
    return <StateDisplay state="loading" />;
  }

  if (error) {
    return <StateDisplay state="error" onAction={() => window.location.reload()} />;
  }

  // Préparer les valeurs des StatCards
  const statCards = Object.entries(data.stats).map(([key, stat]) => ({
    key,
    title: texts.components.statCards?.[`${key}Title`] || stat.title || key,
    value: `${stat.prefix || ''}${stat.value}${stat.unit || ''}`,
    description: texts.components.statCards?.[`${key}Description`] || stat.description,
    color: stat.color
  }));

  // Vérifier si les données essentielles sont vides
  const isDataEmpty = data.etpComparaison.length === 0 && data.budgetData.length === 0;
  
  if (isDataEmpty) {
    return <StateDisplay state="empty" />;
  }

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
          {data.etpComparaison.length > 0 ? (
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
          ) : (
            <StateDisplay state="empty" theme="minimal" fullHeight={false} />
          )}
        </InfoCard>

        <InfoCard title={texts.components.charts.budgetsTitle}>
          {data.budgetData.length > 0 ? (
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
          ) : (
            <StateDisplay state="empty" theme="minimal" fullHeight={false} />
          )}
        </InfoCard>
      </div>

      {/* Nouvelle étude sur les architectes - Section mise en avant */}
      {data.highlightedContent?.architectesStudy && (
        <InfoCard 
          title={data.highlightedContent.architectesStudy.title} 
          bgColor={data.highlightedContent.architectesStudy.bgColor || "amber"}
        >
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="pr-4 mb-4 md:mb-0">
              <p className="mb-4 text-gray-800 font-medium">
                <span className="bg-yellow-200 px-2 py-1 rounded-md text-sm font-bold mr-2">
                  {data.highlightedContent.architectesStudy.badge}
                </span>
                {data.highlightedContent.architectesStudy.description}
              </p>
              <p className="mb-4 text-gray-600">
                {data.highlightedContent.architectesStudy.details}
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
                {data.highlightedContent.architectesStudy.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <Link 
              to={data.highlightedContent.architectesStudy.linkUrl} 
              className="btn-primary whitespace-nowrap bg-amber-600 hover:bg-amber-700"
            >
              {data.highlightedContent.architectesStudy.linkText}
            </Link>
          </div>
        </InfoCard>
      )}

      {/* Sections principales - Accès rapide */}
      {data.quickLinks && data.quickLinks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.quickLinks.map((link, index) => (
            <InfoCard key={index} title={link.title} bgColor={link.bgColor}>
              <p className="mb-4 text-gray-600">
                {link.description}
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
                {link.features?.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <Link to={link.linkUrl} className="btn-primary inline-block">
                {link.linkText}
              </Link>
            </InfoCard>
          ))}
        </div>
      )}

      {/* Productivité IA vs humain */}
      {data.highlightedContent?.productivityComparison && (
        <InfoCard 
          title={data.highlightedContent.productivityComparison.title} 
          bgColor={data.highlightedContent.productivityComparison.bgColor || "indigo"}
        >
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="pr-4">
              <p className="mb-4 text-gray-600">
                {data.highlightedContent.productivityComparison.description}
              </p>
              <p className="text-gray-600">
                {data.highlightedContent.productivityComparison.details}
              </p>
            </div>
            <Link 
              to={data.highlightedContent.productivityComparison.linkUrl} 
              className="mt-4 md:mt-0 btn-primary whitespace-nowrap"
            >
              {data.highlightedContent.productivityComparison.linkText}
            </Link>
          </div>
        </InfoCard>
      )}

      {/* Méthodologie */}
      <InfoCard 
        title={texts.pages.dashboard?.sections?.methodologie?.title || "Méthodologie et Sources"} 
        bgColor="gray"
      >
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="pr-4">
            <p className="mb-4 text-gray-600">
              {texts.pages.dashboard?.sections?.methodologie?.description || 
                "Cette étude s'appuie sur des sources reconnues issues de cabinets de conseil et d'études sectorielles (McKinsey, Gartner, WEF, BCG) et intègre les dernières données disponibles sur l'impact de l'IA sur le secteur des services numériques."}
            </p>
            <p className="text-gray-600">
              {texts.pages.dashboard?.sections?.methodologie?.details || 
                "Notre approche méthodologique combine une analyse quantitative des impacts sur les effectifs et la productivité avec une analyse qualitative des transformations des métiers et des modèles d'affaires."}
            </p>
          </div>
          <Link 
            to="/methodologie" 
            className="mt-4 md:mt-0 btn-primary whitespace-nowrap"
          >
            {texts.pages.dashboard?.sections?.methodologie?.buttonText || "Consulter les sources"}
          </Link>
        </div>
      </InfoCard>
    </div>
  );
};

export default Dashboard;