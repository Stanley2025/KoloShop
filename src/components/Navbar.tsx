// src/components/Navbar.tsx

import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> {/* Increased height slightly for better spacing */}
          
          {/* --- NEW LOGO AND TAGLINE SECTION --- */}
          <div className="flex-shrink-0">
            <a href="/" className="flex flex-col">
              <span className="text-3xl font-bold text-gray-800">KoloShop</span>
              <span className="text-sm font-medium text-blue-600">One Time Shopping</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</a>
              <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Categories</a>
              <a href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">About</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="bg-gray-200 text-gray-700 inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-300">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;