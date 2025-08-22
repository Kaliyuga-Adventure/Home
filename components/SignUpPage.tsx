
import React, { useState, useMemo } from 'react';
import { CompanyLogo } from './CompanyLogo';
import type { Customer, Page } from '../types';

interface SignUpPageProps {
  onSignUp: (customer: Pick<Customer, 'name' | 'email'>) => void;
  onNavigate: (page: Page) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (passwordStrength < 3) {
      setError('Password is not strong enough.');
      return;
    }
    if (name && email && password) {
      onSignUp({ name, email });
    } else {
      setError('Please fill in all fields.');
    }
  };

  const strengthColor = ['bg-gray-300', 'bg-red-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'][passwordStrength];
  const strengthText = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];

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
                        Create your account
                    </h2>
                     <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <button onClick={() => onNavigate('customer-login')} className="font-medium text-cyan-600 hover:text-cyan-500">
                            sign in to your account
                        </button>
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                         {password.length > 0 && (
                            <div className="mt-2">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs text-gray-500">Password strength</p>
                                    <p className={`text-xs font-bold`}>{strengthText}</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className={`h-1.5 rounded-full ${strengthColor} transition-all duration-300`} style={{ width: `${passwordStrength * 25}%`}}></div>
                                </div>
                            </div>
                        )}
                    </div>
                     <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center pt-2">{error}</p>}
                    
                    <div className="pt-2">
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};