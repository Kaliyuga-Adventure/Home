import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import type { SlideshowImage } from '../types';

interface HeroProps {
  onExplore: () => void;
  slides: SlideshowImage[];
}

export const Hero: React.FC<HeroProps> = ({ onExplore, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrev = () => {
    if (slides.length < 2) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    if (slides.length < 2) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  
  const heroContent = (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
        <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 sm:translate-x-0 sm:left-8 text-white/5 font-serif select-none pointer-events-none text-[25rem] sm:text-[30rem] md:text-[35rem] leading-none z-10" 
            aria-hidden="true"
        >
            K
        </div>
        
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
            <button 
                onClick={onExplore}
                className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                <span>Explore Tours</span>
                <Icon name="arrowRight" className="h-5 w-5" />
            </button>
        </div>
      </>
  );

  if (slides.length === 0) {
    return (
        <div className="relative h-[85vh] min-h-[600px] overflow-hidden group bg-gray-800">
            {heroContent}
        </div>
    );
  }

  return (
    <div className="relative h-[85vh] min-h-[600px] overflow-hidden group">
      {/* Slideshow Images */}
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {heroContent}
      
      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
            <button 
                onClick={goToPrev}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 hover:bg-black/50"
                aria-label="Previous slide"
            >
                <Icon name="arrowLeft" className="h-6 w-6" />
            </button>
            <button 
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 hover:bg-black/50"
                aria-label="Next slide"
            >
                <Icon name="arrowRight" className="h-6 w-6" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
                {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                ></button>
                ))}
            </div>
        </>
      )}
    </div>
  );
};
