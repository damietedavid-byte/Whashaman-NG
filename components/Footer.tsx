
import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <LogoIcon className="h-10 w-10 text-whasha-blue" />
              <span className="text-2xl font-bold text-white">Whashaman<span className="text-whasha-green">NG</span></span>
            </Link>
            <p className="max-w-xs text-slate-400">Wash, Dry & Deliver in 24-48h. Serving Port Harcourt and major cities across Nigeria.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/order" className="hover:text-whasha-yellow transition-colors">Laundry</Link></li>
              <li><Link to="/order" className="hover:text-whasha-yellow transition-colors">Dry Cleaning</Link></li>
              <li><Link to="/order" className="hover:text-whasha-yellow transition-colors">Ironing</Link></li>
              <li><Link to="/order" className="hover:text-whasha-yellow transition-colors">Businesses</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-whasha-yellow transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-whasha-yellow transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-whasha-yellow transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-whasha-yellow transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-whasha-yellow transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Whashaman NG. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p>A demonstration project.</p>
            <Link to="/admin" className="hover:text-whasha-yellow transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;