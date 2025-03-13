import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaCog,
} from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-primary-600">Impact IA ESN</h1>
          <p className="text-sm text-gray-500">Dashboard stratégique</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                end
                className={({isActive}) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaHome className="text-lg" />
                <span>Tableau de bord</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/metiers-transformation" 
                className={({isActive}) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaUsers className="text-lg" />
                <span>Métiers en transformation</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/benchmarks-economiques" 
                className={({isActive}) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaChartBar className="text-lg" />
                <span>Benchmarks économiques</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/strategie-adaptation" 
                className={({isActive}) => 
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <FaCog className="text-lg" />
                <span>Stratégie d'adaptation</span>
              </NavLink>
            </li>
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
