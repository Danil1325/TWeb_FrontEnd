import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Users, TrendingUp, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const userEmail = localStorage.getItem('userEmail') || 'Admin';

    const stats = [
        {
            icon: Package,
            label: 'Total Products',
            value: '1,234',
            color: 'bg-blue-500'
        },
        {
            icon: Users,
            label: 'Active Users',
            value: '567',
            color: 'bg-green-500'
        },
        {
            icon: TrendingUp,
            label: 'Revenue',
            value: '$45,230',
            color: 'bg-purple-500'
        },
        {
            icon: BarChart3,
            label: 'Orders',
            value: '324',
            color: 'bg-orange-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Welcome back, {userEmail}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                </div>

                
            </div>
        </div>
    );
};
