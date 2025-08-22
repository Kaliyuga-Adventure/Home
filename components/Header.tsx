
import React, { useState, useRef, useEffect } from 'react';
import type { Page, Customer } from '../types';
import { Icon } from './Icon';
import { CompanyLogo } from './CompanyLogo';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isAdminAuthenticated: boolean;
  onAdminLogout: () => void;
  isCustomerAuthenticated: boolean;
  onCustomerLogout: () => void;
  currentCustomer: Customer | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  isAdminAuthenticated,
  onAdminLogout,
  isCustomerAuthenticated,
  onCustomerLogout,
  currentCustomer
}) => {
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const policyDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const navItems: { id: Page; label: string; isAI?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'packages', label: 'Packages' },
    { id: 'contact', label: 'Contact' },
  ];
  
  const policyItems: { id: Page; label: string }[] = [
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-and-conditions', label: 'Terms & Conditions' },
    { id: 'payment-policy', label: 'Payment Policy' },
    { id: 'cancellation-policy', label: 'Cancellation Policy' },
  ];
  
  const adminNavItems: { id: Page; label: string; isAI?: boolean }[] = [
    { id: 'admin', label: 'Dashboard' },
  ];

  const currentNavItems = isAdminAuthenticated ? adminNavItems : navItems;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (policyDropdownRef.current && !policyDropdownRef.current.contains(event.target as Node)) {
        setIsPolicyDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
    return () => {
      document.body.classList.remove('body-lock');
    };
  }, [isMobileMenuOpen]);

  const handleMobileNav = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };
  
  const handleMobileLogout = () => {
    if (isAdminAuthenticated) onAdminLogout();
    if (isCustomerAuthenticated) onCustomerLogout();
    setIsMobileMenuOpen(false);
  };

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-white z-50 md:hidden animate-slide-in-from-right" role="dialog" aria-modal="true">
      <div className="flex justify-between items-center px-6 py-3 border-b">
        <div onClick={() => handleMobileNav('home')}>
          <CompanyLogo />
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-cyan-600">
          <Icon name="close" className="h-7 w-7" />
        </button>
      </div>
      <div className="p-6">
        <nav className="flex flex-col space-y-4">
          {currentNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMobileNav(item.id)}
              className={`text-lg text-left font-medium ${ currentPage === item.id ? 'text-cyan-600' : 'text-gray-700' } hover:text-cyan-600 transition-colors`}
            >
              <span className="flex items-center gap-2">
                {item.isAI && <Icon name="sparkles" className="h-5 w-5 text-yellow-500" />}
                {item.label}
              </span>
            </button>
          ))}
          <hr className="my-4"/>
           <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">More Info</span>
           {policyItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleMobileNav(item.id)}
                className={`text-lg text-left font-medium ${ currentPage === item.id ? 'text-cyan-600' : 'text-gray-700' } hover:text-cyan-600 transition-colors`}
              >
                {item.label}
              </button>
            ))}
        </nav>
        <div className="mt-8 pt-6 border-t">
           {isAdminAuthenticated || isCustomerAuthenticated ? (
            <button 
              onClick={handleMobileLogout}
              className="w-full bg-red-500 text-white font-semibold px-5 py-3 rounded-full hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md">
              Logout
            </button>
          ) : (
            <button 
              className="w-full bg-cyan-600 text-white font-semibold px-5 py-3 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => handleMobileNav('customer-login')}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div 
            className="cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <CompanyLogo />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {currentNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-gray-600 hover:text-cyan-600 transition-colors duration-300 relative font-medium ${
                  currentPage === item.id ? 'text-cyan-600' : ''
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.isAI && <Icon name="sparkles" className="h-4 w-4 text-yellow-500" />}
                  <span>{item.label}</span>
                </span>
                {currentPage === item.id && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-cyan-600 rounded-full"></span>
                )}
              </button>
            ))}
            {!isAdminAuthenticated && (
              <div className="relative" ref={policyDropdownRef}>
                <button
                  onClick={() => setIsPolicyDropdownOpen(prev => !prev)}
                  className="text-gray-600 hover:text-cyan-600 transition-colors duration-300 font-medium flex items-center"
                >
                  <span>More</span>
                  <Icon name="chevronDown" className="h-4 w-4 ml-1" />
                </button>
                {isPolicyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in-fast">
                    {policyItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setIsPolicyDropdownOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {isAdminAuthenticated ? (
              <button 
                onClick={onAdminLogout}
                className="bg-red-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                Logout
              </button>
            ) : isCustomerAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(prev => !prev)}
                  className="h-10 w-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg hover:bg-cyan-700 transition-all"
                  aria-label="User menu"
                  aria-haspopup="true"
                  aria-expanded={isUserDropdownOpen}
                >
                  {currentCustomer?.name.charAt(0).toUpperCase()}
                </button>
                 {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 animate-fade-in-fast">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-gray-900 truncate" title={currentCustomer?.name}>{currentCustomer?.name}</p>
                        <p className="text-sm text-gray-500 truncate" title={currentCustomer?.email}>{currentCustomer?.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => { setCurrentPage('profile'); setIsUserDropdownOpen(false); }}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                          <Icon name="user" className="h-5 w-5 text-gray-500"/>
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={() => { onCustomerLogout(); setIsUserDropdownOpen(false); }}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                          <Icon name="arrowLeft" className="h-5 w-5 text-gray-500"/>
                          <span>Sign Out</span>
                        </button>
                      </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="bg-cyan-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-cyan-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                onClick={() => setCurrentPage('customer-login')}>
                Sign In
              </button>
            )}
          </div>
          <button className="md:hidden text-gray-600 hover:text-cyan-600" onClick={() => setIsMobileMenuOpen(true)}>
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && <MobileMenu />}
    </>
  );
};