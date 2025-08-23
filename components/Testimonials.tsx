
import React from 'react';
import type { Testimonial } from '../types';
import { Icon } from './Icon';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  if (testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }
  
  return (
    <div className="relative isolate bg-white pb-24 sm:pb-32">
       <div className="absolute inset-x-0 top-1/2 -z-10 h-3/4 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl" aria-hidden="true">
        <div 
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6]"
            style={{
                 clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
        />
       </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-cyan-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Travelers Say
            </p>
        </div>
        <div className="mx-auto mt-16 flow-root sm:mt-20">
            <div className="-mt-8 sm:-mx-4 sm:mt-0 sm:pl-4">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="break-inside-avoid pt-8">
                    <div className="h-full rounded-3xl bg-gray-50/80 p-8 backdrop-blur-sm ring-1 ring-gray-900/5">
                        <div className="flex items-center gap-x-4">
                            <img src={testimonial.avatarUrl} alt="" className="h-12 w-12 rounded-full bg-gray-50 object-cover" />
                            <div>
                                <div className="text-base font-semibold text-gray-900">{testimonial.name}</div>
                                <div className="text-sm leading-6 text-gray-600">{testimonial.location}</div>
                            </div>
                        </div>
                        <blockquote className="mt-6 text-gray-700">
                         <p>{`“${testimonial.text}”`}</p>
                        </blockquote>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};