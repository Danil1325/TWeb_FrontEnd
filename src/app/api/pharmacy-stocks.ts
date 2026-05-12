import { authFetch } from "./auth";

export interface PharmacyStock {
  id: string;
  pharmacyUserId: string;
  productId: string;
  pharmacyName: string;
  productName: string;
  category: string;
  qtyAvailable: number;
  qtyReserved: number;
  minStock: number;
  createdAt: string;
  updatedAt: string;
}

export function getPharmacyStocks(pharmacyUserId?: string | null) {
  const query = pharmacyUserId ? `?pharmacyUserId=${encodeURIComponent(pharmacyUserId)}` : "";
  return authFetch<PharmacyStock[]>(`/api/pharmacy-stocks${query}`);
}
