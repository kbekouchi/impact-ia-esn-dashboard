import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';
import { metiersData, tendancesTransversales } from '../data/metiersData';

const MetiersTransformation = () => {
  const [selectedMetier, setSelectedMetier] = useState('developpeur');
  const metierInfo = metiersData[selectedMetier];

  // Données pour les courbes
  const colors = {
    developpeur: 'blue',
    businessAnalyst: 'purple',
    architecte: 'green',
    testeur: 'red'
  };

  const handleMetierChange = (metier) => {
    setSelectedMetier(metier);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Transformation des métiers par l'IA</h1>
        <p className="text-gray-600 max-w-3xl">
          Analyse détaillée de l'impact de l'IA sur les métiers clés des ESN, avec comparaison 
          des ETP avant/après et projections futures.
        </p>
      </div>

      {/* Graphique de comparaison ETP */}
      <InfoCard title="Évolution des ETP par métier">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metiersData.etpComparaison} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 7]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="avant" name="ETP avant IA" fill="#8884d8" />
            <Bar dataKey="apres" name="ETP après IA" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </InfoCard>

      {/* Onglets des métiers */}
      <div className="border-b">
        <div className="flex flex-wrap -mb-px">
          <button
            className={`inline-block py-4 px-6 text-sm font-medium ${
              selectedMetier === 'developpeur'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleMetierChange('developpeur')}
          >
            Développeur
          </button>
          <button
            className={`inline-block py-4 px-6 text-sm font-medium ${
              selectedMetier === 'businessAnalyst'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleMetierChange('businessAnalyst')}
          >
            Business Analyst
          </button>
          <button
            className={`inline-block py-4 px-6 text-sm font-medium ${
              selectedMetier === 'architecte'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleMetierChange('architecte')}
          >
            Architecte
          </button>
          <button
            className={`inline-block py-4 px-6 text-sm font-medium ${
              selectedMetier === 'testeur'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleMetierChange('testeur')}
          >
            Testeur
          </button>
        </div>
      </div>

      {/* Détails du métier sélectionné */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <InfoCard title={metierInfo.title} bgColor={colors[selectedMetier]}>
            <p className="mb-6 text-gray-700">{metierInfo.description}</p>
            <div className="space-y-3">
              {metierInfo.stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">{stat.label}</span>
                  <span className="font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <InfoCard title="Transformations actuelles">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {metierInfo.transformations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </InfoCard>
            <InfoCard title="Projections à 5 ans">
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {metierInfo.projections.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>
      </div>

      {/* Tendances transversales */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6">Tendances transversales à tous les métiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard title="Compétences émergentes essentielles" bgColor="blue">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {tendancesTransversales.competences.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Transformation des équipes" bgColor="purple">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {tendancesTransversales.equipes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Défis de la transition" bgColor="yellow">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {tendancesTransversales.defis.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default MetiersTransformation;
