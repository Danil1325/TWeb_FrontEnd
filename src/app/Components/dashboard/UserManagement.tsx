import React, { useMemo, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Key,
  Lock,
  Unlock,
  History,
  Search,
  X,
} from "lucide-react";
import { AdminUser, seedAuditEvents, users, UserAuditEvent, UserRole } from "../../data/users";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: "active" | "inactive";
  phone: string;
  company: string;
}

interface PendingPharmacyRegistration {
  id: string;
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
  requestedAt: string;
  status: "pending";
}

const USERS_KEY = "adminUsers";
const AUDIT_KEY = "adminUserAudit";
const PENDING_KEY = "pendingPharmacyRegistrations";

const mergeUsersByEmail = (baseUsers: AdminUser[], storedUsers: AdminUser[]): AdminUser[] => {
  const merged = new Map<string, AdminUser>();

  // Load file users first so they are always visible in the table.
  baseUsers.forEach((u) => merged.set(u.email.toLowerCase(), u));

  // Stored users can override file users (edited fields/status/password).
  storedUsers.forEach((u) => merged.set(u.email.toLowerCase(), u));

  return Array.from(merged.values());
};

const getStoredUsers = (): AdminUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return users;
  try {
    const parsed = JSON.parse(raw) as AdminUser[];
    if (!Array.isArray(parsed)) return users;
    return mergeUsersByEmail(users, parsed);
  } catch {
    return users;
  }
};

const getStoredAudit = (): UserAuditEvent[] => {
  const raw = localStorage.getItem(AUDIT_KEY);
  if (!raw) return seedAuditEvents;
  try {
    const parsed = JSON.parse(raw) as UserAuditEvent[];
    return Array.isArray(parsed) ? parsed : seedAuditEvents;
  } catch {
    return seedAuditEvents;
  }
};

