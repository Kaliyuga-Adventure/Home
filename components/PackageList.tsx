
import React, { useState, useMemo } from 'react';
import { PackageCard } from './PackageCard';
import type { TravelPackage } from '../types';
import { Icon } from './Icon';
import { formatINR } from '../utils/formatting';

interface PackageListProps {
  packages: TravelPackage[];
  onViewDetails: (pkg: TravelPackage) => void;
  title: string;
  showFilters: boolean;
}

const allTags = ['all', 'beach', 'culture', 'city', 'adventure', 'mountains', 'romance', 'history', 'island', 'trekking'];

export const PackageList: React.FC<PackageListProps> = ({ packages, onViewDetails, title, showFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [activeTag, setActiveTag] = useState('all');

  const filteredPackages = useMemo(() => {
    return packages
      .filter(pkg => pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(pkg => pkg.price <= maxPrice)
      .filter(pkg => activeTag === 'all' || pkg.tags.includes(activeTag));
  }, [packages, searchTerm, maxPrice, activeTag]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{title}</h2>
      <p className="text-center text-gray-500 mb-10">Find the perfect trip designed by our travel experts.</p>
      
      {showFilters && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Search Input */}
          <div className="col-span-1 md:col-span-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Destination</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="e.g., Paris, Bali..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Max Price: <span className="font-bold text-cyan-600">{formatINR(maxPrice)}</span></label>
            <input
              type="range"
              id="price"
              min="40000"
              max="300000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
          </div>
          
          {/* Tag Filters */}
          <div className="col-span-1 md:col-span-3">
             <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">Category:</span>
              {allTags.map(tag => (
                 <button
                   key={tag}
                   onClick={() => setActiveTag(tag)}
                   className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                     activeTag === tag
                       ? 'bg-cyan-600 text-white shadow'
                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                   }`}
                 >
                   {tag.charAt(0).toUpperCase() + tag.slice(1)}
                 </button>
               ))}
            </div>
          </div>
        </div>
      )}

      {filteredPackages.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} packageInfo={pkg} onViewDetails={onViewDetails} />
            ))}
          </div>
      ) : (
        <div className="text-center py-16">
          <Icon name="search" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No Packages Found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search filters to find your perfect trip.</p>
        </div>
      )}
    </div>
  );
};
