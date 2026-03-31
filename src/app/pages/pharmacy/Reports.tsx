import React, { useEffect, useMemo, useState } from 'react';

// Small helpers
const toNumber = (v: any) => Number(String(v || '').replace(/[^0-9.-]+/g, '')) || 0;

function LineChart({ data, width = 760, height = 240 }: { data: { x: string; y: number }[]; width?: number; height?: number }) {
  if (!data.length) return <div className="text-sm text-gray-500">No data</div>;
  const values = data.map(d => d.y);
  const max = Math.max(...values) || 1;
  const min = Math.min(...values);
  const padding = 36;
  const w = width - padding * 2;
  const h = height - padding * 2;
  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(1, data.length - 1)) * w;
    const y = padding + (1 - (d.y - min) / (max - min || 1)) * h;
    return { x, y };
  });

  const path = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-52">
      {/* grid */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={padding} x2={width-padding} y1={padding + (h/4)*i} y2={padding + (h/4)*i} stroke="#eef2ff" />
      ))}
      {/* area */}
      <polyline fill="none" stroke="#4f46e5" strokeWidth={2.5} points={path} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill="#6366f1" stroke="#fff" strokeWidth={1} />
        </g>
      ))}
      {/* x labels */}
      {data.map((d,i) => {
        const x = padding + (i / Math.max(1, data.length - 1)) * w;
        return <text key={i} x={x} y={height-8} fontSize={10} textAnchor="middle" fill="#6b7280">{d.x}</text>;
      })}
    </svg>
  );
}

function BarChart({ data, height = 220 }: { data: { label: string; value: number }[]; height?: number }) {
  if (!data.length) return <div className="text-sm text-gray-500">No data</div>;
  const max = Math.max(...data.map(d => d.value));
  if (max <= 0) return <div className="text-sm text-gray-500">No data available</div>;
  const colors = ['#06b6d4','#3b82f6','#8b5cf6','#ef4444','#10b981','#f59e0b'];
  const perBar = 70; // px per bar
  const svgWidth = Math.max(600, data.length * perBar + 40);
  return (
    <div className="w-full overflow-auto">
      <svg viewBox={`0 0 ${svgWidth} ${height}`} className="w-full h-48">
        {data.map((d, i) => {
          const barWidth = (svgWidth - 40) / Math.max(1, data.length);
          const x = 20 + i * barWidth;
          const h = (d.value / max) * (height - 60);
          const y = height - 30 - h;
          const color = colors[i % colors.length];
          return (
            <g key={i}>
              <rect x={x + barWidth * 0.15} y={y} width={barWidth * 0.7} height={h} fill={color} rx={6} />
              <text x={x + barWidth * 0.5} y={y - 6} fontSize={11} textAnchor="middle" fill="#111827">{d.value}</text>
              <text x={x + barWidth * 0.5} y={height - 8} fontSize={11} textAnchor="middle" fill="#374151">{d.label}</text>
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
  const palette = ["#3b82f6","#06b6d4","#10b981","#f59e0b","#ef4444","#8b5cf6"];
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
        const color = palette[i % palette.length];
        return <path key={i} d={dAttr} fill={color} stroke="#fff" />;
      })}
    </svg>
  );
}

export const Reports: React.FC = () => {
  // load orders and stock from localStorage, if empty use nice demo datasets
  const ordersRaw = useMemo(() => { try { return JSON.parse(localStorage.getItem('pharmacyOrders') || 'null') || []; } catch { return []; } }, []);
  const stockRaw = useMemo(() => { try { return JSON.parse(localStorage.getItem('pharmacyStock') || 'null') || []; } catch { return []; } }, []);

  // nice default demo datasets
  const sampleSales = [
    { x: 'Jan', y: 1200 }, { x: 'Feb', y: 1500 }, { x: 'Mar', y: 1800 }, { x: 'Apr', y: 1700 }, { x: 'May', y: 2100 }, { x: 'Jun', y: 2400 }
  ];
  const sampleTop = [
    { label: 'Paracetamol', value: 320 }, { label: 'Amoxicillin', value: 280 }, { label: 'Ibuprofen', value: 240 }, { label: 'Vitamin D3', value: 200 }, { label: 'Salbutamol', value: 160 }
  ];
  const sampleCategories = [
    { label: 'Medicines', value: 4200 }, { label: 'Supplements', value: 800 }, { label: 'Medical Devices', value: 300 }, { label: 'Cosmetics', value: 150 }
  ];
  const sampleStockLevels = [
    { label: 'Paracetamol', value: 1000 }, { label: 'Ibuprofen', value: 800 }, { label: 'Metformin', value: 350 }, { label: 'Amoxicillin', value: 500 }, { label: 'Atorvastatin', value: 450 }
  ];
  const sampleExpiry = [ { label: '30 days', value: 4 }, { label: '60 days', value: 6 }, { label: '90 days', value: 10 } ];

  // parse sales per order -> number
  const sales = useMemo(() => {
    if (!ordersRaw || !ordersRaw.length) return sampleSales.map(s => ({ x: s.x, y: s.y }));
    return ordersRaw.map((o: any) => ({ date: o.date || '', amount: toNumber(o.total || 0) }));
  }, [ordersRaw]);

  // period state (used only for label selection)
  const [period, setPeriod] = useState<'day'|'week'|'month'|'season'>('month');

  const salesByPeriod = useMemo(() => {
    // when using demo sales, return them as-is
    if (!ordersRaw || !ordersRaw.length) return sampleSales.map(s => ({ x: s.x, y: s.y }));
    const map = new Map<string, number>();
    for (const s of sales as any) {
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
  }, [sales, period, ordersRaw]);

  const topProducts = useMemo(() => {
    if (!stockRaw || !stockRaw.length) return sampleTop;
    try {
      const byProd = JSON.parse(localStorage.getItem('pharmacySalesByProduct') || 'null');
      if (byProd) return Object.entries(byProd).map(([label,value])=>({label, value: Number(value) || 0})).sort((a,b)=>b.value-a.value).slice(0,10);
    } catch {}
    const items = Array.isArray(stockRaw) ? stockRaw : [];
    return (items.map((it: any)=>({ label: it.name || it.id, value: Math.max(0, 100 - (it.quantity||0)) }))).sort((a:any,b:any)=>b.value-a.value).slice(0,10);
  }, [stockRaw]);

  const salesByCategory = useMemo(() => {
    if (!stockRaw || !stockRaw.length) return sampleCategories;
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

  const stockLevels = useMemo(() => {
    if (!stockRaw || !stockRaw.length) return sampleStockLevels;
    const items = Array.isArray(stockRaw) ? stockRaw : [];
    return items.map((it:any)=>({ label: it.name || it.id, value: it.quantity || 0 }));
  }, [stockRaw]);

  const expiryCounts = useMemo(() => {
    if (!stockRaw || !stockRaw.length) return sampleExpiry;
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
