import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  createProduct as createProductRequest,
  deleteProduct as deleteProductRequest,
  getProductCategories,
  getProducts,
  updateProduct as updateProductRequest,
} from "../api/products";
import type { Product, ProductRequest } from "../api/products";

interface ProductsContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  createProduct: (request: ProductRequest) => Promise<Product>;
  updateProduct: (id: string, request: ProductRequest) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = React.createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const items = await getProducts();
      setProducts(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nu s-au putut incarca produsele.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshProducts();
  }, [refreshProducts]);

  const createProduct = useCallback(async (request: ProductRequest) => {
    const created = await createProductRequest(request);
    setProducts((current) => [created, ...current]);
    return created;
  }, []);

  const updateProduct = useCallback(async (id: string, request: ProductRequest) => {
    const updated = await updateProductRequest(id, request);
    setProducts((current) => current.map((product) => (product.id === id ? updated : product)));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await deleteProductRequest(id);
    setProducts((current) => current.filter((product) => product.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      products,
      categories: getProductCategories(products),
      loading,
      error,
      refreshProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    }),
    [createProduct, deleteProduct, error, loading, products, refreshProducts, updateProduct]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => {
  const context = React.useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }

  return context;
};
