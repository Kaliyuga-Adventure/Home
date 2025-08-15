
import React, { useState, useEffect } from 'react';
import type { TravelPackage } from '../types';
import { Icon } from './Icon';

interface PackageFormProps {
  initialData: TravelPackage | null;
  onSave: (pkg: Omit<TravelPackage, 'id'> & { id?: number }) => void;
  onCancel: () => void;
}

const emptyPackage = {
  title: '',
  destination: '',
  description: '',
  longDescription: '',
  price: 80000,
  duration: 7,
  imageUrl: '',
  rating: 4.5,
  itinerary: [],
  tags: [],
};

export const PackageForm: React.FC<PackageFormProps> = ({ initialData, onSave, onCancel }) => {
  const [pkg, setPkg] = useState(initialData || emptyPackage);
  const [tagsText, setTagsText] = useState('');

  useEffect(() => {
    const data = initialData || emptyPackage;
    setPkg(data);
    setTagsText(data.tags.join(', '));
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number' || name === 'price' || name === 'duration' || name === 'rating';
    setPkg(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        setPkg(prev => ({ ...prev, imageUrl: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleItineraryChange = (index: number, field: 'day' | 'activity', value: string) => {
    const newItinerary = [...pkg.itinerary];
    const updatedItem = { ...newItinerary[index] };
    if (field === 'day') {
        updatedItem.day = parseInt(value, 10) || 0;
    } else {
        updatedItem.activity = value;
    }
    newItinerary[index] = updatedItem;
    setPkg(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addItineraryItem = () => {
    const lastDay = pkg.itinerary.length > 0 ? Math.max(0, ...pkg.itinerary.map(i => i.day)) : 0;
    setPkg(prev => ({
        ...prev,
        itinerary: [...prev.itinerary, { id: Date.now(), day: lastDay + 1, activity: '' }]
    }));
  };

  const removeItineraryItem = (index: number) => {
    setPkg(prev => ({
        ...prev,
        itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg.imageUrl) {
        alert("Please upload an image for the package.");
        return;
    }
    const finalItinerary = pkg.itinerary.filter(item => item.activity.trim() !== '' && item.day > 0);
    const parsedTags = tagsText.split(',').map(tag => tag.trim()).filter(Boolean);
    
    onSave({ ...pkg, itinerary: finalItinerary, tags: parsedTags });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{initialData ? 'Edit Package' : 'Create New Package'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value={pkg.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div className="col-span-1">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
            <input type="text" name="destination" id="destination" value={pkg.destination} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
        </div>

        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
            <input type="text" name="description" id="description" value={pkg.description} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>
        <div>
          <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Long Description</label>
          <textarea name="longDescription" id="longDescription" value={pkg.longDescription} onChange={handleChange} rows={4} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Package Image</label>
          <div className="mt-2 flex items-center space-x-6">
            <div className="shrink-0">
              <img
                className="h-24 w-32 object-cover rounded-md bg-gray-100"
                src={pkg.imageUrl || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                alt="Package preview"
              />
            </div>
            <label htmlFor="file-upload" className="relative cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
              <Icon name="upload" className="h-5 w-5 text-gray-500" />
              <span>Upload Image</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg, image/png, image/webp" onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input type="number" name="price" id="price" value={pkg.price} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (days)</label>
            <input type="number" name="duration" id="duration" value={pkg.duration} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
           <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
            <input type="number" name="rating" id="rating" value={pkg.rating} onChange={handleChange} step="0.1" min="0" max="5" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700">Itinerary</label>
            <div className="mt-2 space-y-3">
                {pkg.itinerary.map((item, index) => (
                    <div key={item.id} className="flex flex-wrap items-center gap-2">
                        <input 
                            type="number" 
                            placeholder="Day"
                            aria-label="Day number"
                            value={item.day} 
                            onChange={(e) => handleItineraryChange(index, 'day', e.target.value)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            min="1"
                        />
                        <input 
                            type="text" 
                            placeholder="Activity description" 
                            aria-label="Activity description"
                            value={item.activity}
                            onChange={(e) => handleItineraryChange(index, 'activity', e.target.value)}
                            className="flex-grow min-w-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        />
                        <button 
                            type="button" 
                            onClick={() => removeItineraryItem(index)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Remove itinerary item"
                        >
                            <Icon name="trash" className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addItineraryItem}
                className="mt-3 flex items-center space-x-2 text-sm font-medium text-cyan-600 hover:text-cyan-800"
            >
                <Icon name="plus" className="h-5 w-5" />
                <span>Add Itinerary Item</span>
            </button>
        </div>

        <div>
          <label htmlFor="tagsText" className="block text-sm font-medium text-gray-700">Tags</label>
          <p className="text-xs text-gray-500 mb-1">Enter tags separated by commas. E.g., "city, romance, art"</p>
          <input type="text" name="tagsText" id="tagsText" value={tagsText} onChange={(e) => setTagsText(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button type="submit" className="bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
            Save Package
          </button>
        </div>
      </form>
    </div>
  );
};
