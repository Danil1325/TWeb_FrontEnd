import React, { type SubmitEventHandler, useMemo, useState } from "react";
import { Building2, Edit2, Plus, Trash2, Warehouse, X } from "lucide-react";
import { AdminUser, users as fileUsers } from "../../../data/users";
import { CustomSelect } from "../CustomSelect";

interface WarehouseZones {
  reception: boolean;
  picking: boolean;
  packing: boolean;
  shipping: boolean;
}

interface WarehouseItem {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  zones: WarehouseZones;
  bins: string[];
  acceptedProductTypes: string[];
  temperatureMin: number;
  temperatureMax: number;
  specialConditions: string;
  assignedUserIds: string[];
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface WarehouseFormData {
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  zones: WarehouseZones;
  binsInput: string;
  productTypesInput: string;
  temperatureMin: string;
  temperatureMax: string;
  specialConditions: string;
  assignedUserIds: string[];
  status: "active" | "inactive";
}

const WAREHOUSES_KEY = "adminWarehouses";

const seedWarehouses: WarehouseItem[] = [
  {
    id: "wh-001",
    name: "Warehouse Central",
    code: "WH-01",
    address: "Str. Industriei 12",
    city: "Bucuresti",
    state: "Ilfov",
    zipCode: "077190",
    phone: "+40 722 345 678",
    email: "warehouse@warehouse.com",
    zones: {
      reception: true,
      picking: true,
      packing: true,
      shipping: true,
    },
    bins: ["A1-01", "A1-02", "B2-10", "COLD-01"],
    acceptedProductTypes: ["OTC", "Rx", "Dispozitive medicale"],
    temperatureMin: 2,
    temperatureMax: 25,
    specialConditions: "Zona COLD-01 pentru produse termo-sensibile (2-8C).",
    assignedUserIds: ["u2"],
    status: "active",
    createdAt: "2025-03-05T10:00:00.000Z",
    updatedAt: "2026-03-24T10:00:00.000Z",
  },
];

const defaultForm: WarehouseFormData = {
  name: "",
  code: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  email: "",
  zones: {
    reception: true,
    picking: true,
    packing: true,
    shipping: true,
  },
  binsInput: "",
  productTypesInput: "",
  temperatureMin: "15",
  temperatureMax: "25",
  specialConditions: "",
  assignedUserIds: [],
  status: "active",
};

const parseList = (input: string) =>
  input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const mergeUsersByEmail = (storedUsers: AdminUser[]): AdminUser[] => {
  const merged = new Map<string, AdminUser>();
  fileUsers.forEach((u) => merged.set(u.email.toLowerCase(), u));
  storedUsers.forEach((u) => merged.set(u.email.toLowerCase(), u));
  return Array.from(merged.values());
};

const getAssignableUsers = (): AdminUser[] => {
  const raw = localStorage.getItem("adminUsers");
  if (!raw) return fileUsers;
  try {
    const parsed = JSON.parse(raw) as AdminUser[];
    if (!Array.isArray(parsed)) return fileUsers;
    return mergeUsersByEmail(parsed);
  } catch {
    return fileUsers;
  }
};

const getStoredWarehouses = (): WarehouseItem[] => {
  const raw = localStorage.getItem(WAREHOUSES_KEY);
  if (!raw) return seedWarehouses;
  try {
    const parsed = JSON.parse(raw) as WarehouseItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) return seedWarehouses;

    const hasSeed = parsed.some((w) => w.code.toLowerCase() === "wh-01");
    return hasSeed ? parsed : [...parsed, ...seedWarehouses];
  } catch {
    return seedWarehouses;
  }
};

