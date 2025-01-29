import React from 'react';
import { 
  Users, 
  GraduationCap, 
  MapPin, 
  ChevronRight,
  Calendar,
  Target
} from 'lucide-react';
import HeroSection from '../components/Homepage/HeroSection';
import ProgramSection from '../components/Homepage/ProgramSection';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="relative bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Communities Through Education
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Join our nationwide training program reaching 3,000 individuals across Nigeria's seven geopolitical zones
            </p>
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors flex items-center mx-auto">
              Apply Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section> */}

      <HeroSection />
      <ProgramSection />


      {/* Program Details Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
            Program Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <GraduationCap className="h-12 w-12 text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-black">Comprehensive Training</h3>
              <p className="text-gray-600">
                Expert-led sessions covering essential skills and knowledge for community development
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Calendar className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-black">Flexible Schedule</h3>
              <p className="text-gray-600">
                Three streams of 1,000 participants each, allowing for focused and effective learning
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <MapPin className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-black">Nationwide Reach</h3>
              <p className="text-gray-600">
                Training centers across all seven geopolitical zones for easy accessibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join our transformative training program and be part of the change in your community
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors">
              Apply Now
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;