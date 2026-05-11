import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteOrder, getOrder, type Order } from "../../api/orders";

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadOrder = async () => {
      try {
        setLoading(true);
        setOrder(await getOrder(id));
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    void loadOrder();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm("Delete this order? This action cannot be undone.")) return;

    try {
      await deleteOrder(id);
      toast.success("Order deleted.");
      navigate("/pharmacy/orders");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete order.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6 text-sm text-gray-500">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">Order not found</h2>
          <p className="text-sm text-gray-500">The requested order does not exist or was removed.</p>
          <div className="mt-4">
            <button onClick={() => navigate("/pharmacy/orders")} className="text-indigo-600">Back to orders</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/pharmacy/orders")} className="p-2 rounded bg-gray-100"><ArrowLeft className="w-4 h-4" /></button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Order {order.id.slice(0, 8)}</h2>
              <p className="text-sm text-gray-500">{order.supplier} | {new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Status: {order.status}
            </span>
            <button onClick={handleDelete} className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Items</h3>
            <p className="text-lg font-semibold text-gray-900">{order.itemsCount} pcs</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total</h3>
            <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
          </div>
        </div>

        {order.items.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Products</h3>
            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  {item.image && <img src={item.image} alt={item.productName} className="h-14 w-14 rounded object-cover" />}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.productName}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium text-gray-900">{item.quantity} x ${item.unitPrice.toFixed(2)}</div>
                    <div className="text-gray-500">${item.lineTotal.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
