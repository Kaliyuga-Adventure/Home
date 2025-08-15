
import React from 'react';
import { Icon } from './Icon';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative h-[70vh] sm:h-[60vh] min-h-[450px] bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')" }}>
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
      
      {/* Decorative background letter */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 sm:translate-x-0 sm:left-8 text-white/10 font-serif select-none pointer-events-none text-[25rem] sm:text-[30rem] md:text-[35rem] leading-none z-10" 
        aria-hidden="true"
      >
        K
      </div>
      
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center sm:items-start sm:text-left z-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter text-white mb-4 max-w-2xl text-shadow">
          Discover Your<br />Next Great Adventure
        </h1>
        <p className="text-lg md:text-xl font-light text-white mb-8 max-w-xl text-shadow-sm">
          Unforgettable journeys to the world's most breathtaking destinations.
        </p>
        <button 
          onClick={onExplore}
          className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
        >
          <span>Explore Tours</span>
          <Icon name="arrowRight" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
