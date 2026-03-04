import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './context/CartContext';
import { Layout } from './Components/Layout';
import { Home } from './pages/Home';

export default function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </CartProvider>
  );
}
