export type PharmacyOrder = {
  id: string;
  supplier: string;
  status: string;
  items: number;
  total: string;
  date: string; // YYYY-MM-DD
  notes?: string;
};

const STORAGE_KEY = 'pharmacyOrders';

export const samplePharmacyOrders: PharmacyOrder[] = [
  { id: 'PH-ORD-100', supplier: 'PharmaCorp Ltd', status: 'Pending', items: 12, total: '$2,340.00', date: '2026-03-15', notes: 'Urgent delivery requested' },
  { id: 'PH-ORD-101', supplier: 'MedSupply Inc', status: 'Confirmed', items: 8, total: '$1,650.00', date: '2026-03-14' },
  { id: 'PH-ORD-102', supplier: 'Global Pharma', status: 'Delivered', items: 25, total: '$4,200.00', date: '2026-03-13' },
  { id: 'PH-ORD-103', supplier: 'Healthline Distribution', status: 'Pending', items: 5, total: '$420.00', date: '2026-02-28', notes: 'Check batch numbers' },
  { id: 'PH-ORD-104', supplier: 'Wellness Supplies', status: 'Confirmed', items: 16, total: '$1,980.00', date: '2026-03-01' },
  { id: 'PH-ORD-105', supplier: 'BioMed Traders', status: 'Delivered', items: 40, total: '$7,200.00', date: '2026-01-22' },
  { id: 'PH-ORD-106', supplier: 'Apex Pharmaceuticals', status: 'Pending', items: 10, total: '$1,150.00', date: '2026-03-10', notes: 'Deliver to back entrance' },
];

export function seedPharmacyOrders(overwrite = false) {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing && !overwrite) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePharmacyOrders));
    return true;
  } catch (e) {
    // fail silently; caller can handle
    // eslint-disable-next-line no-console
    console.error('Failed to seed pharmacy orders', e);
    return false;
  }
}

// Stock seeder
import { products } from './products';

type StockItem = {
  id: string;
  name: string;
  sku?: string;
  quantity: number;
  location?: string;
  expiry?: string | null;
};

const STOCK_KEY = 'pharmacyStock';

export function seedPharmacyStock(overwrite = false) {
  try {
    const existing = localStorage.getItem(STOCK_KEY);
    if (existing && !overwrite) return false;
    const mapped: StockItem[] = products.map((p, i) => {
      // generate some expiry dates for medicines, leave devices and kits without expiry
      let expiry: string | null = null;
      const isMedicine = (p.category && p.category !== 'Medical Devices' && p.category !== 'First Aid');
      if (isMedicine) {
        const days = [30, 60, 120, 365][i % 4];
        const d = new Date();
        d.setDate(d.getDate() + days - (i % 5));
        expiry = d.toISOString().slice(0, 10);
      }
      return {
        id: `STK-${(i + 1).toString().padStart(3, '0')}`,
        name: p.name,
        sku: `${p.name.split(' ')[0].toUpperCase().slice(0,6)}-${p.id}`,
        quantity: p.stockQuantity ?? Math.floor(Math.random() * 500),
        location: `Shelf ${String.fromCharCode(65 + (i % 6))}${Math.floor(i / 6) + 1}`,
        expiry,
      } as StockItem;
    });
    localStorage.setItem(STOCK_KEY, JSON.stringify(mapped));
    return true;
  } catch (e) {
    console.error('Failed to seed pharmacy stock', e);
    return false;
  }
}

export default {
  samplePharmacyOrders,
  seedPharmacyOrders,
};
