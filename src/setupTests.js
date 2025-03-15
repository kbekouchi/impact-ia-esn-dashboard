// Configuration pour les tests Jest
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configuration globale pour les tests
configure({ testIdAttribute: 'data-testid' });

