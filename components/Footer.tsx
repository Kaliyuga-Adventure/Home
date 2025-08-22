
import React from 'react';
import { Icon } from './Icon';
import type { Page } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface FooterProps {
  onNavigate: (page: Page) => void;
  isCustomerAuthenticated: boolean;
}


export const Footer: React.FC<FooterProps> = ({ onNavigate, isCustomerAuthenticated }) => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div 
              className="cursor-pointer"
              onClick={() => onNavigate('home')}
            >
               <CompanyLogo variant="white" textClassName="text-2xl font-bold" iconClassName="h-9 w-9" />
            </div>
            <p className="text-gray-400 mt-4 text-sm">Your next adventure starts here.</p>
            <div className="mt-6">
                {!isCustomerAuthenticated && (
                  <button onClick={() => onNavigate('login')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                      Admin Portal
                  </button>
                )}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('packages')} className="text-gray-400 hover:text-white transition-colors">Packages</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              <li><button onClick={() => onNavigate('customer-login')} className="text-gray-400 hover:text-white transition-colors">Sign In</button></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><button onClick={() => onNavigate('privacy-policy')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms-and-conditions')} className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => onNavigate('payment-policy')} className="text-gray-400 hover:text-white transition-colors">Payment Policy</button></li>
              <li><button onClick={() => onNavigate('cancellation-policy')} className="text-gray-400 hover:text-white transition-colors">Cancellation Policy</button></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase text-gray-300">Contact Us</h3>
             <ul className="mt-4 space-y-3 text-gray-400">
               <li className="flex items-start space-x-3">
                  <Icon name="phone" className="h-5 w-5 flex-shrink-0 mt-1" />
                  <span>+91 82177 12818</span>
                </li>
                 <li className="flex items-start space-x-3">
                  <Icon name="mail" className="h-5 w-5 flex-shrink-0 mt-1" />
                  <span>kaliyugaadventure@gmail.com</span>
                </li>
             </ul>
             <div className="flex space-x-4 mt-6">
              <a href="https://www.youtube.com/@KaliyugaAdventure" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors"><Icon name="youtube" className="h-6 w-6" /></a>
              <a href="https://www.linkedin.com/company/kaliyuga-adventure" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Icon name="linkedin" className="h-6 w-6" /></a>
              <a href="https://www.instagram.com/kaliyuga_adventure/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><Icon name="instagram" className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="text-center text-gray-500 text-sm">
          <span>&copy; {new Date().getFullYear()} Kaliyuga Adventure. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
