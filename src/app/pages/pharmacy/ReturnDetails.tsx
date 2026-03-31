import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Trash2 } from 'lucide-react';

type ReturnItem = {
  id: string;
  orderId: string;
  reason: string;
  status: string;
  date: string;
  items: number;
};

const STORAGE_KEY = 'pharmacyReturns';

export const ReturnDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ret, setRet] = useState<ReturnItem | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const arr: ReturnItem[] = JSON.parse(raw);
      setRet(arr.find(r => r.id === id) || null);
    } catch (e) { console.error(e); }
  }, [id]);

  const markProcessed = () => {
    if (!confirm('Mark this return as processed?')) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const arr: ReturnItem[] = JSON.parse(raw);
      const updated = arr.map(r => r.id === id ? { ...r, status: 'Processed' } : r);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRet(updated.find(r => r.id === id) || null);
    } catch (e) { console.error(e); }
  };

  const removeReturn = () => {
    if (!confirm('Delete this return?')) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const arr: ReturnItem[] = JSON.parse(raw);
      const updated = arr.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) { console.error(e); }
    navigate('/pharmacy/returns');
  };

  if (!ret) return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900">Return not found</h2>
        <p className="text-sm text-gray-500">The requested return does not exist.</p>
        <div className="mt-4"><button onClick={() => navigate('/pharmacy/returns')} className="text-indigo-600">Back</button></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/pharmacy/returns')} className="p-2 rounded bg-gray-100"><ArrowLeft className="w-4 h-4" /></button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Return {ret.id}</h2>
              <p className="text-sm text-gray-500">Order: {ret.orderId} • {ret.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {ret.status !== 'Processed' && (
              <button onClick={markProcessed} className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm"><CheckCircle className="w-4 h-4" /> Mark Processed</button>
            )}
            <button onClick={removeReturn} className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Reason</h3>
            <p className="text-lg font-semibold text-gray-900">{ret.reason}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Items</h3>
            <p className="text-lg font-semibold text-gray-900">{ret.items}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnDetails;
