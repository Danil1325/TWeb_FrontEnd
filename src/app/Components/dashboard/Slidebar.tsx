import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Store,
  Share2,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { id: "users", icon: Users, label: "User Management", badge: "142" },
  { id: "vendors", icon: Store, label: "Vendor Management", badge: "12" },
  {
    id: "affiliates",
    icon: Share2,
    label: "Affiliate Management",
    badge: "48",
  },
  { id: "products", icon: Package, label: "Product Management", badge: null },
];

export default function Sidebar({
  activePage,
  setActivePage,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="bg-white border-r border-slate-200 flex flex-col relative shadow-xl"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pharma Warehouse Admin
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button */}
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

      {/* Menu Items */}
      <div className="flex-1 py-4">
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
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                <Icon
                  className={`${
                    collapsed ? "w-5 h-5" : "w-5 h-5"
                  } flex-shrink-0`}
                />
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
                        : "bg-blue-100 text-blue-600"
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

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs">SA</span>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <div className="text-sm text-slate-900 dark:text-white">
                  Super Admin
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  admin@admin.com
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
