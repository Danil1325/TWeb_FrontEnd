import React, { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PharmacySidebar from "./PharmacySidebar";
import { PharmacyDashboard } from "../../pages/pharmacy/Dashboard";

interface PharmacyLayoutProps {
  children?: React.ReactNode;
}

export const PharmacyLayout: React.FC<PharmacyLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const availablePages = ["dashboard"]; 
  
  const currentPath = location.pathname.split('/').pop() || 'dashboard';
  const [activePage, setActivePage] = useState(currentPath);

  const userEmail = localStorage.getItem("userEmail") || "Pharmacy User";

  useEffect(() => {
    const pathPage = location.pathname.split('/').pop() || 'dashboard';
    
    if (!availablePages.includes(pathPage)) {
      navigate('/pharmacy/dashboard', { replace: true });
      setActivePage('dashboard');
    } else {
      setActivePage(pathPage);
    }
  }, [location.pathname, navigate]);

  const handlePageChange = (page: string) => {
    if (availablePages.includes(page)) {
      navigate(`/pharmacy/${page}`);
    } else {
      console.warn(`Page '${page}' is not yet available`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const getPageTitle = () => {
    switch (activePage) {
      case "dashboard":
        return "Pharmacy Dashboard";
      case "orders":
        return "Orders Management";
      case "stock":
        return "Stock & Inventory";
      case "shipments":
        return "Receive Shipments";
      case "returns":
        return "Returns";
      case "reports":
        return "Reports";
      case "profile":
        return "My Profile";
      default:
        return "Pharmacy Dashboard";
    }
  };

  const renderActiveComponent = () => {
    if (!availablePages.includes(activePage)) {
      return <PharmacyDashboard />;
    }

    switch (activePage) {
      case "dashboard":
        return <PharmacyDashboard />;
      default:
        return <PharmacyDashboard />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <PharmacySidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{userEmail}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};
