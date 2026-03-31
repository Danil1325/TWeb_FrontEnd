import React, { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PharmacyOrder, samplePharmacyOrders, seedPharmacyOrders } from "../../data/seeder";
const STORAGE_KEY = "pharmacyOrders";

export const Orders: React.FC = () => {
	const [orders, setOrders] = useState<PharmacyOrder[]>([]);
	const [selected, setSelected] = useState<PharmacyOrder | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const load = async () => {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				try {
					const parsed = JSON.parse(raw);
					if (Array.isArray(parsed) && parsed.length >= samplePharmacyOrders.length) {
						setOrders(parsed);
						return;
					}
				} catch (e) {
					console.error("Invalid orders in localStorage", e);
				}
			}
			// if no data or not enough entries -> seed via shared seeder (overwrite)
			try {
				seedPharmacyOrders(true);
				setOrders(samplePharmacyOrders);
			} catch (e) {
				console.error('Failed to seed orders from shared seeder', e);
			}
		};
		load();
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
	}, [orders]);

	const addDemoOrder = () => {
		const next: PharmacyOrder = {
			id: `PH-ORD-${Math.floor(Math.random() * 900 + 100)}`,
			supplier: "New Supplier",
			status: "Pending",
			items: Math.floor(Math.random() * 20) + 1,
			total: `$${(Math.random() * 2000 + 100).toFixed(2)}`,
			date: new Date().toISOString().split("T")[0],
		};
		setOrders((s) => [next, ...s]);
	};

	const changeStatus = (id: string, status: string) => {
		setOrders((s) => s.map((o) => (o.id === id ? { ...o, status } : o)));
	};

	const removeOrder = (id: string) => {
		setOrders((s) => s.filter((o) => o.id !== id));
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
				return <Clock className="w-4 h-4 text-yellow-500" />;
			case "confirmed":
				return <Package className="w-4 h-4 text-blue-500" />;
			case "delivered":
				return <CheckCircle className="w-4 h-4 text-green-500" />;
			default:
				return <AlertCircle className="w-4 h-4 text-gray-500" />;
		}
	};

	const getStatusClass = (status: string) => {
		switch (status.toLowerCase()) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "confirmed":
				return "bg-blue-100 text-blue-800";
			case "delivered":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Pharmacy Orders</h1>
					<p className="text-gray-600">Manage and review purchase orders for the pharmacy</p>
				</div>
				<div className="flex items-center gap-3">
									<button onClick={addDemoOrder} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
											Add Demo Order
									</button>
									<button
										onClick={() => { localStorage.removeItem(STORAGE_KEY); setOrders([]); }}
										className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
										aria-label="Clear all orders"
									>
										<Trash2 className="w-4 h-4" />
										<span className="text-sm">Clear</span>
									</button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow overflow-hidden">
				<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
					<h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
					<div className="text-sm text-gray-500">{orders.length} orders</div>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
								<th className="px-6 py-3" />
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{orders.map((order) => (
								<tr key={order.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.supplier}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											{getStatusIcon(order.status)}
											<span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
												{order.status}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items} pcs</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div className="flex items-center gap-3 justify-end">
											  <button onClick={() => navigate(`/pharmacy/order/${order.id}`)} className="text-indigo-600 hover:underline">View</button>
																	<div className="relative inline-block">
																		<select
																			value={order.status}
																			onChange={(e) => changeStatus(order.id, e.target.value)}
																			className="text-sm rounded-md px-3 py-1 bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
																			aria-label={`Change status for ${order.id}`}
																		>
																			<option>Pending</option>
																			<option>Confirmed</option>
																			<option>Delivered</option>
																		</select>
																	</div>
																	<button
																		onClick={() => removeOrder(order.id)}
																		className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
																		aria-label={`Delete order ${order.id}`}
																	>
																		<Trash2 className="w-4 h-4" />
																		<span className="text-sm">Delete</span>
																	</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* details now handled by dedicated route */}
		</div>
	);
};
