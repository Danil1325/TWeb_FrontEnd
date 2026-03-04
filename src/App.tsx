import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './app/context/CartContext';
import { Layout } from './app/Components/Layout';
import { Home } from './app/pages/Home';
import { Products } from './app/pages/Products';

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </CartProvider>
  );
}
