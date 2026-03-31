import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type StockItem = {
  id: string;
  name: string;
  sku?: string;
  quantity: number;
  location?: string;
  expiry?: string | null;
};

const STORAGE_KEY = 'pharmacyStock';

export const StockDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<StockItem | null>(null);
  const [quantity, setQuantity] = useState<number | ''>('');
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr: StockItem[] = JSON.parse(raw);
      const found = arr.find((i) => i.id === id) || null;
      setItem(found);
      if (found) {
        setQuantity(found.quantity);
        setLocation(found.location || '');
      }
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const save = () => {
    if (!item) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: StockItem[] = raw ? JSON.parse(raw) : [];
    const updated = arr.map((i) => (i.id === item.id ? { ...i, quantity: Number(quantity) || 0, location } : i));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    navigate('/pharmacy/stock');
  };

  if (!item) return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900">Item not found</h2>
        <p className="text-sm text-gray-500">This stock item does not exist.</p>
        <div className="mt-4">
          <button onClick={() => navigate('/pharmacy/stock')} className="text-indigo-600">Back to stock</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/pharmacy/stock')} className="p-2 rounded bg-gray-100"><ArrowLeft className="w-4 h-4" /></button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Quantity</label>
            <input type="number" value={quantity as any} onChange={(e) => setQuantity(Number(e.target.value))} className="mt-1 block w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={save} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Save</button>
          <button onClick={() => navigate('/pharmacy/stock')} className="text-gray-600">Cancel</button>
        </div>
      </div>
    </div>
  );
};
