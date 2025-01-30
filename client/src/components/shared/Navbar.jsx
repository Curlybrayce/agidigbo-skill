import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to='/' className="flex items-center">
            <img src='/logo.jpeg' className="h-8 w-8 text-blue-900" />
            <span className="ml-2 text-xl font-bold text-blue-900">Agidigbo Training</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-900 transition-colors">Home</Link>
            {/* <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 hover:text-blue-900 transition-colors"
              >
                Programs
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              Programs Dropdown 
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Stream 1</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Stream 2</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Stream 3</a>
                </div>
              )}
            </div> */}
            <Link to='/about' className="text-gray-700 hover:text-blue-900 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-900 transition-colors">Contact</Link>
          </div>

          {/* CTA Button */}
          <Link to="/register" className="hidden md:flex items-center">
            <button className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors">
              Apply Now
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link to='/' className="text-gray-700 hover:text-blue-900 transition-colors">Home</Link>
              {/* <a href="#program" className="text-gray-700 hover:text-blue-900 transition-colors">Program</a> */}
              {/*<button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 hover:text-blue-900 transition-colors"
              >
                Programs
              </button>
               {isDropdownOpen && (
                <div className="pl-4 flex flex-col space-y-2">
                  <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors">Stream 1</a>
                  <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors">Stream 2</a>
                  <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors">Stream 3</a>
                </div>
              )} */}
              <Link to='/about' className="text-gray-700 hover:text-blue-900 transition-colors">About</Link>
              <Link to='/contact' className="text-gray-700 hover:text-blue-900 transition-colors">Contact</Link>
              <Link to="/register" className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors w-full">
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;