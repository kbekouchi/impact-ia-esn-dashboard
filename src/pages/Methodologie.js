import React from 'react';
import InfoCard from '../components/InfoCard';

const Methodologie = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Méthodologie et Sources</h1>
        <p className="text-gray-600 max-w-3xl">
          Présentation de la démarche d'analyse et des sources utilisées pour l'étude de l'impact de l'IA
          sur les métiers des ESN et l'évolution nécessaire des modèles d'affaires.
        </p>
      </div>

      {/* Démarche d'analyse */}
      <InfoCard title="Démarche d'analyse" bgColor="blue">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-blue-800">Approche méthodologique</h3>
          <p className="text-gray-700">
            L'analyse de l'impact de l'IA sur les ESN a été réalisée selon une approche multidimensionnelle
            combinant des données quantitatives d'études sectorielles et des analyses qualitatives 
            des transformations en cours. La méthodologie s'est appuyée sur :
          </p>
          <ol className="list-decimal pl-8 space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Analyse des études récentes (2023-2024)</span> de cabinets 
              de conseil reconnus (McKinsey, Gartner, BCG) sur l'impact de l'IA générative et agentique 
              sur les activités de service numérique.
            </li>
            <li>
              <span className="font-medium">Benchmarking des stratégies</span> des ESN leaders (Capgemini, 
              Accenture, Sopra Steria) face à la transformation IA.
            </li>
            <li>
              <span className="font-medium">Estimation des impacts quantitatifs</span> sur les effectifs 
              et la productivité par métier, en s'appuyant sur les données d'études spécifiques.
            </li>
            <li>
              <span className="font-medium">Analyse des budgets IT</span> et de leur évolution face à 
              l'intégration de l'IA générative dans les entreprises.
            </li>
            <li>
              <span className="font-medium">Élaboration de recommandations stratégiques</span> pour les 
              ESN basées sur les tendances observées et les facteurs de succès identifiés.
            </li>
          </ol>
        </div>
      </InfoCard>

      {/* Sources clés */}
      <InfoCard title="Sources principales" bgColor="gray">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Études McKinsey</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                "The economic potential of generative AI: The next productivity frontier" (2023)
                <div className="text-sm text-gray-500 mt-1">
                  Source des données sur l'automatisation de 25-30% des fonctions IT, l'augmentation de la productivité 
                  de 0,5 à 0,9 points par an et les projections économiques globales.
                </div>
              </li>
              <li>
                "Generative AI and the future of work in America" (2023)
                <div className="text-sm text-gray-500 mt-1">
                  Source des données sur l'impact de l'IA générative sur les métiers spécifiques, notamment 
                  la projection d'automatisation de 30% des activités d'ici 2030.
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Études Gartner</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                "Tendances IT 2024" (Le Monde Informatique, 2024)
                <div className="text-sm text-gray-500 mt-1">
                  Source des données sur l'adoption de l'IA générative par les entreprises et la prévision 
                  que 80% des entreprises utiliseront l'IA générative d'ici 2026.
                </div>
              </li>
              <li>
                "Prévisions de Gartner sur l'IA générative pour 2024-2028" (2023)
                <div className="text-sm text-gray-500 mt-1">
                  Source des projections sur les tendances d'adoption de l'IA et les impacts économiques associés.
                </div>
              </li>
              <li>
                "IA générative et logiciels d'entreprise" (2023)
                <div className="text-sm text-gray-500 mt-1">
                  Données sur l'intégration de l'IA dans les outils d'entreprise et impact sur les modèles économiques.
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">World Economic Forum</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                "Future of Jobs Report 2023"
                <div className="text-sm text-gray-500 mt-1">
                  Source des données sur la transformation de 23% des emplois dans les 5 prochaines années 
                  et la projection que 39% des compétences de base devront évoluer d'ici 2030.
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Études GitHub / Microsoft Research</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023)
                <div className="text-sm text-gray-500 mt-1">
                  Source des données sur la réduction de 55% du temps de codage et l'augmentation de productivité 
                  des développeurs utilisant des outils d'IA générative.
                </div>
              </li>
              <li>
                "Research: quantifying GitHub Copilot's impact on developer productivity and happiness" (2022-2023)
                <div className="text-sm text-gray-500 mt-1">
                  Données sur l'automatisation de 30-40% du code et l'impact sur les métiers du développement.
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Autres sources sectorielles</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                "Étude : les 50 outils d'IA générative les plus utilisés en 2024" (Blog du Modérateur, 2024)
                <div className="text-sm text-gray-500 mt-1">
                  Source de la donnée indiquant que 40% des solutions d'IA pour le développement sont 
                  apparues depuis 2023, démontrant l'accélération du secteur.
                </div>
              </li>
              <li>
                "Tendances et perspectives numériques - Bilan 2023 et prévision 2024" (Numeum, 2024)
                <div className="text-sm text-gray-500 mt-1">
                  Source des données sur la croissance des segments du secteur numérique : Éditeurs (+10,3%), 
                  Conseil en technologies (+5,5%), ESN traditionnelles (+4,1%).
                </div>
              </li>
              <li>
                "IA générative : quels impacts en entreprise ?" (Bpifrance, 2023)
                <div className="text-sm text-gray-500 mt-1">
                  Données sur l'adoption de l'IA par les entreprises françaises et les impacts observés.
                </div>
              </li>
              <li>
                "L'intelligence artificielle (IA) dans la gestion de projet" (The Team, 2023)
                <div className="text-sm text-gray-500 mt-1">
                  Source d'informations sur l'impact de l'IA sur les méthodologies projet et les équipes.
                </div>
              </li>
              <li>
                "Boston Consulting Group - IA générative : quel impact sur la performance au travail ?" (2023)
                <div className="text-sm text-gray-500 mt-1">
                  Source de la donnée indiquant un gain de productivité de 37% pour les business analysts 
                  utilisant l'IA générative.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </InfoCard>

      {/* Données ESN Leaders */}
      <InfoCard title="Données sur les stratégies des ESN leaders" bgColor="purple">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-purple-800">Initiatives stratégiques documentées</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Capgemini</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  "Capgemini va investir 2 milliards d'euros pour accélérer dans l'intelligence artificielle" 
                  (L'Usine Nouvelle, 2023)
                </li>
                <li>
                  "L'IA générative dans les organisations en 2024" (Capgemini, 2024)
                </li>
                <li>
                  "Résultats du 1er semestre 2024" (Capgemini, 2024)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Accenture</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  Communiqués financiers et stratégiques d'Accenture (2023-2024)
                </li>
                <li>
                  "Accenture dédie 3 milliards de dollars à l'IA" (Analyse des rapports annuels, 2023)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Sopra Steria</h4>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  "Classement 2024 des ESN et ICT : Sopra Steria détrône SCC France" (IT for Business, 2024)
                </li>
                <li>
                  "Sopra Steria, croissance au 1er semestre" (Solutions Numériques, 2023)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* Limitations de l'étude */}
      <InfoCard title="Limitations et considérations méthodologiques" bgColor="yellow">
        <div className="space-y-4">
          <p className="text-gray-700">
            Bien que cette analyse s'appuie sur des données issues d'études réputées, plusieurs limitations 
            doivent être prises en compte pour une interprétation juste des résultats :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Projections d'impact sur les effectifs :</span> Les estimations 
              de réduction d'ETP sont des moyennes sectorielles et peuvent varier considérablement selon 
              les spécificités des ESN (taille, positionnement, secteurs clients).
            </li>
            <li>
              <span className="font-medium">Temporalité :</span> L'adoption de l'IA générative étant récente, 
              les projections à 3-5 ans comportent une marge d'incertitude significative.
            </li>
            <li>
              <span className="font-medium">Hybridation métiers :</span> L'évolution des métiers IT se caractérise 
              par une hybridation croissante qui peut rendre moins pertinente l'analyse par métier "traditionnel".
            </li>
            <li>
              <span className="font-medium">Données quantitatives :</span> Certaines données sur l'impact 
              productif de l'IA proviennent d'études de cas spécifiques et leur généralisation doit être 
              considérée avec prudence.
            </li>
            <li>
              <span className="font-medium">Évolution rapide des technologies :</span> La rapidité d'évolution 
              des technologies d'IA pourrait accélérer ou modifier substantiellement les impacts estimés.
            </li>
          </ul>
        </div>
      </InfoCard>
    </div>
  );
};

export default Methodologie;
