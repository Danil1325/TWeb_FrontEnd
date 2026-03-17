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

      
    </section>
  );
};
