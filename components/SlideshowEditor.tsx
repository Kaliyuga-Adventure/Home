
import React, { useState } from 'react';
import type { SlideshowImage } from '../types';
import { Icon } from './Icon';

interface SlideshowEditorProps {
  initialSlides: SlideshowImage[];
  onSave: (images: SlideshowImage[]) => void;
  onCancel: () => void;
}

export const SlideshowEditor: React.FC<SlideshowEditorProps> = ({ initialSlides, onSave, onCancel }) => {
  const [slides, setSlides] = useState<SlideshowImage[]>(initialSlides);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [newImageAlt, setNewImageAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (!newImageFile || !newImagePreview) {
      alert("Please select an image file.");
      return;
    }
    if (!newImageAlt.trim()) {
        alert("Please provide alternative text for the image.");
        return;
    }
    
    setIsUploading(true);
    // Simulating an upload process using the base64 data URL.
    setTimeout(() => {
        const newSlide: SlideshowImage = {
            id: `slide-${Date.now()}`,
            src: newImagePreview,
            alt: newImageAlt.trim(),
        };
        setSlides(prev => [...prev, newSlide]);
        
        // Reset form
        setNewImageFile(null);
        setNewImagePreview(null);
        setNewImageAlt('');
        setIsUploading(false);
    }, 500);
  };
  
  const handleRemoveImage = (idToRemove: string) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
        setSlides(prev => prev.filter(slide => slide.id !== idToRemove));
    }
  };
  
  const handleSaveClick = () => {
      onSave(slides);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="mb-6 pb-4 border-b">
        <h2 className="text-3xl font-bold text-gray-800">Edit Homepage Slideshow</h2>
        <p className="text-gray-600 mt-1">Add or remove images for the hero section slideshow.</p>
      </div>

      {/* Add new image form */}
      <div className="bg-gray-50 p-4 rounded-lg border mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Add New Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
                <label className="block text-sm font-medium text-gray-700">Image File</label>
                <input 
                    type="file" 
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                />
                {newImagePreview && (
                    <img src={newImagePreview} alt="Preview" className="mt-4 h-24 w-auto object-cover rounded-md" />
                )}
            </div>
            <div>
                <label htmlFor="newImageAlt" className="block text-sm font-medium text-gray-700">Alternative Text (for accessibility)</label>
                <input 
                    type="text" 
                    id="newImageAlt"
                    value={newImageAlt}
                    onChange={(e) => setNewImageAlt(e.target.value)}
                    placeholder="e.g., A beautiful sunset over the mountains"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                />
                 <button
                    type="button"
                    onClick={handleAddImage}
                    disabled={!newImageFile || !newImageAlt.trim() || isUploading}
                    className="mt-4 w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <Icon name="plus" className="h-5 w-5" />
                    <span>{isUploading ? 'Adding...' : 'Add to Slideshow'}</span>
                </button>
            </div>
        </div>
      </div>
      
      {/* Current images list */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Current Slideshow Images ({slides.length})</h3>
        {slides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {slides.map(slide => (
                    <div key={slide.id} className="relative group border rounded-lg overflow-hidden shadow-sm">
                        <img src={slide.src} alt={slide.alt} className="h-40 w-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                            <p className="text-white text-xs font-medium truncate" title={slide.alt}>{slide.alt}</p>
                        </div>
                        <button
                            onClick={() => handleRemoveImage(slide.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Remove image"
                        >
                            <Icon name="trash" className="h-4 w-4"/>
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 text-center py-8">No images in the slideshow. Add one above to get started.</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-8 mt-4 border-t">
        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
          Cancel
        </button>
        <button type="button" onClick={handleSaveClick} className="bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
          Save Slideshow
        </button>
      </div>
    </div>
  );
};
