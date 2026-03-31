import React, { useEffect, useState } from 'react';
import { Package, Search, PlusCircle, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type StockItem = {
  id: string;
  name: string;
  sku?: string;
  quantity: number;
  location?: string;
  expiry?: string | null;
};

const STORAGE_KEY = 'pharmacyStock';

export const Stock: React.FC = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch (e) {
        console.error('Invalid stock in localStorage', e);
      }
    } else {
      const seed: StockItem[] = [
        { id: 'STK-001', name: 'Paracetamol 500mg', sku: 'PARA-500', quantity: 120, location: 'Shelf A1', expiry: '2026-12-31' },
        { id: 'STK-002', name: 'Amoxicillin 500mg', sku: 'AMOX-500', quantity: 32, location: 'Shelf B2', expiry: '2026-06-30' },
        { id: 'STK-003', name: 'Insulin Pens', sku: 'INS-PEN', quantity: 8, location: 'Fridge', expiry: null },
      ];
      setItems(seed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addDemoItem = () => {
    const next: StockItem = {
      id: `STK-${Math.floor(Math.random() * 900 + 100)}`,
      name: 'New Item',
      sku: 'NEW-SKU',
      quantity: Math.floor(Math.random() * 50) + 1,
      location: 'Unknown',
      expiry: null,
    };
    setItems((s) => [next, ...s]);
  };

  const filtered = items.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()) || (it.sku || '').toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock & Inventory</h1>
          <p className="text-gray-600">Current stock levels and expiry tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or SKU"
              className="pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          </div>
          <button onClick={addDemoItem} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            <PlusCircle className="w-4 h-4" /> Add Item
          </button>
          <button onClick={() => {
            // export filtered CSV
            const toExport = filtered;
            const header = ['id','name','sku','quantity','location','expiry'];
            const rows = toExport.map(r => [r.id, r.name, r.sku || '', String(r.quantity), r.location || '', r.expiry || '']);
            const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pharmacy-stock-${new Date().toISOString().slice(0,10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }} className="inline-flex items-center gap-2 bg-white text-slate-700 px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Stock Items</h2>
          <div className="text-sm text-gray-500">{filtered.length} items</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((it) => (
                <tr key={it.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{it.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{it.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{it.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{it.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{it.expiry || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => navigate(`/pharmacy/stock/${it.id}`)} className="text-indigo-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
