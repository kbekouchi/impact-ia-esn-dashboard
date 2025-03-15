// Génération des données du dashboard
async function generateDashboardData() {
  try {
    const dashboardPath = path.join(__dirname, '../src/pages/Dashboard.js');
    const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
    
    // Extraction des statistiques (StatCard)
    const statRegex = /<StatCard[^>]*title="([^"]*)"[^>]*value="([^"]*)"[^>]*description="([^"]*)"[^>]*color="([^"]*)"/g;
    const stats = {};
    
    let statMatch;
    while ((statMatch = statRegex.exec(dashboardContent)) !== null) {
      const title = statMatch[1];
      const value = statMatch[2];
      const description = statMatch[3];
      const color = statMatch[4];
      
      const keyName = title.toLowerCase().replace(/\s+/g, '').replace(/%/g, '').replace(/é/g, 'e');
      
      stats[keyName] = {
        value: parseInt(value.replace(/[^0-9]/g, '')),
        unit: value.includes('%') ? '%' : '',
        description,
        color
      };
      
      if (value.startsWith('+')) {
        stats[keyName].prefix = '+';
      }
    }
    
    // Données complètes du dashboard
    const dashboardData = {
      stats,
      etpComparaison: [
        {
          "name": "Développeur",
          "avant": 5.3,
          "apres": 2.1,
          "reduction": "60%"
        },
        {
          "name": "Business Analyst",
          "avant": 4.2,
          "apres": 1.7,
          "reduction": "60%"
        },
        {
          "name": "Testeur",
          "avant": 3.8,
          "apres": 1.1,
          "reduction": "70%"
        },
        {
          "name": "Architecte",
          "avant": 2.5,
          "apres": 1.5,
          "reduction": "40%"
        },
        {
          "name": "Chef de Projet",
          "avant": 3.2,
          "apres": 2.2,
          "reduction": "30%"
        },
        {
          "name": "DevOps",
          "avant": 2.1,
          "apres": 1.5,
          "reduction": "25%"
        }
      ],
      budgetData: [
        {
          "name": "IA/ML",
          "avant": 12,
          "apres": 32
        },
        {
          "name": "Cloud",
          "avant": 25,
          "apres": 35
        },
        {
          "name": "Sécurité",
          "avant": 18,
          "apres": 24
        },
        {
          "name": "Dev. Legacy",
          "avant": 30,
          "apres": 10
        },
        {
          "name": "Infra. On-Premise",
          "avant": 15,
          "apres": 8
        }
      ],
      highlightedContent: {
        architectesStudy: {
          title: "Impact de l'IA sur les architectes informatiques",
          badge: "Étude exclusive",
          description: "Découvrez notre analyse approfondie sur l'impact spécifique de l'IA sur les différents types d'architectes informatiques.",
          details: "Cette étude détaille l'évolution du rôle de 6 types d'architectes (SI, Applicatif, Système, Cloud, Données et Sécurité) face à l'IA, avec des projections à 2, 5 et 10 ans et des recommandations de développement professionnel.",
          features: [
            "Analyse des tâches automatisables par profil",
            "Évolution des compétences clés requises",
            "Projections d'impact par spécialisation",
            "Recommandations de formation ciblées"
          ],
          linkUrl: "/architectes-impact",
          linkText: "Accéder à l'étude",
          bgColor: "amber"
        },
        productivityComparison: {
          title: "Productivité IA vs Développement humain",
          description: "Découvrez une démonstration concrète du potentiel de transformation de l'IA : cette application elle-même a été développée en quelques heures avec l'IA, alors qu'un développement humain traditionnel aurait nécessité environ 38-40 jours de travail.",
          details: "Une analyse comparative détaillée montre un facteur d'accélération d'environ 80x, avec une visualisation phase par phase des économies de temps réalisées.",
          linkUrl: "/temps-economise",
          linkText: "Voir la comparaison",
          bgColor: "indigo"
        }
      }
    };
    
    await writeJsonFile('dashboard-data.json', dashboardData);
  } catch (error) {
    console.error('Erreur lors de la génération de dashboard-data.json:', error);
  }
}