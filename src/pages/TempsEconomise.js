import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';

const TempsEconomise = () => {
  // Données pour le graphique de comparaison temps IA vs humain
  const comparaisonTempsData = [
    { name: 'Conception et design', humain: 7, ia: 0.5 },
    { name: 'Structure et navigation', humain: 3, ia: 0.3 },
    { name: 'Pages interactives', humain: 14, ia: 1.5 },
    { name: 'Composants réutilisables', humain: 3, ia: 0.2 },
    { name: 'Données et recherche', humain: 9, ia: 0.8 },
    { name: 'Tests et finalisation', humain: 6, ia: 0.5 },
  ];

  // Données pour le diagramme en camembert des différentes phases
  const repartitionTaches = [
    { name: 'Conception et design', value: 7, color: '#8884d8' },
    { name: 'Structure et navigation', value: 3, color: '#83a6ed' },
    { name: 'Pages interactives', value: 14, color: '#8dd1e1' },
    { name: 'Composants réutilisables', value: 3, color: '#82ca9d' },
    { name: 'Données et recherche', value: 9, color: '#a4de6c' },
    { name: 'Tests et finalisation', value: 6, color: '#d0ed57' },
  ];

  // Statistiques de productivité
  const productiviteData = [
    { label: "Temps humain estimé", value: "38-40 jours" },
    { label: "Temps avec IA", value: "~4 heures" },
    { label: "Facteur d'accélération", value: "~80x" },
    { label: "Économie de ressources", value: "~97%" },
  ];

  // Calcul du total des jours
  const totalJours = comparaisonTempsData.reduce((sum, item) => sum + item.humain, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Productivité développement avec IA</h1>
        <p className="text-gray-600 max-w-3xl">
          Analyse comparative du temps de développement humain vs IA pour créer cette application, démontrant 
          le potentiel de transformation du développement logiciel par l'IA.
        </p>
      </div>

      {/* Statistiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productiviteData.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.label} 
            value={stat.value}
            color={index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'purple' : 'red'}
          />
        ))}
      </div>

      {/* Graphique de comparaison */}
      <InfoCard title="Comparaison du temps de développement (jours)">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparaisonTempsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} jours`, null]} />
            <Legend />
            <Bar dataKey="humain" name="Développement humain" fill="#8884d8" />
            <Bar dataKey="ia" name="Développement avec IA" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </InfoCard>

      {/* Répartition des tâches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Répartition des jours de développement humain">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={repartitionTaches}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${Math.round(percent * 100)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {repartitionTaches.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} jours (${Math.round(value / totalJours * 100)}%)`, null]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </InfoCard>

        <InfoCard title="Implication pour les ESN" bgColor="blue">
          <div className="space-y-4">
            <p className="text-gray-700">
              L'utilisation de l'IA pour le développement d'applications a des implications profondes pour les 
              Entreprises de Services Numériques (ESN) :
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <span className="font-medium">Réduction drastique des délais de livraison</span> : 
                Les projets qui nécessitaient des semaines peuvent maintenant être livrés en quelques jours, 
                voire quelques heures.
              </li>
              <li>
                <span className="font-medium">Transformation du modèle économique</span> : 
                Le modèle de facturation à la journée devient moins pertinent quand la productivité 
                est multipliée par 80.
              </li>
              <li>
                <span className="font-medium">Valeur ajoutée repositionnée</span> : 
                La valeur se déplace de la production de code vers la stratégie, 
                l'architecture, et l'expertise métier.
              </li>
              <li>
                <span className="font-medium">Démocratisation du développement</span> : 
                Des non-spécialistes peuvent désormais créer des applications complexes 
                avec l'assistance de l'IA.
              </li>
            </ul>
          </div>
        </InfoCard>
      </div>

      {/* Détail de la répartition */}
      <InfoCard title="Détail de l'estimation jours-hommes">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phase
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tâches
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jours (fourchette)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moyenne
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Conception et design</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Conception fonctionnelle et architecture</li>
                    <li>Maquettes et design UI/UX</li>
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-7 jours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6 jours</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Structure et navigation</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Configuration du projet React</li>
                    <li>Structure de base et navigation</li>
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3 jours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.5 jours</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pages interactives</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Dashboard principal avec graphiques</li>
                    <li>Pages métiers, benchmarks et stratégie</li>
                    <li>Fonctionnalités interactives</li>
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11-15 jours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13 jours</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Données et recherche</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Recherche et analyse données</li>
                    <li>Structuration des informations</li>
                    <li>Intégration aux visualisations</li>
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7-12 jours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9.5 jours</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tests et finalisation</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    <li>Tests fonctionnels</li>
                    <li>Corrections et ajustements</li>
                    <li>Optimisation</li>
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-8 jours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6.5 jours</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TOTAL</td>
                <td className="px-6 py-4 text-sm text-gray-500"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">30-45 jours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">38 jours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoCard>

      {/* Conclusion */}
      <InfoCard bgColor="gray">
        <div className="text-center p-4">
          <h3 className="text-xl font-bold mb-2">Conclusion</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Cette application est une preuve concrète du potentiel transformateur de l'IA dans le développement 
            logiciel. Un projet qui aurait nécessité plus d'un mois-homme a été réalisé en quelques heures, 
            démontrant l'ampleur du changement auquel font face les ESN et l'ensemble du secteur IT.
          </p>
        </div>
      </InfoCard>
    </div>
  );
};

export default TempsEconomise;
