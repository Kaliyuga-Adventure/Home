import React, { useState } from 'react';
import { CompanyLogo } from './CompanyLogo';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Hardcoded credentials for demonstration.
    if (username === 'admin' && password === 'password123') {
      onLogin();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-sm">
            <div className="mb-8">
                 <CompanyLogo 
                    className="justify-center"
                    iconClassName="h-10 w-10"
                    textClassName="text-3xl font-bold"
                 />
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                    Admin Sign In
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                                placeholder="admin"
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
                                placeholder="password123"
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
