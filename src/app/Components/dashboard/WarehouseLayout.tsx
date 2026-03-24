import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import WarehouseSidebar from "./WarehouseSidebar";

interface WarehouseLayoutProps {
  children: React.ReactNode;
}

export const WarehouseLayout: React.FC<WarehouseLayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const routeMap: Record<string, string> = {
      dashboard: "/warehouse/dashboard",
      stock: "/warehouse/stock",
      deliveries: "/warehouse/deliveries",
      orders: "/warehouse/orders",
    };
    const route = routeMap[activePage] || "/warehouse/dashboard";
    navigate(route, { replace: true });
  }, [activePage, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <WarehouseSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <nav className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Warehouse Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Warehouse</span>
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

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
