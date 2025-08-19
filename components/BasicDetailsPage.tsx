
import React, { useState } from 'react';
import { CompanyLogo } from './CompanyLogo';
import type { Customer, Page } from '../types';

interface BasicDetailsPageProps {
  customer: Customer;
  onSave: (details: Omit<Customer, 'id' | 'email'>) => void;
  onNavigate: (page: Page) => void;
}

export const BasicDetailsPage: React.FC<BasicDetailsPageProps> = ({ customer, onSave, onNavigate }) => {
  const [name, setName] = useState(customer.name || '');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>('Prefer not to say');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    
    onSave({
      name,
      mobile: mobile || undefined,
      age: age ? Number(age) : undefined,
      sex: sex,
    });
  };

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
                        Just one more step!
                    </h2>
                     <p className="mt-2 text-sm text-gray-600">
                        Please tell us a bit more about yourself.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                        <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">Mobile Number (Optional)</label>
                        <input id="mobile" name="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='e.g., 9876543210'
                            className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age (Optional)</label>
                            <input id="age" name="age" type="number" value={age} onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))} min="1"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                             <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">Gender (Optional)</label>
                             <select id="sex" name="sex" value={sex} onChange={(e) => setSex(e.target.value as any)}
                                className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6">
                                <option>Prefer not to say</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                             </select>
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center pt-2">{error}</p>}
                    
                    <div className="pt-2">
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors">
                            Save and Continue
                        </button>
                    </div>
                     <div className="text-center pt-2">
                        <button onClick={() => onNavigate('home')} type="button" className="text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors">
                            Skip for now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};
