import React, { useEffect, useState } from 'react';
import { Truck, Search, FileDown, CheckCircle } from 'lucide-react';
import { seedPharmacyShipments, samplePharmacyShipments } from '../../data/seeder';
import { useNavigate } from 'react-router-dom';

type Shipment = {
  id: string;
  supplier: string;
  status: string;
  eta?: string;
  items: number;
  received?: boolean;
};

const STORAGE_KEY = 'pharmacyShipments';

export const Shipments: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          setShipments(parsed);
          return;
        }
      } catch (e) { console.error(e); }
    }
    try {
      seedPharmacyShipments(true);
      const seeded = localStorage.getItem(STORAGE_KEY);
      if (seeded) setShipments(JSON.parse(seeded));
      else setShipments(samplePharmacyShipments.slice(0,5));
    } catch (e) { console.error('Failed to seed shipments', e); }
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments)); }, [shipments]);

  const filtered = shipments.filter(s => s.id.toLowerCase().includes(q.toLowerCase()) || s.supplier.toLowerCase().includes(q.toLowerCase()));

  const exportCSV = () => {
    const header = ['id','supplier','status','eta','items','received'];
    const rows = filtered.map(r => [r.id, r.supplier, r.status, r.eta || '', String(r.items), r.received ? 'true' : 'false']);
    const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `pharmacy-shipments-${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const markReceived = (id: string) => {
    if (!confirm('Mark this shipment as received?')) return;
    setShipments(s => s.map(x => x.id === id ? { ...x, received: true, status: 'Received' } : x));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receive Shipments</h1>
          <p className="text-gray-600">Shipments expected and verification</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search shipments" className="pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 bg-white text-slate-700 px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Pending Shipments</h2>
          <div className="text-sm text-gray-500">{filtered.length} shipments</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.eta}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{s.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => navigate(`/pharmacy/shipments/${s.id}`)} className="text-indigo-600 hover:underline">View</button>
                      {!s.received ? (
                        <button onClick={() => markReceived(s.id)} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                          Receive
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="w-3 h-3" /> Received
                        </span>
                      )}
                    </div>
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
