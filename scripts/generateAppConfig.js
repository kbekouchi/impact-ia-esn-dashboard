// Génération des données d'app-config.json
async function generateAppConfig() {
  try {
    const appConfig = {
      appName: "Impact IA ESN Dashboard",
      version: "1.0.0",
      description: "Dashboard stratégique présentant l'impact de l'IA générative et agentique sur les métiers des ESN et l'évolution nécessaire de leur modèle d'affaires.",
      author: "kbekouchi",
      settings: {
        defaultPageTitle: "Impact IA ESN",
        defaultLanguage: "fr",
        dataRefreshInterval: 3600000,
        enableAnalytics: false,
        enableCache: true,
        cacheExpiration: 86400000
      },
      routes: [
        {
          path: "/",
          component: "Dashboard",
          exact: true,
          dataFiles: ["dashboard-data.json"]
        },
        {
          path: "/metiers-transformation",
          component: "MetiersTransformation",
          exact: false,
          dataFiles: ["metiers-data.json"]
        },
        {
          path: "/benchmarks-economiques",
          component: "BenchmarksEconomiques",
          exact: false,
          dataFiles: ["benchmarks-data.json"]
        },
        {
          path: "/strategie-adaptation",
          component: "StrategieAdaptation",
          exact: false,
          dataFiles: ["strategie-data.json"]
        },
        {
          path: "/methodologie",
          component: "Methodologie",
          exact: false,
          dataFiles: ["sources-list.json"]
        },
        {
          path: "/temps-economise",
          component: "TempsEconomise",
          exact: false,
          dataFiles: ["temps-economise-data.json"]
        },
        {
          path: "/architectes-impact",
          component: "ArchitectesImpact",
          exact: false,
          dataFiles: ["architectes-data.json"]
        },
        {
          path: "/architectes-documentation",
          component: "ArchitectesDocumentation",
          exact: false,
          dataFiles: ["architectes-documentation-data.json"]
        }
      ],
      dataFiles: {
        ui: [
          "ui-texts.json",
          "ui-config.json",
          "charts-config.json",
          "nav-config.json"
        ],
        content: [
          "dashboard-data.json",
          "metiers-data.json",
          "benchmarks-data.json",
          "strategie-data.json",
          "temps-economise-data.json",
          "architectes-data.json",
          "architectes-documentation-data.json",
          "sources-list.json"
        ]
      },
      fallbackSettings: {
        useLocalFallback: true,
        showErrorMessages: true,
        retryCount: 3,
        retryDelay: 1000
      }
    };
    
    await writeJsonFile('app-config.json', appConfig);
  } catch (error) {
    console.error('Erreur lors de la génération de app-config.json:', error);
  }
}