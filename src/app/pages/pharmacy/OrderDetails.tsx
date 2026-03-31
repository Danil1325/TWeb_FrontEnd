import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, ArrowLeft, Trash2 } from 'lucide-react';

type PharmacyOrder = {
  id: string;
  supplier: string;
  status: string;
  items: number;
  total: string;
  date: string;
  notes?: string;
};

const STORAGE_KEY = 'pharmacyOrders';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<PharmacyOrder | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr: PharmacyOrder[] = JSON.parse(raw);
      const found = arr.find((o) => o.id === id) || null;
      setOrder(found);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const changeStatus = (status: string) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr: PharmacyOrder[] = JSON.parse(raw);
      const updated = arr.map((o) => (o.id === id ? { ...o, status } : o));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setOrder(updated.find((o) => o.id === id) || null);
    } catch (e) {
      console.error(e);
    }
  };

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">Order not found</h2>
          <p className="text-sm text-gray-500">The requested order does not exist or was removed.</p>
          <div className="mt-4">
            <button onClick={() => navigate('/pharmacy/orders')} className="text-indigo-600">Back to orders</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/pharmacy/orders')} className="p-2 rounded bg-gray-100"><ArrowLeft className="w-4 h-4" /></button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Order {order.id}</h2>
              <p className="text-sm text-gray-500">{order.supplier} • {order.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={order.status}
              onChange={(e) => changeStatus(e.target.value)}
              className="text-sm rounded-md px-3 py-1 bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Delivered</option>
            </select>
            <button onClick={() => changeStatus('Delivered')} className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700">
              <CheckCircle className="w-4 h-4" />
              Mark Delivered
            </button>
            <button onClick={() => {
              if (!confirm('Delete this order? This action cannot be undone.')) return;
              try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) {
                  const arr: PharmacyOrder[] = JSON.parse(raw);
                  const updated = arr.filter((o) => o.id !== id);
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                }
              } catch (e) {
                console.error('Failed to delete order', e);
              }
              navigate('/pharmacy/orders');
            }} className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Items</h3>
            <p className="text-lg font-semibold text-gray-900">{order.items} pcs</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total</h3>
            <p className="text-lg font-semibold text-gray-900">{order.total}</p>
          </div>
        </div>

        {order.notes && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
            <p className="text-sm text-gray-700 mt-1">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
