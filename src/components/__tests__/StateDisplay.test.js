import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ajout de l'import pour les matchers personnalisés
import StateDisplay from '../StateDisplay';
import * as dataService from '../../services/dataService';

// Mock du service de données
jest.mock('../../services/dataService', () => ({
  getUiConfig: jest.fn()
}));

describe('StateDisplay Component', () => {
  // Configuration de test
  const mockConfig = {
    components: {
      stateDisplay: {
        themes: {
          default: {
            container: 'flex flex-col items-center justify-center',
            iconWrapper: 'mb-4',
            title: 'text-lg font-bold',
            message: 'text-base text-center',
            action: 'bg-blue-600 text-white'
          },
          minimal: {
            container: 'flex items-center',
            iconWrapper: 'mr-3',
            title: 'text-base font-semibold',
            message: 'text-sm',
            action: 'text-blue-600 underline'
          }
        },
        states: {
          loading: {
            default: {
              icon: 'FaSpinner',
              iconClass: 'animate-spin text-blue-600',
              title: 'Chargement test',
              message: 'Message de chargement test',
              containerClass: 'bg-blue-50'
            },
            minimal: {
              icon: 'FaSpinner',
              iconClass: 'animate-spin',
              message: 'Chargement minimal...',
              containerClass: 'bg-blue-50'
            }
          },
          error: {
            default: {
              icon: 'FaExclamationTriangle',
              iconClass: 'text-red-600',
              title: 'Erreur test',
              message: 'Message d\'erreur test',
              action: 'Réessayer test',
              containerClass: 'bg-red-50'
            }
          },
          empty: {
            default: {
              icon: 'FaFolder',
              iconClass: 'text-gray-400',
              title: 'Vide test',
              message: 'Aucune donnée test',
              containerClass: 'bg-gray-50'
            }
          },
          success: {
            default: {
              icon: 'FaCheckCircle',
              iconClass: 'text-green-600',
              title: 'Succès test',
              message: 'Opération réussie test',
              containerClass: 'bg-green-50'
            }
          }
        }
      }
    }
  };

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    // Mock de la fonction getUiConfig pour renvoyer la configuration de test
    dataService.getUiConfig.mockResolvedValue(mockConfig);
  });

  it('affiche un état de chargement initial pendant le chargement de la configuration', () => {
    render(<StateDisplay type="loading" />);
    expect(screen.getByText('Initialisation...')).toBeInTheDocument();
  });

  it('affiche correctement un état de chargement avec la configuration par défaut', async () => {
    render(<StateDisplay type="loading" />);
    
    await waitFor(() => {
      expect(screen.getByText('Chargement test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Message de chargement test')).toBeInTheDocument();
  });

  it('affiche correctement un état d\'erreur avec action', async () => {
    const handleRetry = jest.fn();
    
    render(
      <StateDisplay 
        type="error" 
        onAction={handleRetry}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Erreur test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Message d\'erreur test')).toBeInTheDocument();
    
    const actionButton = screen.getByText('Réessayer test');
    expect(actionButton).toBeInTheDocument();
    
    fireEvent.click(actionButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('affiche correctement un état vide', async () => {
    render(<StateDisplay type="empty" />);
    
    await waitFor(() => {
      expect(screen.getByText('Vide test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Aucune donnée test')).toBeInTheDocument();
  });

  it('affiche correctement un état de succès', async () => {
    render(<StateDisplay type="success" />);
    
    await waitFor(() => {
      expect(screen.getByText('Succès test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Opération réussie test')).toBeInTheDocument();
  });

  it('permet de personnaliser le message', async () => {
    const customMessage = "Message personnalisé de test";
    
    render(<StateDisplay type="loading" message={customMessage} />);
    
    await waitFor(() => {
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  it('permet de personnaliser le titre', async () => {
    const customTitle = "Titre personnalisé";
    
    render(<StateDisplay type="error" title={customTitle} />);
    
    await waitFor(() => {
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });
  });

  it('utilise le thème spécifié correctement', async () => {
    render(<StateDisplay type="loading" theme="minimal" />);
    
    await waitFor(() => {
      expect(screen.getByText('Chargement minimal...')).toBeInTheDocument();
    });
  });

  it('utilise la configuration de fallback en cas d\'erreur de chargement', async () => {
    // Simuler une erreur lors du chargement de la configuration
    dataService.getUiConfig.mockRejectedValue(new Error('Erreur de chargement config'));
    
    render(<StateDisplay type="loading" />);
    
    await waitFor(() => {
      // Les valeurs fallback sont différentes des valeurs de test
      expect(screen.queryByText('Chargement test')).not.toBeInTheDocument();
      // Utilisons le titre spécifique plutôt qu'une expression régulière
      expect(screen.getByText('Chargement en cours')).toBeInTheDocument();
    });
  });
});
