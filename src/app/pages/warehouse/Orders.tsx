import React, { useMemo } from "react";
import {
  Boxes,
  ClipboardList,
  PackageCheck,
  Route,
  ScanLine,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface WarehouseOrder {
  id: string;
  pharmacy: string;
  route: string;
  priority: "Urgent" | "Standard";
  status: "Picking" | "Packing" | "Quality check" | "Ready to ship";
  lineItems: number;
  totes: number;
  picker: string;
  departure: string;
}

const ongoingOrders: WarehouseOrder[] = [
  {
    id: "ORD-3101",
    pharmacy: "Central Pharmacy",
    route: "North route",
    priority: "Urgent",
    status: "Picking",
    lineItems: 18,
    totes: 6,
    picker: "Elena M.",
    departure: "09:15",
  },
  {
    id: "ORD-3102",
    pharmacy: "Green Care",
    route: "City route",
    priority: "Standard",
    status: "Packing",
    lineItems: 11,
    totes: 4,
    picker: "Victor P.",
    departure: "10:00",
  },
  {
    id: "ORD-3103",
    pharmacy: "Family Med",
    route: "South route",
    priority: "Urgent",
    status: "Quality check",
    lineItems: 24,
    totes: 8,
    picker: "Ana R.",
    departure: "10:40",
  },
  {
    id: "ORD-3104",
    pharmacy: "Health Point",
    route: "East route",
    priority: "Standard",
    status: "Ready to ship",
    lineItems: 9,
    totes: 3,
    picker: "Sergiu D.",
    departure: "11:20",
  },
];

const orderSteps = [
  { id: "step-1", title: "Wave released", value: "12 orders", tone: "bg-cyan-100 text-cyan-700" },
  { id: "step-2", title: "In picking", value: "31 totes", tone: "bg-amber-100 text-amber-700" },
  { id: "step-3", title: "QC queue", value: "4 checks", tone: "bg-indigo-100 text-indigo-700" },
  { id: "step-4", title: "Ready for dispatch", value: "7 pallets", tone: "bg-emerald-100 text-emerald-700" },
];

const dispatchWindows = [
  { id: "window-1", label: "09:00 - 10:00", route: "North route", capacity: 82 },
  { id: "window-2", label: "10:00 - 11:00", route: "City route", capacity: 63 },
  { id: "window-3", label: "11:00 - 12:00", route: "South route", capacity: 76 },
];

export const WarehouseOrders: React.FC = () => {
  const summary = useMemo(() => {
    const activeOrders = ongoingOrders.length;
    const urgentOrders = ongoingOrders.filter((order) => order.priority === "Urgent").length;
    const readyOrders = ongoingOrders.filter((order) => order.status === "Ready to ship").length;
    const totalTotes = ongoingOrders.reduce((sum, order) => sum + order.totes, 0);

    return { activeOrders, urgentOrders, readyOrders, totalTotes };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="rounded-3xl bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-700 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Ongoing Orders</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">Control picking, packing and dispatch for pharmacy orders</h2>
            <p className="mt-3 text-sm text-slate-200">
              Follow each outbound order through the active workflow and keep dispatch windows aligned with route capacity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Active orders</div>
              <div className="mt-1 text-2xl font-bold">{summary.activeOrders}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Urgent</div>
              <div className="mt-1 text-2xl font-bold">{summary.urgentOrders}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Ready to ship</div>
              <div className="mt-1 text-2xl font-bold">{summary.readyOrders}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-cyan-100">Open totes</div>
              <div className="mt-1 text-2xl font-bold">{summary.totalTotes}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Picking waves</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">3</p>
            </div>
            <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700">
              <Boxes className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">QC pending</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {ongoingOrders.filter((order) => order.status === "Quality check").length}
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Ready for dispatch</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{summary.readyOrders}</p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <Truck className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Scans completed</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">128</p>
            </div>
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
              <ScanLine className="h-6 w-6" />
            </div>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-indigo-700" />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Order board</h3>
              <p className="text-sm text-slate-500">Outbound orders currently processed by the warehouse team.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Route</th>
                  <th className="px-4 py-3 text-left">Load</th>
                  <th className="px-4 py-3 text-left">Picker</th>
                  <th className="px-4 py-3 text-left">Departure</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {ongoingOrders.map((order) => {
                  const statusClasses =
                    order.status === "Picking"
                      ? "bg-amber-100 text-amber-700"
                      : order.status === "Packing"
                        ? "bg-cyan-100 text-cyan-700"
                        : order.status === "Quality check"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-emerald-100 text-emerald-700";

                  return (
                    <tr key={order.id} className="border-t border-slate-200 align-top">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{order.id}</div>
                        <div className="text-xs text-slate-500">{order.pharmacy}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <div>{order.route}</div>
                        <div className="text-xs text-slate-500">{order.priority}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <div>{order.lineItems} line items</div>
                        <div className="text-xs text-slate-500">{order.totes} totes</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{order.picker}</td>
                      <td className="px-4 py-3 text-slate-700">{order.departure}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
                          {order.status}
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
              <PackageCheck className="h-6 w-6 text-emerald-700" />
              <h3 className="text-xl font-semibold text-slate-900">Workflow snapshot</h3>
            </div>
            <div className="space-y-4">
              {orderSteps.map((step) => (
                <div key={step.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-slate-900">{step.title}</div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${step.tone}`}>
                      {step.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-3">
              <Route className="h-6 w-6 text-cyan-700" />
              <h3 className="text-xl font-semibold text-slate-900">Dispatch windows</h3>
            </div>
            <div className="space-y-4">
              {dispatchWindows.map((window) => (
                <div key={window.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold text-slate-900">{window.label}</span>
                      <span className="ml-2 text-slate-500">{window.route}</span>
                    </div>
                    <span className="text-slate-700">{window.capacity}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${
                        window.capacity > 80 ? "bg-amber-500" : window.capacity > 65 ? "bg-cyan-600" : "bg-emerald-500"
                      }`}
                      style={{ width: `${window.capacity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
