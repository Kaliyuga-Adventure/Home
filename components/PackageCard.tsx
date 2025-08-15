
import React from 'react';
import type { TravelPackage } from '../types';
import { Icon } from './Icon';
import { formatINR } from '../utils/formatting';

interface PackageCardProps {
  packageInfo: TravelPackage;
  onViewDetails: (pkg: TravelPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packageInfo, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
      <div className="relative">
        <img src={packageInfo.imageUrl} alt={packageInfo.title} className="w-full h-56 object-cover" />
        <div className="absolute top-0 right-0 bg-cyan-600 text-white px-3 py-1 rounded-bl-lg font-bold text-lg">
          {formatINR(packageInfo.price)}
        </div>
        <div className="absolute bottom-0 left-0 bg-black/50 text-white p-2 w-full">
           <h3 className="text-xl font-bold truncate">{packageInfo.title}</h3>
           <p className="text-sm text-gray-200">{packageInfo.destination}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{packageInfo.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 text-yellow-500">
            {[...Array(Math.floor(packageInfo.rating))].map((_, i) => (
              <Icon key={i} name="star" className="h-5 w-5" />
            ))}
            {packageInfo.rating % 1 !== 0 && <Icon name="starHalf" className="h-5 w-5" />}
            <span className="text-gray-600 ml-2 text-sm">{packageInfo.rating}</span>
          </div>
          <div className="text-gray-600 text-sm font-medium">
            <Icon name="clock" className="h-4 w-4 inline-block mr-1" />
            {packageInfo.duration} Days
          </div>
        </div>
        <button 
          onClick={() => onViewDetails(packageInfo)}
          className="w-full bg-cyan-50 text-cyan-700 font-semibold py-2 rounded-lg hover:bg-cyan-100 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
