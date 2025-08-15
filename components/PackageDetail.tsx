import React from 'react';
import type { TravelPackage } from '../types';
import { Icon } from './Icon';
import { formatINR } from '../utils/formatting';

interface PackageDetailProps {
  packageInfo: TravelPackage;
  onClose: () => void;
}

export const PackageDetail: React.FC<PackageDetailProps> = ({ packageInfo, onClose }) => {

  const handleWhatsAppBooking = () => {
    const phoneNumber = '918217712818'; // Company's WhatsApp number
    const message = `Hello Kaliyuga Adventure, I'm interested in booking the "${packageInfo.title}" package for a price of ${formatINR(packageInfo.price)}. Please provide me with more details.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/3 h-64 md:h-auto">
           <img src={packageInfo.imageUrl} alt={packageInfo.title} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{packageInfo.title}</h2>
              <p className="text-md text-gray-500">{packageInfo.destination}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
              <Icon name="close" className="h-7 w-7" />
            </button>
          </div>
          
          <div className="mb-6 prose prose-sm max-w-none text-gray-600">
            <p>{packageInfo.longDescription}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Itinerary</h3>
            <ul className="space-y-2">
              {packageInfo.itinerary.map(item => (
                <li key={item.day} className="flex items-start">
                  <span className="bg-cyan-600 text-white rounded-full text-xs font-bold w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">{item.day}</span>
                  <span className="text-gray-700">{item.activity}</span>
                </li>
              ))}
            </ul>
          </div>
                    
          <div className="mt-auto pt-6 border-t">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Book Your Trip</h3>
            <p className="text-sm text-gray-600 mb-4">Click the button below to start a conversation with us on WhatsApp to finalize your booking for {formatINR(packageInfo.price)}.</p>
            <button 
                onClick={handleWhatsAppBooking}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
                aria-label="Request booking on WhatsApp"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.888-.001 2.225.651 4.315 1.731 6.086l.06.094-1.105 4.052 4.155-1.088.108.067z"/></svg>
                <span>Request Booking on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};