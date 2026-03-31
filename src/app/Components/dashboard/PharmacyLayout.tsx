import React, { useState, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PharmacySidebar from "./PharmacySidebar";
import { PharmacyProfile } from "../../pages/pharmacy/Profile";

interface PharmacyLayoutProps {
  children: React.ReactNode;
}

export const PharmacyLayout: React.FC<PharmacyLayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = localStorage.getItem("userEmail") || "Pharmacy User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login", { replace: true });
  };

  // Sync active page with URL
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    // expecting ['/pharmacy', 'orders'] -> parts[0] = 'pharmacy', parts[1] = 'orders'
    const page = parts[1] || 'dashboard';
    setActivePage(page);
  }, [location.pathname]);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    // navigate to route
    if (page === 'dashboard') navigate('/pharmacy/dashboard');
    else navigate(`/pharmacy/${page}`);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <PharmacySidebar
        activePage={activePage}
        setActivePage={handlePageChange}
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
                  Pharmacy Dashboard
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
          {activePage === "profile" ? <PharmacyProfile /> : children}
        </main>
      </div>
    </div>
  );
};
