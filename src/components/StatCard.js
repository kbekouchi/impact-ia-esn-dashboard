import React, { useState, useEffect } from 'react';
import { getUiConfig, getUiTexts } from '../services/dataService';

const StatCard = ({ title, value, description, color = 'blue' }) => {
  const [config, setConfig] = useState({
    colors: {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700'
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700'
      }
    }
  });

  const [texts, setTexts] = useState({
    components: {
      statCards: {}
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chargement de la configuration
        const uiConfig = await getUiConfig();
        if (uiConfig && uiConfig.components && uiConfig.components.statCard) {
          setConfig(uiConfig.components.statCard);
        }

        // Chargement des textes
        const uiTexts = await getUiTexts();
        if (uiTexts && uiTexts.components && uiTexts.components.statCards) {
          setTexts(uiTexts);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des configurations :', error);
        // Garder la configuration par défaut en cas d'erreur
      }
    };

    fetchData();
  }, []);

  // Utilisation des couleurs depuis la configuration ou fallback sur les couleurs par défaut
  const colorConfig = config.colors[color] || config.colors.blue;
  const bgClass = colorConfig ? colorConfig.bg : 'bg-blue-50';
  const borderClass = colorConfig ? colorConfig.border : 'border-blue-200';
  const textClass = colorConfig ? colorConfig.text : 'text-blue-700';

  // Chercher si un titre/description existe dans les textes de l'application
  const titleKey = title.toLowerCase().replace(/\s+/g, '') + 'Title';
  const descriptionKey = title.toLowerCase().replace(/\s+/g, '') + 'Description';
  
  const translatedTitle = texts.components.statCards[titleKey] || title;
  const translatedDescription = texts.components.statCards[descriptionKey] || description;

  return (
    <div className={`rounded-lg border p-4 ${bgClass} ${borderClass} shadow-sm`}>
      <h3 className={`text-lg font-medium ${textClass}`}>{translatedTitle}</h3>
      <div className={`mt-2 text-3xl font-bold ${textClass}`}>{value}</div>
      {translatedDescription && (
        <p className="mt-2 text-sm opacity-80">{translatedDescription}</p>
      )}
    </div>
  );
};

export default StatCard;