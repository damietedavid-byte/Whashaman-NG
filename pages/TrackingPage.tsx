
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import OrderStatusTimeline from '../components/OrderStatusTimeline';

const TrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useApp();
  
  if (!orderId) {
     return <div className="text-center p-12">No Order ID provided.</div>;
  }
  
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="text-center p-12">
        <h1 className="text-2xl font-bold">Order Not Found</h1>
        <p className="text-slate-600 mt-2">We couldn't find an order with the ID: {orderId}</p>
        <Link to="/order" className="mt-6 inline-block bg-whasha-blue text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all">
            Place a New Order
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800">Order Tracking</h1>
          <p className="text-slate-500 mt-1">
            Tracking order <span className="font-mono text-whasha-blue font-semibold">{order.id}</span>
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Order Status</h2>
              <OrderStatusTimeline currentStatus={order.status} />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Order Summary</h3>
                <div className="mt-2 space-y-2 text-slate-600">
                    {order.items.map(item => (
                        <div key={item.serviceId} className="flex justify-between">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                    {order.hasExpressDelivery && (
                        <div className="flex justify-between">
                            <span>Express Delivery</span>
                            <span>₦2,000</span>
                        </div>
                    )}
                    {order.hasStainTreatment && (
                         <div className="flex justify-between">
                            <span>Stain Treatment</span>
                            <span>₦1,500</span>
                        </div>
                    )}
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between text-lg font-bold text-slate-800">
                    <span>Total</span>
                    <span>₦{order.total.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800">Pickup Details</h3>
                <p className="text-slate-600 mt-2">{order.pickupAddress}</p>
                <p className="text-slate-600">{new Date(order.pickupDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-slate-600">{order.pickupTimeSlot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
