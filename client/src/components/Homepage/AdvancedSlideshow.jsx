import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const handworkSlides = [
  {
    id: 1,
    image: "/ag.jpeg",
    title: "Agriculture",
    participants: 1200,
    duration: "3 months"
  },
  {
    id: 2,
    image: "/tailoring.jpeg",
    title: "Tailoring",
    participants: 800,
    duration: "4 months"
  },
  {
    id: 3,
    image: "/carpentry.jpeg",
    title: "Carpentry",
    participants: 600,
    duration: "6 months"
  },
  {
    id: 4,
    image: "/welding.jpeg",
    title: "Welding",
    participants: 400,
    duration: "5 months"
  }
];

const AdvancedSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % handworkSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % handworkSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + handworkSlides.length) % handworkSlides.length);
    setIsAutoPlaying(false);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStart(null);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div 
        className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {handworkSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-900/20 z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
              
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{slide.participants} Participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{slide.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-30 transition-transform hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-30 transition-transform hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {handworkSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 
                ${index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'bg-white/50 hover:bg-white/75'}`}
            />
          ))}
        </div>

        {/* Stats Card */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-lg shadow-xl z-30">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-900 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-bold text-blue-900">3,000+</h3>
              <p className="text-sm md:text-base text-gray-600">Total Participants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSlideshow;