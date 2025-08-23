import React, { useState } from 'react';
import type { SiteStats } from '../types';

interface SiteDataEditorProps {
  initialStats: SiteStats;
  onSave: (stats: SiteStats) => void;
  onCancel: () => void;
}

const statDefinitions = [
    { key: 'happyTravelers', label: 'Happy Travelers', group: 'Homepage Stats' },
    { key: 'destinationsExplored', label: 'Destinations Explored', group: 'Homepage Stats' },
    { key: 'successfulTrips', label: 'Successful Trips', group: 'Homepage Stats' },
    { key: 'avgRating', label: 'Average Rating', group: 'About Us Stats' },
    { key: 'instagramFollowers', label: 'Instagram Followers', group: 'About Us Stats' },
    { key: 'googleReviews', label: 'Google Reviews', group: 'About Us Stats' },
] as const;


export const SiteDataEditor: React.FC<SiteDataEditorProps> = ({ initialStats, onSave, onCancel }) => {
    const [stats, setStats] = useState(initialStats);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStats(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(stats);
    };

    const groupedStats = statDefinitions.reduce((acc, stat) => {
        (acc[stat.group] = acc[stat.group] || []).push(stat);
        return acc;
    }, {} as Record<string, (typeof statDefinitions[number])[]>);

    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
             <div className="mb-6 pb-4 border-b">
                <h2 className="text-3xl font-bold text-gray-800">Edit Site Data</h2>
                <p className="text-gray-600 mt-1">Update key numbers and text displayed on the website.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                {Object.entries(groupedStats).map(([groupName, groupStats]) => (
                    <div key={groupName}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{groupName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {groupStats.map(stat => (
                                <div key={stat.key}>
                                    <label htmlFor={stat.key} className="block text-sm font-medium text-gray-700">{stat.label}</label>
                                    <input
                                        type="text"
                                        id={stat.key}
                                        name={stat.key}
                                        value={stats[stat.key]}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-8 mt-4 border-t">
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                        Save Site Data
                    </button>
                </div>
            </form>
        </div>
    );
};