const WarehouseFormModal: React.FC<{
  isOpen: boolean;
  title: string;
  assignableUsers: AdminUser[];
  initial?: WarehouseFormData;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSave: (...args: [WarehouseFormData]) => void;
}> = ({ isOpen, title, assignableUsers, initial, onClose, onSave }) => {
  const [form, setForm] = useState<WarehouseFormData>(initial || defaultForm);

  React.useEffect(() => {
    setForm(initial || defaultForm);
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSave(form);
    onClose();
  };

  const toggleAssignedUser = (userId: string) => {
    setForm((prev) => {
      const exists = prev.assignedUserIds.includes(userId);
      return {
        ...prev,
        assignedUserIds: exists
          ? prev.assignedUserIds.filter((id) => id !== userId)
          : [...prev.assignedUserIds, userId],
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nume depozit" required className="px-3 py-2 border rounded-lg" />
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="Cod depozit (ex: WH-01)" required className="px-3 py-2 border rounded-lg" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" className="px-3 py-2 border rounded-lg" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Telefon" className="px-3 py-2 border rounded-lg" />
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Adresa" required className="px-3 py-2 border rounded-lg md:col-span-2" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Oras" required className="px-3 py-2 border rounded-lg" />
            <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Judet" required className="px-3 py-2 border rounded-lg" />
            <input value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} placeholder="Cod postal" className="px-3 py-2 border rounded-lg" />
          </div>

          <section className="border rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Configurare zone</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {([
                ["reception", "Receptie"],
                ["picking", "Picking"],
                ["packing", "Packing"],
                ["shipping", "Expediere"],
              ] as Array<[keyof WarehouseZones, string]>).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.zones[key]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        zones: { ...form.zones, [key]: e.target.checked },
                      })
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.binsInput}
              onChange={(e) => setForm({ ...form, binsInput: e.target.value })}
              placeholder="BIN-uri / locatii (separate prin virgula)"
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.productTypesInput}
              onChange={(e) => setForm({ ...form, productTypesInput: e.target.value })}
              placeholder="Tipuri produse acceptate (separate prin virgula)"
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.temperatureMin}
              onChange={(e) => setForm({ ...form, temperatureMin: e.target.value })}
              type="number"
              placeholder="Temperatura minima"
              className="px-3 py-2 border rounded-lg"
            />
            <input
              value={form.temperatureMax}
              onChange={(e) => setForm({ ...form, temperatureMax: e.target.value })}
              type="number"
              placeholder="Temperatura maxima"
              className="px-3 py-2 border rounded-lg"
            />
          </div>

          <textarea
            value={form.specialConditions}
            onChange={(e) => setForm({ ...form, specialConditions: e.target.value })}
            rows={3}
            placeholder="Conditii speciale (ex: lant frigorific, umiditate controlata)"
            className="w-full px-3 py-2 border rounded-lg"
          />

          <section className="border rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-3">Utilizatori asignati depozitului</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-44 overflow-y-auto">
              {assignableUsers.map((u) => (
                <label key={u.id} className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.assignedUserIds.includes(u.id)}
                    onChange={() => toggleAssignedUser(u.id)}
                  />
                  <span>{u.name} ({u.role})</span>
                </label>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              value={form.status}
              onChange={(value) => setForm({ ...form, status: value as "active" | "inactive" })}
              options={[
                { label: "Activ", value: "active" },
                { label: "Inactiv", value: "inactive" },
              ]}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              Anulare
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Salveaza depozit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const WarehouseManagement: React.FC = () => {
  const [warehouses, setWarehouses] = useState<WarehouseItem[]>(() => getStoredWarehouses());
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<WarehouseItem | null>(null);

  const assignableUsers = useMemo(() => getAssignableUsers(), []);

  const persist = (next: WarehouseItem[]) => {
    setWarehouses(next);
    localStorage.setItem(WAREHOUSES_KEY, JSON.stringify(next));
  };

  const mapToForm = (item: WarehouseItem): WarehouseFormData => ({
    name: item.name,
    code: item.code,
    address: item.address,
    city: item.city,
    state: item.state,
    zipCode: item.zipCode,
    phone: item.phone,
    email: item.email,
    zones: item.zones,
    binsInput: item.bins.join(", "),
    productTypesInput: item.acceptedProductTypes.join(", "),
    temperatureMin: String(item.temperatureMin),
    temperatureMax: String(item.temperatureMax),
    specialConditions: item.specialConditions,
    assignedUserIds: item.assignedUserIds,
    status: item.status,
  });

  const buildWarehouseFromForm = (data: WarehouseFormData, existingId?: string, createdAt?: string): WarehouseItem => ({
    id: existingId || crypto.randomUUID(),
    name: data.name,
    code: data.code,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    phone: data.phone,
    email: data.email,
    zones: data.zones,
    bins: parseList(data.binsInput),
    acceptedProductTypes: parseList(data.productTypesInput),
    temperatureMin: Number(data.temperatureMin || 0),
    temperatureMax: Number(data.temperatureMax || 0),
    specialConditions: data.specialConditions,
    assignedUserIds: data.assignedUserIds,
    status: data.status,
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleCreate = (data: WarehouseFormData) => {
    const duplicateCode = warehouses.some((w) => w.code.toLowerCase() === data.code.toLowerCase());
    if (duplicateCode) {
      alert("Exista deja un depozit cu acest cod.");
      return;
    }
    const next = [buildWarehouseFromForm(data), ...warehouses];
    persist(next);
  };

  const handleEdit = (data: WarehouseFormData) => {
    if (!editing) return;
    const duplicateCode = warehouses.some(
      (w) => w.id !== editing.id && w.code.toLowerCase() === data.code.toLowerCase()
    );
    if (duplicateCode) {
      alert("Exista deja un depozit cu acest cod.");
      return;
    }

    const updated = buildWarehouseFromForm(data, editing.id, editing.createdAt);
    const next = warehouses.map((w) => (w.id === editing.id ? updated : w));
    persist(next);
    setEditing(null);
  };

  const handleDelete = (item: WarehouseItem) => {
    if (!confirm(`Stergi depozitul ${item.name}?`)) return;
    persist(warehouses.filter((w) => w.id !== item.id));
  };

  const toggleStatus = (item: WarehouseItem) => {
    const nextStatus: WarehouseItem["status"] = item.status === "active" ? "inactive" : "active";
    const next = warehouses.map((w) =>
      w.id === item.id ? { ...w, status: nextStatus, updatedAt: new Date().toISOString() } : w
    );
    persist(next);
  };

  const getAssignedUsersLabel = (ids: string[]) => {
    const labels = ids
      .map((id) => assignableUsers.find((u) => u.id === id)?.name)
      .filter(Boolean) as string[];
    return labels.length > 0 ? labels.join(", ") : "Fara utilizatori asignati";
  };

  const zoneLabel = (zones: WarehouseZones) => {
    const labels: string[] = [];
    if (zones.reception) labels.push("Receptie");
    if (zones.picking) labels.push("Picking");
    if (zones.packing) labels.push("Packing");
    if (zones.shipping) labels.push("Expediere");
    return labels.join(", ");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Management Depozite</h1>
          <p className="text-slate-600 mt-1">
            SuperAdminul poate vedea si controla toate depozitele din sistem.
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Creeare depozit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="text-sm text-slate-500">Total depozite</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{warehouses.length}</div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="text-sm text-slate-500">Depozite active</div>
          <div className="text-2xl font-bold text-green-700 mt-1">
            {warehouses.filter((w) => w.status === "active").length}
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="text-sm text-slate-500">Depozite inactive</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">
            {warehouses.filter((w) => w.status === "inactive").length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3">Depozit</th>
              <th className="text-left px-4 py-3">Zone</th>
              <th className="text-left px-4 py-3">BIN-uri</th>
              <th className="text-left px-4 py-3">Tipuri produse</th>
              <th className="text-left px-4 py-3">Temperatura</th>
              <th className="text-left px-4 py-3">Utilizatori asignati</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actiuni</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                  Nu exista depozite create.
                </td>
              </tr>
            ) : (
              warehouses.map((w) => (
                <tr key={w.id} className="border-t align-top">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900 flex items-center gap-2">
                      <Warehouse className="w-4 h-4 text-slate-500" />
                      {w.name}
                    </div>
                    <div className="text-slate-500">{w.code}</div>
                    <div className="text-slate-500 text-xs mt-1">{w.city}, {w.state}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{zoneLabel(w.zones)}</td>
                  <td className="px-4 py-3 text-slate-700">{w.bins.join(", ") || "-"}</td>
                  <td className="px-4 py-3 text-slate-700">{w.acceptedProductTypes.join(", ") || "-"}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {w.temperatureMin}°C - {w.temperatureMax}°C
                    {w.specialConditions ? (
                      <div className="text-xs text-slate-500 mt-1">{w.specialConditions}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{getAssignedUsersLabel(w.assignedUserIds)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${w.status === "active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditing(w)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Editare"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(w)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded"
                        title="Activare/Dezactivare"
                      >
                        <Building2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(w)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
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

      <WarehouseFormModal
        isOpen={createOpen}
        title="Creare depozit"
        assignableUsers={assignableUsers}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />

      <WarehouseFormModal
        isOpen={Boolean(editing)}
        title="Editare depozit"
        assignableUsers={assignableUsers}
        initial={editing ? mapToForm(editing) : undefined}
        onClose={() => setEditing(null)}
        onSave={handleEdit}
      />
    </div>
  );
};
