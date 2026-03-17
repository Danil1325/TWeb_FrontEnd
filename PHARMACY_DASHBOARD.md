# Pharmacy Dashboard - Adding New Components

## How to Add New Pharmacy Pages

To add a new page to the Pharmacy Dashboard, follow these steps:

### 1. Create the Component

Create a new component file in `/src/app/pages/pharmacy/`:

```tsx
// Example: /src/app/pages/pharmacy/Stock.tsx
import React from 'react';

export const Stock: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stock & Inventory</h1>
        <p className="text-gray-600">Manage your pharmacy inventory</p>
      </div>
      
      {/* Your component content here */}
      
    </div>
  );
};
```

### 2. Import in PharmacyLayout

Add the import statement in `/src/app/Components/dashboard/PharmacyLayout.tsx`:

```tsx
import { Stock } from "../../pages/pharmacy/Stock";
```

### 3. Add to Available Pages

Update the `availablePages` array in `PharmacyLayout.tsx`:

```tsx
const availablePages = ["dashboard", "orders", "stock"]; // Add your new page
```

### 4. Add to renderActiveComponent

Add your component to the switch statement:

```tsx
case "stock":
  return <Stock />;
```

### 5. Update Page Title

Add to `getPageTitle()` function:

```tsx
case "stock":
  return "Stock & Inventory";
```

### 6. Import in App.tsx

Add the import:

```tsx
import { Stock } from "./app/pages/pharmacy/Stock";
```

### 7. Add Route in App.tsx

Update the pharmacy routes:

```tsx
<Route path="stock" element={<Stock />} />
```

## Current Available Pages

- ✅ **dashboard** - Main dashboard with overview
- ✅ **orders** - Orders management 
- ❌ **stock** - Stock & inventory (not implemented)
- ❌ **shipments** - Receive shipments (not implemented)
- ❌ **returns** - Returns management (not implemented)
- ❌ **reports** - Reports and analytics (not implemented)
- ❌ **profile** - User profile (not implemented)

## Features

- **URL Routing**: Each page has its own URL (e.g., `/pharmacy/orders`)
- **Disabled Navigation**: Unavailable pages are disabled in the sidebar
- **Auto Redirect**: Accessing unavailable pages redirects to dashboard
- **Visual Feedback**: Unavailable menu items are grayed out

## Sidebar Configuration

The sidebar menu items are defined in `/src/app/Components/dashboard/PharmacySidebar.tsx`:

```tsx
const menuItems = [
  { id: "dashboard",  icon: LayoutDashboard, label: "Dashboard",          badge: null },
  { id: "orders",     icon: ClipboardList,   label: "Orders",              badge: "18"  },
  { id: "stock",      icon: Package,         label: "Stock & Inventory",   badge: "7"   },
  // ... more items
];
```

To modify menu items, update this array with your desired configuration.
