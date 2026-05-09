export {
  PRODUCT_CATEGORIES as categories,
  getProductCategories,
  getProducts as getStoredProducts,
} from "../api/products";
export type { Product } from "../api/products";

export const PRODUCT_STORAGE_KEY = "products_are_loaded_from_backend";

export const saveStoredProducts = () => {
  throw new Error("Produsele se salveaza prin API in SQL Server, nu in localStorage.");
};
