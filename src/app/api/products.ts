import { API_BASE_URL, authFetch } from "./auth";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  manufacturer: string;
  activeIngredient?: string | null;
  dosage?: string | null;
  packaging?: string | null;
  prescriptionRequired: boolean;
  featured?: boolean;
}

export type ProductRequest = Omit<Product, "id">;

export const PRODUCT_CATEGORIES = [
  "All Products",
  "Antibiotics",
  "Pain Relief",
  "Cardiovascular",
  "Diabetes Care",
  "Respiratory",
  "Dermatology",
  "Vitamins & Supplements",
  "Medical Devices",
  "First Aid",
];

export function resolveProductImageUrl(image: string) {
  const value = image.trim();

  if (!value) return "";

  if (/^(https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }

  const path = value.toLowerCase().startsWith("images/")
    ? value
    : `images/${value}`;

  return `${API_BASE_URL}/${path}`;
}

export function toBackendImagePath(image: string) {
  const value = image.trim();

  if (value.startsWith(API_BASE_URL)) {
    return value.slice(API_BASE_URL.length) || value;
  }

  return value;
}

export function getProductSlug(product: Pick<Product, "name">) {
  return product.name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProductPath(product: Pick<Product, "name">) {
  return `/product/${encodeURIComponent(getProductSlug(product))}`;
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    image: resolveProductImageUrl(product.image),
  };
}

export function getProductCategories(products: Product[]) {
  return Array.from(
    new Set([
      "All Products",
      ...PRODUCT_CATEGORIES.filter((category) => category !== "All Products"),
      ...products.map((product) => product.category),
    ])
  );
}

export async function getProducts(category?: string) {
  const query =
    category && category !== "All Products"
      ? `?category=${encodeURIComponent(category)}`
      : "";

  const products = await authFetch<Product[]>(`/api/products${query}`);
  return products.map(normalizeProduct);
}

export async function getProduct(id: string) {
  const product = await authFetch<Product>(`/api/products/${encodeURIComponent(id)}`);
  return normalizeProduct(product);
}

export async function createProduct(request: ProductRequest) {
  const product = await authFetch<Product>("/api/products", {
    method: "POST",
    body: JSON.stringify({
      ...request,
      image: toBackendImagePath(request.image),
    }),
  });
  return normalizeProduct(product);
}

export async function updateProduct(id: string, request: ProductRequest) {
  const product = await authFetch<Product>(`/api/products/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify({
      ...request,
      image: toBackendImagePath(request.image),
    }),
  });
  return normalizeProduct(product);
}

export function deleteProduct(id: string) {
  return authFetch<void>(`/api/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
