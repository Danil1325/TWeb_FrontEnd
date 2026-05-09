import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Edit2,
  History,
  Lock,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Unlock,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "../../api/auth";
import { CustomSelect } from "./CustomSelect";

type UserRole = "SuperAdmin" | "Warehouse" | "Farmacie";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  phone?: string | null;
  company?: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string | null;
}

interface UserAuditEvent {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  createdAt: string;
}

interface PendingPharmacyRegistration {
  id: string;
  contactName: string;
  email: string;
  pharmacyName: string;
  pharmacyLicense: string;
  phone: string;
  requestedAt: string;
  status: "pending" | "approved" | "rejected";
}

type UserFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  status: "active" | "inactive";
  phone: string;
  company: string;
  pharmacyName: string;
  pharmacyLicense: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Never";
  return new Date(value).toLocaleString("ro-RO");
};

const emptyForm: UserFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Farmacie",
  status: "active",
  phone: "",
  company: "",
  pharmacyName: "",
  pharmacyLicense: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
};

const toFormData = (user: AdminUser): UserFormData => ({
  name: user.name,
  email: user.email,
  password: "",
  confirmPassword: "",
  role: user.role,
  status: user.status,
  phone: user.phone ?? "",
  company: user.company ?? "",
  pharmacyName: user.company ?? "",
  pharmacyLicense: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
});

