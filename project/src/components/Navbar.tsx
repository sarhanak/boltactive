import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Active For You Trust</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/gallery"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/gallery') 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Gallery
              </Link>
              <Link
                to="/donate"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/gallery"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/gallery') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/donate"
              className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;