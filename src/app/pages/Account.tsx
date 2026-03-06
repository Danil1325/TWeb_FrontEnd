import React, { useState } from 'react';
import { User, Package, Clock, CheckCircle, XCircle, Truck, FileText } from 'lucide-react';

interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
    trackingNumber?: string;
}

const mockOrders: Order[] = [
    {
        id: 'ORD-2024-001',
        date: '2026-02-20',
        status: 'delivered',
        total: 245.50,
        items: 8,
        trackingNumber: 'TRK123456789'
    },
    {
        id: 'ORD-2024-002',
        date: '2026-02-22',
        status: 'shipped',
        total: 189.99,
        items: 5,
        trackingNumber: 'TRK987654321'
    },
    {
        id: 'ORD-2024-003',
        date: '2026-02-24',
        status: 'processing',
        total: 567.25,
        items: 15
    },
    {
        id: 'ORD-2024-004',
        date: '2026-02-25',
        status: 'pending',
        total: 125.00,
        items: 3
    }
];

export const Account: React.FC = () => {
    // static fake user data for mockup
    const user = {
        name: 'John Doe',
        pharmacyName: 'Central Pharmacy',
        pharmacyLicense: 'PH-2024-XXXXX',
        email: 'john@pharmacy.com'
    };
    const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'shipped':
                return <Truck className="w-5 h-5 text-indigo-500" />;
            case 'processing':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-gray-600" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-600" />;
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-700';
            case 'shipped':
                return 'bg-indigo-500 text-white';
            case 'processing':
                return 'bg-yellow-100 text-yellow-700';
            case 'pending':
                return 'bg-gray-100 text-gray-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <div className="bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg p-8 mb-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
                <p className="text-white">{user?.pharmacyName}</p>
                <p className="text-sm text-white mt-1">License: {user?.pharmacyLicense}</p>
            </div>


            <div className="border-b mb-8">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 px-2 font-semibold border-b-2 transition ${
                            activeTab === 'orders'
                                ? 'border-indigo-500 text-indigo-500'
                                : 'border-transparent text-gray-600 hover:text-indigo-500'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Order History
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-4 px-2 font-semibold border-b-2 transition ${
                            activeTab === 'profile'
                                ? 'border-indigo-500 text-indigo-500'
                                : 'border-transparent text-gray-600 hover:text-indigo-500'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Profile
                        </div>
                    </button>
                </div>
            </div>


            {activeTab === 'orders' && (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your Orders</h2>
                        <button
                            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-500"
                        >
                            Place New Order
                        </button>
                    </div>

                    <div className="space-y-4">
                        {mockOrders.map(order => (
                            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-lg">{order.id}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>Order Date: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            <p>{order.items} items • Total: ${order.total.toFixed(2)}</p>
                                            {order.trackingNumber && (
                                                <p className="flex items-center gap-1">
                                                    <Truck className="w-4 h-4" />
                                                    Tracking: {order.trackingNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            View Details
                                        </button>
                                        {order.status === 'delivered' && (
                                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-500">
                                                Reorder
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {mockOrders.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                            <p className="text-gray-600 mb-6">Start browsing our products to place your first order</p>
                            <button
                                className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-500"
                            >
                                Browse Products
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm text-gray-600 mb-1">Full Name</dt>
                                <dd className="font-semibold">{user?.name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-600 mb-1">Email</dt>
                                <dd className="font-semibold">{user?.email}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <h3 className="font-semibold text-lg mb-4">Pharmacy Details</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm text-gray-600 mb-1">Pharmacy Name</dt>
                                <dd className="font-semibold">{user?.pharmacyName}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-600 mb-1">License Number</dt>
                                <dd className="font-semibold">{user?.pharmacyLicense}</dd>
                            </div>
                            <div className="md:col-span-2">
                                <dt className="text-sm text-gray-600 mb-1">Account Status</dt>
                                <dd className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-500">
                            Edit Profile
                        </button>
                        <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Change Password
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
