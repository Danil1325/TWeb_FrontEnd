import React, { useEffect, useState } from 'react';
import { RotateCcw, Search, FileDown, CheckCircle, Trash2 } from 'lucide-react';
import { seedPharmacyReturns, samplePharmacyReturns } from '../../data/seeder';
import { useNavigate } from 'react-router-dom';

type ReturnItem = {
  id: string;
  orderId: string;
  reason: string;
  status: string;
  date: string;
  items: number;
};

const STORAGE_KEY = 'pharmacyReturns';

export const Returns: React.FC = () => {
  const [returnsList, setReturnsList] = useState<ReturnItem[]>([]);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          setReturnsList(parsed);
          return;
        }
      } catch (e) { console.error(e); }
    }
    try {
      seedPharmacyReturns(true);
      const seeded = localStorage.getItem(STORAGE_KEY);
      if (seeded) setReturnsList(JSON.parse(seeded));
      else setReturnsList(samplePharmacyReturns.slice(0,2));
    } catch (e) { console.error('Failed to seed returns', e); }
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(returnsList)); }, [returnsList]);

  const filtered = returnsList.filter(r => r.id.toLowerCase().includes(q.toLowerCase()) || r.orderId.toLowerCase().includes(q.toLowerCase()) || r.reason.toLowerCase().includes(q.toLowerCase()));

  const exportCSV = () => {
    const header = ['id','orderId','reason','status','date','items'];
    const rows = filtered.map(r => [r.id, r.orderId, r.reason, r.status, r.date, String(r.items)]);
    const csv = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `pharmacy-returns-${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const markProcessed = (id: string) => {
    if (!confirm('Mark this return as processed?')) return;
    setReturnsList(s => s.map(x => x.id === id ? { ...x, status: 'Processed' } : x));
  };
  const removeReturn = (id: string) => {
    if (!confirm('Delete this return? This cannot be undone.')) return;
    setReturnsList(s => s.filter(x => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns</h1>
          <p className="text-gray-600">Manage product returns and processing</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search returns" className="pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 bg-white text-slate-700 px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Open Returns</h2>
          <div className="text-sm text-gray-500">{filtered.length} items</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => navigate(`/pharmacy/returns/${r.id}`)} className="text-indigo-600 hover:underline">View</button>
                      {r.status !== 'Processed' ? (
                        <button onClick={() => markProcessed(r.id)} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                          Mark Processed
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="w-3 h-3" /> Processed
                        </span>
                      )}
                      <button onClick={() => removeReturn(r.id)} className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
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
