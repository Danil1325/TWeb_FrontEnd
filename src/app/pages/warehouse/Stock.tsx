import React, { useMemo } from "react";
import {
  AlertTriangle,
  Boxes,
  ClipboardList,
  PackageSearch,
  Snowflake,
  TimerReset,
} from "lucide-react";
import { products } from "../../data/products";

interface WarehouseStockRow {
  id: string;
  name: string;
  sku: string;
  category: string;
  bin: string;
  quantity: number;
  reserved: number;
  threshold: number;
  status: "healthy" | "low" | "critical";
  storage: "Ambient" | "Cold chain" | "Secure";
}

const zoneSnapshots = [
  { id: "A1", label: "Fast moving OTC", occupancy: 92, bins: 48 },
  { id: "B2", label: "Prescription shelving", occupancy: 74, bins: 36 },
  { id: "C1", label: "Medical devices", occupancy: 58, bins: 24 },
  { id: "COLD", label: "Cold chain", occupancy: 81, bins: 12 },
];

const stockRows: WarehouseStockRow[] = products.slice(0, 8).map((product, index) => {
  const threshold = 90 + index * 12;
  const quantity = Math.max(24, product.stockQuantity - index * 67);
  const reserved = 12 + index * 5;
  const ratio = quantity / threshold;
  const status: WarehouseStockRow["status"] =
    ratio < 0.55 ? "critical" : ratio < 1 ? "low" : "healthy";

  return {
    id: product.id,
    name: product.name,
    sku: `WH-${String(100 + index + 1).padStart(3, "0")}`,
    category: product.category,
    bin: index % 3 === 0 ? `COLD-0${(index % 4) + 1}` : `${String.fromCharCode(65 + (index % 3))}${(index % 4) + 1}-0${(index % 5) + 1}`,
    quantity,
    reserved,
    threshold,
    status,
    storage: index % 3 === 0 ? "Cold chain" : product.prescriptionRequired ? "Secure" : "Ambient",
  };
});

const replenishmentQueue = stockRows
  .filter((row) => row.status !== "healthy")
  .map((row, index) => ({
    ...row,
    eta: index === 0 ? "Today, 16:30" : index === 1 ? "Tomorrow, 09:00" : "Tomorrow, 13:45",
  }));

const movementFeed = [
  { id: "mv-1", type: "Inbound", ref: "ASN-2041", item: "Amoxicillin 500mg", quantity: 120, zone: "B2-04" },
  { id: "mv-2", type: "Allocation", ref: "ORD-1884", item: "Paracetamol 500mg", quantity: 64, zone: "A1-02" },
  { id: "mv-3", type: "Cycle count", ref: "CC-091", item: "Digital Thermometer", quantity: 12, zone: "C1-03" },
  { id: "mv-4", type: "Quarantine", ref: "QA-077", item: "Salbutamol Inhaler", quantity: 18, zone: "COLD-02" },
];

export const WarehouseStock: React.FC = () => {
  const summary = useMemo(() => {
    const totalUnits = stockRows.reduce((sum, row) => sum + row.quantity, 0);
    const reservedUnits = stockRows.reduce((sum, row) => sum + row.reserved, 0);
    const lowStock = stockRows.filter((row) => row.status !== "healthy").length;
    const coldChainItems = stockRows.filter((row) => row.storage === "Cold chain").length;

    return { totalUnits, reservedUnits, lowStock, coldChainItems };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="rounded-3xl bg-linear-to-r from-slate-950 via-sky-900 to-cyan-700 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Warehouse Stock</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">Inventory control for bins, thresholds and replenishment</h2>
            <p className="mt-3 text-sm text-slate-200">
              Monitor available stock, reserved quantities and warehouse zones that need attention during the current shift.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Total units</div>
              <div className="mt-1 text-2xl font-bold">{summary.totalUnits}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Reserved</div>
              <div className="mt-1 text-2xl font-bold">{summary.reservedUnits}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Low stock</div>
              <div className="mt-1 text-2xl font-bold">{summary.lowStock}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Cold chain</div>
              <div className="mt-1 text-2xl font-bold">{summary.coldChainItems}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Tracked SKUs</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{stockRows.length}</p>
            </div>
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
              <Boxes className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Critical alerts</p>
              <p className="mt-1 text-2xl font-bold text-rose-700">
                {stockRows.filter((row) => row.status === "critical").length}
              </p>
            </div>
            <div className="rounded-2xl bg-rose-100 p-3 text-rose-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Open replenishments</p>
              <p className="mt-1 text-2xl font-bold text-amber-700">{replenishmentQueue.length}</p>
            </div>
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
              <TimerReset className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Cycle count due</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">3 zones</p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <ClipboardList className="h-6 w-6" />
            </div>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex items-center gap-3">
            <PackageSearch className="h-6 w-6 text-sky-700" />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Inventory overview</h3>
              <p className="text-sm text-slate-500">Live stock by SKU, bin and storage profile.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Item</th>
                  <th className="px-4 py-3 text-left">Bin</th>
                  <th className="px-4 py-3 text-left">Available</th>
                  <th className="px-4 py-3 text-left">Reserved</th>
                  <th className="px-4 py-3 text-left">Threshold</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {stockRows.map((row) => {
                  const statusClasses =
                    row.status === "healthy"
                      ? "bg-emerald-100 text-emerald-700"
                      : row.status === "low"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700";

                  return (
                    <tr key={row.id} className="border-t border-slate-200 align-top">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{row.name}</div>
                        <div className="text-xs text-slate-500">{row.sku} | {row.category}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <div>{row.bin}</div>
                        <div className="text-xs text-slate-500">{row.storage}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.quantity}</td>
                      <td className="px-4 py-3 text-slate-700">{row.reserved}</td>
                      <td className="px-4 py-3 text-slate-700">{row.threshold}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-semibold text-slate-900">Replenishment queue</h3>
            </div>
            <div className="space-y-4">
              {replenishmentQueue.map((row) => (
                <div key={row.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{row.name}</div>
                      <div className="text-sm text-slate-500">{row.sku} | {row.bin}</div>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                      ETA {row.eta}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="text-slate-500">Available</div>
                      <div className="font-semibold text-slate-900">{row.quantity}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Threshold</div>
                      <div className="font-semibold text-slate-900">{row.threshold}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Storage</div>
                      <div className="font-semibold text-slate-900">{row.storage}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-3">
              <Snowflake className="h-6 w-6 text-cyan-700" />
              <h3 className="text-xl font-semibold text-slate-900">Zone capacity</h3>
            </div>
            <div className="space-y-4">
              {zoneSnapshots.map((zone) => (
                <div key={zone.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold text-slate-900">{zone.id}</span>
                      <span className="ml-2 text-slate-500">{zone.label}</span>
                    </div>
                    <span className="text-slate-700">{zone.occupancy}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${
                        zone.occupancy > 85 ? "bg-amber-500" : zone.occupancy > 70 ? "bg-cyan-600" : "bg-emerald-500"
                      }`}
                      style={{ width: `${zone.occupancy}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{zone.bins} active bins</div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-indigo-600" />
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Recent inventory movements</h3>
            <p className="text-sm text-slate-500">Last operational updates registered by the team.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {movementFeed.map((movement) => (
            <article key={movement.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {movement.type}
                </span>
                <span className="text-xs text-slate-500">{movement.ref}</span>
              </div>
              <div className="mt-4 font-semibold text-slate-900">{movement.item}</div>
              <div className="mt-2 text-sm text-slate-600">Quantity: {movement.quantity}</div>
              <div className="text-sm text-slate-600">Zone: {movement.zone}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
