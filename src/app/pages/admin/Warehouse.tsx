import React, { useEffect } from "react";
import {
  AlertTriangle,
  Boxes,
  ClipboardList,
  PackageCheck,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stockAlerts = [
  { name: "Paracetamol 500mg", sku: "WH-104", stock: 18, threshold: 30 },
  { name: "Vitamin C", sku: "WH-208", stock: 22, threshold: 40 },
  { name: "Ibuprofen", sku: "WH-312", stock: 11, threshold: 20 },
];

const deliveries = [
  { supplier: "Med Supply", time: "09:30", dock: "A1", boxes: 48 },
  { supplier: "Health Logistic", time: "12:00", dock: "B2", boxes: 31 },
  { supplier: "Pharma Stock", time: "15:45", dock: "A3", boxes: 57 },
];

const outgoingOrders = [
  { id: "ORD-1001", destination: "Central Pharmacy", status: "Picking" },
  { id: "ORD-1002", destination: "Green Care", status: "Packing" },
  { id: "ORD-1003", destination: "Family Med", status: "Ready to ship" },
];

export const Warehouse: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userType = localStorage.getItem("userType");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn || (userType !== "warehouse" && userRole !== "warehouse")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const stats = [
    {
      label: "Products in stock",
      value: "2,460",
      icon: Boxes,
      color: "bg-sky-500",
    },
    {
      label: "Low stock alerts",
      value: "17",
      icon: AlertTriangle,
      color: "bg-amber-500",
    },
    {
      label: "Inbound deliveries",
      value: "3",
      icon: Truck,
      color: "bg-emerald-500",
    },
    {
      label: "Orders prepared",
      value: "29",
      icon: PackageCheck,
      color: "bg-indigo-500",
    },
  ];

  return (
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="rounded-3xl bg-linear-to-r from-slate-900 via-cyan-900 to-emerald-700 p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">
            Warehouse Admin
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Overview for stock, deliveries and outgoing orders
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-200">
            This page centralizes the essential warehouse operations for the
            current shift.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
                <article
                    key={stat.label}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-3 text-3xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`rounded-2xl p-3 ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-semibold text-slate-900">
                Low stock alerts
              </h3>
            </div>

            <div className="space-y-4">
              {stockAlerts.map((item) => (
                  <div
                      key={item.sku}
                      className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right text-sm text-slate-600">
                        <p>
                          Stock: <strong>{item.stock}</strong>
                        </p>
                        <p>
                          Threshold: <strong>{item.threshold}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center gap-3">
              <Truck className="h-6 w-6 text-emerald-600" />
              <h3 className="text-xl font-semibold text-slate-900">
                Today's deliveries
              </h3>
            </div>

            <div className="space-y-4">
              {deliveries.map((delivery) => (
                  <div
                      key={`${delivery.supplier}-${delivery.time}`}
                      className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {delivery.supplier}
                        </p>
                        <p className="text-sm text-slate-500">
                          {delivery.time} | Dock {delivery.dock}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                    {delivery.boxes} boxes
                  </span>
                    </div>
                  </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-slate-900">
              Outgoing orders
            </h3>
          </div>

          <div className="space-y-4">
            {outgoingOrders.map((order) => (
                <div
                    key={order.id}
                    className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-sm text-slate-500">
                        Destination: {order.destination}
                      </p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  {order.status}
                </span>
                  </div>
                </div>
            ))}
          </div>
        </section>
      </div>
  );
};
