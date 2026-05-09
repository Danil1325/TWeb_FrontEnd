export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string | null;
  company?: string | null;
  lastActivity?: string | null;
  lastLoginAt?: string | null;
};

export type AuthResponse = {
  isAuthenticated: boolean;
  token?: string | null;
  expiresAt?: string | null;
  user?: AuthUser | null;
};

export type PharmacyRegistrationRequest = {
  name: string;
  email: string;
  password: string;
  pharmacyName: string;
  pharmacyLicense: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5254";

export const AUTH_TOKEN_KEY = "authToken";

function normalizeRole(role?: string | null) {
  const normalized = String(role ?? "").toLowerCase();

  if (normalized === "superadmin") return "admin";
  if (normalized === "warehouse") return "warehouse";
  if (normalized === "farmacie" || normalized === "pharmacy") return "pharmacy";

  return normalized;
}

async function readError(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    if (typeof data === "string") return data;
    if (data?.title) return String(data.title);
    if (data?.message) return String(data.message);
    if (data?.errors) return "Datele trimise nu sunt valide.";
  }

  const text = await response.text();
  return text || "Request failed.";
}

export async function authFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem("authExpiresAt");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userType");
}

export function saveAuthSession(auth: AuthResponse) {
  if (!auth.isAuthenticated || !auth.token || !auth.user) {
    throw new Error("Raspuns de autentificare invalid.");
  }

  const role = normalizeRole(auth.user.role);

  localStorage.setItem(AUTH_TOKEN_KEY, auth.token);
  localStorage.setItem("authExpiresAt", auth.expiresAt ?? "");
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userId", auth.user.id);
  localStorage.setItem("userEmail", auth.user.email);
  localStorage.setItem("userName", auth.user.name);
  localStorage.setItem("userRole", role);
  localStorage.setItem("userType", role);
}

export function getDashboardPath(role?: string | null) {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === "admin") return "/admin/dashboard";
  if (normalizedRole === "warehouse") return "/warehouse/dashboard";
  if (normalizedRole === "pharmacy") return "/pharmacy/dashboard";

  return "/";
}

export function login(email: string, password: string) {
  return authFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  try {
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      await authFetch<void>("/api/auth/logout", { method: "POST" });
    }
  } finally {
    clearAuthSession();
  }
}

export function registerPharmacy(request: PharmacyRegistrationRequest) {
  return authFetch("/api/pharmacy-registration-requests", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
