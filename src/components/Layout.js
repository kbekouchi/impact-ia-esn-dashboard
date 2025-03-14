import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaCog,
  FaBook,
  FaClock,
  FaLaptopCode,
  FaExclamationTriangle
} from 'react-icons/fa';
import { getNavConfig } from '../services/dataService';

const Layout = () => {
  const [navConfig, setNavConfig] = useState({
    appTitle: "Impact IA ESN",
    appSubtitle: "Dashboard stratégique",
    menuItems: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mapping des icônes par nom
  const iconMap = {
    FaHome: FaHome,
    FaUsers: FaUsers,
    FaChartBar: FaChartBar,
    FaCog: FaCog,
    FaBook: FaBook,
    FaClock: FaClock,
    FaLaptopCode: FaLaptopCode
  };

  // Fonction pour obtenir l'icône React à partir de son nom
  const getIconFromName = (iconName) => {
    const Icon = iconMap[iconName] || FaHome;
    return <Icon className="text-lg" />;
  };

  useEffect(() => {
    const fetchNavConfig = async () => {
      try {
        setLoading(true);
        const config = await getNavConfig();
        setNavConfig(config);
        setError(false);
      } catch (err) {
        console.error("Erreur lors du chargement de la configuration de navigation:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNavConfig();
  }, []);

  // Rendu par défaut si les données ne sont pas encore chargées
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  // Rendu en cas d'erreur de chargement
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <FaExclamationTriangle className="text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Erreur de chargement</h2>
          <p>Impossible de charger la configuration de l'application.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-primary-600">{navConfig.appTitle}</h1>
          <p className="text-sm text-gray-500">{navConfig.appSubtitle}</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navConfig.menuItems.map((item) => (
              <li key={item.id}>
                <NavLink 
                  to={item.path} 
                  end={item.isExact}
                  className={({isActive}) => 
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  {getIconFromName(item.icon)}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;