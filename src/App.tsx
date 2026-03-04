import React from 'react'
import './App.css'
import { Layout } from './Components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import {CartProvider} from './context/CartContext';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
