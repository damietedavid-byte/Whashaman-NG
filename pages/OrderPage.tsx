import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_SERVICES } from '../constants';
import { SelectedService, OrderStatus } from '../types';
import { ArrowPathIcon } from '../components/IconComponents';

type OrderStep = 'services' | 'schedule' | 'summary';

const Step: React.FC<{ number: number; title: string; active: boolean; done: boolean }> = ({ number, title, active, done }) => (
    <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${done ? 'bg-whasha-green' : active ? 'bg-whasha-blue' : 'bg-slate-300'}`}>
            {done ? '✔' : number}
        </div>
        <div className={`ml-3 font-semibold ${active || done ? 'text-slate-800' : 'text-slate-500'}`}>{title}</div>
    </div>
);


const OrderPage: React.FC = () => {
    const [step, setStep] = useState<OrderStep>('services');
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTimeSlot, setPickupTimeSlot] = useState('');
    const [pickupAddress, setPickupAddress] = useState('123 Aba Road, Port Harcourt');
    const [hasExpressDelivery, setHasExpressDelivery] = useState(false);
    const [hasStainTreatment, setHasStainTreatment] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    
    const navigate = useNavigate();
    const { addOrder, user } = useApp();

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);


    const updateQuantity = (serviceId: string, quantity: number) => {
        const service = MOCK_SERVICES.find(s => s.id === serviceId);
        if (!service) return;

        setSelectedServices(prev => {
            const existing = prev.find(s => s.serviceId === serviceId);
            if (quantity <= 0) {
                return prev.filter(s => s.serviceId !== serviceId);
            }
            if (existing) {
                return prev.map(s => s.serviceId === serviceId ? { ...s, quantity } : s);
            }
            return [...prev, { serviceId, quantity, price: service.price, name: service.name }];
        });
    };
    
    const total = selectedServices.reduce((acc, s) => acc + s.price * s.quantity, 0) + (hasExpressDelivery ? 2000 : 0) + (hasStainTreatment ? 1500 : 0);

    const handlePayment = () => {
        setIsProcessingPayment(true);
        // Simulate API call to payment gateway
        setTimeout(() => {
            const newOrder = addOrder({
                pickupAddress,
                pickupDate,
                pickupTimeSlot,
                items: selectedServices,
                total,
                status: OrderStatus.Pending,
                hasExpressDelivery,
                hasStainTreatment,
            });
            navigate(`/track/${newOrder.id}`);
        }, 2000);
    };
    
    if (!user) {
        return null; // Render nothing while redirecting
    }

    return (
        <div className="bg-slate-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Place Your Order</h1>

                {/* Stepper */}
                <div className="max-w-2xl mx-auto mb-12 grid grid-cols-3 gap-4 text-sm">
                    <Step number={1} title="Select Services" active={step === 'services'} done={step === 'schedule' || step === 'summary'}/>
                    <Step number={2} title="Schedule Pickup" active={step === 'schedule'} done={step === 'summary'}/>
                    <Step number={3} title="Confirm & Pay" active={step === 'summary'} done={false}/>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    {/* Step 1: Services */}
                    {step === 'services' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-slate-800">1. Select Your Services</h2>
                            <div className="space-y-4">
                                {MOCK_SERVICES.map(service => {
                                    const selected = selectedServices.find(s => s.serviceId === service.id);
                                    return (
                                        <div key={service.id} className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-lg">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800">{service.name}</h3>
                                                <p className="text-slate-600">₦{service.price.toLocaleString()} / {service.unit}</p>
                                            </div>
                                            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                                                <button onClick={() => updateQuantity(service.id, (selected?.quantity || 0) - 1)} className="w-8 h-8 bg-slate-200 rounded-full font-bold text-lg text-slate-700 hover:bg-slate-300">-</button>
                                                <input type="number" value={selected?.quantity || 0} readOnly className="w-16 text-center font-semibold border rounded-md text-slate-800" />
                                                <button onClick={() => updateQuantity(service.id, (selected?.quantity || 0) + 1)} className="w-8 h-8 bg-slate-200 rounded-full font-bold text-lg text-slate-700 hover:bg-slate-300">+</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={() => setStep('schedule')} disabled={selectedServices.length === 0} className="bg-whasha-blue text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed">
                                    Next: Schedule Pickup &rarr;
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Step 2: Schedule */}
                    {step === 'schedule' && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-slate-800">2. Schedule Your Pickup</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="font-semibold text-slate-700">Pickup Date</label>
                                    <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full mt-2 p-3 border rounded-md text-slate-800" />
                                </div>
                                <div>
                                    <label className="font-semibold text-slate-700">Pickup Time</label>
                                    <select value={pickupTimeSlot} onChange={e => setPickupTimeSlot(e.target.value)} className="w-full mt-2 p-3 border rounded-md bg-white text-slate-800">
                                        <option value="">Select a time slot</option>
                                        <option>8:00 AM - 10:00 AM</option>
                                        <option>10:00 AM - 12:00 PM</option>
                                        <option>2:00 PM - 4:00 PM</option>
                                        <option>4:00 PM - 6:00 PM</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="font-semibold text-slate-700">Pickup Address</label>
                                    <input type="text" value={pickupAddress} onChange={e => setPickupAddress(e.target.value)} className="w-full mt-2 p-3 border rounded-md text-slate-800" />
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="font-semibold mb-2 text-slate-800">Add-ons</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-slate-50">
                                            <input type="checkbox" checked={hasExpressDelivery} onChange={e => setHasExpressDelivery(e.target.checked)} className="h-5 w-5 text-whasha-blue rounded"/>
                                            <span className="ml-3 font-medium text-slate-800">Express Delivery (₦2,000)</span>
                                        </label>
                                         <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-slate-50">
                                            <input type="checkbox" checked={hasStainTreatment} onChange={e => setHasStainTreatment(e.target.checked)} className="h-5 w-5 text-whasha-blue rounded"/>
                                            <span className="ml-3 font-medium text-slate-800">Special Stain Treatment (₦1,500)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                             <div className="mt-8 flex justify-between items-center">
                                <button onClick={() => setStep('services')} className="text-slate-600 font-semibold px-6 py-3 rounded-full hover:bg-slate-100 transition-all">
                                    &larr; Back to Services
                                </button>
                                <button onClick={() => setStep('summary')} disabled={!pickupDate || !pickupTimeSlot || !pickupAddress} className="bg-whasha-blue text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed">
                                    Next: Review Order &rarr;
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Step 3: Summary */}
                    {step === 'summary' && (
                        <div>
                             <h2 className="text-2xl font-semibold mb-6 text-slate-800">3. Order Summary</h2>
                             <div className="border border-slate-200 rounded-lg p-6 space-y-4 bg-slate-50">
                                <h3 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-3">Your Items</h3>
                                {selectedServices.map(item => (
                                    <div key={item.serviceId} className="flex justify-between items-center">
                                        <span className="text-slate-600">{item.name} x {item.quantity}</span>
                                        <span className="font-medium text-slate-800">₦{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                                {hasExpressDelivery && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Express Delivery</span>
                                        <span className="font-medium text-slate-800">₦2,000</span>
                                    </div>
                                )}
                                {hasStainTreatment && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Special Stain Treatment</span>
                                        <span className="font-medium text-slate-800">₦1,500</span>
                                    </div>
                                )}
                                <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between items-center text-xl">
                                    <span className="font-bold text-slate-900">Total</span>
                                    <span className="font-bold text-whasha-blue">₦{total.toLocaleString()}</span>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                     <h3 className="text-lg font-semibold text-slate-900">Pickup Details</h3>
                                    <div className="text-slate-600 mt-2 space-y-1">
                                        <p><span className="font-semibold text-slate-700">Address:</span> {pickupAddress}</p>
                                        <p><span className="font-semibold text-slate-700">Date:</span> {pickupDate}</p>
                                        <p><span className="font-semibold text-slate-700">Time:</span> {pickupTimeSlot}</p>
                                    </div>
                                </div>
                             </div>

                             {/* Payment Section */}
                             <div className="mt-8">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Information</h3>
                                <div className="space-y-4 p-6 border rounded-lg bg-slate-50">
                                    <div>
                                        <label htmlFor="card-number" className="block text-sm font-medium text-slate-700">Card Number</label>
                                        <input type="text" id="card-number" placeholder="**** **** **** 1234" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-whasha-blue focus:border-whasha-blue sm:text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiry-date" className="block text-sm font-medium text-slate-700">Expiry Date</label>
                                            <input type="text" id="expiry-date" placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-whasha-blue focus:border-whasha-blue sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-slate-700">CVV</label>
                                            <input type="text" id="cvv" placeholder="123" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-whasha-blue focus:border-whasha-blue sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                             </div>

                             <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                                <button onClick={() => setStep('schedule')} disabled={isProcessingPayment} className="text-slate-600 font-semibold px-6 py-3 rounded-full hover:bg-slate-100 transition-all disabled:text-slate-400 disabled:cursor-not-allowed">
                                    &larr; Back to Schedule
                                </button>
                                <button 
                                    onClick={handlePayment} 
                                    disabled={isProcessingPayment}
                                    className="w-full sm:w-auto bg-whasha-green text-white font-semibold px-8 py-4 rounded-full hover:bg-green-600 transition-all shadow-md disabled:bg-green-400 disabled:cursor-wait flex items-center justify-center"
                                >
                                    {isProcessingPayment ? (
                                        <>
                                            <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                                            Processing Payment...
                                        </>
                                    ) : (
                                        `Pay Now ₦${total.toLocaleString()}`
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;