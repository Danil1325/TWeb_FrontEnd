export type UserRole = "SuperAdmin" | "Warehouse" | "Farmacie";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: "active" | "inactive";
  phone?: string;
  company?: string;
  lastActivity: string;
  lastLogin: string;
  lastPasswordReset: string;
  createdAt: string;
}

export interface UserAuditEvent {
  id: string;
  userId: string;
  action: "login" | "password_reset" | "status_changed" | "user_created" | "user_updated" | "user_deleted";
  timestamp: string;
  details: string;
}

export const users: AdminUser[] = [
  {
    id: "u1",
    name: "Dan Superadmin",
    email: "admin@admin.com",
    password: "admin",
    role: "SuperAdmin",
    status: "active",
    phone: "+40 722 123 456",
    company: "Pharma Warehouse",
    lastActivity: "Updated inventory rules",
    lastLogin: "2026-03-24 14:30",
    lastPasswordReset: "2026-03-18 16:20",
    createdAt: "2025-01-15",
  },
  {
    id: "u2",
    name: "Ion Warehouse",
    email: "warehouse@warehouse.com",
    password: "warehouse",
    role: "Warehouse",
    status: "active",
    phone: "+40 722 345 678",
    company: "Warehouse Central",
    lastActivity: "Processed outbound orders",
    lastLogin: "2026-03-24 11:05",
    lastPasswordReset: "2026-03-01 10:10",
    createdAt: "2025-03-05",
  },
  {
    id: "u3",
    name: "Farmacia Central",
    email: "contact@farmacia-central.ro",
    password: "farmacie123",
    role: "Farmacie",
    status: "active",
    phone: "+40 722 567 890",
    company: "Farmacia Central",
    lastActivity: "Placed new order",
    lastLogin: "2026-03-24 09:22",
    lastPasswordReset: "2026-02-20 12:40",
    createdAt: "2025-02-15",
  },
];

export const seedUsers: AdminUser[] = users;

export const seedAuditEvents: UserAuditEvent[] = [
  {
    id: "a1",
    userId: "u1",
    action: "login",
    timestamp: "2026-03-24 14:30",
    details: "Successful login",
  },
  {
    id: "a2",
    userId: "u2",
    action: "login",
    timestamp: "2026-03-24 11:05",
    details: "Successful login",
  },
  {
    id: "a3",
    userId: "u3",
    action: "password_reset",
    timestamp: "2026-02-20 12:40",
    details: "Password reset by SuperAdmin",
  },
];
