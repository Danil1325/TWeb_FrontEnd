import React, { useMemo } from 'react';
import { 
  Users, 
  Building2, 
  Warehouse, 
  ShoppingCart, 
  Package, 
  AlertCircle,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

interface OrderData {
  day: string;
  orders: number;
}

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

interface UserActivity {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

// Mock data
const mockOrderData: OrderData[] = [
  { day: '1', orders: 12 },
  { day: '2', orders: 19 },
  { day: '3', orders: 15 },
  { day: '4', orders: 25 },
  { day: '5', orders: 22 },
  { day: '6', orders: 30 },
  { day: '7', orders: 28 },
  { day: '8', orders: 35 },
  { day: '9', orders: 32 },
  { day: '10', orders: 41 },
  { day: '11', orders: 38 },
  { day: '12', orders: 45 },
  { day: '13', orders: 42 },
  { day: '14', orders: 48 },
  { day: '15', orders: 52 },
  { day: '16', orders: 50 },
  { day: '17', orders: 55 },
  { day: '18', orders: 58 },
  { day: '19', orders: 62 },
  { day: '20', orders: 60 },
  { day: '21', orders: 65 },
  { day: '22', orders: 68 },
  { day: '23', orders: 72 },
  { day: '24', orders: 75 },
  { day: '25', orders: 78 },
  { day: '26', orders: 82 },
  { day: '27', orders: 85 },
  { day: '28', orders: 88 },
  { day: '29', orders: 90 },
  { day: '30', orders: 95 },
];

const mockAlerts: Alert[] = [
  {
    id: 1,
    type: 'critical',
    message: 'Low stock alert: Aspirin (less than 50 units)',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'critical',
    message: 'Warehouse B: Temperature sensor malfunction',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    type: 'warning',
    message: 'Pending orders: 8 orders not yet assigned',
    timestamp: '6 hours ago',
  },
  {
    id: 4,
    type: 'warning',
    message: 'Expiration alert: 3 products expire soon',
    timestamp: '1 day ago',
  },
  {
    id: 5,
    type: 'info',
    message: 'System backup completed successfully',
    timestamp: '2 days ago',
  },
];

const mockUserActivity: UserActivity[] = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created new order',
    timestamp: '10 minutes ago',
    status: 'completed',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated product inventory',
    timestamp: '25 minutes ago',
    status: 'completed',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Processed payment',
    timestamp: '45 minutes ago',
    status: 'completed',
  },
  {
    id: 4,
    user: 'Sarah Williams',
    action: 'Assigned warehouse staff',
    timestamp: '1 hour ago',
    status: 'pending',
  },
  {
    id: 5,
    user: 'Robert Brown',
    action: 'Generated report',
    timestamp: '2 hours ago',
    status: 'completed',
  },
];

const StatCard: React.FC<StatProps> = ({ icon, label, value, subtitle, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const SimpleBarChart: React.FC<{ data: OrderData[] }> = ({ data }) => {
  const maxOrders = Math.max(...data.map(d => d.orders));

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-1 h-64 bg-gray-50 p-4 rounded-lg overflow-x-auto">
        {data.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center flex-shrink-0"
            title={`Day ${item.day}: ${item.orders} orders`}
          >
            <div
              className="w-3 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t transition-all hover:from-blue-600 hover:to-blue-400"
              style={{
                height: `${(item.orders / maxOrders) * 250}px`,
              }}
            />
            <p className="text-xs text-gray-600 mt-2 w-full text-center">{item.day}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-blue-600">
            {data.reduce((sum, d) => sum + d.orders, 0)}
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <p className="text-gray-600">Average/Day</p>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(data.reduce((sum, d) => sum + d.orders, 0) / data.length)}
          </p>
        </div>
        <div className="bg-purple-50 p-3 rounded">
          <p className="text-gray-600">Highest Day</p>
          <p className="text-2xl font-bold text-purple-600">
            {Math.max(...data.map(d => d.orders))}
          </p>
        </div>
      </div>
    </div>
  );
};

const AlertBadge: React.FC<{ type: Alert['type'] }> = ({ type }) => {
  const styles = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const StatusIcon: React.FC<{ status: UserActivity['status'] }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-600" />;
  }
};

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your system status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-white" />}
          label="Total Users"
          value="2,547"
          subtitle="↑ 12% from last month"
          color="bg-blue-500"
        />
        <StatCard
          icon={<Building2 className="w-6 h-6 text-white" />}
          label="Total Clients/Companies"
          value="384"
          subtitle="↑ 8% from last month"
          color="bg-purple-500"
        />
        <StatCard
          icon={<Warehouse className="w-6 h-6 text-white" />}
          label="Active Warehouses"
          value="12"
          subtitle="All operational"
          color="bg-green-500"
        />
        <StatCard
          icon={<ShoppingCart className="w-6 h-6 text-white" />}
          label="Orders in Processing"
          value="48"
          subtitle="Expected to complete in 2 days"
          color="bg-orange-500"
        />
        <StatCard
          icon={<Package className="w-6 h-6 text-white" />}
          label="Total Stock"
          value="156,243"
          subtitle="Units across all warehouses"
          color="bg-indigo-500"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          label="Inventory Movements"
          value="892"
          subtitle="This month"
          color="bg-pink-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Orders (Last 30 Days)</h2>
              <p className="text-sm text-gray-600 mt-1">Daily order volume trend</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <SimpleBarChart data={mockOrderData} />
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'critical'
                    ? 'bg-red-50 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <AlertBadge type={alert.type} />
                    <p className="text-sm text-gray-700 mt-2">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Recent system activities</p>
          </div>
          <Activity className="w-5 h-5 text-blue-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {mockUserActivity.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{activity.action}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <StatusIcon status={activity.status} />
                      <span className="text-sm capitalize text-gray-700">{activity.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
