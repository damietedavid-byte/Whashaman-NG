import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_SERVICES } from '../constants';
import { getLaundryTip } from '../services/geminiService';
import { CheckCircleIcon, SparklesIcon, ArrowPathIcon } from '../components/IconComponents';

const HomePage: React.FC = () => {
    const [tip, setTip] = useState('');
    const [isLoadingTip, setIsLoadingTip] = useState(false);

    const handleGetTip = async () => {
        setIsLoadingTip(true);
        setTip('');
        const newTip = await getLaundryTip();
        setTip(newTip);
        setIsLoadingTip(false);
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-whasha-blue-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                            Smart Laundry Service <br /> for a Busy <span className="text-whasha-blue">Life</span>.
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 max-w-lg mx-auto md:mx-0">
                            Wash, Dry & Deliver in 24-48h. We pick up your laundry and deliver it back to you fresh and clean. Serving Port Harcourt & cities across Nigeria.
                        </p>
                        <div className="mt-8 flex justify-center md:justify-start space-x-4">
                            <Link to="/order" className="bg-whasha-blue text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-lg text-lg">
                                Schedule a Pickup
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0">
                        <img src="https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=1200&auto=format&fit=crop" alt="A stack of fresh, neatly folded white towels, representing cleanliness and professional laundry service." className="rounded-lg shadow-2xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-800">How It Works</h2>
                        <p className="mt-2 text-slate-500">Simple steps to get your laundry done.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="bg-whasha-blue-light text-whasha-blue rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold">1</div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-800">Bag Up Your Laundry</h3>
                            <p className="mt-2 text-slate-500">Place your clothes in any bag. We'll sort them at our facility.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-whasha-blue-light text-whasha-blue rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold">2</div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-800">We Pick Up & Deliver</h3>
                            <p className="mt-2 text-slate-500">Schedule a pickup and we'll be at your door. We deliver back in 24-48 hours.</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <div className="bg-whasha-blue-light text-whasha-blue rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold">3</div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-800">Enjoy Clean Clothes</h3>
                            <p className="mt-2 text-slate-500">Unpack your fresh, clean, and perfectly folded (or hung) clothes.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* AI Laundry Tip Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                         <SparklesIcon className="w-12 h-12 mx-auto text-whasha-yellow"/>
                        <h2 className="mt-4 text-3xl font-bold text-slate-800">AI-Powered Laundry Tips</h2>
                        <p className="mt-2 text-slate-500 mb-6">Get a smart laundry tip from our AI assistant, powered by Google Gemini.</p>
                        <button 
                            onClick={handleGetTip}
                            disabled={isLoadingTip}
                            className="bg-whasha-yellow text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-amber-300 transition-all shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                        >
                           {isLoadingTip ? <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" /> : <SparklesIcon className="h-5 w-5 mr-2"/> }
                           {isLoadingTip ? 'Getting Tip...' : 'Get a Fresh Tip'}
                        </button>

                        {tip && (
                             <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-left border-l-4 border-whasha-yellow">
                                <p className="text-slate-700">{tip}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-800">Our Services</h2>
                        <p className="mt-2 text-slate-500">Professional care for all your fabrics.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_SERVICES.map(service => (
                            <div key={service.id} className="bg-slate-50 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                                <h3 className="text-xl font-semibold text-slate-800">{service.name}</h3>
                                <p className="mt-2 text-slate-500">Starting at</p>
                                <p className="text-2xl font-bold text-whasha-blue mt-1">₦{service.price.toLocaleString()}<span className="text-base font-normal text-slate-500">/{service.unit}</span></p>
                                <Link to="/order" className="mt-4 inline-block text-whasha-green font-semibold hover:underline">
                                    Order Now &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;