import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "./app/context/CartContext";
import { Layout } from "./app/Components/Layout";
import { AdminLayout } from "./app/Components/dashboard/AdminLayout";
import { Home } from "./app/pages/Home";
import { Products } from "./app/pages/Products";
import { ProductDetails } from "./app/pages/ProductDetails";
import { Login } from "./app/pages/Login";
import { Register } from "./app/pages/Register";
import { Dashboard } from "./app/pages/admin/Dashboard";
import { UserManagementPage } from "./app/pages/admin/UserManagement";
import { WarehouseManagementPage } from "./app/pages/admin/WarehouseManagement";
import { PharmacyStocksPage } from "./app/pages/admin/PharmacyStocks";
import { PharmacyManagementPage } from "./app/pages/admin/PharmacyManagement";
import { About } from "./app/pages/About";
import { Support } from "./app/pages/Support";
import { Policies } from "./app/pages/Policies";
import Blog from "./app/pages/Blog";
import { Checkout } from "./app/pages/Checkout";
import { PharmacyDashboard } from "./app/pages/pharmacy/Dashboard";
import { PharmacyLayout } from "./app/Components/dashboard/PharmacyLayout";
import { WarehouseLayout } from "./app/Components/dashboard/WarehouseLayout";
import { WarehouseDashboard } from "./app/pages/warehouse/Dashboard";
import { WarehouseStock } from "./app/pages/warehouse/Stock";


function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");
  const userRole = localStorage.getItem("userRole");

  return isLoggedIn && (userType === "admin" || userRole === "admin") ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

function WarehouseRouteGuard({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");
  const userRole = localStorage.getItem("userRole");

  return isLoggedIn && (userType === "warehouse" || userRole === "warehouse") ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminRouteGuard>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagementPage />} />
                  <Route path="warehouses" element={<WarehouseManagementPage />} />
                  <Route path="pharmacy-management" element={<PharmacyManagementPage />} />
                  <Route path="pharmacy-stocks" element={<PharmacyStocksPage />} />
                </Routes>
              </AdminLayout>
            </AdminRouteGuard>
          }
        />

        <Route
          path="/warehouse/*"
          element={
            <WarehouseRouteGuard>
              <WarehouseLayout>
                <Routes>
                  <Route path="dashboard" element={<WarehouseDashboard />} />
                  <Route path="stock" element={<WarehouseStock />} />
                  <Route path="deliveries" element={<WarehouseDashboard />} />
                  <Route path="orders" element={<WarehouseDashboard />} />
                </Routes>
              </WarehouseLayout>
            </WarehouseRouteGuard>
          }
        />

        <Route
          path="/pharmacy/*"
          element={
            <PharmacyLayout>
              <Routes>
                <Route path="dashboard" element={<PharmacyDashboard />} />
              </Routes>
            </PharmacyLayout>
          }
        />

        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
      <Toaster position="top-right" richColors />
    </CartProvider>
  );
}
