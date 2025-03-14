import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const ArchitectesImpact = () => {
  const [selectedArchitecte, setSelectedArchitecte] = useState('SI');
  
  // Définition des couleurs
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Données sur l'impact de l'IA par type d'architecte
  const impactData = [
    { 
      type: 'SI', 
      autoTaches: 35, 
      augmentation: 65, 
      reductionETP: 25, 
      description: "L'architecte SI voit son rôle évoluer vers une position plus stratégique avec l'IA. Son expertise en alignement business/IT devient cruciale pour intégrer les solutions d'IA dans une vision cohérente du système d'information.",
      definition: "Responsable de la vision globale du SI et de son alignement avec la stratégie de l'entreprise, l'architecte SI établit les standards, les principes directeurs et la feuille de route technologique de l'organisation.",
      activites: [
        { 
          nom: "Cartographie des processus métier et IT", 
          description: "Modélisation et documentation des processus business et leur relation avec les systèmes informatiques" 
        },
        { 
          nom: "Gouvernance du SI", 
          description: "Définition et application des règles et processus de gouvernance IT, gestion des comités d'architecture" 
        },
        { 
          nom: "Arbitrages technologiques", 
          description: "Évaluation et sélection des solutions et technologies stratégiques pour l'organisation" 
        },
        { 
          nom: "Planification des évolutions", 
          description: "Élaboration des roadmaps d'évolution du SI à court, moyen et long terme" 
        },
        { 
          nom: "Alignement stratégique", 
          description: "Garantir que les investissements IT sont alignés avec les objectifs stratégiques de l'entreprise" 
        }
      ],
      competences: [
        { name: "Gouvernance de l'IA", value: 85 },
        { name: "Vision stratégique", value: 90 },
        { name: "Alignement business/IT", value: 80 },
        { name: "Éthique et conformité", value: 75 },
        { name: "Orchestration des systèmes", value: 65 }
      ],
      taches: [
        { name: "Modélisation d'architecture", valeur: 45 },
        { name: "Documentation technique", valeur: 70 },
        { name: "Analyses d'impact", valeur: 30 },
        { name: "Gouvernance des données", valeur: 35 },
        { name: "Coordination des équipes", valeur: 25 }
      ]
    },
    { 
      type: 'Applicatif', 
      autoTaches: 40, 
      augmentation: 55, 
      reductionETP: 30,
      description: "L'architecte applicatif doit désormais maîtriser les patterns d'intégration des composants IA dans les applications. Sa valeur réside dans sa capacité à concevoir des systèmes modulaires où l'IA s'intègre naturellement.",
      definition: "Concepteur des solutions logicielles et de leurs interactions, l'architecte applicatif définit les structures techniques des applications et leurs patterns d'intégration.",
      activites: [
        { 
          nom: "Conception de systèmes", 
          description: "Élaboration de l'architecture technique des solutions applicatives et définition des patterns de conception" 
        },
        { 
          nom: "Définition des interfaces", 
          description: "Spécification des interfaces entre composants, services et applications" 
        },
        { 
          nom: "Choix techniques", 
          description: "Sélection des frameworks, librairies et technologies pour le développement des solutions" 
        },
        { 
          nom: "Documentation d'architecture", 
          description: "Création et maintenance des schémas et documentation technique des solutions" 
        },
        { 
          nom: "Revues de conception", 
          description: "Analyse et validation des conceptions proposées par les équipes de développement" 
        }
      ],
      competences: [
        { name: "Patterns d'IA", value: 85 },
        { name: "Intégration APIs", value: 90 },
        { name: "Design modulaire", value: 80 },
        { name: "Évaluation frameworks", value: 75 },
        { name: "Performance applicative", value: 70 }
      ],
      taches: [
        { name: "Conception technique", valeur: 50 },
        { name: "Définition d'interfaces", valeur: 65 },
        { name: "Choix technologiques", valeur: 35 },
        { name: "Documentation d'architecture", valeur: 75 },
        { name: "Revues de code", valeur: 30 }
      ]
    },
    { 
      type: 'Système', 
      autoTaches: 30, 
      augmentation: 60, 
      reductionETP: 20,
      description: "L'architecte système fait face à des défis d'infrastructure pour supporter les charges de calcul de l'IA. Son expertise devient essentielle pour dimensionner correctement les ressources nécessaires aux modèles d'IA.",
      definition: "Responsable de l'infrastructure technique et de sa performance, l'architecte système conçoit et optimise les plateformes d'exécution des applications.",
      activites: [
        { 
          nom: "Dimensionnement des infrastructures", 
          description: "Calcul et planification des ressources matérielles nécessaires pour les applications" 
        },
        { 
          nom: "Configuration des systèmes", 
          description: "Définition des paramètres optimaux pour les serveurs, stockage, et réseaux" 
        },
        { 
          nom: "Optimisation des performances", 
          description: "Analyse et amélioration des performances des infrastructures existantes" 
        },
        { 
          nom: "Supervision technique", 
          description: "Mise en place des systèmes de monitoring et supervision des plateformes techniques" 
        },
        { 
          nom: "Gestion de capacité", 
          description: "Planification et évolution des capacités des infrastructures pour anticiper les besoins futurs" 
        }
      ],
      competences: [
        { name: "Infrastructure IA", value: 90 },
        { name: "Scalabilité", value: 85 },
        { name: "Optimisation ressources", value: 80 },
        { name: "Sécurité systèmes", value: 75 },
        { name: "Monitoring avancé", value: 70 }
      ],
      taches: [
        { name: "Configuration infrastructure", valeur: 40 },
        { name: "Dimensionnement", valeur: 30 },
        { name: "Documentation système", valeur: 75 },
        { name: "Audits de performance", valeur: 35 },
        { name: "Résolution d'incidents", valeur: 25 }
      ]
    },
    { 
      type: 'Cloud', 
      autoTaches: 45, 
      augmentation: 70, 
      reductionETP: 15,
      description: "L'architecte cloud devient un pilier stratégique avec l'IA. Son expertise dans l'optimisation des coûts et le déploiement de services managés d'IA est particulièrement valorisée pour exploiter le plein potentiel du cloud.",
      definition: "Expert en solutions d'infrastructure distribuée et services cloud, l'architecte cloud conçoit des architectures évolutives, résilientes et optimisées pour le cloud.",
      activites: [
        { 
          nom: "Design d'architecture cloud", 
          description: "Conception d'infrastructures cloud natives multi-tenants et hautement disponibles" 
        },
        { 
          nom: "Optimisation des coûts", 
          description: "Analyse et rationalisation des dépenses liées aux services cloud (FinOps)" 
        },
        { 
          nom: "Automatisation de l'infrastructure", 
          description: "Mise en place de l'Infrastructure as Code et des pipelines d'automatisation" 
        },
        { 
          nom: "Stratégie multi-cloud", 
          description: "Définition et mise en œuvre de stratégies d'orchestration multi-fournisseurs cloud" 
        },
        { 
          nom: "Sécurisation des environnements", 
          description: "Implémentation des mécanismes de sécurité spécifiques aux environnements cloud" 
        }
      ],
      competences: [
        { name: "Services managés IA", value: 95 },
        { name: "Optimisation coûts", value: 85 },
        { name: "Multi-cloud", value: 80 },
        { name: "Infrastructure as Code", value: 75 },
        { name: "Sécurité cloud", value: 85 }
      ],
      taches: [
        { name: "Design d'infrastructure", valeur: 45 },
        { name: "Scripts IaC", valeur: 60 },
        { name: "Optimisation ressources", valeur: 35 },
        { name: "Documentation cloud", valeur: 70 },
        { name: "Audits de sécurité", valeur: 30 }
      ]
    }
  ];
  
  // Données pour les projections temporelles
  const projectionData = {
    SI: [
      { year: "2 ans", augmentation: 65, autoTaches: 35, reductionETP: 25 },
      { year: "5 ans", augmentation: 80, autoTaches: 45, reductionETP: 35 },
      { year: "10 ans", augmentation: 90, autoTaches: 60, reductionETP: 40 }
    ],
    Applicatif: [
      { year: "2 ans", augmentation: 55, autoTaches: 40, reductionETP: 30 },
      { year: "5 ans", augmentation: 70, autoTaches: 55, reductionETP: 45 },
      { year: "10 ans", augmentation: 85, autoTaches: 65, reductionETP: 50 }
    ],
    Système: [
      { year: "2 ans", augmentation: 60, autoTaches: 30, reductionETP: 20 },
      { year: "5 ans", augmentation: 75, autoTaches: 45, reductionETP: 30 },
      { year: "10 ans", augmentation: 85, autoTaches: 55, reductionETP: 35 }
    ],
    Cloud: [
      { year: "2 ans", augmentation: 70, autoTaches: 45, reductionETP: 15 },
      { year: "5 ans", augmentation: 85, autoTaches: 60, reductionETP: 25 },
      { year: "10 ans", augmentation: 95, autoTaches: 70, reductionETP: 30 }
    ]
  };

  // Recommandations de formation pour chaque type d'architecte
  const formationData = {
    SI: [
      "Gouvernance de l'IA pour les architectes",
      "Éthique et réglementation de l'IA",
      "Alignement stratégique business/IT à l'ère de l'IA",
      "Gestion de la transformation digitale par l'IA",
      "Leadership technologique et innovation"
    ],
    Applicatif: [
      "Patterns d'architecture pour l'IA",
      "Intégration des LLMs dans les applications",
      "Design de microservices pour systèmes IA",
      "CI/CD pour applications IA",
      "Architecture event-driven pour systèmes prédictifs"
    ],
    Système: [
      "Infrastructure optimisée pour l'IA",
      "Scalabilité des systèmes à forte charge computationnelle",
      "Monitoring et observabilité avancés",
      "Orchestration de conteneurs pour workloads IA",
      "Systèmes distribués pour l'inférence IA"
    ],
    Cloud: [
      "Services managés d'IA dans le cloud",
      "Optimisation des coûts d'inférence et d'entraînement",
      "Architecture multi-cloud pour l'IA",
      "Infrastructure as Code avancée",
      "Sécurisation des environnements cloud d'IA"
    ]
  };
  
  // Compétences transversales communes à tous les architectes
  const competencesTransversales = [
    "Pensée systémique",
    "Communication et vulgarisation",
    "Veille technologique",
    "Gestion de l'incertitude",
    "Collaboration interdisciplinaire"
  ];

  // Fonctions utilitaires pour formater les données
  const formatPercent = (value) => `${value}%`;
  
  // Filtres pour afficher les données du type d'architecte sélectionné
  const selectedData = impactData.find(item => item.type === selectedArchitecte);
  const selectedProjections = projectionData[selectedArchitecte];
  const selectedFormations = formationData[selectedArchitecte];
  
  // Fonction pour générer un CustomTooltip pour les graphiques
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Impact de l'IA sur les Architectes Informatiques</h1>
        <Link 
          to="/architectes-documentation" 
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Sources et méthodologie
        </Link>
      </div>
      
      {/* Section d'introduction */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Transformation des métiers d'architectes</h2>
        <p className="mb-4">
          L'intelligence artificielle transforme profondément les métiers d'architectes informatiques. Entre automatisation de certaines tâches
          et valorisation de nouvelles compétences, chaque spécialisation d'architecte fait face à sa propre évolution.
        </p>
        <p className="mb-4">
          Cette étude analyse l'impact spécifique de l'IA sur six profils d'architectes: Système d'Information (SI), Applicatif, Système, Cloud, 
          Données et Sécurité, avec des projections à 2, 5 et 10 ans.
        </p>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">Points clés à retenir :</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Les architectes données et cloud sont les plus valorisés par l'essor de l'IA</li>
            <li>Les tâches documentaires sont les plus susceptibles d'être automatisées (60-75%)</li>
            <li>La valeur ajoutée se déplace vers l'orchestration des systèmes et l'éthique</li>
            <li>Une réduction globale de 5-30% des ETP selon les spécialisations est anticipée</li>
            <li>La majorité des architectes devront monter en compétence sur les technologies IA</li>
          </ul>
        </div>
      </div>
      
      {/* Sélecteur de type d'architecte */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Sélectionnez un type d'architecte :</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactData.map((item) => (
            <button
              key={item.type}
              className={`py-2 px-4 rounded-md transition-colors ${
                selectedArchitecte === item.type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedArchitecte(item.type)}
            >
              Architecte {item.type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Présentation du profil sélectionné */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Architecte {selectedArchitecte}</h2>
        
        {/* Définition du rôle - Nouveau */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-lg mb-2 text-blue-800">Définition du rôle</h3>
          <p className="text-gray-800">{selectedData.definition}</p>
        </div>
        
        {/* Description de l'impact de l'IA */}
        <p className="mb-6">{selectedData.description}</p>
        
        {/* Activités et tâches quotidiennes - Nouveau */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4 text-blue-700">Activités et tâches quotidiennes</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {selectedData.activites.map((activite, index) => (
              <div key={index} className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <h4 className="font-medium text-blue-600">{activite.nom}</h4>
                <p className="text-gray-700 mt-1">{activite.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg mb-2 text-blue-800">Tâches automatisables</h3>
            <div className="flex items-center justify-center">
              <div className="text-4xl font-bold text-blue-700">{selectedData.autoTaches}%</div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg mb-2 text-green-800">Augmentation de productivité</h3>
            <div className="flex items-center justify-center">
              <div className="text-4xl font-bold text-green-700">{selectedData.augmentation}%</div>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg mb-2 text-red-800">Réduction potentielle ETP</h3>
            <div className="flex items-center justify-center">
              <div className="text-4xl font-bold text-red-700">{selectedData.reductionETP}%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Graphiques d'analyse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Graphique des compétences clés */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-blue-700">Compétences clés émergentes</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <RadarChart data={selectedData.competences}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis domain={[0, 100]} tickFormatter={formatPercent} />
                <Radar name="Importance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip formatter={formatPercent} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Graphique d'automatisation des tâches */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6 text-blue-700">Potentiel d'automatisation par tâche</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart
                data={selectedData.taches}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={formatPercent} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={formatPercent} />
                <Bar dataKey="valeur" fill="#82ca9d">
                  <LabelList dataKey="valeur" position="right" formatter={formatPercent} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Projections à 2, 5 et 10 ans */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Projections à 2, 5 et 10 ans</h2>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={selectedProjections}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatPercent} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="augmentation" name="Augmentation productivité" fill="#82ca9d" />
              <Bar dataKey="autoTaches" name="Automatisation des tâches" fill="#8884d8" />
              <Bar dataKey="reductionETP" name="Réduction potentielle ETP" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recommandations pour le développement professionnel */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Recommandations de formation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Formations spécifiques</h3>
            <ul className="list-disc ml-6 space-y-2">
              {selectedFormations.map((formation, index) => (
                <li key={index} className="text-gray-800">{formation}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Compétences transversales</h3>
            <ul className="list-disc ml-6 space-y-2">
              {competencesTransversales.map((competence, index) => (
                <li key={index} className="text-gray-800">{competence}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Lien vers la documentation */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">
            Pour en savoir plus sur la méthodologie et les sources utilisées pour cette étude :
          </p>
        </div>
        <Link 
          to="/architectes-documentation" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Consulter la documentation
        </Link>
      </div>
    </div>
  );
};

export default ArchitectesImpact;