import React from 'react';
import { NavLink } from 'react-router-dom';
import { Briefcase, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">CareerGPT</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              AI-powered career guidance to help you find your perfect path.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/assessment" className="text-gray-400 hover:text-white transition-colors">
                  Assessment
                </NavLink>
              </li>
              <li>
                <NavLink to="/recommendations" className="text-gray-400 hover:text-white transition-colors">
                  Recommendations
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" className="text-gray-400 hover:text-white transition-colors">
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/resume" className="text-gray-400 hover:text-white transition-colors">
                  Resume Analysis
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex items-center justify-center">
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> in 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;