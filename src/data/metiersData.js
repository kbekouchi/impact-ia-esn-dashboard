// Données sur la transformation des métiers IT par l'IA
export const metiersData = {
  // Données pour les graphiques comparatifs ETP avant/après IA
  etpComparaison: [
    { 
      name: 'Développeur', 
      avant: 6.5,  // moyenne 5-8 développeurs
      apres: 2.5,  // moyenne 2-3 développeurs
      reduction: '60%' 
    },
    { 
      name: 'Business Analyst', 
      avant: 2.5,  // moyenne 2-3 analystes
      apres: 1, 
      reduction: '60%' 
    },
    { 
      name: 'Testeur', 
      avant: 3.5,  // moyenne 3-4 testeurs pour 10 développeurs
      apres: 1, 
      reduction: '70%' 
    },
    { 
      name: 'Architecte', 
      avant: 1, 
      apres: 0.33,  // 1 architecte pour 3 projets en moyenne
      reduction: '+200% périmètre' 
    },
  ],

  // Données sur les gains de productivité par métier
  productivityData: [
    { name: 'Développeur', value: 55 },
    { name: 'Business Analyst', value: 37 },
    { name: 'Testeur', value: 65 },
    { name: 'Architecte', value: 40 },
  ],

  // Détails sur la transformation de chaque métier
  developpeur: {
    title: "Développeur",
    description: "Le métier de développeur est fortement transformé par l'automatisation du code et l'assistance au debugging.",
    stats: [
      { label: "Réduction temps codage", value: "55%" },
      { label: "Code automatisé", value: "30-40%" },
      { label: "Avant IA", value: "5-8 dév./projet" },
      { label: "Après IA", value: "2-3 dév./projet" },
      { label: "Réduction effectifs", value: "-60%" },
    ],
    transformations: [
      "Automatisation du code de base (GitHub Copilot, CodeWhisperer)",
      "Debugging assisté par IA",
      "Documentation automatisée",
      "Réduction des tâches à faible valeur ajoutée",
      "Focus sur l'intégration et l'architecture",
      "Adoption massive avec 40% des solutions apparues depuis 2023"
    ],
    projections: [
      "Développeur augmenté collaborant avec l'IA",
      "Paradigme de programmation dirigé par prompts",
      "Spécialisation dans les domaines complexes",
      "Transition vers une expertise architecturale",
      "Requalification nécessaire pour 80% des développeurs"
    ]
  },

  businessAnalyst: {
    title: "Business Analyst",
    description: "Le métier de Business Analyst évolue vers un rôle plus stratégique avec l'IA qui prend en charge l'analyse documentaire.",
    stats: [
      { label: "Gain productivité", value: "37%" },
      { label: "Réduction analyse doc.", value: "30-50%" },
      { label: "Avant IA", value: "2-3 BA/projet" },
      { label: "Après IA", value: "1 BA/projet" },
      { label: "Réduction effectifs", value: "-60%" },
    ],
    transformations: [
      "Extraction automatisée d'exigences depuis la documentation",
      "Génération assistée des spécifications fonctionnelles",
      "Prototypage rapide à partir de descriptions textuelles",
      "Analyse prédictive des impacts fonctionnels",
      "Traduction automatisée langage métier-technique",
      "Gain de productivité de 37% selon BCG (2023)"
    ],
    projections: [
      "Co-pilote d'analyse en temps réel",
      "Modélisation métier autonome à partir de descriptions verbales",
      "Validation proactive et détection d'incohérences",
      "Simulation de comportements utilisateurs",
      "Évolution vers un rôle de conseil stratégique"
    ]
  },

  architecte: {
    title: "Architecte Applicatif",
    description: "Le métier d'architecte est renforcé par l'IA qui permet de couvrir un périmètre plus large tout en renforçant sa dimension stratégique.",
    stats: [
      { label: "Priorité stratégique", value: "83% des entreprises" },
      { label: "Avant IA", value: "1 arch./1-2 projets" },
      { label: "Après IA", value: "1 arch./3-4 projets" },
      { label: "Extension périmètre", value: "+200%" },
      { label: "Orientation", value: "Stratégique" },
    ],
    transformations: [
      "Génération assistée de patterns architecturaux",
      "Documentation architecturale automatisée",
      "Analyse d'impact facilitée sur l'architecture globale",
      "Benchmark automatisé des options techniques",
      "Veille technologique augmentée par IA",
      "Position centrale renforcée (83% des entreprises priorité IA)"
    ],
    projections: [
      "Architecte augmenté évaluant plusieurs options simultanément",
      "Optimisation continue basée sur les métriques d'utilisation",
      "Auto-adaptation de l'architecture selon contraintes",
      "Gouvernance automatisée et détection de dérives",
      "Focus sur l'innovation et l'alignement business"
    ]
  },

  testeur: {
    title: "Testeur",
    description: "Le métier de testeur est profondément transformé avec une forte automatisation et une évolution vers un rôle de stratège qualité.",
    stats: [
      { label: "Tests automatisés", value: "60-75%" },
      { label: "Avant IA", value: "3-4 testeurs/10 dev." },
      { label: "Après IA", value: "1 testeur/10 dev." },
      { label: "Réduction effectifs", value: "-70%" },
      { label: "Évolution", value: "Stratège qualité" },
    ],
    transformations: [
      "Génération automatique de scénarios de test",
      "Auto-maintenance des tests lors des changements de code",
      "Analyse prédictive des zones à risque de bugs",
      "Tests exploratoires assistés par IA",
      "Analyse de couverture augmentée",
      "Évolution du profil vers la conception de stratégie de test"
    ],
    projections: [
      "Testing complètement autonome avec intervention humaine minimale",
      "Évolution vers un rôle de stratège définissant la politique qualité",
      "Tests continus et adaptatifs en temps réel",
      "Simulation de comportements utilisateurs complexes",
      "Détection préemptive des problèmes avant leur apparition"
    ]
  }
};

// Données sur les tendances transversales
export const tendancesTransversales = {
  competences: [
    "Maîtrise des prompts complexes",
    "IA literacy et compréhension des modèles",
    "Hybridation technique/métier",
    "Intelligence émotionnelle et collaboration",
    "Créativité et résolution de problèmes complexes"
  ],
  equipes: [
    "Équipes plus petites mais plus stratégiques",
    "Nouvelles méthodes de collaboration homme-machine",
    "Évaluation basée sur la valeur ajoutée",
    "Frontières floues entre les rôles traditionnels",
    "Raccourcissement des cycles de développement"
  ],
  defis: [
    "Résistance au changement",
    "Anxiété face à l'obsolescence des compétences",
    "Besoin d'un leadership visionnaire",
    "Formation massive et continue",
    "Adaptation des processus RH et d'évaluation"
  ]
};
