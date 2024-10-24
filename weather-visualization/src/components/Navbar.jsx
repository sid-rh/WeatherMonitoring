import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
  
    const isActive = (path) => {
      return location.pathname === path ? 'bg-blue-700' : '';
    };
  
    return (
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Weather Monitor</h1>
          <div className="space-x-4">
            <Link to="/" className={`px-3 py-2 rounded ${isActive('/')}`}>
              Daily Summary
            </Link>
            <Link to="/trends" className={`px-3 py-2 rounded ${isActive('/trends')}`}>
              Historical Trends
            </Link>
            <Link to="/alerts" className={`px-3 py-2 rounded ${isActive('/alerts')}`}>
              Alert Log
            </Link>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;