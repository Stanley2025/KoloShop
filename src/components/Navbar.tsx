// src/components/Navbar.tsx
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-green-600">KoloShop</h1>
            <span className="hidden sm:inline text-gray-500 text-sm">
              Trust & Reliable E-Commerce
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/categories"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              Categories
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white shadow-md">
          <a
            href="/"
            className="block text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            Home
          </a>
          <a
            href="/categories"
            className="block text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            Categories
          </a>
          <a
            href="/about"
            className="block text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="block text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
