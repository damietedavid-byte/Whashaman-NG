
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import TrackingPage from './pages/TrackingPage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/track/:orderId" element={<TrackingPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
