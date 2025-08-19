
import React, { useState } from 'react';
import { CompanyLogo } from './CompanyLogo';
import { Icon } from './Icon';
import type { Customer, Page } from '../types';

interface CustomerLoginPageProps {
  onLogin: (customer: Customer) => void;
  onNavigate: (page: Page) => void;
}

export const CustomerLoginPage: React.FC<CustomerLoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // This is a mock login. In a real app, you'd validate against a backend.
    if (email && password) {
      onLogin({ id: 1, name: email.split('@')[0], email: email });
    } else {
      setError('Please enter a valid email and password.');
    }
  };
  
  const SocialButton: React.FC<{ provider: string, icon: string }> = ({ provider, icon }) => (
    <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        <Icon name={icon} className="h-6 w-6" />
        <span className="text-sm font-medium text-gray-700">Continue with {provider}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm">
            <div className="mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
                 <CompanyLogo 
                    className="justify-center"
                    iconClassName="h-10 w-10"
                    textClassName="text-3xl font-bold"
                 />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <button onClick={() => onNavigate('signup')} className="font-medium text-cyan-600 hover:text-cyan-500">
                            create an account
                        </button>
                    </p>
                </div>

                <div className="space-y-3">
                    <SocialButton provider="Google" icon="google" />
                    <SocialButton provider="Microsoft" icon="microsoft" />
                </div>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">OR</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                         <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    
                    {error && (
                      <p className="text-sm text-red-600 text-center">{error}</p>
                    )}


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};
