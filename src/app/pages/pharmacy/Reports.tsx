import React, { useEffect, useMemo, useState } from 'react';

// Simple SVG chart helpers (no extra deps)
const toNumber = (v: string) => Number(String(v).replace(/[^0-9.-]+/g, '')) || 0;

function LineChart({ data, width = 600, height = 200 }: { data: { x: string; y: number }[]; width?: number; height?: number }) {
  if (!data.length) return <div className="text-sm text-gray-500">No data</div>;
  const values = data.map(d => d.y);
  const max = Math.max(...values) || 1;
  const min = Math.min(...values);
  const padding = 20;
  const w = width - padding * 2;
  const h = height - padding * 2;
  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(1, data.length - 1)) * w;
    const y = padding + (1 - (d.y - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
      <polyline fill="none" stroke="#4f46e5" strokeWidth={2} points={points} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = padding + (i / Math.max(1, data.length - 1)) * w;
        const y = padding + (1 - (d.y - min) / (max - min || 1)) * h;
        return <circle key={i} cx={x} cy={y} r={3} fill="#4f46e5" />;
      })}
    </svg>
  );
}

function BarChart({ data, height = 200 }: { data: { label: string; value: number }[]; height?: number }) {
  if (!data.length) return <div className="text-sm text-gray-500">No data</div>;
  const max = Math.max(...data.map(d => d.value)) || 1;
  return (
    <div className="w-full">
      <svg viewBox={`0 0 600 ${height}`} className="w-full h-48">
        {data.map((d, i) => {
          const barWidth = 500 / Math.max(1, data.length);
          const x = 20 + i * barWidth;
          const h = (d.value / max) * (height - 40);
          const y = height - 20 - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth * 0.7} height={h} fill="#06b6d4" rx={4} />
              <text x={x + barWidth * 0.35} y={height - 4} fontSize={10} textAnchor="middle" fill="#111827">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PieChart({ data, size = 160 }: { data: { label: string; value: number }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let angle = -Math.PI / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const slice = (d.value / total) * Math.PI * 2;
        const x1 = size / 2 + Math.cos(angle) * (size / 2 - 2);
        const y1 = size / 2 + Math.sin(angle) * (size / 2 - 2);
        angle += slice;
        const x2 = size / 2 + Math.cos(angle) * (size / 2 - 2);
        const y2 = size / 2 + Math.sin(angle) * (size / 2 - 2);
        const large = slice > Math.PI ? 1 : 0;
        const dAttr = `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${size / 2 - 2} ${size / 2 - 2} 0 ${large} 1 ${x2} ${y2} Z`;
        const color = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#06b6d4"][i % 6];
        return <path key={i} d={dAttr} fill={color} stroke="#fff" />;
      })}
    </svg>
  );
}

export const Reports: React.FC = () => {
  // load orders and stock from localStorage
  const ordersRaw = useMemo(() => { try { return JSON.parse(localStorage.getItem('pharmacyOrders') || '[]'); } catch { return []; } }, []);
  const stockRaw = useMemo(() => { try { return JSON.parse(localStorage.getItem('pharmacyStock') || '[]'); } catch { return []; } }, []);

  // parse sales per order -> number
  const sales = useMemo(() => ordersRaw.map((o: any) => ({ date: o.date || '', amount: toNumber(o.total || 0) })), [ordersRaw]);

  // 1. sales over time (day/week/month/season)
  const [period, setPeriod] = useState<'day'|'week'|'month'|'season'>('month');

  const salesByPeriod = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of sales) {
      const d = new Date(s.date);
      if (isNaN(d.getTime())) continue;
      let key = '';
      if (period === 'day') key = d.toISOString().slice(0,10);
      if (period === 'week') {
        const start = new Date(d);
        const day = start.getDay();
        start.setDate(start.getDate() - day);
        key = start.toISOString().slice(0,10);
      }
      if (period === 'month') key = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}`;
      if (period === 'season') {
        const month = d.getMonth();
        const year = d.getFullYear();
        const season = Math.floor(month/3) + 1;
        key = `${year}-S${season}`;
      }
      map.set(key, (map.get(key) || 0) + (s.amount || 0));
    }
    const arr = Array.from(map.entries()).sort((a,b)=>a[0].localeCompare(b[0])).map(([x,y])=>({x,y}));
    return arr;
  }, [sales, period]);

  // 2. top sold products - try to read `pharmacySalesByProduct` from localStorage, otherwise synthesize from stock
  const topProducts = useMemo(() => {
    try {
      const byProd = JSON.parse(localStorage.getItem('pharmacySalesByProduct') || 'null');
      if (byProd) return Object.entries(byProd).map(([label,value])=>({label, value: Number(value) || 0})).sort((a,b)=>b.value-a.value).slice(0,10);
    } catch {}
    // synthesize: use stock items quantity as inverse of sold (just demo)
    const items = Array.isArray(stockRaw) ? stockRaw : [];
    return (items.map((it: any)=>({ label: it.name || it.id, value: Math.max(0, 100 - (it.quantity||0)) }))).sort((a:any,b:any)=>b.value-a.value).slice(0,10);
  }, [stockRaw]);

  // 3. sales by categories - try categories from stock (heuristic)
  const salesByCategory = useMemo(() => {
    // simple mapping by keywords
    const categories: Record<string, number> = {};
    const mapNameToCategory = (name: string) => {
      const n = name.toLowerCase();
      if (n.includes('vit') || n.includes('supplement')) return 'Supplements';
      if (n.includes('cosmet') || n.includes('cream') || n.includes('shampoo')) return 'Cosmetics';
      if (n.includes('child') || n.includes('infant') || n.includes('baby')) return 'Kids';
      if (n.includes('device') || n.includes('insulin') || n.includes('pen')) return 'Medical Devices';
      return 'Medicines';
    };
    for (const it of stockRaw) {
      const cat = mapNameToCategory(it.name || '');
      categories[cat] = (categories[cat]||0) + (toNumber(it.quantity||0) * (toNumber(it.price||0) || 1));
    }
    return Object.entries(categories).map(([label,value])=>({label,value}));
  }, [stockRaw]);

  // 4. stock levels
  const stockLevels = useMemo(() => {
    const items = Array.isArray(stockRaw) ? stockRaw : [];
    return items.map((it:any)=>({ label: it.name || it.id, value: it.quantity || 0 }));
  }, [stockRaw]);

  // 5. near expiry counts
  const expiryCounts = useMemo(() => {
    const now = new Date();
    const buckets = { '30':0, '60':0, '90':0 } as Record<string, number>;
    for (const it of stockRaw) {
      if (!it.expiry) continue;
      const d = new Date(it.expiry);
      if (isNaN(d.getTime())) continue;
      const diff = Math.ceil((d.getTime() - now.getTime())/(1000*60*60*24));
      if (diff <= 30) buckets['30'] += 1;
      else if (diff <= 60) buckets['60'] += 1;
      else if (diff <= 90) buckets['90'] += 1;
    }
    return [ { label: '30 days', value: buckets['30'] }, { label: '60 days', value: buckets['60'] }, { label: '90 days', value: buckets['90'] } ];
  }, [stockRaw]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-gray-600">Overview of sales, top products and stock health</p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Sales over time</h3>
            <div className="flex items-center gap-2">
              <select value={period} onChange={e => setPeriod(e.target.value as any)} className="text-sm border rounded px-2 py-1">
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="season">Season</option>
              </select>
            </div>
          </div>
          <LineChart data={salesByPeriod as any} />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Top sold products (top 10)</h3>
          <BarChart data={topProducts} />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Sales by category</h3>
          <div className="flex items-center gap-6">
            <PieChart data={salesByCategory} />
            <div>
              {salesByCategory.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1">
                  <span className="w-3 h-3 bg-slate-300 inline-block" />
                  <div className="font-medium">{c.label}</div>
                  <div className="text-slate-500 ml-2">{Math.round(c.value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">Stock levels</h3>
          <BarChart data={stockLevels.slice(0, 10)} />
        </div>

        <div className="bg-white rounded-lg shadow p-4 col-span-1 lg:col-span-2">
          <h3 className="font-semibold mb-3">Products near expiry</h3>
          <BarChart data={expiryCounts as any} />
        </div>
      </section>
    </div>
  );
};

export default Reports;
