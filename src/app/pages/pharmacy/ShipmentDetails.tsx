import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, ArrowLeft, Trash2 } from 'lucide-react';

type Shipment = {
  id: string;
  supplier: string;
  status: string;
  eta?: string;
  items: number;
  received?: boolean;
};

const STORAGE_KEY = 'pharmacyShipments';

export const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr: Shipment[] = JSON.parse(raw);
      const found = arr.find(s => s.id === id) || null;
      setShipment(found);
    } catch (e) { console.error(e); }
  }, [id]);

  const markReceived = () => {
    if (!confirm('Mark this shipment as received?')) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const arr: Shipment[] = JSON.parse(raw);
      const updated = arr.map(s => s.id === id ? { ...s, received: true, status: 'Received' } : s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setShipment(updated.find(s => s.id === id) || null);
    } catch (e) { console.error(e); }
  };

  const removeShipment = () => {
    if (!confirm('Delete this shipment?')) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const arr: Shipment[] = JSON.parse(raw);
      const updated = arr.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) { console.error(e); }
    navigate('/pharmacy/shipments');
  };

  if (!shipment) return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900">Shipment not found</h2>
        <p className="text-sm text-gray-500">The requested shipment does not exist.</p>
        <div className="mt-4">
          <button onClick={() => navigate('/pharmacy/shipments')} className="text-indigo-600">Back to shipments</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/pharmacy/shipments')} className="p-2 rounded bg-gray-100"><ArrowLeft className="w-4 h-4" /></button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Shipment {shipment.id}</h2>
              <p className="text-sm text-gray-500">{shipment.supplier} • {shipment.eta}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!shipment.received && (
              <button onClick={markReceived} className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                <CheckCircle className="w-4 h-4" /> Mark Received
              </button>
            )}
            <button onClick={removeShipment} className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Items</h3>
            <p className="text-lg font-semibold text-gray-900">{shipment.items} pcs</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="text-lg font-semibold text-gray-900">{shipment.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
