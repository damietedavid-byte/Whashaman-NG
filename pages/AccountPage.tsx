
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

const OrderHistoryCard: React.FC<{order: Order}> = ({ order }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row justify-between items-start">
        <div>
            <p className="font-bold text-whasha-blue">{order.id}</p>
            <p className="text-slate-600 text-sm">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-lg font-semibold mt-2">₦{order.total.toLocaleString()}</p>
        </div>
        <div className="mt-4 sm:mt-0 text-left sm:text-right">
             <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
             }`}>
                {order.status}
            </span>
            <Link to={`/track/${order.id}`} className="mt-2 block w-full sm:w-auto text-center bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200">
                View Details
            </Link>
        </div>
    </div>
);

const AccountPage: React.FC = () => {
  const { user, orders } = useApp();

  if (!user) {
    return <div>Please log in.</div>;
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-slate-500 mt-2">{user.email}</p>
                    <p className="text-slate-500">{user.phone}</p>
                    <button className="mt-4 w-full bg-slate-100 text-slate-800 font-semibold py-2 rounded-full hover:bg-slate-200">
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Order History</h2>
                    <div className="space-y-4">
                        {orders.length > 0 ? (
                            orders.map(order => <OrderHistoryCard key={order.id} order={order} />)
                        ) : (
                            <p>You have no past orders.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
