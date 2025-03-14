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