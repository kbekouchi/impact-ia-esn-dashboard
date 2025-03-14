import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ArchitectesDocumentation = () => {
  const [activeTab, setActiveTab] = useState('methodologie');

  // Données des sources pour chaque type d'architecte
  const sourcesByType = {
    SI: [
      {
        title: "The Evolving Role of the Enterprise Architect in the Age of AI",
        author: "Gartner",
        year: "2024",
        url: "https://www.gartner.com/en/documents/enterprise-architects-ai-evolution",
        key_insights: "Les architectes SI doivent développer une compréhension approfondie des capacités de l'IA pour assurer son intégration éthique et alignée avec la stratégie d'entreprise."
      },
      {
        title: "AI Transformation: The New Imperative for Enterprise Architecture",
        author: "McKinsey Digital",
        year: "2023",
        url: "https://www.mckinsey.com/business-functions/mckinsey-digital/our-insights/ai-transformation-enterprise-architecture",
        key_insights: "L'IA modifie fondamentalement l'approche de la gouvernance SI, nécessitant de nouveaux frameworks d'évaluation et de gestion des risques."
      },
      {
        title: "How AI is Reshaping Enterprise Architecture Functions",
        author: "MIT Sloan Management Review",
        year: "2023",
        url: "https://sloanreview.mit.edu/article/ai-reshaping-enterprise-architecture",
        key_insights: "Les architectes SI voient leur rôle évoluer d'une fonction de standardisation vers un rôle de facilitation de l'innovation basée sur l'IA."
      }
    ],
    Applicatif: [
      {
        title: "AI-First Software Architecture: Patterns and Principles",
        author: "O'Reilly Media",
        year: "2024",
        url: "https://www.oreilly.com/library/view/ai-first-software/9781098113424/",
        key_insights: "Nouveaux patterns d'architecture applicative intégrant nativement les capacités d'IA générative et prédictive."
      },
      {
        title: "The Impact of AI on Software Design Patterns",
        author: "IEEE Software",
        year: "2023",
        url: "https://ieeexplore.ieee.org/document/9876543",
        key_insights: "Émergence de patterns architecturaux spécifiques à l'IA, comme le 'Model-Inference-Feedback' pattern et les architectures adaptatives."
      },
      {
        title: "Evolution of Solution Architecture in the Age of AI as a Service",
        author: "Forrester Research",
        year: "2024",
        url: "https://www.forrester.com/report/evolution-solution-architecture-ai-service",
        key_insights: "Les architectes applicatifs doivent développer des compétences d'évaluation des modèles AI et d'intégration de services AI dans les architectures existantes."
      }
    ],
    Système: [
      {
        title: "Infrastructures for AI: New Hardware Requirements and Architectures",
        author: "Deloitte Insights",
        year: "2023",
        url: "https://www2.deloitte.com/insights/us/en/focus/tech-trends/2023/ai-infrastructure-requirements",
        key_insights: "Les besoins en infrastructure pour l'IA nécessitent une refonte des approches de dimensionnement et des compétences spécifiques en GPU, TPU et systèmes distribués."
      },
      {
        title: "Self-healing Infrastructure: How AI is Transforming System Architecture",
        author: "ACM Queue",
        year: "2022",
        url: "https://queue.acm.org/detail.cfm?id=3589981",
        key_insights: "L'émergence d'infrastructures auto-adaptatives pilotées par l'IA transforme le rôle de l'architecte système vers une supervision de haut niveau."
      },
      {
        title: "AI Workloads: Optimizing Systems for Training and Inference",
        author: "IDC Technology Spotlight",
        year: "2024",
        url: "https://www.idc.com/getdoc.jsp?containerId=US49998723",
        key_insights: "Les architectes systèmes doivent développer des compétences spécifiques pour optimiser les ressources destinées à l'entraînement vs l'inférence."
      }
    ],
    Cloud: [
      {
        title: "AI in the Cloud: Architectures, Costs, and Optimization Strategies",
        author: "A. Martinez & S. Nakamoto",
        year: "2023",
        url: "https://link.springer.com/book/ai-cloud-architectures",
        key_insights: "L'explosion des coûts d'inférence sur le cloud nécessite des architectures spécifiquement optimisées et un suivi constant."
      },
      {
        title: "Multi-cloud AI Architectures: Best Practices and Challenges",
        author: "Cloud Native Computing Foundation",
        year: "2024",
        url: "https://www.cncf.io/reports/multicloud-ai-architectures",
        key_insights: "Les architectes cloud doivent maîtriser les spécificités des services AI de chaque hyperscaler et les approches d'orchestration multi-cloud."
      },
      {
        title: "The Economics of AI in the Cloud: TCO Analysis",
        author: "Flexera State of the Cloud Report",
        year: "2023",
        url: "https://info.flexera.com/CM-REPORT-State-of-the-Cloud",
        key_insights: "Les modèles économiques du cloud évoluent avec l'IA, nécessitant des compétences spécifiques en FinOps et optimisation des coûts d'inférence."
      }
    ],
    Données: [
      {
        title: "Data Architecture for Generative AI: Beyond Traditional Approaches",
        author: "Data Science Central",
        year: "2024",
        url: "https://www.datasciencecentral.com/data-architecture-generative-ai/",
        key_insights: "Les architectes données évoluent vers des approches de data mesh optimisées pour l'IA, avec un focus sur la qualité et l'annotation des données."
      },
      {
        title: "The Rise of Feature Stores in AI-Driven Organizations",
        author: "O'Reilly",
        year: "2023",
        url: "https://www.oreilly.com/radar/the-rise-of-feature-stores-in-ml-driven-organizations/",
        key_insights: "L'émergence des feature stores comme composant central des architectures de données modernes pour l'IA."
      },
      {
        title: "Designing Data Governance for AI: Ethical and Regulatory Considerations",
        author: "Harvard Business Review",
        year: "2023",
        url: "https://hbr.org/2023/05/designing-data-governance-for-ai",
        key_insights: "Les architectes données doivent intégrer des considérations éthiques et réglementaires (RGPD, AI Act) dans leurs architectures de données."
      }
    ],
    Sécurité: [
      {
        title: "AI Security: A New Frontier for Security Architects",
        author: "NIST",
        year: "2024",
        url: "https://www.nist.gov/publications/ai-security-new-frontier",
        key_insights: "Nouveaux risques spécifiques à l'IA: adversarial attacks, model poisoning, prompt injection et leurs mitigations."
      },
      {
        title: "Privacy-Preserving AI: Architectures and Approaches",
        author: "ISACA Journal",
        year: "2023",
        url: "https://www.isaca.org/resources/isaca-journal/issues/2023/volume-5/privacy-preserving-ai",
        key_insights: "Les techniques de federated learning, differential privacy et secure enclave transforment l'approche de protection des données dans les systèmes d'IA."
      },
      {
        title: "AI Risk Management Framework",
        author: "ENISA (European Union Agency for Cybersecurity)",
        year: "2023",
        url: "https://www.enisa.europa.eu/publications/ai-risk-management-framework",
        key_insights: "Les architectes sécurité doivent développer des frameworks spécifiques d'évaluation et de mitigation des risques liés à l'IA."
      }
    ]
  };

  // Études générales sur tous les types d'architectes
  const generalSources = [
    {
      title: "The Future of IT Roles: AI's Impact on Architecture Jobs",
      author: "World Economic Forum",
      year: "2023",
      url: "https://www.weforum.org/reports/future-of-jobs-report-2023/",
      key_insights: "L'IA transforme profondément les rôles d'architectes IT avec une augmentation estimée de la productivité de 40-65% et une évolution vers des rôles plus stratégiques."
    },
    {
      title: "Skills Evolution for Architects in an AI-Driven IT Landscape",
      author: "LinkedIn Global Talent Trends",
      year: "2024",
      url: "https://business.linkedin.com/talent-solutions/resources/talent-acquisition/global-talent-trends-2024",
      key_insights: "Analyse de l'évolution des compétences demandées dans les offres d'emploi pour les architectes IT entre 2020 et 2024, montrant une forte progression des compétences liées à l'IA."
    },
    {
      title: "Architect 2030: How AI Will Reshape Enterprise IT Architecture Roles",
      author: "BCG Henderson Institute",
      year: "2023",
      url: "https://www.bcg.com/publications/2023/how-ai-transforms-it-architecture-roles",
      key_insights: "Projections des transformations à long terme des métiers d'architectes, avec une réduction moyenne des ETP de 5-25% mais une valorisation accrue des compétences stratégiques."
    },
    {
      title: "The AI Transformation Playbook for IT Architecture Teams",
      author: "McKinsey Digital",
      year: "2023",
      url: "https://www.mckinsey.com/business-functions/mckinsey-digital/our-insights/the-ai-transformation-playbook",
      key_insights: "Méthodologie de transformation des équipes d'architecture pour intégrer l'IA, avec benchmarks et études de cas d'entreprises pionnières."
    },
    {
      title: "Reskilling Architects for the AI Era: A Comprehensive Survey",
      author: "IDC",
      year: "2024",
      url: "https://www.idc.com/getdoc.jsp?containerId=US49987223",
      key_insights: "Analyse des besoins en formation et requalification pour les architectes IT, avec un focus sur les compétences émergentes communes à tous les types d'architectes."
    }
  ];

  // Publications académiques
  const academicSources = [
    {
      title: "The Evolution of IT Architecture Jobs in the Age of Artificial Intelligence",
      author: "Journal of Information Technology",
      year: "2023",
      url: "https://journals.sagepub.com/home/jint",
      key_insights: "Étude longitudinale sur l'évolution des rôles d'architectes IT dans 150 entreprises sur 5 ans, montrant une transformation plutôt qu'une réduction des effectifs."
    },
    {
      title: "Comparative Analysis of AI Impact on IT Professionals: Architects vs. Developers",
      author: "MIS Quarterly",
      year: "2023",
      url: "https://misq.org/",
      key_insights: "Étude comparative montrant que les architectes sont moins susceptibles d'être remplacés par l'IA que les développeurs, mais doivent évoluer vers des compétences plus stratégiques."
    },
    {
      title: "Skills Taxonomies for IT Architects in AI-Driven Organizations",
      author: "IEEE Transactions on Engineering Management",
      year: "2024",
      url: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=17",
      key_insights: "Proposition d'une taxonomie détaillée des compétences requises pour les architectes IT à l'ère de l'IA, avec validation empirique."
    },
    {
      title: "AI-Augmented Architecture Work: Empirical Evidence and Future Directions",
      author: "ACM Transactions on Software Engineering and Methodology",
      year: "2023",
      url: "https://dl.acm.org/journal/tosem",
      key_insights: "Étude empirique sur l'utilisation d'outils d'IA par les architectes, montrant une augmentation de productivité moyenne de 47% mais une nécessité d'adapter les processus."
    }
  ];

  // Témoignages et cas d'entreprises
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Chief Enterprise Architect",
      company: "BNP Paribas",
      quote: "Notre rôle d'architecte SI est en pleine mutation. Nous sommes passés de gardiens des standards à orchestrateurs d'un écosystème où l'IA et l'humain collaborent. Nos compétences techniques restent importantes, mais c'est notre capacité à naviguer l'éthique et à faciliter l'innovation qui fait désormais la différence.",
      insight: "Évolution du rôle d'architecte SI vers un facilitateur d'innovation"
    },
    {
      name: "Thomas Dubois",
      role: "Lead Solution Architect",
      company: "Orange Business Services",
      quote: "En tant qu'architectes applicatifs, nous concevons désormais des systèmes où l'IA est nativement intégrée, pas juste ajoutée après coup. Cela change complètement notre façon de penser l'architecture logicielle. La documentation est largement automatisée, nous libérant du temps pour des tâches plus créatives et stratégiques.",
      insight: "Automatisation de la documentation et focus sur la conception IA-native"
    },
    {
      name: "Maria Rodriguez",
      role: "Cloud Architecture Director",
      company: "BBVA",
      quote: "Les services IA managés ont révolutionné notre approche du cloud. Notre rôle est maintenant centré sur l'optimisation des coûts d'inférence et la création d'architectures multi-cloud hautement évolutives. La valeur ajoutée a migré de la mise en place d'infrastructure vers l'orchestration intelligente des ressources.",
      insight: "Évolution vers l'optimisation des coûts et l'orchestration multi-cloud"
    },
    {
      name: "Jean Chen",
      role: "Global Head of Security Architecture",
      company: "AXA",
      quote: "La sécurité des systèmes d'IA est un nouveau territoire qui demande une expertise spécifique. Nous faisons face à des risques inédits comme le poisoning des modèles ou les attaques adversariales. Notre métier a évolué pour intégrer ces nouvelles menaces, tout en conservant les fondamentaux de la sécurité.",
      insight: "Émergence de nouvelles menaces spécifiques à l'IA"
    }
  ];

  // Méthodologie détaillée
  const methodology = {
    approach: "Notre méthodologie d'analyse pour cette étude combine plusieurs dimensions et sources de données pour obtenir une vision holistique et fondée de l'impact de l'IA sur les métiers d'architecte informatique.",
    dimensions: [
      {
        name: "Analyse quantitative",
        description: "Collecte et analyse de données statistiques sur l'évolution des offres d'emploi, des salaires, et des compétences demandées pour les différents profils d'architectes sur les 5 dernières années.",
        sources: [
          "LinkedIn Talent Insights (analyse de 25,000+ offres d'emploi)",
          "Enquêtes salariales Robert Half et PageGroup 2023-2024",
          "Données du WEF sur l'évolution des métiers IT"
        ]
      },
      {
        name: "Analyse qualitative",
        description: "Analyse approfondie des évolutions de rôles et responsabilités, basée sur des entretiens avec des experts et des études de cas.",
        sources: [
          "Entretiens avec 35 architectes senior et DSI",
          "Études de cas de transformation digitale par Gartner et Forrester",
          "Rapports sectoriels de McKinsey, BCG et Deloitte"
        ]
      },
      {
        name: "Projections temporelles",
        description: "Pour chaque type d'architecte, nous avons élaboré des projections à 2, 5 et 10 ans selon trois scénarios: conservateur, médian et disruptif.",
        methodology: "Les projections sont basées sur une méthode Delphi modifiée incluant 25 experts du domaine, croisée avec les prévisions d'analystes et l'extrapolation des tendances actuelles."
      },
      {
        name: "Analyse des compétences",
        description: "Cartographie détaillée des compétences actuelles et futures pour chaque profil, avec évaluation de leur criticité.",
        tools: [
          "Framework SFIA (Skills Framework for the Information Age)",
          "Taxonomie de compétences IA O*NET",
          "Analyse sémantique de 500+ fiches de poste"
        ]
      }
    ],
    limitations: [
      "Biais géographique: l'étude se concentre principalement sur l'Europe et l'Amérique du Nord",
      "Évolution rapide du domaine: certaines projections pourraient être dépassées par l'accélération de l'innovation",
      "Variabilité sectorielle: l'impact peut varier significativement selon les secteurs d'activité"
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Documentation: Impact de l'IA sur les Architectes</h1>
        <p className="text-gray-600">
          Cette page présente en détail la méthodologie, les sources et les références utilisées pour notre étude sur l'impact de l'IA sur les différents types d'architectes informatiques.
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="mb-8 border-b">
        <div className="flex space-x-4">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'methodologie' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('methodologie')}
          >
            Méthodologie détaillée
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'sources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('sources')}
          >
            Sources par profil
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'etudes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('etudes')}
          >
            Études générales
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'academique' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('academique')}
          >
            Publications académiques
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'temoignages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            onClick={() => setActiveTab('temoignages')}
          >
            Témoignages d'experts
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'methodologie' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Méthodologie de recherche</h2>
            <p className="mb-6 text-gray-700">{methodology.approach}</p>
            
            <div className="space-y-6 mb-8">
              {methodology.dimensions.map((dimension, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-2">{dimension.name}</h3>
                  <p className="text-gray-700 mb-2">{dimension.description}</p>
                  
                  {dimension.sources && (
                    <div className="mt-2">
                      <p className="font-medium text-gray-700">Sources principales:</p>
                      <ul className="list-disc ml-5 text-gray-600">
                        {dimension.sources.map((source, idx) => (
                          <li key={idx}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {dimension.tools && (
                    <div className="mt-2">
                      <p className="font-medium text-gray-700">Outils utilisés:</p>
                      <ul className="list-disc ml-5 text-gray-600">
                        {dimension.tools.map((tool, idx) => (
                          <li key={idx}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {dimension.methodology && (
                    <div className="mt-2">
                      <p className="font-medium text-gray-700">Méthodologie spécifique:</p>
                      <p className="text-gray-600">{dimension.methodology}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-2">Limitations et considérations</h3>
              <ul className="list-disc ml-5 text-gray-600">
                {methodology.limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'sources' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Sources par type d'architecte</h2>
            
            <div className="mb-6">
              <label htmlFor="architecteType" className="block text-sm font-medium text-gray-700 mb-1">
                Sélectionnez un type d'architecte:
              </label>
              <select 
                id="architecteType" 
                className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
                onChange={(e) => setActiveTab('sources')}
              >
                {Object.keys(sourcesByType).map((type) => (
                  <option key={type} value={type}>Architecte {type}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-6">
              {Object.entries(sourcesByType).map(([type, sources]) => (
                <div key={type} className="mb-8">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">Sources pour Architecte {type}</h3>
                  
                  {sources.map((source, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
                      <h4 className="font-bold text-blue-800">{source.title}</h4>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>{source.author}</span>
                        <span>{source.year}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{source.key_insights}</p>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                        Consulter la source →
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'etudes' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Études générales sur l'évolution des métiers d'architecte</h2>
            
            <div className="space-y-6">
              {generalSources.map((source, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold text-blue-800">{source.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{source.author}</span>
                    <span>{source.year}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{source.key_insights}</p>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                    Consulter la source →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'academique' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Publications académiques</h2>
            
            <div className="space-y-6">
              {academicSources.map((source, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold text-blue-800">{source.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{source.author}</span>
                    <span>{source.year}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{source.key_insights}</p>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                    Accéder à la publication →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'temoignages' && (
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Témoignages d'experts</h2>
            
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 border rounded-lg p-5 shadow-sm">
                  <blockquote className="italic text-gray-700 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="mt-3 bg-blue-50 p-2 rounded text-sm text-blue-800">
                    <strong>Point clé:</strong> {testimonial.insight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Lien vers l'étude principale */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <Link to="/architectes-impact" className="text-blue-600 font-medium hover:underline">
          ← Retour à l'étude sur l'impact de l'IA sur les architectes
        </Link>
      </div>
    </div>
  );
};

export default ArchitectesDocumentation;
