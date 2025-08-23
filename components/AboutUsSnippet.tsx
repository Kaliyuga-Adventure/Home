
import React from 'react';
import { Icon } from './Icon';
import type { SiteStats } from '../types';

interface AboutUsSnippetProps {
  stats: SiteStats;
}

export const AboutUsSnippet: React.FC<AboutUsSnippetProps> = ({ stats }) => {
  const displayStats = [
    { value: stats.happyTravelers, label: 'Happy Travelers', icon: 'emoji-happy' },
    { value: stats.destinationsExplored, label: 'Destinations Explored', icon: 'map' },
    { value: stats.successfulTrips, label: 'Successful Trips', icon: 'briefcase' },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-600">Our Journey, Your Story</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Crafting Unforgettable Adventures Since 2024
          </p>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
            At Kaliyuga Adventure, we believe travel is more than just seeing new places—it's about creating lasting memories. Since our beginning in 2024, we've guided hundreds of happy travelers on their dream adventures, meticulously planning every detail to ensure an experience that's both seamless and extraordinary.
          </p>
        </div>

        <div className="mt-16">
          <dl className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 text-center">
            {displayStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <dt className="flex items-center text-gray-600">
                  <Icon name={stat.icon as any} className="h-10 w-10 text-cyan-600" />
                </dt>
                <dd className="mt-4 text-4xl font-bold tracking-tight text-gray-900">{stat.value}</dd>
                <dt className="mt-1 text-base leading-7 text-gray-600">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};