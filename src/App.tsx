import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './app/context/CartContext';
import { Layout } from './app/Components/Layout';
import { Home } from './app/pages/Home';
import { Products } from './app/pages/Products';
import { ProductDetails } from './app/pages/ProductDetails';
import { Login } from './app/pages/Login';
import { Register } from './app/pages/Register';
import { Dashboard } from './app/pages/admin/Dashboard';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
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
              </Routes>
            </Layout>
          }
        />
      </Routes>
      <Toaster position="top-right" richColors />
    </CartProvider>
  );
}
