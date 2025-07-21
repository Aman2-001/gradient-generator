import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const navLinks = [
    { 
      label: 'Home', 
      to: '/',
      hasDropdown: false
    },
    { 
      label: 'About', 
      to: '/about',
      hasDropdown: false
    },
    { 
      label: 'Service', 
      to: '/products',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Products', to: '/products' },
        { label: 'Featured', to: '/products?featured=true' },
        { label: 'New Arrivals', to: '/products?new=true' }
      ]
    },
    { 
      label: 'Blog', 
      to: '/blog',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Recent Posts', to: '/blog' },
        { label: 'Health Tips', to: '/blog/health-tips' },
        { label: 'Medical News', to: '/blog/medical-news' }
      ]
    },
    { 
      label: 'Pages', 
      to: '/pages',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Cart', to: '/cart' },
        { label: 'Profile', to: '/profile' },
        { label: 'Orders', to: '/orders' }
      ]
    },
    { 
      label: 'Contact', 
      to: '/contact',
      hasDropdown: false
    }
  ];

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const MediloLogo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center relative">
        {/* Medical Cross Icon */}
        <div className="relative">
          <div className="w-6 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-6 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* Small decorative elements */}
        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full opacity-60"></div>
      </div>
      <span className="text-2xl font-bold text-gray-800">Medilo</span>
    </div>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <MediloLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={link.label} className="relative group">
                {link.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.to}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && activeDropdown === index && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>

            {/* Contact Now Button */}
            <Link
              to="/contact"
              className="hidden md:flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
            >
              <span>Contact Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-100">
            {navLinks.map((link, index) => (
              <div key={link.label}>
                {link.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === index && (
                      <div className="mt-2 ml-4 space-y-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Contact Button */}
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 mt-4"
            >
              <span>Contact Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;