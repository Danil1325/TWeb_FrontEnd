import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Truck,
  ClipboardList,
  PackagePlus,
  ChevronLeft,
  ChevronRight,
  Warehouse,
} from "lucide-react";

interface WarehouseSidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { id: "products", icon: PackagePlus, label: "Products", badge: null },
  { id: "stock", icon: Boxes, label: "Stock", badge: "17" },
  { id: "deliveries", icon: Truck, label: "Deliveries", badge: "3" },
  { id: "orders", icon: ClipboardList, label: "Outgoing Orders", badge: "29" },
];

export default function WarehouseSidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}: WarehouseSidebarProps) {
  const location = useLocation();

  React.useEffect(() => {
    const pathMap: Record<string, string> = {
      "/warehouse/dashboard": "dashboard",
      "/warehouse/products": "products",
      "/warehouse/stock": "stock",
      "/warehouse/deliveries": "deliveries",
      "/warehouse/orders": "orders",
    };
    const page = pathMap[location.pathname];
    if (page) {
      setActivePage(page);
    }
  }, [location.pathname, setActivePage]);

  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="bg-white border-r border-slate-200 flex flex-col relative shadow-xl h-screen"
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center">
                <Warehouse className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Warehouse Panel
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors z-10 shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-slate-600" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-slate-600" />
        )}
      </button>

      <div className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-600 text-white shadow-lg shadow-cyan-500/30"
                      : "text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !collapsed && (
                  <span
                    className={`
                    ml-auto px-2 py-0.5 rounded-full text-xs
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-cyan-100 text-cyan-700"
                    }
                  `}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs">WH</span>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <div className="text-sm text-slate-900">Warehouse Operator</div>
                <div className="text-xs text-slate-500">warehouse@warehouse.com</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
