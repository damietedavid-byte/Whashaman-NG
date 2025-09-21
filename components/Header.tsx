
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogoIcon, MenuIcon, CloseIcon } from './IconComponents';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useApp();

  const navLinkClasses = "text-gray-600 hover:text-whasha-blue transition-colors pb-1 border-b-2 border-transparent";
  const activeNavLinkClasses = "text-whasha-blue border-whasha-blue";

  const navLinks = (
    <>
      <NavLink to="/" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>Home</NavLink>
      <NavLink to="/order" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Place Order</NavLink>
      <NavLink to="/track/WHG-92KL3" className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Track Order</NavLink>
    </>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <LogoIcon className="h-10 w-10 text-whasha-blue" />
              <span className="text-2xl font-bold text-gray-800">Whashaman<span className="text-whasha-green">NG</span></span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
               <Link to="/account" className="text-gray-600 hover:text-whasha-blue transition-colors">My Account</Link>
            ) : (
               <Link to="/login" className="text-gray-600 hover:text-whasha-blue transition-colors">Log In</Link>
            )}
            <Link to="/order" className="bg-whasha-yellow text-slate-900 font-semibold px-5 py-2.5 rounded-full hover:bg-amber-300 transition-all shadow-sm">
              Schedule Pickup
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 flex flex-col space-y-4">
            {navLinks}
            <div className="border-t pt-4 flex flex-col space-y-3">
              {user ? (
                 <Link to="/account" className="text-center w-full bg-slate-100 text-slate-800 font-semibold px-4 py-2 rounded-full hover:bg-slate-200 transition-all">My Account</Link>
              ) : (
                 <Link to="/login" className="text-center w-full bg-slate-100 text-slate-800 font-semibold px-4 py-2 rounded-full hover:bg-slate-200 transition-all">Log In</Link>
              )}
                <Link to="/order" className="text-center w-full bg-whasha-yellow text-slate-900 font-semibold px-4 py-2 rounded-full hover:bg-amber-300 transition-all">
                  Schedule Pickup
                </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
