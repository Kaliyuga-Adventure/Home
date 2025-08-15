
import React, { useState, useEffect } from 'react';
import type { TravelPackage } from '../types';
import { Icon } from './Icon';

const MAX_FEATURED = 6;

const DraggablePackageItem: React.FC<{ 
  pkg: TravelPackage; 
  onDragStart: (e: React.DragEvent, id: number) => void;
  isGhost?: boolean;
}> = ({ pkg, onDragStart, isGhost }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, pkg.id)}
        className={`flex items-center p-2 mb-2 bg-white rounded-lg border shadow-sm cursor-grab active:cursor-grabbing transition-shadow ${isGhost ? 'opacity-50 bg-gray-200' : 'hover:shadow-md'}`}
    >
        <Icon name="grip" className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
        <img src={pkg.imageUrl} alt={pkg.title} className="h-10 w-16 object-cover rounded-md" />
        <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-gray-900 truncate">{pkg.title}</p>
            <p className="text-xs text-gray-500 truncate">{pkg.destination}</p>
        </div>
    </div>
);

interface HomePageEditorProps {
    packages: TravelPackage[];
    onSave: (ids: number[]) => void;
    onCancel: () => void;
}

export const HomePageEditor: React.FC<HomePageEditorProps> = ({ packages, onSave, onCancel }) => {
    const [featured, setFeatured] = useState<TravelPackage[]>([]);
    const [available, setAvailable] = useState<TravelPackage[]>([]);
    const [draggedId, setDraggedId] = useState<number | null>(null);
    const [isOverFeatured, setIsOverFeatured] = useState(false);
    const [isOverAvailable, setIsOverAvailable] = useState(false);

    useEffect(() => {
        const initialFeatured = packages
            .filter(p => p.isFeatured)
            .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
        
        const featuredIds = new Set(initialFeatured.map(p => p.id));
        const initialAvailable = packages
          .filter(p => !featuredIds.has(p.id))
          .sort((a,b) => a.title.localeCompare(b.title));

        setFeatured(initialFeatured);
        setAvailable(initialAvailable);
    }, [packages]);

    const handleDragStart = (e: React.DragEvent, id: number) => {
        e.dataTransfer.setData('packageId', String(id));
        setDraggedId(id);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDropOnFeatured = (e: React.DragEvent) => {
        e.preventDefault();
        setIsOverFeatured(false);
        const id = Number(e.dataTransfer.getData('packageId'));
        if (!id || featured.some(p => p.id === id)) return;

        if (featured.length >= MAX_FEATURED) {
            alert(`You can only feature a maximum of ${MAX_FEATURED} packages.`);
            return;
        }

        const itemToAdd = available.find(p => p.id === id);
        if (!itemToAdd) return;
        
        setFeatured(prev => [...prev, itemToAdd]);
        setAvailable(prev => prev.filter(p => p.id !== id));
    };

    const handleDropOnAvailable = (e: React.DragEvent) => {
        e.preventDefault();
        setIsOverAvailable(false);
        const id = Number(e.dataTransfer.getData('packageId'));
        if (!id || available.some(p => p.id === id)) return;

        const itemToMove = featured.find(p => p.id === id);
        if (!itemToMove) return;

        setAvailable(prev => [...prev, itemToMove].sort((a,b) => a.title.localeCompare(b.title)));
        setFeatured(prev => prev.filter(p => p.id !== id));
    };

    const handleReorderDrop = (e: React.DragEvent, targetId: number) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents drop from bubbling to the container
        const sourceId = Number(e.dataTransfer.getData('packageId'));
        if (sourceId === targetId || !featured.some(p => p.id === sourceId)) return;

        const sourceIndex = featured.findIndex(p => p.id === sourceId);
        const targetIndex = featured.findIndex(p => p.id === targetId);

        if (sourceIndex === -1 || targetIndex === -1) return;

        const newFeatured = [...featured];
        const [removed] = newFeatured.splice(sourceIndex, 1);
        newFeatured.splice(targetIndex, 0, removed);
        
        setFeatured(newFeatured);
    };
    
    const handleSaveClick = () => {
        onSave(featured.map(p => p.id));
    };

    const dropZoneBaseClasses = "p-4 rounded-xl min-h-[300px] md:min-h-[400px] transition-colors duration-200";

    return (
        <div onDragEnd={handleDragEnd}>
            <div className="mb-6 pb-4 border-b">
                <h2 className="text-3xl font-bold text-gray-800">Edit Home Page Layout</h2>
                <p className="text-gray-600 mt-1">Drag and drop packages to arrange the home page. You can feature up to {MAX_FEATURED} items.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Featured Packages Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Featured on Homepage ({featured.length}/{MAX_FEATURED})</h3>
                    <div 
                        onDrop={handleDropOnFeatured} 
                        onDragOver={handleDragOver}
                        onDragEnter={() => setIsOverFeatured(true)}
                        onDragLeave={() => setIsOverFeatured(false)}
                        className={`${dropZoneBaseClasses} ${isOverFeatured ? 'bg-cyan-50 border-2 border-dashed border-cyan-400' : 'bg-gray-100'}`}
                    >
                        {featured.length > 0 ? (
                            featured.map(pkg => (
                                <div key={pkg.id} onDrop={(e) => handleReorderDrop(e, pkg.id)} onDragOver={handleDragOver}>
                                    <DraggablePackageItem pkg={pkg} onDragStart={handleDragStart} isGhost={draggedId === pkg.id}/>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Drop packages here
                            </div>
                        )}
                    </div>
                </div>

                {/* Available Packages Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Available Packages</h3>
                     <div 
                        onDrop={handleDropOnAvailable} 
                        onDragOver={handleDragOver}
                        onDragEnter={() => setIsOverAvailable(true)}
                        onDragLeave={() => setIsOverAvailable(false)}
                        className={`${dropZoneBaseClasses} ${isOverAvailable ? 'bg-red-50 border-2 border-dashed border-red-400' : 'bg-gray-100'}`}
                    >
                        <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
                           {available.map(pkg => (
                               <DraggablePackageItem key={pkg.id} pkg={pkg} onDragStart={handleDragStart} isGhost={draggedId === pkg.id}/>
                           ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-8 mt-4 border-t">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                </button>
                <button type="button" onClick={handleSaveClick} className="bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                    Save Home Page
                </button>
            </div>
        </div>
    );
};
