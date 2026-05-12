import { authFetch } from "./auth";
import { resolveProductImageUrl } from "./products";

export type OrderStatus = "Pending" | "Confirmed" | "Delivered" | "Cancelled" | string;

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  category: string;
  image: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  pharmacyUserId: string;
  pharmacyName: string;
  supplier: string;
  status: OrderStatus;
  itemsCount: number;
  total: number;
  date: string;
  notes?: string | null;
  items: OrderItem[];
}

export interface CreateOrderItemRequest {
  productId: string;
  quantity: number;
  unitPrice?: number;
}

export interface CreateMyOrderRequest {
  supplier: string;
  status?: OrderStatus;
  itemsCount: number;
  total: number;
  date?: string;
  notes?: string;
  items: CreateOrderItemRequest[];
}

function normalizeOrder(order: Order): Order {
  return {
    ...order,
    items: (order.items ?? []).map((item) => ({
      ...item,
      image: item.image ? resolveProductImageUrl(item.image) : "",
    })),
  };
}

export async function getMyOrders() {
  const orders = await authFetch<Order[]>("/api/orders/my");
  return orders.map(normalizeOrder);
}

export async function getOrders() {
  const orders = await authFetch<Order[]>("/api/orders");
  return orders.map(normalizeOrder);
}

export async function getPendingOrders() {
  const orders = await authFetch<Order[]>("/api/orders/pending");
  return orders.map(normalizeOrder);
}

export async function getOrder(id: string) {
  const order = await authFetch<Order>(`/api/orders/${encodeURIComponent(id)}`);
  return normalizeOrder(order);
}

export async function createMyOrder(request: CreateMyOrderRequest) {
  const order = await authFetch<Order>("/api/orders/my", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return normalizeOrder(order);
}

export async function changeOrderStatus(id: string, status: OrderStatus) {
  const order = await authFetch<Order>(`/api/orders/${encodeURIComponent(id)}/change-status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return normalizeOrder(order);
}

export async function acceptOrder(id: string) {
  const order = await authFetch<Order>(`/api/orders/${encodeURIComponent(id)}/accept`, {
    method: "PATCH",
  });
  return normalizeOrder(order);
}

export function deleteOrder(id: string) {
  return authFetch<void>(`/api/orders/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