const UserFormModal: React.FC<{
  isOpen: boolean;
  mode: "create" | "edit";
  initial?: UserFormData;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void>;
}> = ({ isOpen, mode, initial, onClose, onSave }) => {
  const [form, setForm] = useState<UserFormData>(initial ?? emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initial ?? emptyForm);
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === "create" && form.password !== form.confirmPassword) {
      toast.error("Parolele nu coincid.");
      return;
    }

    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-slate-900">
            {mode === "create" ? "Creeaza utilizator" : "Editeaza utilizator"}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700" type="button">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h4 className="text-base font-semibold mb-4 flex items-center gap-2 text-slate-900">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Full Name *</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full px-3 py-2 border rounded-lg font-normal"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Email Address *</span>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@pharmacy.com"
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg font-normal"
                />
              </label>
              {mode === "create" && (
                <>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    <span>Password *</span>
                    <input
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 8 characters"
                      type="password"
                      minLength={8}
                      required
                      className="w-full px-3 py-2 border rounded-lg font-normal"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    <span>Confirm Password *</span>
                    <input
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      type="password"
                      minLength={8}
                      required
                      className="w-full px-3 py-2 border rounded-lg font-normal"
                    />
                  </label>
                </>
              )}
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Role *</span>
                <CustomSelect
                  value={form.role}
                  onChange={(value) => setForm({ ...form, role: value as UserRole })}
                  options={[
                    { label: "SuperAdmin", value: "SuperAdmin" },
                    { label: "Warehouse", value: "Warehouse" },
                    { label: "Farmacie", value: "Farmacie" },
                  ]}
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Status *</span>
                <CustomSelect
                  value={form.status}
                  onChange={(value) => setForm({ ...form, status: value as "active" | "inactive" })}
                  options={[
                    { label: "Activ", value: "active" },
                    { label: "Inactiv", value: "inactive" },
                  ]}
                />
              </label>
            </div>
          </div>

          {mode === "create" && (
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center gap-2 text-slate-900">
                <Building2 className="w-5 h-5 text-blue-600" />
                Pharmacy Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Pharmacy Name *</span>
                  <input
                    value={form.pharmacyName}
                    onChange={(e) => setForm({ ...form, pharmacyName: e.target.value, company: e.target.value })}
                    placeholder="Central Pharmacy"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Pharmacy License Number *</span>
                  <input
                    value={form.pharmacyLicense}
                    onChange={(e) => setForm({ ...form, pharmacyLicense: e.target.value })}
                    placeholder="PH-2024-XXXXX"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Phone Number *</span>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    type="tel"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Address *</span>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="123 Main Street"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>City *</span>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="New York"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>State *</span>
                  <input
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="NY"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>ZIP Code *</span>
                  <input
                    value={form.zipCode}
                    onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                    placeholder="10001"
                    required={form.role === "Farmacie"}
                    className="w-full px-3 py-2 border rounded-lg font-normal"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              Anulare
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
            >
              {saving ? "Se salveaza..." : "Salveaza"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [audit, setAudit] = useState<UserAuditEvent[]>([]);
  const [pendingPharmacies, setPendingPharmacies] = useState<PendingPharmacyRegistration[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [auditUser, setAuditUser] = useState<AdminUser | null>(null);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, pendingData] = await Promise.all([
        authFetch<AdminUser[]>("/api/admin/users"),
        authFetch<PendingPharmacyRegistration[]>("/api/pharmacy-registration-requests?status=pending"),
      ]);

      setUsers(usersData);
      setPendingPharmacies(pendingData);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut incarca utilizatorii.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

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

  const openAudit = async (user: AdminUser) => {
    setAuditUser(user);
    try {
      const logs = await authFetch<UserAuditEvent[]>(`/api/admin/users/audit-logs?userId=${user.id}`);
      setAudit(logs);
    } catch (err) {
      setAudit([]);
      toast.error(err instanceof Error ? err.message : "Nu am putut incarca auditul.");
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    setActionLoading(user.id);
    try {
      const updated = await authFetch<AdminUser>(`/api/admin/users/${user.id}/toggle-status`, {
        method: "PATCH",
      });
      setUsers((current) => current.map((u) => (u.id === updated.id ? updated : u)));
      toast.success(`Status schimbat in ${updated.status}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut schimba statusul.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreate = async (data: UserFormData) => {
    try {
      const created = await authFetch<AdminUser>("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          status: data.status,
          phone: data.phone,
          company: data.company || data.pharmacyName,
          pharmacyName: data.pharmacyName,
          pharmacyLicense: data.pharmacyLicense,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        }),
      });

      setUsers((current) => [created, ...current]);
      toast.success(`Utilizatorul ${created.email} a fost creat.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut crea utilizatorul.");
      throw err;
    }
  };

  const handleEdit = async (data: UserFormData) => {
    if (!editing) return;

    try {
      const updated = await authFetch<AdminUser>(`/api/admin/users/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          phone: data.phone,
          company: data.company,
        }),
      });

      setUsers((current) => current.map((user) => (user.id === updated.id ? updated : user)));
      setEditing(null);
      toast.success(`Utilizatorul ${updated.email} a fost actualizat.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut actualiza utilizatorul.");
      throw err;
    }
  };

  const handleDelete = async (user: AdminUser) => {
    const currentUserId = localStorage.getItem("userId");
    if (user.id === currentUserId) {
      toast.error("Nu poti sterge contul cu care esti autentificat.");
      return;
    }

    if (!confirm(`Stergi utilizatorul ${user.email}?`)) return;

    setActionLoading(user.id);
    try {
      await authFetch<void>(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      setUsers((current) => current.filter((item) => item.id !== user.id));
      toast.success(`Utilizatorul ${user.email} a fost sters.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut sterge utilizatorul.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprovePharmacy = async (request: PendingPharmacyRegistration) => {
    setActionLoading(request.id);
    try {
      await authFetch(`/api/pharmacy-registration-requests/${request.id}/approve`, {
        method: "POST",
        body: JSON.stringify({ reviewerUserId: localStorage.getItem("userId"), notes: "Approved from admin dashboard" }),
      });
      toast.success(`Farmacia ${request.pharmacyName} a fost aprobata.`);
      await loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut aproba cererea.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectPharmacy = async (request: PendingPharmacyRegistration) => {
    setActionLoading(request.id);
    try {
      await authFetch(`/api/pharmacy-registration-requests/${request.id}/reject`, {
        method: "POST",
        body: JSON.stringify({ reviewerUserId: localStorage.getItem("userId"), notes: "Rejected from admin dashboard" }),
      });
      toast.success(`Cererea pentru ${request.pharmacyName} a fost respinsa.`);
      await loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Nu am putut respinge cererea.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Management Utilizatori</h1>
          <p className="text-slate-600 mt-1">Datele vin din backend si sunt protejate prin rolul SuperAdmin.</p>
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
        <CustomSelect
          value={role}
          onChange={(value) => setRole(value as UserRole | "all")}
          options={[
            { label: "Toate rolurile", value: "all" },
            { label: "SuperAdmin", value: "SuperAdmin" },
            { label: "Warehouse", value: "Warehouse" },
            { label: "Farmacie", value: "Farmacie" },
          ]}
        />
        <CustomSelect
          value={status}
          onChange={(value) => setStatus(value as "all" | "active" | "inactive")}
          options={[
            { label: "Toate statusurile", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => void loadData()}
          className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className="w-4 h-4" />
          Reincarca datele
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <div className="px-4 py-3 border-b bg-amber-50">
          <h2 className="font-semibold text-slate-900">Farmacii in asteptare aprobare</h2>
          <p className="text-sm text-slate-600">
            Cereri din baza de date: {pendingPharmacies.length}
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
                    <div className="text-slate-500">{p.contactName}</div>
                  </td>
                  <td className="px-4 py-3">{p.email}</td>
                  <td className="px-4 py-3">{p.pharmacyLicense}</td>
                  <td className="px-4 py-3">{p.phone}</td>
                  <td className="px-4 py-3">{formatDate(p.requestedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        disabled={actionLoading === p.id}
                        onClick={() => void handleApprovePharmacy(p)}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs disabled:bg-gray-400"
                      >
                        Aproba
                      </button>
                      <button
                        disabled={actionLoading === p.id}
                        onClick={() => void handleRejectPharmacy(p)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs disabled:bg-gray-400"
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
              <th className="text-left px-4 py-3">Companie</th>
              <th className="text-left px-4 py-3">Ultimul login</th>
              <th className="text-left px-4 py-3">Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">Se incarca...</td>
              </tr>
            ) : (
              filtered.map((u) => (
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
                  <td className="px-4 py-3">{u.company || "-"}</td>
                  <td className="px-4 py-3">{formatDate(u.lastLoginAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        disabled={actionLoading === u.id}
                        onClick={() => setEditing(u)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded disabled:text-gray-400"
                        title="Editare"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        disabled={actionLoading === u.id}
                        onClick={() => void handleToggleStatus(u)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded disabled:text-gray-400"
                        title="Activare/Dezactivare"
                      >
                        {u.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button onClick={() => void openAudit(u)} className="p-2 text-purple-600 hover:bg-purple-50 rounded" title="Audit log">
                        <History className="w-4 h-4" />
                      </button>
                      <button
                        disabled={actionLoading === u.id}
                        onClick={() => void handleDelete(u)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded disabled:text-gray-400"
                        title="Stergere"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UserFormModal
        isOpen={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />

      <UserFormModal
        isOpen={Boolean(editing)}
        mode="edit"
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
                  {audit.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-slate-500">Fara evenimente.</td>
                    </tr>
                  ) : (
                    audit.map((a) => (
                      <tr key={a.id} className="border-t">
                        <td className="px-4 py-3">{a.action}</td>
                        <td className="px-4 py-3">{formatDate(a.createdAt)}</td>
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
