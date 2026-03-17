import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CircleCheck, Clock3, Pill, Plus, RefreshCw, Truck } from "lucide-react";

const overviewCards = [
  {
    label: "Open orders",
    value: "18",
    trend: "+3 today",
    icon: Truck,
    color: "from-sky-500 to-blue-600",
  },
  {
    label: "Low stock items",
    value: "7",
    trend: "Needs refill",
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-500",
  },
  {
    label: "Near-expiry lots",
    value: "12",
    trend: "Within 60 days",
    icon: Clock3,
    color: "from-rose-500 to-pink-600",
  },
  {
    label: "Received today",
    value: "94",
    trend: "Units checked",
    icon: CircleCheck,
    color: "from-emerald-500 to-green-600",
  },
];

const pendingActions = [
  "Confirm reception for shipment SH-7742",
  "Approve substitute for Amoxicillin 500mg",
  "Review expired lot report before 18:00",
  "Place replenishment order for insulin pens",
];

const liveOrderFeed = [
  { id: "PH-1001", status: "In transit", eta: "15:40", amount: "$1,240.00" },
  { id: "PH-1002", status: "Picked", eta: "18:20", amount: "$620.50" },
  { id: "PH-1003", status: "Quality check", eta: "Tomorrow", amount: "$2,020.10" },
];

export const PharmacyDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">Pharmacy Operations</p>
            <h2 className="mt-1 text-3xl font-bold">Control stock and deliveries in one place</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              Track warehouse shipments, validate incoming lots, and prevent stockouts across your daily workflow.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-slate-100">
              <Plus className="h-4 w-4" />
              New order
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              <RefreshCw className="h-4 w-4" />
              Sync
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600">{card.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{card.trend}</p>
                </div>
                <div className={`rounded-lg bg-gradient-to-r ${card.color} p-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Pending actions</h3>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">High priority</span>
          </div>
          <ul className="space-y-3">
            {pendingActions.map((task) => (
              <li key={task} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                <span className="text-sm text-slate-700">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Live order feed</h3>
            <span className="text-xs text-slate-500">Updated every 5 min</span>
          </div>
          <div className="space-y-3">
            {liveOrderFeed.map((order) => (
              <div key={order.id} className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2">
                    <Pill className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Order {order.id}</p>
                    <p className="text-xs text-slate-500">ETA: {order.eta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">{order.status}</span>
                  <span className="text-sm font-semibold text-slate-800">{order.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
