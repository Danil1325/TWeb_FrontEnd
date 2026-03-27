// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
// @ts-ignore
import logo from '../assets/logo.png';

export const Footer: React.FC = () => {
    return (
        <footer className="m-4 mt-12 rounded-lg overflow-hidden bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src={logo} alt="PharmaWarehouse logo" className="h-9 w-9 object-contain" />
                            <h3 className="text-white font-bold">PharmaWarehouse</h3>
                        </div>
                        <p className="text-sm mb-4">
                            Your trusted partner in pharmaceutical supply. Serving pharmacies nationwide with quality products and reliable service.
                        </p>
                        <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 mt-1 shrink-0" />
                            <span>1234 Medical Plaza, Suite 500<br />Healthcare City, HC 12345</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products" className="hover:text-white">Products</Link></li>
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                            <li><Link to="/support" className="hover:text-white">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/register" className="hover:text-white">Register Pharmacy</Link></li>
                            <li><Link to="/policies" className="hover:text-white">Return Policy</Link></li>
                            <li><Link to="/policies#privacy" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>1-800-PHARMA</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>support@pharmawarehouse.com</span>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <p className="text-xs">Business Hours:</p>
                            <p className="text-xs">Mon-Fri: 8:00 AM - 8:00 PM</p>
                            <p className="text-xs">Sat-Sun: 9:00 AM - 5:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
                    <p>&copy; 2026 PharmaWarehouse. All rights reserved. Licensed pharmaceutical distributor.</p>
                </div>
            </div>
        </footer>
    );
};
