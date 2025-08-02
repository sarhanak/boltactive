import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold">Active For You Charitable Trust</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering communities and transforming lives through dedicated service in health, education, 
              women's empowerment, and environmental sustainability.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/gallery" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Gallery
              </Link>
              <Link to="/donate" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                Donate
              </Link>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Shikari Faliyu, Godhra Bhagol,<br />
                  Tal.: Santrampur, Mahisagar 389260
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a 
                  href="mailto:ACTIVEFORYOUTRUST@GMAIL.COM" 
                  className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  ACTIVEFORYOUTRUST@GMAIL.COM
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a 
                  href="tel:9925255729" 
                  className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
                >
                  9925255729
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Active For You Charitable Trust. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;