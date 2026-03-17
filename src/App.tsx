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
import { Warehouse } from "./app/pages/admin/Warehouse";
import { About } from "./app/pages/About";
import { Support } from "./app/pages/Support";
import { Policies } from "./app/pages/Policies";
import Blog from "./app/pages/Blog";
import { Checkout } from "./app/pages/Checkout";
import { Account } from "./app/pages/Account";
import { PharmacyDashboard } from "./app/pages/pharmacy/Dashboard";
import { PharmacyLayout } from "./app/Components/dashboard/PharmacyLayout";


function AccountRouteGuard() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <Account /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="warehouse" element={<Warehouse />} />
              </Routes>
            </AdminLayout>
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
                <Route path="/account" element={<AccountRouteGuard />} />
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
