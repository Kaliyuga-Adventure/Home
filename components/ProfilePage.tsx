
import React, { useState, useEffect } from 'react';
import type { Customer, Page } from '../types';
import { Icon } from './Icon';

interface ProfilePageProps {
  customer: Customer;
  onSave: (details: Partial<Omit<Customer, 'id' | 'email'>>) => void;
  onNavigate: (page: Page) => void;
}

type EditableCustomer = Partial<Omit<Customer, 'id' | 'email'>>;

export const ProfilePage: React.FC<ProfilePageProps> = ({ customer, onSave, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<EditableCustomer>({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset form data when editing starts or customer data changes
    if (customer) {
      setFormData({
        name: customer.name || '',
        mobile: customer.mobile || '',
        age: customer.age || undefined,
        sex: customer.sex || 'Prefer not to say',
      });
    }
  }, [customer, isEditing]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: e.target.type === 'number' && value !== '' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.name.trim()) {
      setError('Full name is required.');
      return;
    }
    onSave(formData);
    setIsEditing(false);
  };

  const DetailItem: React.FC<{ label: string; value?: string | number }> = ({ label, value }) => (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || 'Not provided'}</dd>
    </div>
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                 <div className="h-16 w-16 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-3xl flex-shrink-0">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEditToggle}
                  className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-cyan-50 text-cyan-700 font-semibold px-4 py-2 rounded-lg hover:bg-cyan-100 transition-colors duration-300"
                >
                  <Icon name="edit" className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
            
            <hr className="my-6"/>
            
            {!isEditing ? (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Full Name" value={customer.name} />
                <DetailItem label="Email Address" value={customer.email} />
                <DetailItem label="Mobile Number" value={customer.mobile} />
                <DetailItem label="Age" value={customer.age} />
                <DetailItem label="Gender" value={customer.sex} />
              </dl>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" id="age" name="age" min="1" value={formData.age || ''} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select id="sex" name="sex" value={formData.sex} onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm">
                            <option>Prefer not to say</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                 {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={handleEditToggle} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};