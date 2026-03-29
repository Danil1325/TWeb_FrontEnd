import React, { useMemo } from "react";
import {
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  PackageOpen,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";

interface DeliveryStop {
  id: string;
  supplier: string;
  reference: string;
  eta: string;
  dock: string;
  boxes: number;
  pallets: number;
  temperature: string;
  priority: "Scheduled" | "In progress" | "Ready to receive" | "Delayed";
}

const deliveryStops: DeliveryStop[] = [
  {
    id: "ASN-2401",
    supplier: "Med Supply",
    reference: "PO-7812",
    eta: "08:45",
    dock: "A1",
    boxes: 48,
    pallets: 6,
    temperature: "Ambient",
    priority: "In progress",
  },
  {
    id: "ASN-2402",
    supplier: "Health Logistic",
    reference: "PO-7819",
    eta: "11:30",
    dock: "B2",
    boxes: 31,
    pallets: 4,
    temperature: "Cold chain",
    priority: "Ready to receive",
  },
  {
    id: "ASN-2403",
    supplier: "Pharma Stock",
    reference: "PO-7826",
    eta: "14:20",
    dock: "A3",
    boxes: 57,
    pallets: 8,
    temperature: "Ambient",
    priority: "Scheduled",
  },
  {
    id: "ASN-2404",
    supplier: "BioCare Distribution",
    reference: "PO-7831",
    eta: "16:10",
    dock: "C1",
    boxes: 19,
    pallets: 3,
    temperature: "Cold chain",
    priority: "Delayed",
  },
];

const receivingChecklist = [
  { id: "check-1", title: "Vehicle seal confirmed", owner: "Dock team", status: "Done" },
  { id: "check-2", title: "Cold chain equipment ready", owner: "QA desk", status: "Done" },
  { id: "check-3", title: "Discrepancy forms printed", owner: "Inbound clerk", status: "Pending" },
  { id: "check-4", title: "Putaway lanes assigned", owner: "Shift lead", status: "Pending" },
];

const dockUtilization = [
  { id: "A1", label: "Primary inbound", load: 90 },
  { id: "B2", label: "Controlled temp", load: 72 },
  { id: "A3", label: "Bulk cartons", load: 64 },
  { id: "C1", label: "Returns and QA", load: 38 },
];

export const WarehouseDeliveries: React.FC = () => {
  const summary = useMemo(() => {
    const inboundBoxes = deliveryStops.reduce((sum, stop) => sum + stop.boxes, 0);
    const inboundPallets = deliveryStops.reduce((sum, stop) => sum + stop.pallets, 0);
    const coldChainLoads = deliveryStops.filter((stop) => stop.temperature === "Cold chain").length;
    const urgentLoads = deliveryStops.filter((stop) => stop.priority === "Delayed").length;

    return { inboundBoxes, inboundPallets, coldChainLoads, urgentLoads };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <section className="rounded-3xl bg-linear-to-r from-slate-950 via-emerald-900 to-cyan-700 p-8 text-white shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">Inbound Deliveries</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">Schedule dock activity and receive supplier shipments</h2>
            <p className="mt-3 text-sm text-slate-200">
              Track today&apos;s arrivals, verify receiving readiness and keep inbound flow aligned with warehouse capacity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-emerald-100">Boxes inbound</div>
              <div className="mt-1 text-2xl font-bold">{summary.inboundBoxes}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-emerald-100">Pallets</div>
              <div className="mt-1 text-2xl font-bold">{summary.inboundPallets}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-emerald-100">Cold chain</div>
              <div className="mt-1 text-2xl font-bold">{summary.coldChainLoads}</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <div className="text-emerald-100">Delayed loads</div>
              <div className="mt-1 text-2xl font-bold">{summary.urgentLoads}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Arrivals today</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{deliveryStops.length}</p>
            </div>
            <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700">
              <Truck className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">At dock now</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {deliveryStops.filter((stop) => stop.priority === "In progress").length}
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <PackageOpen className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Ready to unload</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {deliveryStops.filter((stop) => stop.priority === "Ready to receive").length}
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700">
              <ClipboardCheck className="h-6 w-6" />
            </div>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Temperature loads</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{summary.coldChainLoads}</p>
            </div>
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
              <ThermometerSnowflake className="h-6 w-6" />
            </div>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex items-center gap-3">
            <CalendarClock className="h-6 w-6 text-emerald-700" />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Delivery schedule</h3>
              <p className="text-sm text-slate-500">Inbound appointments and receiving status by dock.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">ETA</th>
                  <th className="px-4 py-3 text-left">Dock</th>
                  <th className="px-4 py-3 text-left">Load</th>
                  <th className="px-4 py-3 text-left">Temperature</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveryStops.map((stop) => {
                  const statusClasses =
                    stop.priority === "Scheduled"
                      ? "bg-slate-100 text-slate-700"
                      : stop.priority === "In progress"
                        ? "bg-emerald-100 text-emerald-700"
                        : stop.priority === "Ready to receive"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-rose-100 text-rose-700";

                  return (
                    <tr key={stop.id} className="border-t border-slate-200 align-top">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{stop.supplier}</div>
                        <div className="text-xs text-slate-500">{stop.id} | {stop.reference}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{stop.eta}</td>
                      <td className="px-4 py-3 text-slate-700">{stop.dock}</td>
                      <td className="px-4 py-3 text-slate-700">
                        <div>{stop.boxes} boxes</div>
                        <div className="text-xs text-slate-500">{stop.pallets} pallets</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{stop.temperature}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
                          {stop.priority}
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
              <CheckCircle2 className="h-6 w-6 text-emerald-700" />
              <h3 className="text-xl font-semibold text-slate-900">Receiving checklist</h3>
            </div>
            <div className="space-y-4">
              {receivingChecklist.map((item) => {
                const done = item.status === "Done";

                return (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{item.title}</div>
                        <div className="text-sm text-slate-500">{item.owner}</div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-3">
              <Clock3 className="h-6 w-6 text-cyan-700" />
              <h3 className="text-xl font-semibold text-slate-900">Dock utilization</h3>
            </div>
            <div className="space-y-4">
              {dockUtilization.map((dock) => (
                <div key={dock.id}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div>
                      <span className="font-semibold text-slate-900">{dock.id}</span>
                      <span className="ml-2 text-slate-500">{dock.label}</span>
                    </div>
                    <span className="text-slate-700">{dock.load}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full ${
                        dock.load > 85 ? "bg-amber-500" : dock.load > 65 ? "bg-cyan-600" : "bg-emerald-500"
                      }`}
                      style={{ width: `${dock.load}%` }}
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