const getStoredPending = (): PendingPharmacyRegistration[] => {
  const raw = localStorage.getItem(PENDING_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as PendingPharmacyRegistration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const formatNow = () => new Date().toLocaleString("ro-RO");

const UserFormModal: React.FC<{
  isOpen: boolean;
  initial?: UserFormData;
  title: string;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
}> = ({ isOpen, initial, title, onClose, onSave }) => {
  const [form, setForm] = useState<UserFormData>(
    initial || {
      name: "",
      email: "",
      password: "",
      role: "Farmacie",
      status: "active",
      phone: "",
      company: "",
    }
  );

  React.useEffect(() => {
    setForm(
      initial || {
        name: "",
        email: "",
        password: "",
        role: "Farmacie",
        status: "active",
        phone: "",
        company: "",
      }
    );
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nume"
              required
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              type="email"
              required
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Parola"
              required
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Telefon"
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Companie"
              className="px-3 py-2 border rounded-lg"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Farmacie">Farmacie</option>
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="active">Activ</option>
              <option value="inactive">Inactiv</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Anulare</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Salveaza</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(() => getStoredUsers());
  const [audit, setAudit] = useState<UserAuditEvent[]>(() => getStoredAudit());
  const [pendingPharmacies, setPendingPharmacies] = useState<PendingPharmacyRegistration[]>(() => getStoredPending());
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [auditUser, setAuditUser] = useState<AdminUser | null>(null);

  const persistUsers = (next: AdminUser[]) => {
    setUsers(next);
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
  };

  const persistAudit = (next: UserAuditEvent[]) => {
    setAudit(next);
    localStorage.setItem(AUDIT_KEY, JSON.stringify(next));
  };

  const persistPending = (next: PendingPharmacyRegistration[]) => {
    setPendingPharmacies(next);
    localStorage.setItem(PENDING_KEY, JSON.stringify(next));
  };

  const pushAudit = (userId: string, action: UserAuditEvent["action"], details: string) => {
    const next = [
      {
        id: crypto.randomUUID(),
        userId,
        action,
        timestamp: formatNow(),
        details,
      },
      ...audit,
    ];
    persistAudit(next);
  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = role === "all" || u.role === role;
      const matchStatus = status === "all" || u.status === status;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, role, status]);

  const toFormData = (u: AdminUser): UserFormData => ({
    name: u.name,
    email: u.email,
    password: u.password,
    role: u.role,
    status: u.status,
    phone: u.phone || "",
    company: u.company || "",
  });

  const handleCreate = (data: UserFormData) => {
    const now = formatNow();
    const newUser: AdminUser = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      status: data.status,
      phone: data.phone,
      company: data.company,
      createdAt: now,
      lastActivity: "User created",
      lastLogin: "Never",
      lastPasswordReset: "Never",
    };
    persistUsers([newUser, ...users]);
    pushAudit(newUser.id, "user_created", `Created user ${newUser.email}`);
  };

  const handleEdit = (data: UserFormData) => {
    if (!editing) return;
    const next = users.map((u) =>
      u.id === editing.id
        ? {
            ...u,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            status: data.status,
            phone: data.phone,
            company: data.company,
            lastActivity: "User updated",
          }
        : u
    );
    persistUsers(next);
    pushAudit(editing.id, "user_updated", `Updated user ${data.email}`);
    setEditing(null);
  };

  const handleDelete = (user: AdminUser) => {
    if (!confirm(`Stergi utilizatorul ${user.email}?`)) return;
    persistUsers(users.filter((u) => u.id !== user.id));
    pushAudit(user.id, "user_deleted", `Deleted user ${user.email}`);
  };

  const handleToggleStatus = (user: AdminUser) => {
    const nextStatus: AdminUser["status"] = user.status === "active" ? "inactive" : "active";
    const next = users.map((u) =>
      u.id === user.id ? { ...u, status: nextStatus, lastActivity: `Status changed to ${nextStatus}` } : u
    );
    persistUsers(next);
    pushAudit(user.id, "status_changed", `Changed status to ${nextStatus}`);
  };

  const handleResetPassword = (user: AdminUser) => {
    const generated = `pw-${Math.random().toString(36).slice(2, 10)}`;
    const now = formatNow();
    const next = users.map((u) =>
      u.id === user.id
        ? { ...u, password: generated, lastPasswordReset: now, lastActivity: "Password reset" }
        : u
    );
    persistUsers(next);
    pushAudit(user.id, "password_reset", `Password reset to generated value`);
    alert(`Parola noua pentru ${user.email}: ${generated}`);
  };

  const handleApprovePharmacy = (request: PendingPharmacyRegistration) => {
    const exists = users.some((u) => u.email === request.email);
    if (exists) {
      alert("Exista deja un utilizator cu acest email.");
      return;
    }

    const now = formatNow();
    const newUser: AdminUser = {
      id: request.id,
      name: request.name,
      email: request.email,
      password: request.password,
      role: "Farmacie",
      status: "active",
      phone: request.phone,
      company: request.pharmacyName,
      createdAt: request.requestedAt,
      lastActivity: "Approved by SuperAdmin",
      lastLogin: "Never",
      lastPasswordReset: "Never",
    };

    persistUsers([newUser, ...users]);
    persistPending(pendingPharmacies.filter((p) => p.id !== request.id));
    pushAudit(newUser.id, "user_created", `Approved pharmacy registration for ${newUser.email} at ${now}`);
  };

  const handleRejectPharmacy = (request: PendingPharmacyRegistration) => {
    persistPending(pendingPharmacies.filter((p) => p.id !== request.id));
    pushAudit(request.id, "user_deleted", `Rejected pharmacy registration for ${request.email}`);
  };

  const userAudit = auditUser ? audit.filter((a) => a.userId === auditUser.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Management Utilizatori</h1>
          <p className="text-slate-600 mt-1">Superadminul poate controla tot sistemul.</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Creeaza utilizator
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cautare dupa nume/email"
            className="w-full pl-9 pr-3 py-2 border rounded-lg"
          />
        </div>
        <select value={role} onChange={(e) => setRole(e.target.value as UserRole | "all")} className="px-3 py-2 border rounded-lg">
          <option value="all">Toate rolurile</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Farmacie">Farmacie</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as "all" | "active" | "inactive")} className="px-3 py-2 border rounded-lg">
          <option value="all">Toate statusurile</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <div className="px-4 py-3 border-b bg-amber-50">
          <h2 className="font-semibold text-slate-900">Farmacii in asteptare aprobare</h2>
          <p className="text-sm text-slate-600">
            Cereri din pagina de inregistrare: {pendingPharmacies.length}
          </p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3">Farmacie</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Licenta</th>
              <th className="text-left px-4 py-3">Telefon</th>
              <th className="text-left px-4 py-3">Data cerere</th>
              <th className="text-left px-4 py-3">Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {pendingPharmacies.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">Nu exista cereri in asteptare.</td>
              </tr>
            ) : (
              pendingPharmacies.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{p.pharmacyName}</div>
                    <div className="text-slate-500">{p.name}</div>
                  </td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3">{p.pharmacyLicense}</td>
                  <td className="px-4 py-3">{p.phone}</td>
                  <td className="px-4 py-3">{new Date(p.requestedAt).toLocaleString("ro-RO")}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprovePharmacy(p)}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs"
                      >
                        Aproba
                      </button>
                      <button
                        onClick={() => handleRejectPharmacy(p)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs"
                      >
                        Respinge
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3">Utilizator</th>
              <th className="text-left px-4 py-3">Rol</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Ultima activitate</th>
              <th className="text-left px-4 py-3">Ultimul login</th>
              <th className="text-left px-4 py-3">Resetare parola</th>
              <th className="text-left px-4 py-3">Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{u.name}</div>
                  <div className="text-slate-500">{u.email}</div>
                </td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">{u.lastActivity}</td>
                <td className="px-4 py-3">{u.lastLogin}</td>
                <td className="px-4 py-3">{u.lastPasswordReset}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditing(u)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Editare">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleToggleStatus(u)} className="p-2 text-amber-600 hover:bg-amber-50 rounded" title="Activare/Dezactivare">
                      {u.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </button>
                    <button onClick={() => handleResetPassword(u)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded" title="Resetare parola">
                      <Key className="w-4 h-4" />
                    </button>
                    <button onClick={() => setAuditUser(u)} className="p-2 text-purple-600 hover:bg-purple-50 rounded" title="Audit log">
                      <History className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(u)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Stergere">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserFormModal
        isOpen={createOpen}
        title="Creeaza utilizator"
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />

      <UserFormModal
        isOpen={Boolean(editing)}
        title="Editeaza utilizator"
        initial={editing ? toFormData(editing) : undefined}
        onClose={() => setEditing(null)}
        onSave={handleEdit}
      />

      {auditUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-slate-900">Audit log - {auditUser.email}</h3>
              <button onClick={() => setAuditUser(null)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-3">Actiune</th>
                    <th className="text-left px-4 py-3">Timestamp</th>
                    <th className="text-left px-4 py-3">Detalii</th>
                  </tr>
                </thead>
                <tbody>
                  {userAudit.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-slate-500">Fara evenimente.</td>
                    </tr>
                  ) : (
                    userAudit.map((a) => (
                      <tr key={a.id} className="border-t">
                        <td className="px-4 py-3">{a.action}</td>
                        <td className="px-4 py-3">{a.timestamp}</td>
                        <td className="px-4 py-3">{a.details}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
