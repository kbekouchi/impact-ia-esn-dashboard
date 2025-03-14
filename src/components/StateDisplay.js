import React, { useEffect, useState } from 'react';
import { 
  FaSpinner, 
  FaExclamationTriangle, 
  FaExclamation,
  FaCheckCircle, 
  FaFolderOpen
} from 'react-icons/fa';
import { getUiConfig, getErrorMessages } from '../services/dataService';

/**
 * Composant générique pour afficher les différents états (chargement, erreur, vide, succès)
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.state - L'état à afficher ('loading', 'error', 'empty', 'success')
 * @param {string} props.message - Message personnalisé (remplace celui par défaut)
 * @param {string} props.title - Titre personnalisé (remplace celui par défaut)
 * @param {Function} props.onAction - Fonction à exécuter lorsque l'utilisateur clique sur le bouton d'action
 * @param {boolean} props.fullHeight - Si vrai, prend toute la hauteur disponible
 * @param {string} props.theme - Thème à utiliser ('default', 'minimal', 'card')
 */
const StateDisplay = ({ 
  state = 'loading', 
  message, 
  title,
  onAction,
  fullHeight = true, 
  theme = 'default'
}) => {
  const [config, setConfig] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Charger la configuration et les messages
        const uiConfig = await getUiConfig();
        const errorMessages = await getErrorMessages();
        
        setConfig(uiConfig.components.stateDisplay);
        setMessages(errorMessages);
      } catch (error) {
        console.error("Erreur lors du chargement de la configuration:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // Si la configuration n'est pas encore chargée, afficher un état de chargement minimal
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" />
        <span>Chargement...</span>
      </div>
    );
  }

  // Obtenir la configuration pour l'état spécifié
  const getStateConfig = () => {
    // Appliquer le thème si spécifié
    const themeConfig = theme !== 'default' && config.themes?.[theme] 
      ? config.themes[theme] 
      : {};
    
    // Fusionner la configuration de base avec celle du thème
    const baseConfig = config.states[state] || {};
    const themeStateConfig = themeConfig.states?.[state] || {};
    
    return {
      container: {
        ...config.container,
        ...themeConfig.container
      },
      ...baseConfig,
      ...themeStateConfig
    };
  };

  // Obtenir le message à partir de la clé ou utiliser le message personnalisé
  const getMessage = (messageKey, defaultMessage = '') => {
    if (message) return message;
    
    if (!messageKey || !messages) return defaultMessage;
    
    // Parcourir les niveaux du messageKey (ex: "data.loading")
    const keys = messageKey.split('.');
    let result = messages;
    
    for (const key of keys) {
      if (!result || !result[key]) return defaultMessage;
      result = result[key];
    }
    
    return result;
  };

  // Obtenir le titre à partir de la clé ou utiliser le titre personnalisé
  const getTitle = (titleConfig) => {
    if (title) return title;
    if (!titleConfig || !titleConfig.messageKey) return '';
    return getMessage(titleConfig.messageKey);
  };

  // Rendre l'icône en fonction de la configuration
  const renderIcon = (iconConfig) => {
    if (!iconConfig) return null;
    
    let IconComponent;
    
    // Sélectionner le composant d'icône
    switch (iconConfig.component) {
      case 'spinner':
        IconComponent = FaSpinner;
        break;
      case 'exclamation-triangle':
        IconComponent = FaExclamationTriangle;
        break;
      case 'exclamation':
        IconComponent = FaExclamation;
        break;
      case 'check-circle':
        IconComponent = FaCheckCircle;
        break;
      case 'folder-open':
        IconComponent = FaFolderOpen;
        break;
      default:
        IconComponent = FaSpinner;
    }
    
    // Assembler les classes
    const iconClasses = [
      iconConfig.size, 
      iconConfig.color, 
      iconConfig.animation, 
      iconConfig.classes
    ].filter(Boolean).join(' ');
    
    return <IconComponent className={iconClasses} />;
  };

  // Rendre le bouton d'action si configuré
  const renderAction = (actionConfig) => {
    if (!actionConfig) return null;
    
    const handleClick = () => {
      if (actionConfig.action === 'reload') {
        window.location.reload();
      }
      
      if (onAction) {
        onAction();
      }
    };
    
    return (
      <button 
        className={actionConfig.classes} 
        onClick={handleClick}
      >
        {getMessage(actionConfig.labelKey, 'Action')}
      </button>
    );
  };

  // Obtenir la configuration complète pour cet état
  const stateConfig = getStateConfig();
  
  // Assembler les classes du conteneur
  const containerClasses = [
    stateConfig.container?.base,
    fullHeight ? stateConfig.container?.fullHeight : stateConfig.container?.autoHeight
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {renderIcon(stateConfig.icon)}
      
      {stateConfig.title && (
        <h2 className={stateConfig.title.classes}>
          {getTitle(stateConfig.title)}
        </h2>
      )}
      
      {stateConfig.text && (
        <p className={stateConfig.text.classes}>
          {getMessage(stateConfig.text.messageKey)}
        </p>
      )}
      
      {renderAction(stateConfig.action)}
    </div>
  );
};

export default StateDisplay;