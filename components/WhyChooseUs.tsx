
import React from 'react';
import { Icon } from './Icon';

const features = [
  {
    name: 'Expert Local Guides',
    description: 'Our guides are passionate locals who bring you closer to the culture, history, and hidden gems of your destination.',
    icon: 'users',
  },
  {
    name: 'Tailor-Made Trips',
    description: 'Every journey is unique. We customize your itinerary to match your interests, pace, and travel style perfectly.',
    icon: 'adjustments',
  },
  {
    name: 'Authentic Experiences',
    description: 'We go beyond the tourist trail to offer genuine cultural immersion, from local workshops to home-cooked meals.',
    icon: 'sparkles',
  },
  {
    name: '24/7 On-Trip Support',
    description: 'Travel with peace of mind knowing our dedicated support team is available around the clock to assist you with anything.',
    icon: 'phone',
  },
  {
    name: 'Safety & Security',
    description: 'Your safety is our top priority. We partner with trusted providers and follow strict safety protocols on all our trips.',
    icon: 'shieldCheck',
  },
  {
    name: 'Transparent Pricing',
    description: 'No hidden fees, no surprises. We believe in clear, upfront pricing so you know exactly what you\'re paying for.',
    icon: 'tag',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-base font-semibold leading-7 text-cyan-600">Our Promise</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Travel With Kaliyuga Adventure?
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-gray-600">
            We're committed to providing more than just a vacation. We create experiences that are memorable, seamless, and deeply personal.
          </p>
        </div>

        <div className="mt-16">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
                    <Icon name={feature.icon as any} className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
