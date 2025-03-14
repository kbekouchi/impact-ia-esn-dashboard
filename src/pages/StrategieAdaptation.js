import React from 'react';
import InfoCard from '../components/InfoCard';
import StatCard from '../components/StatCard';
// Importation du service de données au lieu des données directement
import { getAdaptationStrategique } from '../services/dataService';
import { FaCheck, FaExclamationTriangle, FaClock, FaChartLine } from 'react-icons/fa';

const StrategieAdaptation = () => {
  // Récupération des données via le service
  const adaptationStrategique = getAdaptationStrategique();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Stratégie d'adaptation</h1>
        <p className="text-gray-600 max-w-3xl">
          Recommandations stratégiques pour les ESN face à la transformation du modèle d'affaires
          induite par l'IA, avec une feuille de route d'adaptation concrète.
        </p>
      </div>

      {/* Statistiques clés de projection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adaptationStrategique.projections.map((projection, idx) => (
          <StatCard 
            key={idx}
            title={projection.label} 
            value={projection.value}
            color={idx === 0 ? 'red' : idx === 1 ? 'green' : idx === 2 ? 'blue' : 'purple'}
          />
        ))}
      </div>

      {/* Évolution du modèle économique */}
      <InfoCard title="Évolution du modèle économique" bgColor="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-700">Du temps passé à la valeur</h3>
            <p className="text-gray-700 mb-4">
              Le modèle traditionnel des ESN basé sur la vente de temps-homme (TJM) est menacé par l'augmentation 
              considérable de la productivité apportée par l'IA. L'évolution vers un modèle basé sur la valeur 
              est désormais incontournable.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {adaptationStrategique.modeleEconomique.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="font-bold text-red-700 flex items-center gap-2">
                <FaExclamationTriangle /> Risque d'inaction
              </h4>
              <p className="text-gray-700 mt-2">
                Les ESN qui n'adaptent pas leur modèle économique risquent une forte érosion de leurs marges 
                et une perte de compétitivité face aux acteurs innovants qui adopteront des modèles basés 
                sur la valeur ajoutée et les gains de productivité.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-700 flex items-center gap-2">
                <FaCheck /> Opportunité de différenciation
              </h4>
              <p className="text-gray-700 mt-2">
                Les premiers acteurs à transformer leur modèle économique bénéficieront d'un avantage concurrentiel 
                significatif et pourront capturer une part importante du marché de la transformation par l'IA, estimé 
                à plusieurs milliards d'euros d'ici 2027.
              </p>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* Feuille de route stratégique */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Feuille de route stratégique 2024-2027</h2>
        <div className="space-y-6">
          <InfoCard title="Phase 1: Audit et préparation (6-12 mois)" bgColor="yellow">
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-yellow-600">
                <FaClock className="text-4xl" />
              </div>
              <div className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Cartographie des compétences</span> et identification des gaps</li>
                  <li><span className="font-medium">Formations pilotes</span> sur les outils IA pour développeurs, BA et testeurs</li>
                  <li><span className="font-medium">Définition des nouveaux rôles</span> : Prompt Engineer, AI Trainer, etc.</li>
                  <li><span className="font-medium">Lancement de projets pilotes</span> avec facturation à la valeur</li>
                  <li><span className="font-medium">Audit des offres actuelles</span> et identification des opportunités d'IA</li>
                </ul>
                <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <h4 className="font-medium text-amber-800">KPIs de réussite</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• 20% des équipes formées aux outils IA</li>
                    <li>• 5 projets pilotes à facturation basée sur la valeur</li>
                    <li>• Plans de développement compétences pour 100% des collaborateurs</li>
                  </ul>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Phase 2: Transformation du delivery (12-24 mois)" bgColor="blue">
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-blue-600">
                <FaChartLine className="text-4xl" />
              </div>
              <div className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Formation massive</span> des développeurs, testeurs et BA (80% des effectifs)</li>
                  <li><span className="font-medium">Création d'un Centre d'Excellence IA</span> avec experts sectoriels</li>
                  <li><span className="font-medium">Refonte des méthodologies projet</span> intégrant l'IA à chaque étape</li>
                  <li><span className="font-medium">Développement d'actifs propriétaires</span> : prompts spécialisés, outils IA sectoriels</li>
                  <li><span className="font-medium">Refonte des modèles de pricing</span> : forfaits, abonnements, success fees</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <h4 className="font-medium text-blue-800">KPIs de réussite</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• 80% des projets intégrant les outils IA</li>
                    <li>• 30% du CA généré par de nouveaux modèles de facturation</li>
                    <li>• 15 actifs propriétaires IA développés</li>
                  </ul>
                </div>
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Phase 3: Nouveau modèle d'affaires (24-36 mois)" bgColor="green">
            <div className="flex gap-6">
              <div className="flex-shrink-0 text-green-600">
                <FaCheck className="text-4xl" />
              </div>
              <div className="flex-grow">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><span className="font-medium">Transformation complète de l'offre</span> autour de l'IA et la valeur ajoutée</li>
                  <li><span className="font-medium">Lancements de plateformes IA as a Service</span> par secteur</li>
                  <li><span className="font-medium">Abandon progressif du modèle TJM</span> au profit de forfaits et success fees</li>
                  <li><span className="font-medium">Écosystème de partenaires IA</span> avec fournisseurs de modèles et startups</li>
                  <li><span className="font-medium">Organisation centrée sur la valeur</span> plutôt que les effectifs</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
                  <h4 className="font-medium text-green-800">KPIs de réussite</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• 70% du CA issu des nouveaux modèles de facturation</li>
                    <li>• 30% des revenus générés par des actifs propriétaires</li>
                    <li>• Marge opérationnelle supérieure à 15%</li>
                  </ul>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>

      {/* Facteurs clés de succès */}
      <InfoCard title="Facteurs clés de succès" bgColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-100">
            <h3 className="text-lg font-bold mb-3 text-purple-800">Leadership & Vision</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Engagement fort du COMEX</li>
              <li>Vision claire et ambitieuse</li>
              <li>Communication transparente</li>
              <li>Exemple par l'action</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-100">
            <h3 className="text-lg font-bold mb-3 text-purple-800">Transformation RH</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Plan de formation massif</li>
              <li>Nouveaux parcours de carrière</li>
              <li>Recrutement de profils hybrides</li>
              <li>Évolution des critères d'évaluation</li>
            </ul>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-100">
            <h3 className="text-lg font-bold mb-3 text-purple-800">Investissements R&D</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>3-5% du CA consacré à l'IA</li>
              <li>Développement d'actifs propriétaires</li>
              <li>Partenariats académiques</li>
              <li>Acquisitions stratégiques</li>
            </ul>
          </div>
        </div>
      </InfoCard>

      {/* Conclusion */}
      <InfoCard bgColor="gray">
        <div className="text-center py-2">
          <h3 className="text-xl font-bold mb-4">Une transformation inéluctable et urgente</h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Les ESN qui réussiront cette transformation émergeront comme les leaders de demain,
            tandis que celles qui tarderont à s'adapter risquent de voir leur modèle d'affaires
            fondamentalement remis en question. L'heure n'est plus à la réflexion mais à l'action.
          </p>
        </div>
      </InfoCard>
    </div>
  );
};

export default StrategieAdaptation;
