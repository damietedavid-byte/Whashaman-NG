
import React from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { ORDER_STATUS_SEQUENCE } from '../constants';

const AdminOrderRow: React.FC<{ order: Order; onStatusChange: (orderId: string, status: OrderStatus) => void; }> = ({ order, onStatusChange }) => {
    return (
        <tr className="border-b hover:bg-slate-50">
            <td className="p-3 font-mono text-whasha-blue">{order.id}</td>
            <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
            <td className="p-3">{order.customerName}</td>
            <td className="p-3 font-semibold">₦{order.total.toLocaleString()}</td>
            <td className="p-3">
                <select 
                    value={order.status} 
                    onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                    className="w-full p-2 border rounded-md bg-white text-slate-800"
                >
                    {ORDER_STATUS_SEQUENCE.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                     <option key={OrderStatus.Cancelled} value={OrderStatus.Cancelled}>{OrderStatus.Cancelled}</option>
                </select>
            </td>
        </tr>
    );
};

const AdminPage: React.FC = () => {
    const { orders, updateOrderStatus } = useApp();

    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-8">Admin Dashboard</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
                    <h2 className="text-2xl font-semibold mb-4">Incoming Orders</h2>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-slate-600 uppercase">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <AdminOrderRow key={order.id} order={order} onStatusChange={updateOrderStatus} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;