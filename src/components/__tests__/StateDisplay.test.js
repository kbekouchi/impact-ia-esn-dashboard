import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StateDisplay from '../StateDisplay';
import { getUiConfig, getErrorMessages } from '../../services/dataService';

// Mock du service de données
jest.mock('../../services/dataService', () => ({
  getUiConfig: jest.fn(),
  getErrorMessages: jest.fn()
}));

// Configuration de test pour le service de données
const mockConfig = {
  components: {
    stateDisplay: {
      container: {
        base: 'test-container',
        fullHeight: 'test-full-height',
        autoHeight: 'test-auto-height'
      },
      states: {
        loading: {
          icon: {
            component: 'spinner',
            size: 'test-size',
            color: 'test-color',
            animation: 'test-animation',
            classes: 'test-icon-classes'
          },
          text: {
            classes: 'test-text-classes',
            messageKey: 'data.loading'
          }
        },
        error: {
          icon: {
            component: 'exclamation-triangle',
            size: 'test-size',
            color: 'test-color',
            classes: 'test-icon-classes'
          },
          title: {
            classes: 'test-title-classes',
            messageKey: 'generic.error'
          },
          text: {
            classes: 'test-text-classes',
            messageKey: 'data.loadError'
          },
          action: {
            type: 'button',
            classes: 'test-button-classes',
            labelKey: 'data.retry',
            action: 'reload'
          }
        },
        empty: {
          icon: {
            component: 'folder-open',
            classes: 'test-icon-classes'
          },
          text: {
            classes: 'test-text-classes',
            messageKey: 'data.noData'
          }
        },
        success: {
          icon: {
            component: 'check-circle',
            classes: 'test-icon-classes'
          },
          text: {
            classes: 'test-text-classes',
            messageKey: 'actions.saveSuccess'
          }
        }
      },
      themes: {
        minimal: {
          container: {
            base: 'test-minimal-container',
            fullHeight: '',
            autoHeight: ''
          }
        }
      }
    }
  }
};

const mockMessages = {
  data: {
    loading: 'Test loading message',
    loadError: 'Test error message',
    retry: 'Test retry',
    noData: 'Test no data message'
  },
  generic: {
    error: 'Test error title',
    success: 'Test success'
  },
  actions: {
    saveSuccess: 'Test success message'
  }
};

describe('StateDisplay Component', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    
    // Configurer les mocks pour renvoyer les données de test
    getUiConfig.mockResolvedValue(mockConfig);
    getErrorMessages.mockResolvedValue(mockMessages);
  });
  
  it('affiche un état de chargement minimal pendant le chargement de la configuration', async () => {
    render(<StateDisplay />);
    
    // Pendant que la configuration se charge, un indicateur de chargement est affiché
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });
  
  it('affiche correctement l\'état de chargement', async () => {
    render(<StateDisplay state="loading" />);
    
    // Attendre que le composant se mette à jour avec la configuration
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le message de chargement est affiché
    expect(screen.getByText('Test loading message')).toBeInTheDocument();
  });
  
  it('affiche correctement l\'état d\'erreur', async () => {
    render(<StateDisplay state="error" />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le titre et le message d'erreur sont affichés
    expect(screen.getByText('Test error title')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    
    // Vérifier que le bouton d'action est présent
    expect(screen.getByText('Test retry')).toBeInTheDocument();
  });
  
  it('appelle la fonction onAction lorsque le bouton d\'action est cliqué', async () => {
    const mockOnAction = jest.fn();
    render(<StateDisplay state="error" onAction={mockOnAction} />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Cliquer sur le bouton d'action
    fireEvent.click(screen.getByText('Test retry'));
    
    // Vérifier que la fonction onAction a été appelée
    expect(mockOnAction).toHaveBeenCalled();
  });
  
  it('affiche correctement l\'état vide', async () => {
    render(<StateDisplay state="empty" />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le message d'état vide est affiché
    expect(screen.getByText('Test no data message')).toBeInTheDocument();
  });
  
  it('affiche correctement l\'état de succès', async () => {
    render(<StateDisplay state="success" />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le message de succès est affiché
    expect(screen.getByText('Test success message')).toBeInTheDocument();
  });
  
  it('utilise le message personnalisé lorsqu\'il est fourni', async () => {
    const customMessage = 'Message personnalisé';
    render(<StateDisplay state="loading" message={customMessage} />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le message personnalisé est utilisé
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
  
  it('utilise le thème minimal lorsqu\'il est spécifié', async () => {
    render(<StateDisplay state="loading" theme="minimal" />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le conteneur utilise les classes du thème minimal
    const container = screen.getByText('Test loading message').closest('div');
    expect(container).toHaveClass('test-minimal-container');
  });
  
  it('gère correctement le cas où la configuration n\'est pas trouvée', async () => {
    // Simuler une configuration incomplète
    getUiConfig.mockResolvedValue({});
    
    render(<StateDisplay state="loading" />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Le composant devrait quand même s'afficher sans erreur
    expect(screen.getByText('Test loading message')).toBeInTheDocument();
  });
  
  it('gère correctement le cas où les messages ne sont pas trouvés', async () => {
    // Simuler des messages manquants
    getErrorMessages.mockResolvedValue({});
    
    render(<StateDisplay state="loading" />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Le composant devrait s'afficher sans message
    const container = screen.getByRole('generic');
    expect(container).toBeInTheDocument();
  });
  
  it('applique la classe fullHeight lorsque fullHeight=true', async () => {
    render(<StateDisplay state="loading" fullHeight={true} />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que la classe fullHeight est appliquée
    const container = screen.getByText('Test loading message').closest('div');
    expect(container).toHaveClass('test-full-height');
  });
  
  it('applique la classe autoHeight lorsque fullHeight=false', async () => {
    render(<StateDisplay state="loading" fullHeight={false} />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que la classe autoHeight est appliquée
    const container = screen.getByText('Test loading message').closest('div');
    expect(container).toHaveClass('test-auto-height');
  });
  
  it('utilise le titre personnalisé lorsqu\'il est fourni', async () => {
    const customTitle = 'Titre personnalisé';
    render(<StateDisplay state="error" title={customTitle} />);
    
    await waitFor(() => {
      expect(getUiConfig).toHaveBeenCalled();
      expect(getErrorMessages).toHaveBeenCalled();
    });
    
    // Vérifier que le titre personnalisé est utilisé
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });
});
