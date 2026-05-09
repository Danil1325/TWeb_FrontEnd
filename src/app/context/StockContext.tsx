import React, { useEffect, useState, ReactNode, useContext } from 'react';
import { useProducts } from './ProductsContext';

export interface StockContextType {
  currentStock: Record<string, number>;
  reserveStock: (productId: string, quantity: number) => boolean;
  releaseStock: (productId: string, quantity: number) => void;
  getAvailableStock: (productId: string) => number;
  getInitialStock: (productId: string) => number;
}

const StockContext = React.createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { products } = useProducts();
  const [currentStock, setCurrentStock] = useState<Record<string, number>>({});

  useEffect(() => {
    setCurrentStock((previous) => {
      const next: Record<string, number> = {};

      products.forEach((product) => {
        next[product.id] = previous[product.id] ?? product.stockQuantity;
      });

      return next;
    });
  }, [products]);

  const reserveStock = (productId: string, quantity: number): boolean => {
    const available = currentStock[productId] ?? 0;
    if (available >= quantity && quantity > 0) {
      setCurrentStock(prev => ({
        ...prev,
        [productId]: prev[productId] - quantity
      }));
      return true;
    }
    return false;
  };

  const releaseStock = (productId: string, quantity: number) => {
    setCurrentStock(prev => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + quantity
    }));
  };

  const getAvailableStock = (productId: string): number => {
    return currentStock[productId] ?? 0;
  };

  const getInitialStock = (productId: string): number => {
    const product = products.find(p => p.id === productId);
    return product?.stockQuantity ?? 0;
  };

  return (
    <StockContext.Provider
      value={{
        currentStock,
        reserveStock,
        releaseStock,
        getAvailableStock,
        getInitialStock
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within StockProvider');
  }
  return context;
};
