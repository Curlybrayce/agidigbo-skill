import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, Info } from 'lucide-react';

const ProgramSection = () => {
  const [activeZone, setActiveZone] = useState(null);
  const [activeStream, setActiveStream] = useState(null);

//   const zones = [
//     { id: 1, name: "North Central", states: "Benue, Kogi, Kwara, Nasarawa, Niger, Plateau, FCT" },
//     { id: 2, name: "North East", states: "Adamawa, Bauchi, Borno, Gombe, Taraba, Yobe" },
//     { id: 3, name: "North West", states: "Kaduna, Katsina, Kano, Kebbi, Sokoto, Jigawa, Zamfara" },
//     { id: 4, name: "South East", states: "Abia, Anambra, Ebonyi, Enugu, Imo" },
//     { id: 5, name: "South South", states: "Akwa Ibom, Bayelsa, Cross River, Delta, Edo, Rivers" },
//     { id: 6, name: "South West", states: "Ekiti, Lagos, Ogun, Ondo, Osun, Oyo" }
//   ];

const zones = [
    { id: 1, name: "Ibadan Zone", areas: "Ibadan North, Ibadan North-East, Ibadan North-West, Ibadan South-East, Ibadan South-West, Ido, Akinyele, Egbeda, Lagelu, Ona-Ara" },
    { id: 2, name: "Ogbomoso Zone", areas: "Ogbomoso North, Ogbomoso South, Oriire, Ogo-Oluwa, Surulere" },
    { id: 3, name: "Oyo Zone", areas: "Oyo East, Oyo West, Atiba, Afijio" },
    { id: 4, name: "Ibarapa Zone", areas: "Ibarapa Central, Ibarapa East, Ibarapa North" },
    { id: 5, name: "Oke-Ogun Zone I", areas: "Iseyin, Itesiwaju, Kajola, Iwajowa" },
    { id: 6, name: "Oke-Ogun Zone II", areas: "Saki East, Saki West, Atisbo" },
    { id: 7, name: "Ogbomoso Rural Zone", areas: "Ogo-Oluwa, Surulere (Rural Areas)" }
  ];
  

  const streams = [
    {
      id: 1,
      name: "Stream One",
      duration: "4 months",
      capacity: "1,000 participants",
      focus: "Business & Entrepreneurship"
    },
    {
      id: 2,
      name: "Stream Two",
      duration: "4 months",
      capacity: "1,000 participants",
      focus: "Business & Entrepreneurship"
    },
    {
      id: 3,
      name: "Stream Three",
      duration: "4 months",
      capacity: "1,000 participants",
      focus: "Business & Entrepreneurship"
    }
  ];

  return (
    <div className="bg-white py-20" id='program'>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Program Structure & Coverage
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Our comprehensive training program spans across Oyo State's geopolitical zones, delivered in three focused streams to ensure maximum impact and accessibility.
          </p>
        </motion.div>

        {/* Streams Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {streams.map((stream) => (
            <motion.div
              key={stream.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStream(stream.id === activeStream ? null : stream.id)}
              className={`p-6 rounded-xl cursor-pointer transition-colors ${
                activeStream === stream.id 
                ? 'bg-blue-900 text-white' 
                : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <Calendar className={`h-8 w-8 mb-4 ${
                activeStream === stream.id ? 'text-yellow-500' : 'text-blue-900'
              }`} />
              <h3 className="text-xl font-semibold mb-2">{stream.name}</h3>
              <motion.div
                initial={false}
                animate={{ height: activeStream === stream.id ? 'auto' : 0 }}
                className="overflow-hidden"
              >
                <p className={`mb-2 ${activeStream === stream.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  Duration: {stream.duration}
                </p>
                <p className={`mb-2 ${activeStream === stream.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  Capacity: {stream.capacity}
                </p>
                <p className={`${activeStream === stream.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  Focus: {stream.focus}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Zones Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {zones.map((zone) => (
            <motion.div
              key={zone.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveZone(zone.id === activeZone ? null : zone.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                activeZone === zone.id 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-red-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <MapPin className={`h-6 w-6 ${
                  activeZone === zone.id ? 'text-red-500' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                  <motion.div
                    initial={false}
                    animate={{ height: activeZone === zone.id ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 mt-2">
                      Areas: {zone.areas}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-blue-900 rounded-xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Users className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="text-2xl font-bold">3,000+</h4>
              <p className="text-blue-100">Total Participants</p>
            </div>
            <div>
              <Calendar className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="text-2xl font-bold">3 Streams</h4>
              <p className="text-blue-100">Training Programs</p>
            </div>
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="text-2xl font-bold">7</h4>
              <p className="text-blue-100">Geopolitical Zones</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramSection;