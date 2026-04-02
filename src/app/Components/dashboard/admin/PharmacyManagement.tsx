import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ArrowUpCircle,
  Boxes,
  ClipboardCheck,
  Pill,
  RotateCcw,
  Search,
  ShieldAlert,
} from "lucide-react";
import { products } from "../../../data/products";
import { users as seedUsers } from "../../../data/users";
import { CustomSelect } from "../CustomSelect";

type UserRole = "SuperAdmin" | "Warehouse" | "Farmacie";

interface AdminUser {
  id: string;
  name: string;
  role: UserRole;
  status?: "active" | "inactive";
}

interface PharmacyStockRow {
  pharmacyId: string;
  pharmacyName: string;
  productId: string;
  productName: string;
  category: string;
  qtyAvailable: number;
  qtyReserved: number;
  minStock: number;
}

interface PharmacyMovement {
  id: string;
  timestamp: string;
  pharmacyId: string;
  pharmacyName: string;
  productName: string;
  movementType: "receptie" | "eliberare" | "transfer" | "ajustare" | "retur";
  quantity: number;
  source: string;
  destination: string;
  reference: string;
  operator: string;
}

const USERS_KEY = "adminUsers";

const deterministic = (seed: string, min: number, max: number): number => {
  const spread = max - min + 1;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 37 + seed.charCodeAt(index)) % 100000;
  }
  return min + (hash % spread);
};

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

const movementIcon = (type: PharmacyMovement["movementType"]) => {
  if (type === "receptie") return <ArrowUpCircle className="h-4 w-4 text-green-600" />;
  if (type === "eliberare") return <Pill className="h-4 w-4 text-red-600" />;
  if (type === "transfer") return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
  if (type === "retur") return <RotateCcw className="h-4 w-4 text-amber-600" />;
  return <ClipboardCheck className="h-4 w-4 text-violet-600" />;
};

const movementBadgeClass = (type: PharmacyMovement["movementType"]) => {
  if (type === "receptie") return "bg-green-100 text-green-700";
  if (type === "eliberare") return "bg-red-100 text-red-700";
  if (type === "transfer") return "bg-blue-100 text-blue-700";
  if (type === "retur") return "bg-amber-100 text-amber-700";
  return "bg-violet-100 text-violet-700";
};

const toDisplayDate = (value: string): string => {
  return new Date(value).toLocaleString("ro-RO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const PharmacyManagement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>(() => {
    const firstPharmacy = parseUsers().find((user) => user.role === "Farmacie");
    return firstPharmacy?.id ?? "all";
  });
  const [selectedMovementType, setSelectedMovementType] = useState<string>("all");
  const [baseTimestamp] = useState(() => Date.now());

  const pharmacies = useMemo(
    () => parseUsers().filter((user) => user.role === "Farmacie"),
    []
  );
  const trackedProducts = useMemo(() => products.slice(0, 12), []);

  const selectedPharmacyName = useMemo(() => {
    if (selectedPharmacy === "all") return "Toate farmaciile";
    const match = pharmacies.find((pharmacy) => pharmacy.id === selectedPharmacy);
    return match?.name ?? "Farmacie necunoscuta";
  }, [selectedPharmacy, pharmacies]);

  const stockRows = useMemo<PharmacyStockRow[]>(() => {
    return pharmacies.flatMap((pharmacy) =>
      trackedProducts.map((product) => {
        const qtyAvailable = deterministic(`${pharmacy.id}-${product.id}-available`, 8, 360);
        const qtyReserved = deterministic(`${pharmacy.id}-${product.id}-reserved`, 0, 45);
        const minStock = deterministic(`${product.id}-min`, 20, 60);

        return {
          pharmacyId: pharmacy.id,
          pharmacyName: pharmacy.name,
          productId: product.id,
          productName: product.name,
          category: product.category,
          qtyAvailable,
          qtyReserved,
          minStock,
        };
      })
    );
  }, [pharmacies, trackedProducts]);

  const movementRows = useMemo<PharmacyMovement[]>(() => {
    const movementTypes: PharmacyMovement["movementType"][] = [
      "receptie",
      "eliberare",
      "transfer",
      "ajustare",
      "retur",
    ];

    return stockRows.slice(0, 42).map((row, index) => {
      const type = movementTypes[index % movementTypes.length];
      const quantity = deterministic(`${row.pharmacyId}-${row.productId}-${type}`, 1, 40);

      return {
        id: `ph-mv-${index + 1}`,
        timestamp: new Date(baseTimestamp - index * 50 * 60 * 1000).toISOString(),
        pharmacyId: row.pharmacyId,
        pharmacyName: row.pharmacyName,
        productName: row.productName,
        movementType: type,
        quantity,
        source:
          type === "receptie" || type === "retur"
            ? "Depozit central"
            : type === "transfer"
              ? "Alta farmacie"
              : "Stoc intern",
        destination:
          type === "eliberare"
            ? "Pacient"
            : type === "transfer"
              ? "Farmacie destinatie"
              : "Stoc farmacie",
        reference: `DOC-${1200 + index}`,
        operator: type === "ajustare" ? "Super Admin" : "Farmacist",
      };
    });
  }, [baseTimestamp, stockRows]);

  const filteredStockRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return stockRows.filter((row) => {
      const byPharmacy = selectedPharmacy === "all" || row.pharmacyId === selectedPharmacy;
      const bySearch =
        term.length === 0 ||
        row.pharmacyName.toLowerCase().includes(term) ||
        row.productName.toLowerCase().includes(term) ||
        row.category.toLowerCase().includes(term);

      return byPharmacy && bySearch;
    });
  }, [search, selectedPharmacy, stockRows]);

  const filteredMovementRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return movementRows.filter((row) => {
      const byPharmacy = selectedPharmacy === "all" || row.pharmacyId === selectedPharmacy;
      const byType = selectedMovementType === "all" || row.movementType === selectedMovementType;
      const bySearch =
        term.length === 0 ||
        row.productName.toLowerCase().includes(term) ||
        row.pharmacyName.toLowerCase().includes(term) ||
        row.reference.toLowerCase().includes(term);

      return byPharmacy && byType && bySearch;
    });
  }, [search, selectedPharmacy, selectedMovementType, movementRows]);

  const stockSummary = useMemo(() => {
    const totalAvailable = filteredStockRows.reduce((sum, row) => sum + row.qtyAvailable, 0);
    const totalReserved = filteredStockRows.reduce((sum, row) => sum + row.qtyReserved, 0);
    const lowStockItems = filteredStockRows.filter((row) => row.qtyAvailable < row.minStock).length;

    return {
      totalAvailable,
      totalReserved,
      lowStockItems,
      trackedPharmacies: selectedPharmacy === "all" ? pharmacies.length : 1,
    };
  }, [filteredStockRows, pharmacies.length, selectedPharmacy]);

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Farmacie Management</h1>
        <p className="mt-2 text-sm text-slate-600">
          Vizualizare stocuri din farmacii si toate miscarile necesare: receptii,
          eliberari, transferuri, ajustari si retururi.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Stoc disponibil</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stockSummary.totalAvailable}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Stoc rezervat</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stockSummary.totalReserved}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Pozitii sub minim</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{stockSummary.lowStockItems}</p>
        </article>
        <article className="rounded-xl border bg-white p-4">
          <p className="text-sm text-slate-500">Farmacii monitorizate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stockSummary.trackedPharmacies}</p>
        </article>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cauta produs, farmacie sau document"
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <CustomSelect
            value={selectedPharmacy}
            onChange={(value) => setSelectedPharmacy(value)}
            options={[
              { label: "Toate farmaciile", value: "all" },
              ...pharmacies.map((pharmacy) => ({ label: pharmacy.name, value: pharmacy.id })),
            ]}
          />

          <CustomSelect
            value={selectedMovementType}
            onChange={(value) => setSelectedMovementType(value)}
            options={[
              { label: "Toate miscarile", value: "all" },
              { label: "Receptie", value: "receptie" },
              { label: "Eliberare", value: "eliberare" },
              { label: "Transfer", value: "transfer" },
              { label: "Ajustare", value: "ajustare" },
              { label: "Retur", value: "retur" },
            ]}
          />
        </div>
        <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">
          Farmacie selectata: <span className="font-semibold">{selectedPharmacyName}</span>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-900">Stocuri pentru {selectedPharmacyName}</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Farmacie</th>
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Categorie</th>
                <th className="px-4 py-3">Disponibil</th>
                <th className="px-4 py-3">Rezervat</th>
                <th className="px-4 py-3">Prag minim</th>
                <th className="px-4 py-3">Stare</th>
              </tr>
            </thead>
            <tbody>
              {filteredStockRows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-500" colSpan={7}>
                    Nu exista stocuri pentru filtrul selectat.
                  </td>
                </tr>
              ) : (
                filteredStockRows.map((row) => {
                  const isLowStock = row.qtyAvailable < row.minStock;
                  return (
                    <tr key={`${row.pharmacyId}-${row.productId}`} className="border-t">
                      <td className="px-4 py-3 text-slate-700">{row.pharmacyName}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{row.productName}</td>
                      <td className="px-4 py-3 text-slate-700">{row.category}</td>
                      <td className="px-4 py-3 text-slate-700">{row.qtyAvailable}</td>
                      <td className="px-4 py-3 text-slate-700">{row.qtyReserved}</td>
                      <td className="px-4 py-3 text-slate-700">{row.minStock}</td>
                      <td className="px-4 py-3">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            Sub minim
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                            OK
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900">Miscari necesare pentru {selectedPharmacyName}</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3">Data / Ora</th>
                <th className="px-4 py-3">Farmacie</th>
                <th className="px-4 py-3">Produs</th>
                <th className="px-4 py-3">Tip miscare</th>
                <th className="px-4 py-3">Cantitate</th>
                <th className="px-4 py-3">Sursa</th>
                <th className="px-4 py-3">Destinatie</th>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Operator</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovementRows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-500" colSpan={9}>
                    Nu exista miscari pentru filtrul selectat.
                  </td>
                </tr>
              ) : (
                filteredMovementRows.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="px-4 py-3 text-slate-700">{toDisplayDate(row.timestamp)}</td>
                    <td className="px-4 py-3 text-slate-700">{row.pharmacyName}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.productName}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${movementBadgeClass(row.movementType)}`}>
                        {movementIcon(row.movementType)}
                        {row.movementType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.quantity}</td>
                    <td className="px-4 py-3 text-slate-700">{row.source}</td>
                    <td className="px-4 py-3 text-slate-700">{row.destination}</td>
                    <td className="px-4 py-3 text-slate-500">{row.reference}</td>
                    <td className="px-4 py-3 text-slate-700">{row.operator}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};
