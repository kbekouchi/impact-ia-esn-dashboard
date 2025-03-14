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
    },
    { 
      type: 'Données', 
      autoTaches: 55, 
      augmentation: 75, 
      reductionETP: 10,
      description: "L'architecte données se trouve au centre de la révolution IA. Son rôle évolue vers la conception de pipelines de données optimisés pour l'IA et la gouvernance des données d'entraînement et d'inférence.",
      definition: "Responsable de l'organisation et de l'exploitation des données de l'entreprise, l'architecte données conçoit les structures permettant de collecter, stocker, traiter et valoriser les données.",
      activites: [
        { 
          nom: "Modélisation des données", 
          description: "Conception des modèles de données relationnels et non-relationnels, définition des ontologies" 
        },
        { 
          nom: "Conception de pipelines", 
          description: "Élaboration des chaînes de traitement pour le mouvement et la transformation des données (ETL/ELT)" 
        },
        { 
          nom: "Gouvernance des données", 
          description: "Définition des règles de qualité, conformité, et cycle de vie des données" 
        },
        { 
          nom: "Ingénierie de la qualité", 
          description: "Mise en place des mécanismes de contrôle et d'amélioration de la qualité des données" 
        },
        { 
          nom: "Stratégie data", 
          description: "Élaboration des approches pour la valorisation des données et leur exploitation par les métiers" 
        }
      ],
      competences: [
        { name: "Pipelines IA", value: 95 },
        { name: "Gouvernance données", value: 90 },
        { name: "Qualité des données", value: 85 },
        { name: "Modélisation avancée", value: 80 },
        { name: "Éthique & Biais", value: 85 }
      ],
      taches: [
        { name: "Modélisation de données", valeur: 55 },
        { name: "ETL/ELT", valeur: 70 },
        { name: "Documentation data", valeur: 65 },
        { name: "Contrôles qualité", valeur: 40 },
        { name: "Gestion des métadonnées", valeur: 35 }
      ]
    },
    { 
      type: 'Sécurité', 
      autoTaches: 25, 
      augmentation: 80, 
      reductionETP: 5,
      description: "L'architecte sécurité voit son rôle se renforcer avec l'IA. Il doit désormais comprendre les nouvelles vulnérabilités spécifiques aux systèmes d'IA et développer des stratégies de protection adaptées.",
      definition: "Garant de la protection des SI et de la conformité, l'architecte sécurité élabore la stratégie de sécurité et définit les mesures techniques et organisationnelles pour protéger les systèmes.",
      activites: [
        { 
          nom: "Définition des politiques", 
          description: "Élaboration des politiques, standards et procédures de sécurité de l'information" 
        },
        { 
          nom: "Évaluation des risques", 
          description: "Identification et classification des risques de sécurité, définition des plans de traitement" 
        },
        { 
          nom: "Conformité réglementaire", 
          description: "Vérification de la conformité aux réglementations (RGPD, PCI-DSS, etc.) et préparation aux audits" 
        },
        { 
          nom: "Architecture de sécurité", 
          description: "Conception des architectures de protection (IAM, cryptographie, segmentation réseau, etc.)" 
        },
        { 
          nom: "Gestion des incidents", 
          description: "Définition des procédures de détection et de réponse aux incidents de sécurité" 
        }
      ],
      competences: [
        { name: "Sécurité des modèles IA", value: 90 },
        { name: "Protection des données", value: 95 },
        { name: "Détection avancée", value: 85 },
        { name: "Conformité IA", value: 80 },
        { name: "Gestion des risques", value: 90 }
      ],
      taches: [
        { name: "Audits de sécurité", valeur: 30 },
        { name: "Documentation sécurité", valeur: 75 },
        { name: "Tests de pénétration", valeur: 40 },
        { name: "Gestion des incidents", valeur: 20 },
        { name: "Veille sécurité", valeur: 25 }
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
    ],
    Données: [
      { year: "2 ans", augmentation: 75, autoTaches: 55, reductionETP: 10 },
      { year: "5 ans", augmentation: 90, autoTaches: 70, reductionETP: 20 },
      { year: "10 ans", augmentation: 95, autoTaches: 80, reductionETP: 25 }
    ],
    Sécurité: [
      { year: "2 ans", augmentation: 80, autoTaches: 25, reductionETP: 5 },
      { year: "5 ans", augmentation: 90, autoTaches: 35, reductionETP: 10 },
      { year: "10 ans", augmentation: 95, autoTaches: 45, reductionETP: 15 }
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
    ],
    Données: [
      "Architecture des pipelines de données pour l'IA",
      "Gouvernance des données d'entraînement",
      "Feature stores et Feature engineering",
      "Data mesh et architecture décentralisée",
      "MLOps et automatisation des flux de données"
    ],
    Sécurité: [
      "Sécurité des modèles d'IA",
      "Protection contre les attaques adversariales",
      "Sécurisation des données d'entraînement",
      "Détection d'anomalies basée sur l'IA",
      "Conformité et audit des systèmes d'IA"
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
