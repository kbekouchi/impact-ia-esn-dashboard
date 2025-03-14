import React, { useState, useEffect } from 'react';
import { getUiConfig } from '../services/dataService';

const InfoCard = ({ title, children, bgColor = 'white' }) => {
  const [config, setConfig] = useState({
    colors: {
      white: 'bg-white',
      blue: 'bg-blue-50',
      green: 'bg-green-50',
      purple: 'bg-purple-50',
      yellow: 'bg-yellow-50',
      amber: 'bg-amber-50',
      red: 'bg-red-50',
      gray: 'bg-gray-50',
      indigo: 'bg-indigo-50'
    },
    spacing: {
      padding: 'p-6',
      titleMargin: 'mb-4',
      contentSpacing: 'space-y-4'
    }
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const uiConfig = await getUiConfig();
        if (uiConfig && uiConfig.components && uiConfig.components.infoCard) {
          setConfig(uiConfig.components.infoCard);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration UI :', error);
        // Garder la configuration par défaut en cas d'erreur
      }
    };

    fetchConfig();
  }, []);

  const bgClass = config.colors[bgColor] || config.colors.white;
  const paddingClass = config.spacing ? config.spacing.padding : 'p-6';
  const titleMarginClass = config.spacing ? config.spacing.titleMargin : 'mb-4';

  return (
    <div className={`${bgClass} rounded-lg ${paddingClass} shadow-md`}>
      {title && <h2 className={`text-xl font-bold ${titleMarginClass}`}>{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default InfoCard;