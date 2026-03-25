import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Slidebar";
import { LogOut, User } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/admin/users") {
      setActivePage("users");
      return;
    }
    if (location.pathname === "/admin/warehouses") {
      setActivePage("warehouses");
      return;
    }
    setActivePage("dashboard");
  }, [location.pathname]);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    const routeMap: Record<string, string> = {
      dashboard: "/admin/dashboard",
      users: "/admin/users",
      warehouses: "/admin/warehouses",
    };
    navigate(routeMap[page] || "/admin/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar
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
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Admin</span>
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
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
