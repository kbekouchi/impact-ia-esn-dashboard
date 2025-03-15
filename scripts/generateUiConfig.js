// Génération des données de configuration UI à partir des composants
async function generateUiConfig() {
  try {
    const componentsDir = path.join(__dirname, '../src/components');
    
    const uiConfig = {
      theme: {
        colors: {
          primary: {
            main: '#3b82f6',
            light: '#93c5fd',
            dark: '#1d4ed8'
          },
          secondary: {
            main: '#10b981',
            light: '#6ee7b7',
            dark: '#065f46'
          },
          error: {
            main: '#ef4444',
            light: '#fca5a5',
            dark: '#b91c1c'
          },
          warning: {
            main: '#f59e0b',
            light: '#fcd34d',
            dark: '#b45309'
          },
          info: {
            main: '#3b82f6',
            light: '#93c5fd',
            dark: '#1d4ed8'
          },
          success: {
            main: '#10b981',
            light: '#6ee7b7',
            dark: '#065f46'
          },
          background: {
            default: '#f9fafb',
            paper: '#ffffff'
          },
          text: {
            primary: '#111827',
            secondary: '#4b5563',
            disabled: '#9ca3af'
          },
          divider: '#e5e7eb'
        },
        spacing: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem',
          '3xl': '4rem',
          '4xl': '6rem'
        },
        borderRadius: {
          none: '0',
          sm: '0.125rem',
          DEFAULT: '0.25rem',
          md: '0.375rem',
          lg: '0.5rem',
          xl: '0.75rem',
          '2xl': '1rem',
          '3xl': '1.5rem',
          full: '9999px'
        },
        shadows: {
          xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }
      },
      layout: {
        sidebarWidth: '16rem',
        contentMaxWidth: '1280px',
        contentPadding: '1.5rem',
        gridSpacing: '1.5rem',
        breakpoints: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px'
        }
      },
      components: {}
    };
    
    // Extraction des configurations de InfoCard
    const infoCardPath = path.join(componentsDir, 'InfoCard.js');
    if (fs.existsSync(infoCardPath)) {
      const infoCardContent = fs.readFileSync(infoCardPath, 'utf8');
      
      const bgClassesMatch = infoCardContent.match(/bgClasses\s*=\s*{([^}]*)}/s);
      
      if (bgClassesMatch) {
        const bgClassesStr = bgClassesMatch[1].trim();
        const bgClassesEntries = bgClassesStr.split(',').map(entry => {
          const [key, value] = entry.trim().split(':').map(part => part.trim().replace(/['"]/g, ''));
          return [key, value];
        });
        
        uiConfig.components.infoCard = {
          colors: Object.fromEntries(bgClassesEntries),
          spacing: {
            padding: 'p-6',
            titleMargin: 'mb-4',
            contentSpacing: 'space-y-4'
          }
        };
      }
    }
    
    // Extraction des configurations de StatCard
    const statCardPath = path.join(componentsDir, 'StatCard.js');
    if (fs.existsSync(statCardPath)) {
      const statCardContent = fs.readFileSync(statCardPath, 'utf8');
      
      uiConfig.components.statCard = {
        colors: {
          blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-700'
          },
          green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-700'
          },
          red: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-700'
          },
          purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-700'
          },
          gray: {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-700'
          }
        }
      };
    }
    
    // Configuration des graphiques
    uiConfig.components.charts = {
      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"],
      dimensions: {
        height: "480px",
        marginTop: "10px",
        marginRight: "30px",
        marginBottom: "10px",
        marginLeft: "0"
      }
    };
    
    // Configuration des boutons
    uiConfig.components.buttons = {
      primary: "inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
      secondary: "inline-block px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
    };
    
    // Configuration des états d'affichage (ajoutée par feature #46)
    uiConfig.components.stateDisplay = {
      container: {
        base: "flex flex-col items-center justify-center p-6 text-center rounded-lg",
        fullHeight: "h-64",
        autoHeight: "py-12"
      },
      states: {
        loading: {
          icon: {
            component: "spinner",
            size: "h-10 w-10",
            color: "text-blue-600",
            animation: "animate-spin",
            classes: "rounded-full border-b-2 border-blue-600 mx-auto mb-4"
          },
          text: {
            classes: "text-gray-700 font-medium",
            messageKey: "data.loading"
          }
        },
        error: {
          icon: {
            component: "exclamation-triangle",
            size: "text-4xl",
            color: "text-red-600",
            classes: "mx-auto mb-4"
          },
          title: {
            classes: "text-xl font-bold mb-2 text-red-600",
            messageKey: "generic.error"
          },
          text: {
            classes: "text-gray-700 mb-4",
            messageKey: "data.loadError"
          },
          action: {
            type: "button",
            classes: "mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
            labelKey: "data.retry",
            action: "reload"
          }
        },
        empty: {
          icon: {
            component: "folder-open",
            size: "text-4xl",
            color: "text-gray-400",
            classes: "mx-auto mb-4"
          },
          title: {
            classes: "text-xl font-bold mb-2 text-gray-500",
            messageKey: "generic.info"
          },
          text: {
            classes: "text-gray-500",
            messageKey: "data.noData"
          }
        },
        success: {
          icon: {
            component: "check-circle",
            size: "text-4xl",
            color: "text-green-600",
            classes: "mx-auto mb-4"
          },
          title: {
            classes: "text-xl font-bold mb-2 text-green-600",
            messageKey: "generic.success" 
          },
          text: {
            classes: "text-gray-700",
            messageKey: "actions.saveSuccess"
          }
        }
      },
      themes: {
        minimal: {
          container: {
            base: "flex items-center justify-center space-x-3",
            fullHeight: "",
            autoHeight: ""
          },
          states: {
            loading: {
              icon: {
                component: "spinner",
                size: "h-5 w-5",
                color: "text-blue-600",
                animation: "animate-spin",
                classes: "rounded-full border-b-2 border-blue-600"
              },
              text: {
                classes: "text-sm text-gray-600",
                messageKey: "data.loading"
              }
            },
            error: {
              icon: {
                component: "exclamation",
                size: "text-sm",
                color: "text-red-600",
                classes: ""
              },
              text: {
                classes: "text-sm text-red-600",
                messageKey: "data.loadError"
              }
            }
          }
        },
        card: {
          container: {
            base: "rounded-lg bg-white shadow-md p-8 text-center",
            fullHeight: "h-64",
            autoHeight: "py-12"
          }
        }
      }
    };
    
    await writeJsonFile('ui-config.json', uiConfig);
  } catch (error) {
    console.error('Erreur lors de la génération de ui-config.json:', error);
  }
}