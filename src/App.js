import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MetiersTransformation from './pages/MetiersTransformation';
import BenchmarksEconomiques from './pages/BenchmarksEconomiques';
import StrategieAdaptation from './pages/StrategieAdaptation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="metiers-transformation" element={<MetiersTransformation />} />
        <Route path="benchmarks-economiques" element={<BenchmarksEconomiques />} />
        <Route path="strategie-adaptation" element={<StrategieAdaptation />} />
      </Route>
    </Routes>
  );
}

export default App;
