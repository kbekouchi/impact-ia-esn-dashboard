import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUiConfig } from '../services/dataService';
import { 
  FaSpinner, 
  FaExclamationTriangle, 
  FaFolder, 
  FaCheckCircle 
} from 'react-icons/fa';

/**
 * Composant générique pour afficher les différents états de l'application
 * (chargement, erreur, vide, succès) de manière standardisée et configurable.
 *
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.type - Le type d'état à afficher ('loading', 'error', 'empty', 'success')
 * @param {string} [props.theme='default'] - Le thème à utiliser ('default', 'minimal', 'card')
 * @param {string} [props.message] - Message personnalisé (remplace celui par défaut)
 * @param {string} [props.title] - Titre personnalisé (remplace celui par défaut)
 * @param {Function} [props.onAction] - Fonction à exécuter lors du clic sur le bouton d'action
 * @param {string} [props.actionText] - Texte du bouton d'action (remplace celui par défaut)
 * @param {string} [props.className] - Classes CSS supplémentaires pour le conteneur
 * @returns {JSX.Element} Composant d'affichage d'état
 */
const StateDisplay = ({ 
  type = 'loading', 
  theme = 'default', 
  message, 
  title, 
  onAction, 
  actionText, 
  className = '' 
}) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Chargement de la configuration depuis le service de données
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const uiConfig = await getUiConfig();
        setConfig(uiConfig.components?.stateDisplay);
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration StateDisplay:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Configuration par défaut en cas d'échec de chargement
  const fallbackConfig = {
    themes: {
      default: {
        container: 'flex flex-col items-center justify-center p-4 rounded-lg min-h-[200px]',
        iconWrapper: 'mb-4',
        title: 'text-lg font-bold mb-2',
        message: 'text-base text-center mb-4',
        action: 'inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
      }
    },
    states: {
      loading: {
        default: {
          icon: 'FaSpinner',
          iconClass: 'animate-spin text-3xl text-blue-600',
          title: 'Chargement en cours',
          message: 'Veuillez patienter pendant le chargement des données.',
          containerClass: 'bg-blue-50'
        }
      },
      error: {
        default: {
          icon: 'FaExclamationTriangle',
          iconClass: 'text-3xl text-red-600',
          title: 'Erreur',
          message: 'Une erreur est survenue lors du chargement des données.',
          action: 'Réessayer',
          containerClass: 'bg-red-50'
        }
      },
      empty: {
        default: {
          icon: 'FaFolder',
          iconClass: 'text-3xl text-gray-400',
          title: 'Aucune donnée',
          message: 'Aucune donnée disponible pour le moment.',
          containerClass: 'bg-gray-50'
        }
      },
      success: {
        default: {
          icon: 'FaCheckCircle',
          iconClass: 'text-3xl text-green-600',
          title: 'Succès',
          message: 'L\'opération a été effectuée avec succès.',
          containerClass: 'bg-green-50'
        }
      }
    }
  };

  // Utiliser la configuration chargée ou la configuration par défaut
  const stateConfig = config || fallbackConfig;

  // S'assurer que le type et le thème sont valides
  const validType = stateConfig.states[type] ? type : 'loading';
  const validTheme = stateConfig.themes[theme] && stateConfig.states[validType][theme] 
    ? theme 
    : 'default';

  // Obtenir les configurations du thème et de l'état
  const themeConfig = stateConfig.themes[validTheme];
  const stateTypeConfig = stateConfig.states[validType][validTheme];

  // Fusionner les classes CSS
  const containerClasses = `${themeConfig.container} ${stateTypeConfig.containerClass || ''} ${className}`;
  const iconWrapperClasses = `${themeConfig.iconWrapper} ${stateTypeConfig.iconWrapperClass || ''}`;
  const titleClasses = themeConfig.title;
  const messageClasses = themeConfig.message;
  const actionClasses = `${themeConfig.action} ${stateTypeConfig.actionClass || ''}`;

  // Récupérer l'icône appropriée
  const getIcon = () => {
    switch (stateTypeConfig.icon) {
      case 'FaSpinner':
        return <FaSpinner className={stateTypeConfig.iconClass} />;
      case 'FaExclamationTriangle':
        return <FaExclamationTriangle className={stateTypeConfig.iconClass} />;
      case 'FaFolder':
        return <FaFolder className={stateTypeConfig.iconClass} />;
      case 'FaCheckCircle':
        return <FaCheckCircle className={stateTypeConfig.iconClass} />;
      default:
        return <FaSpinner className={stateTypeConfig.iconClass} />;
    }
  };

  // Affichage pendant le chargement de la configuration elle-même
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-3xl text-blue-600 mx-auto mb-4" />
          <p>Initialisation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className={iconWrapperClasses}>
        {getIcon()}
      </div>
      
      {(title || stateTypeConfig.title) && (
        <h3 className={titleClasses}>
          {title || stateTypeConfig.title}
        </h3>
      )}
      
      <p className={messageClasses}>
        {message || stateTypeConfig.message}
      </p>
      
      {(onAction && (actionText || stateTypeConfig.action)) && (
        <button 
          onClick={onAction}
          className={actionClasses}
        >
          {actionText || stateTypeConfig.action}
        </button>
      )}
    </div>
  );
};

StateDisplay.propTypes = {
  type: PropTypes.oneOf(['loading', 'error', 'empty', 'success']),
  theme: PropTypes.oneOf(['default', 'minimal', 'card']),
  message: PropTypes.string,
  title: PropTypes.string,
  onAction: PropTypes.func,
  actionText: PropTypes.string,
  className: PropTypes.string
};

export default StateDisplay;