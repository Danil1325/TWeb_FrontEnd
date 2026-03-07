import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit: NonNullable<React.ComponentProps<'form'>['onSubmit']> = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            toast.error('Missing credentials');
            return;
        }

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        if (email === 'admin@admin.com' && password === 'admin') {
            toast.success('Login successful! Welcome Admin');
            navigate('/admin/dashboard');
            return;
        }

        toast.success('Login successful!');
        navigate('/account');
    };

    return (
        <div className="min-h-[80vh] bg-transparent flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-linear-to-r from-indigo-500 to-indigo-700 px-8 py-6 text-white text-center">
                        <LogIn className="w-12 h-12 mx-auto mb-3" />
                        <h1 className="text-3xl font-bold mb-2">Pharmacy Login</h1>
                        <p className="text-white">Access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-indigo-500 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition mb-4"
                        >
                            Login
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-indigo-500 hover:text-indigo-500 font-semibold">
                                    Register your pharmacy
                                </Link>
                            </p>
                        </div>
                    </form>

                    <div className="bg-gray-50 px-8 py-4 text-center border-t">
                        <p className="text-xs text-gray-600">
                            For security purposes, all login attempts are monitored and logged.
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Need help?{' '}
                        <Link to="/support" className="text-indigo-500 hover:text-indigo-500">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
