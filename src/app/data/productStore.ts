import { Product, categories as baseCategories, products as seedProducts } from "./products";

export const PRODUCT_STORAGE_KEY = "warehouseProducts";

const ensureSeedProducts = (items: Product[]) => {
  const byId = new Map(seedProducts.map((product) => [product.id, product]));
  items.forEach((product) => {
    byId.set(product.id, product);
  });
  return Array.from(byId.values());
};

export const getStoredProducts = (): Product[] => {
  if (typeof window === "undefined") {
    return seedProducts;
  }

  const raw = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!raw) {
    return seedProducts;
  }

  try {
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return seedProducts;
    }
    return ensureSeedProducts(parsed);
  } catch {
    return seedProducts;
  }
};

export const saveStoredProducts = (items: Product[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(items));
};

export const getProductCategories = () => {
  const storedCategories = getStoredProducts()
    .map((product) => product.category)
    .filter(Boolean);

  return Array.from(new Set([baseCategories[0], ...baseCategories.slice(1), ...storedCategories]));
};
