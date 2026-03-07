import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Package, Users, TrendingUp, BarChart3 } from 'lucide-react';


export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

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
     
            <div className="max-w-7xl mx-auto">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stats Cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center">
                                        <div className={`p-3 rounded-full ${stat.color}`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                
            </div>

    );
};
