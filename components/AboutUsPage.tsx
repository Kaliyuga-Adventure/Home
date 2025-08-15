
import React from 'react';
import { Icon } from './Icon';
import { WhyChooseUs } from './WhyChooseUs';
import { Testimonials } from './Testimonials';

interface AboutUsPageProps {
    destinationCount: number;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ destinationCount }) => {
  const stats = [
    { name: 'Destinations', value: destinationCount, icon: 'map' },
    { name: 'Avg. Rating', value: '4.8/5', icon: 'star' },
    { name: 'Instagram Followers', value: '15K+', icon: 'instagram' },
    { name: 'Google Reviews', value: '500+', icon: 'google' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-cyan-100/20 pt-14">
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right sm:skew-x-[-30deg] bg-white shadow-xl shadow-cyan-600/10 ring-1 ring-cyan-50 sm:mr-20 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Kaliyuga Adventure
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                A modern travel company born from a passion for exploration and a commitment to creating authentic, unforgettable journeys. We believe that travel is a powerful tool for connection—with new cultures, with nature, and with ourselves.
              </p>
            </div>
            <img src="https://picsum.photos/seed/about/1920/1080" alt="" className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col items-center">
                 <Icon name={stat.icon as any} className="h-10 w-10 text-cyan-600" />
                <dd className="mt-4 text-4xl font-bold tracking-tight text-gray-900">{stat.value}</dd>
                <dt className="mt-1 text-base leading-7 text-gray-600">{stat.name}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};
