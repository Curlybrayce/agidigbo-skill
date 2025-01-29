import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedSlideshow from './AdvancedSlideshow';

const HeroSection = () => {
  return (
    <div className="bg-blue-900 min-h-[90vh] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-45 -right-96 -top-96 w-192 h-192 bg-red-500 rounded-full"></div>
        <div className="absolute -left-96 -bottom-96 w-192 h-192 bg-yellow-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-block px-4 py-2 bg-yellow-500 text-black rounded-full text-sm font-semibold mb-6">
              Now Accepting Applications
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Future With Our
              <span className="text-yellow-500"> Training Program</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Join 3,000 ambitious individuals across Oyo State's seven geopolitical zones in our comprehensive training program.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-3" />
                <span>Expert-led training sessions</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-3" />
                <span>Flexible learning schedule</span>
              </div>
              {/* <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-3" />
                <span>Nationwide program coverage</span>
              </div> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to='/register'>
                <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <button className="border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image */}
          {/* <div className="relative">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-900/20"></div>
              <img
                src="/ag.jpeg"
                alt="Training Program"
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-blue-900">3,000+</h3>
                    <p className="text-gray-600">Participants</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <AdvancedSlideshow />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;