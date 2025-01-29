import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Calendar,
  MapPin,
  Star,
  Award
} from 'lucide-react';

const handworkSlides = [
  {
    id: 1,
    image: "/ag.jpeg",
    title: "Agriculture & Farming",
    subtitle: "Sustainable Farming Practices",
    participants: 1200,
    duration: "3 months",
    location: "Southern Region",
    startDate: "March 2025",
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    skills: ["Crop Management", "Irrigation", "Organic Farming"],
    certification: "Advanced Agriculture Certificate",
    highlightStats: {
      placementRate: "85%",
      avgSalary: "$45,000",
      companiesHiring: 24
    }
  },
  {
    id: 2,
    image: "/tailoring.jpeg",
    title: "Fashion & Tailoring",
    subtitle: "Professional Garment Design",
    participants: 800,
    duration: "4 months",
    location: "Eastern Region",
    startDate: "April 2025",
    rating: 4.9,
    instructor: "Prof. Michael Chen",
    skills: ["Pattern Making", "Machine Operation", "Fashion Design"],
    certification: "Professional Tailoring Certificate",
    highlightStats: {
      placementRate: "90%",
      avgSalary: "$42,000",
      companiesHiring: 18
    }
  },
  // Add more slides with similar detailed information
];

const AdvancedSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setSlideDirection('right');
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % handworkSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 750);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + handworkSlides.length) % handworkSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsTransitioning(false), 750);
  };

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
        className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Slides */}
        {handworkSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-750 ease-in-out
              ${index === currentSlide 
                ? 'opacity-100 transform translate-x-0' 
                : `opacity-0 transform ${
                    slideDirection === 'right' 
                      ? 'translate-x-full' 
                      : '-translate-x-full'
                  }`}`}
          >
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-900/20 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
            
            {/* Main Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-3000"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
              {/* Title and Subtitle with Slide-up Animation */}
              <div className={`transform transition-all duration-500 delay-100
                ${isTransitioning ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{slide.title}</h2>
                <p className="text-xl md:text-2xl text-white/90 mb-4">{slide.subtitle}</p>
              </div>

              {/* Info Grid with Fade-in Animation */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 transition-all duration-500 delay-200
                ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <InfoCard icon={<Users />} label="Participants" value={slide.participants} />
                <InfoCard icon={<Clock />} label="Duration" value={slide.duration} />
                <InfoCard icon={<MapPin />} label="Location" value={slide.location} />
                <InfoCard icon={<Star />} label="Rating" value={slide.rating} />
              </div>

              {/* Skills Tags with Stagger Animation */}
              <div className="flex flex-wrap gap-2 mb-4">
                {slide.skills.map((skill, idx) => (
                  <span
                    key={skill}
                    className={`bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm
                      transition-all duration-300 delay-${idx * 100}
                      ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Highlight Stats */}
              <div className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-500 delay-300
                ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="grid grid-cols-3 gap-4">
                  <StatItem 
                    label="Placement Rate" 
                    value={slide.highlightStats.placementRate} 
                    icon={<Award className="w-4 h-4" />}
                  />
                  <StatItem 
                    label="Avg. Salary" 
                    value={slide.highlightStats.avgSalary} 
                  />
                  <StatItem 
                    label="Companies Hiring" 
                    value={slide.highlightStats.companiesHiring} 
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <NavButton direction="left" onClick={prevSlide} />
        <NavButton direction="right" onClick={nextSlide} />

        {/* Progress Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {handworkSlides.map((_, index) => (
            <ProgressDot 
              key={index} 
              active={index === currentSlide}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-white">
    {icon}
    <div>
      <p className="text-sm opacity-75">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const StatItem = ({ label, value, icon }) => (
  <div className="text-center text-white">
    {icon && <div className="flex justify-center mb-1">{icon}</div>}
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs opacity-75">{label}</p>
  </div>
);

const NavButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 
      bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-30 
      transition-all duration-300 hover:scale-110 hover:bg-opacity-100`}
  >
    {direction === 'left' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
  </button>
);

const ProgressDot = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`transition-all duration-300 rounded-full
      ${active 
        ? 'w-8 h-2 bg-white' 
        : 'w-2 h-2 bg-white/50 hover:bg-white/75'}`}
  />
);

export default AdvancedSlideshow;