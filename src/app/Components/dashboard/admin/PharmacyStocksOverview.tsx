import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpDown,
  Boxes,
  CalendarClock,
  ClipboardList,
  Package,
  RefreshCcw,
  ShieldAlert,
} from "lucide-react";
import { products } from "../../../data/products";
import { users as seedUsers } from "../../../data/users";

type UserRole = "SuperAdmin" | "Warehouse" | "Farmacie";

interface AdminUser {
  id: string;
  name: string;
  role: UserRole;
}

interface WarehouseItem {
  id: string;
  name: string;
  code: string;
  city: string;
  status: "active" | "inactive";
}

interface StockRecord {
  warehouseId: string;
  pharmacyId: string;
  productId: string;
  quantity: number;
}

interface InventoryMovement {
  id: string;
  timestamp: string;
  warehouseName: string;
  pharmacyName: string;
  productName: string;
  type: "IN" | "OUT" | "TRANSFER";
  quantity: number;
  reference: string;
}

interface ManualAdjustment {
  id: string;
  timestamp: string;
  warehouseName: string;
  pharmacyName: string;
  productName: string;
  oldQty: number;
  newQty: number;
  reason: string;
  operator: string;
}

interface AutoAllocation {
  id: string;
  runAt: string;
  warehouseName: string;
  pharmacyName: string;
  productName: string;
  suggestedQty: number;
  allocatedQty: number;
  status: "executed" | "partial" | "blocked";
}

interface BatchTraceability {
  id: string;
  warehouseName: string;
  pharmacyName: string;
  productName: string;
  lotNumber: string;
  serialNumber: string;
  expiresAt: string;
  quantity: number;
}

const WAREHOUSES_KEY = "adminWarehouses";
const USERS_KEY = "adminUsers";

const seedWarehouses: WarehouseItem[] = [
  {
    id: "wh-001",
    name: "Warehouse Central",
    code: "WH-01",
    city: "Bucuresti",
    status: "active",
  },
];

const sectionItems = [
  { id: "stock", label: "Stoc per depozit", icon: Boxes },
  { id: "movements", label: "Miscari inventar", icon: ArrowUpDown },
  { id: "adjustments", label: "Ajustari manuale", icon: ClipboardList },
  { id: "allocations", label: "Alocari automate", icon: RefreshCcw },
  { id: "traceability", label: "Expirari, loturi, seriale", icon: ShieldAlert },
] as const;

type SectionId = (typeof sectionItems)[number]["id"];

const parseUsers = (): AdminUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return seedUsers;
  try {
    const parsed = JSON.parse(raw) as AdminUser[];
    return Array.isArray(parsed) ? parsed : seedUsers;
  } catch {
    return seedUsers;
  }
};

const parseWarehouses = (): WarehouseItem[] => {
  const raw = localStorage.getItem(WAREHOUSES_KEY);
  if (!raw) return seedWarehouses;
  try {
    const parsed = JSON.parse(raw) as WarehouseItem[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return seedWarehouses;
    }
    return parsed;
  } catch {
    return seedWarehouses;
  }
};

const deterministic = (input: string, min: number, max: number): number => {
  const spread = max - min + 1;
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) % 100000;
  }
  return min + (hash % spread);
};

const prettyDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("ro-RO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const PharmacyStocksOverview: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("stock");

  const warehouses = useMemo(() => parseWarehouses(), []);
  const pharmacies = useMemo(
    () => parseUsers().filter((user) => user.role === "Farmacie"),
    []
  );
  const trackedProducts = useMemo(() => products.slice(0, 8), []);

  const stockRecords = useMemo<StockRecord[]>(() => {
    return warehouses.flatMap((warehouse) =>
      pharmacies.flatMap((pharmacy) =>
        trackedProducts.map((product) => ({
          warehouseId: warehouse.id,
          pharmacyId: pharmacy.id,
          productId: product.id,
          quantity: deterministic(
            `${warehouse.id}-${pharmacy.id}-${product.id}`,
            5,
            420
          ),
        }))
      )
    );
  }, [warehouses, pharmacies, trackedProducts]);

  const totalUnits = useMemo(
    () => stockRecords.reduce((sum, record) => sum + record.quantity, 0),
    [stockRecords]
  );

  const lowStockCount = useMemo(
    () => stockRecords.filter((record) => record.quantity < 50).length,
    [stockRecords]
  );

  const inventoryMovements = useMemo<InventoryMovement[]>(() => {
    return stockRecords.slice(0, 18).map((record, index) => {
      const warehouse = warehouses.find((item) => item.id === record.warehouseId);
      const pharmacy = pharmacies.find((item) => item.id === record.pharmacyId);
      const product = trackedProducts.find((item) => item.id === record.productId);
      const movementType: InventoryMovement["type"] =
        index % 3 === 0 ? "IN" : index % 3 === 1 ? "OUT" : "TRANSFER";

      return {
        id: `mv-${index + 1}`,
        timestamp: new Date(Date.now() - index * 90 * 60 * 1000).toISOString(),
        warehouseName: warehouse?.name ?? "Depozit necunoscut",
        pharmacyName: pharmacy?.name ?? "Farmacie necunoscuta",
        productName: product?.name ?? "Produs necunoscut",
        type: movementType,
        quantity: deterministic(`mv-${record.productId}-${index}`, 5, 120),
        reference: `REF-${(1000 + index).toString()}`,
      };
    });
  }, [stockRecords, warehouses, pharmacies, trackedProducts]);

  const manualAdjustments = useMemo<ManualAdjustment[]>(() => {
    return stockRecords.slice(0, 12).map((record, index) => {
      const warehouse = warehouses.find((item) => item.id === record.warehouseId);
      const pharmacy = pharmacies.find((item) => item.id === record.pharmacyId);
      const product = trackedProducts.find((item) => item.id === record.productId);
      const oldQty = deterministic(`old-${record.productId}-${index}`, 20, 180);
      const delta = deterministic(`delta-${record.productId}-${index}`, -25, 35);

      return {
        id: `adj-${index + 1}`,
        timestamp: new Date(Date.now() - index * 7 * 60 * 60 * 1000).toISOString(),
        warehouseName: warehouse?.name ?? "Depozit necunoscut",
        pharmacyName: pharmacy?.name ?? "Farmacie necunoscuta",
        productName: product?.name ?? "Produs necunoscut",
        oldQty,
        newQty: Math.max(0, oldQty + delta),
        reason: delta >= 0 ? "Corectie receptie" : "Diferente inventar ciclic",
        operator: "Super Admin",
      };
    });
  }, [stockRecords, warehouses, pharmacies, trackedProducts]);

  const autoAllocations = useMemo<AutoAllocation[]>(() => {
    return stockRecords.slice(0, 12).map((record, index) => {
      const warehouse = warehouses.find((item) => item.id === record.warehouseId);
      const pharmacy = pharmacies.find((item) => item.id === record.pharmacyId);
      const product = trackedProducts.find((item) => item.id === record.productId);
      const suggestedQty = deterministic(`suggested-${record.productId}-${index}`, 25, 140);
      const allocatedQty = deterministic(`allocated-${record.productId}-${index}`, 0, suggestedQty);
      const status: AutoAllocation["status"] =
        allocatedQty === 0
          ? "blocked"
          : allocatedQty < suggestedQty
            ? "partial"
            : "executed";

      return {
        id: `alloc-${index + 1}`,
        runAt: new Date(Date.now() - index * 5 * 60 * 60 * 1000).toISOString(),
        warehouseName: warehouse?.name ?? "Depozit necunoscut",
        pharmacyName: pharmacy?.name ?? "Farmacie necunoscuta",
        productName: product?.name ?? "Produs necunoscut",
        suggestedQty,
        allocatedQty,
        status,
      };
    });
  }, [stockRecords, warehouses, pharmacies, trackedProducts]);

  const traceabilityRows = useMemo<BatchTraceability[]>(() => {
    return stockRecords.slice(0, 14).map((record, index) => {
      const warehouse = warehouses.find((item) => item.id === record.warehouseId);
      const pharmacy = pharmacies.find((item) => item.id === record.pharmacyId);
      const product = trackedProducts.find((item) => item.id === record.productId);
      const expiresAt = new Date(Date.now() + (index - 4) * 14 * 24 * 60 * 60 * 1000);

      return {
        id: `lot-${index + 1}`,
        warehouseName: warehouse?.name ?? "Depozit necunoscut",
        pharmacyName: pharmacy?.name ?? "Farmacie necunoscuta",
        productName: product?.name ?? "Produs necunoscut",
        lotNumber: `LOT-${(500 + index).toString()}`,
        serialNumber: `SN-${(900000 + index * 17).toString()}`,
        expiresAt: expiresAt.toISOString(),
        quantity: deterministic(`lot-qty-${record.productId}-${index}`, 2, 90),
      };
    });
  }, [stockRecords, warehouses, pharmacies, trackedProducts]);

  const stockByWarehouse = useMemo(() => {
    return warehouses.map((warehouse) => {
      const matching = stockRecords.filter((record) => record.warehouseId === warehouse.id);
      const units = matching.reduce((sum, record) => sum + record.quantity, 0);
      const linkedPharmacies = new Set(matching.map((record) => record.pharmacyId)).size;

      return {
        warehouse,
        units,
        lowStock: matching.filter((record) => record.quantity < 50).length,
        linkedPharmacies,
      };
    });
  }, [warehouses, stockRecords]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Stocuri Farmacii in Depozite</h1>
          <p className="mt-1 text-slate-600">
            Vizibilitate completa pentru Super Admin asupra stocurilor tuturor
            farmaciilor in toate depozitele.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-700">
          <Activity className="h-4 w-4" />
          Actualizare snapshot: {new Date().toLocaleTimeString("ro-RO")}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Unitati totale in retea</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{totalUnits}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Depozite monitorizate</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{warehouses.length}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Farmacii conectate</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pharmacies.length}</div>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <div className="text-sm text-slate-500">Pozitii cu stoc redus</div>
          <div className="mt-1 text-2xl font-bold text-amber-700">{lowStockCount}</div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          {sectionItems.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === activeSection;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeSection === "stock" ? (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Depozit</th>
                <th className="px-4 py-3">Oras</th>
                <th className="px-4 py-3">Farmacii deservite</th>
                <th className="px-4 py-3">Unitati totale</th>
                <th className="px-4 py-3">Pozitii stoc redus</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {stockByWarehouse.map((row) => (
                <tr key={row.warehouse.id} className="border-t">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.warehouse.name}</td>
                  <td className="px-4 py-3 text-slate-700">{row.warehouse.city}</td>
                  <td className="px-4 py-3 text-slate-700">{row.linkedPharmacies}</td>
                  <td className="px-4 py-3 text-slate-700">{row.units}</td>
                  <td className="px-4 py-3 text-amber-700">{row.lowStock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        row.warehouse.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {row.warehouse.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {activeSection === "movements" ? (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Timp</th>
                <th className="px-4 py-3">Depozit</th>
                <th className="px-4 py-3">Farmacie</th>
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Tip</th>
                <th className="px-4 py-3">Cantitate</th>
                <th className="px-4 py-3">Referinta</th>
              </tr>
            </thead>
            <tbody>
              {inventoryMovements.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3 text-slate-700">{prettyDateTime(item.timestamp)}</td>
                  <td className="px-4 py-3 text-slate-700">{item.warehouseName}</td>
                  <td className="px-4 py-3 text-slate-700">{item.pharmacyName}</td>
                  <td className="px-4 py-3 text-slate-700">{item.productName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.type === "IN"
                          ? "bg-green-100 text-green-700"
                          : item.type === "OUT"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.quantity}</td>
                  <td className="px-4 py-3 text-slate-500">{item.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {activeSection === "adjustments" ? (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Timp</th>
                <th className="px-4 py-3">Depozit / Farmacie</th>
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Stoc vechi</th>
                <th className="px-4 py-3">Stoc nou</th>
                <th className="px-4 py-3">Motiv</th>
                <th className="px-4 py-3">Operator</th>
              </tr>
            </thead>
            <tbody>
              {manualAdjustments.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3 text-slate-700">{prettyDateTime(item.timestamp)}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {item.warehouseName}
                    <div className="text-xs text-slate-500">{item.pharmacyName}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.productName}</td>
                  <td className="px-4 py-3 text-slate-700">{item.oldQty}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.newQty}</td>
                  <td className="px-4 py-3 text-slate-700">{item.reason}</td>
                  <td className="px-4 py-3 text-slate-700">{item.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {activeSection === "allocations" ? (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Rulare</th>
                <th className="px-4 py-3">Depozit</th>
                <th className="px-4 py-3">Farmacie</th>
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Necesar</th>
                <th className="px-4 py-3">Alocat</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {autoAllocations.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3 text-slate-700">{prettyDateTime(item.runAt)}</td>
                  <td className="px-4 py-3 text-slate-700">{item.warehouseName}</td>
                  <td className="px-4 py-3 text-slate-700">{item.pharmacyName}</td>
                  <td className="px-4 py-3 text-slate-700">{item.productName}</td>
                  <td className="px-4 py-3 text-slate-700">{item.suggestedQty}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.allocatedQty}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === "executed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "partial"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {activeSection === "traceability" ? (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Depozit / Farmacie</th>
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Lot</th>
                <th className="px-4 py-3">Serial</th>
                <th className="px-4 py-3">Expira la</th>
                <th className="px-4 py-3">Cantitate</th>
                <th className="px-4 py-3">Avertizare</th>
              </tr>
            </thead>
            <tbody>
              {traceabilityRows.map((item) => {
                const expiringSoon = new Date(item.expiresAt).getTime() - Date.now() < 45 * 24 * 60 * 60 * 1000;
                return (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 text-slate-700">
                      {item.warehouseName}
                      <div className="text-xs text-slate-500">{item.pharmacyName}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{item.productName}</td>
                    <td className="px-4 py-3 text-slate-700">{item.lotNumber}</td>
                    <td className="px-4 py-3 text-slate-700">{item.serialNumber}</td>
                    <td className="px-4 py-3 text-slate-700">{prettyDateTime(item.expiresAt)}</td>
                    <td className="px-4 py-3 text-slate-700">{item.quantity}</td>
                    <td className="px-4 py-3">
                      {expiringSoon ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                          <CalendarClock className="h-3.5 w-3.5" />
                          Expira curand
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                          <Package className="h-3.5 w-3.5" />
                          In termen
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};
