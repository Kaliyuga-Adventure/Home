
import React, { useState } from 'react';
import type { TravelPackage } from '../types';
import { PackageForm } from './PackageForm';
import { HomePageEditor } from './HomePageEditor';
import { Icon } from './Icon';
import { formatINR } from '../utils/formatting';

interface AdminDashboardProps {
  packages: TravelPackage[];
  onSave: (pkg: Omit<TravelPackage, 'id'> & { id?: number }) => void;
  onDelete: (id: number) => void;
  onSaveHomepageLayout: (ids: number[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ packages, onSave, onDelete, onSaveHomepageLayout }) => {
  const [view, setView] = useState<'list' | 'form' | 'homepage'>('list');
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<TravelPackage | null>(null);

  const handleEdit = (pkg: TravelPackage) => {
    setEditingPackage(pkg);
    setView('form');
  };

  const handleAddNew = () => {
    setEditingPackage(null);
    setView('form');
  };

  const handleSavePackageAndSwitchView = (pkg: Omit<TravelPackage, 'id'> & { id?: number }) => {
    onSave(pkg);
    setView('list');
    setEditingPackage(null);
  };
  
  const handleDeleteConfirm = (pkg: TravelPackage) => {
     onDelete(pkg.id);
     setPackageToDelete(null);
  }

  const handleSaveHomepageAndSwitchView = (ids: number[]) => {
    onSaveHomepageLayout(ids);
    setView('list');
  };

  const PackageTable = () => (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Content Management</h2>
         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <button
              onClick={() => setView('homepage')}
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
            >
              <Icon name="home" className="h-5 w-5" />
              <span>Edit Homepage</span>
            </button>
            <button
              onClick={handleAddNew}
              className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
            >
              <Icon name="plus" className="h-5 w-5" />
              <span>Add New Package</span>
            </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={pkg.imageUrl} alt={pkg.title} className="h-10 w-16 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{pkg.title}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{pkg.destination}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{formatINR(pkg.price)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{pkg.duration} days</div></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                    <button onClick={() => handleEdit(pkg)} className="text-cyan-600 hover:text-cyan-900 transition"><Icon name="edit" className="h-5 w-5"/></button>
                    <button onClick={() => setPackageToDelete(pkg)} className="text-red-600 hover:text-red-900 transition"><Icon name="trash" className="h-5 w-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {view === 'list' && <PackageTable />}
      {view === 'form' && (
        <PackageForm
          initialData={editingPackage}
          onSave={handleSavePackageAndSwitchView}
          onCancel={() => setView('list')}
        />
      )}
      {view === 'homepage' && (
        <HomePageEditor
          packages={packages}
          onSave={handleSaveHomepageAndSwitchView}
          onCancel={() => setView('list')}
        />
      )}
      {packageToDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold">Confirm Deletion</h3>
                <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete the package "{packageToDelete.title}"? This action cannot be undone.</p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setPackageToDelete(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button onClick={() => handleDeleteConfirm(packageToDelete)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
