import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils'; // Correction de l'import de act
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
    
    // Supprimer les erreurs de console pour le test simulant une erreur de chargement
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    // Restaurer les mocks de console après chaque test
    console.error.mockRestore();
  });

  it('affiche un état de chargement initial pendant le chargement de la configuration', async () => {
    // Bloquer la résolution de la promesse pour maintenir l'état de chargement
    let resolvePromise;
    dataService.getUiConfig.mockImplementation(() => new Promise(resolve => {
      resolvePromise = resolve; // On ne résout pas immédiatement la promesse
    }));
    
    // Utiliser act pour envelopper l'opération de rendu
    await act(async () => {
      render(<StateDisplay type="loading" />);
    });
    
    // Pendant que la promesse n'est pas résolue, on devrait voir l'état initial
    expect(screen.getByText(/initialisation/i)).toBeInTheDocument();
    
    // Résoudre la promesse pour permettre aux autres tests de continuer
    await act(async () => {
      resolvePromise(mockConfig);
    });
  });

  it('affiche correctement un état de chargement avec la configuration par défaut', async () => {
    // Retarder la résolution de la promesse pour tester l'état de chargement
    let resolvePromise;
    dataService.getUiConfig.mockImplementation(() => new Promise(resolve => {
      resolvePromise = () => resolve(mockConfig);
    }));
    
    await act(async () => {
      render(<StateDisplay type="loading" />);
    });
    
    // Résoudre la promesse et attendre que les mises à jour du DOM soient terminées
    await act(async () => {
      resolvePromise();
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Maintenant vérifier que l'état a été mis à jour
    expect(screen.getByText('Chargement test')).toBeInTheDocument();
    expect(screen.getByText('Message de chargement test')).toBeInTheDocument();
  });

  it('affiche correctement un état d\'erreur avec action', async () => {
    const handleRetry = jest.fn();
    
    await act(async () => {
      render(
        <StateDisplay 
          type="error" 
          onAction={handleRetry}
        />
      );
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Attendre que la configuration soit chargée et que le composant soit mis à jour
    await waitFor(() => {
      expect(screen.getByText('Erreur test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Message d\'erreur test')).toBeInTheDocument();
    
    const actionButton = screen.getByText('Réessayer test');
    expect(actionButton).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(actionButton);
    });
    
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('affiche correctement un état vide', async () => {
    await act(async () => {
      render(<StateDisplay type="empty" />);
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Vide test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Aucune donnée test')).toBeInTheDocument();
  });

  it('affiche correctement un état de succès', async () => {
    await act(async () => {
      render(<StateDisplay type="success" />);
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Succès test')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Opération réussie test')).toBeInTheDocument();
  });

  it('permet de personnaliser le message', async () => {
    const customMessage = "Message personnalisé de test";
    
    await act(async () => {
      render(<StateDisplay type="loading" message={customMessage} />);
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    await waitFor(() => {
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  it('permet de personnaliser le titre', async () => {
    const customTitle = "Titre personnalisé";
    
    await act(async () => {
      render(<StateDisplay type="error" title={customTitle} />);
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    await waitFor(() => {
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });
  });

  it('utilise le thème spécifié correctement', async () => {
    await act(async () => {
      render(<StateDisplay type="loading" theme="minimal" />);
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Chargement minimal...')).toBeInTheDocument();
    });
  });

  it('utilise la configuration de fallback en cas d\'erreur de chargement', async () => {
    // Simuler une erreur lors du chargement de la configuration
    dataService.getUiConfig.mockRejectedValue(new Error('Erreur de chargement config'));
    
    // Masquer temporairement l'erreur de console pendant ce test
    console.error.mockImplementation(() => {});
    
    await act(async () => {
      render(<StateDisplay type="loading" />);
      // Attendre que les mises à jour asynchrones se terminent
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Utiliser waitFor avec un timeout plus long pour s'assurer que le fallback est chargé
    await waitFor(() => {
      // Vérifier que le composant a correctement basculé vers la configuration de fallback
      expect(screen.queryByText('Chargement test')).not.toBeInTheDocument();
      const headings = screen.getAllByRole('heading');
      const chargementHeading = headings.find(heading => heading.textContent.toLowerCase().includes('chargement'));
      expect(chargementHeading).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
