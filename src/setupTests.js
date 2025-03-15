// Fichier: src/setupTests.js
// Import nécessaire pour les matchers comme toBeInTheDocument()
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configuration globale pour les tests
configure({ testIdAttribute: 'data-testid' });
