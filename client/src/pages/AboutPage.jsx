import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Users,
    Target,
    MapPin,
    Award,
    ChevronRight,
    CheckCircle,
    GraduationCap,
    PlayCircle,
    ArrowDown
} from 'lucide-react';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerChildren = {
    initial: { opacity: 0 },
    whileInView: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const AboutPage = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    const handleLearnMore = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };


    return (
        <div className="max-w-6xl mx-auto py-12 md:mt-[80px] px-4">
            {/* Hero Section with Ibadan cityscape background */}
            {/* <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative text-center mb-16 py-20 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700"
            >
                <div className="absolute inset-0 bg-opacity-60 bg-black" />
                <div className="relative z-10">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Transforming Oyo State's Future
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-100 max-w-3xl mx-auto"
                    >
                        Empowering 3,000 young talents across Oyo State with cutting-edge digital skills and career opportunities.
                    </motion.p>
                </div>
            </motion.section> */}

            <div className="relative min-h-screen w-full overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
                    <img
                        src="/api/placeholder/1920/1080"
                        alt="Placeholder for video"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    {/* Main Content */}
                    <div className="text-center max-w-4xl mx-auto space-y-8">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
                            Transforming Oyo State's Future
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                            Empowering 3,000 young talents across Oyo State with cutting-edge digital skills and career opportunities.
                        </p>

                        {/* Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleLearnMore}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full 
                         text-lg font-semibold transition-all duration-300 
                         flex items-center gap-2 transform hover:scale-105"
                            >
                                Learn More
                                <PlayCircle className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleScroll}
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 
                         text-white rounded-full text-lg font-semibold transition-all 
                         duration-300 flex items-center gap-2 transform hover:scale-105"
                            >
                                Discover Programs
                                <ArrowDown className="w-5 h-5 animate-bounce" />
                            </button>
                        </div>
                    </div>

                    {/* Floating Stats */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 
                      grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl px-4">
                        {[
                            { label: 'Digital Skills', value: '3,000+' },
                            { label: 'Career Opportunities', value: '1,000+' },
                            { label: 'Training Hours', value: '10,000+' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md p-6 rounded-xl 
                         text-white text-center transform hover:scale-105 
                         transition-all duration-300"
                            >
                                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                <div className="text-gray-200">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Alert */}
                    {showAlert && (
                        <div className="fixed top-4 right-4 p-4 rounded-lg shadow-lg bg-white/90 backdrop-blur-md w-auto max-w-md animate-slide-in z-500 md:mt-[80px] px-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-lg">Thanks for your interest!</h3>
                                <p className="text-gray-600">
                                    We'll be sharing more information about our programs soon.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mission & Vision with Oyo State context */}
            <motion.section
                variants={staggerChildren}
                initial="initial"
                whileInView="whileInView"
                className="grid md:grid-cols-2 gap-12 mb-20"
            >
                <motion.div
                    variants={fadeIn}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To elevate Oyo State's workforce by providing world-class handwork training programs to our youth. We focus on creating opportunities that bridge the local skills gap and promote economic growth across all the communities in Oyo State, from Ibadan to Ogbomoso and beyond.
                    </p>
                </motion.div>
                <motion.div
                    variants={fadeIn}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To empower the youth of Oyo State with practical handwork skills, fostering self-reliance and economic growth, while building a thriving, skilled workforce that drives sustainable development across all communities.
                    </p>
                </motion.div>
            </motion.section>

            {/* Key Statistics with local context */}
            <motion.section
                variants={staggerChildren}
                initial="initial"
                whileInView="whileInView"
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 mb-20"
            >
                <h2 className="text-3xl font-bold text-center mb-12">Our Local Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <motion.div variants={fadeIn}>
                        <StatCard
                            icon={<Users className="w-8 h-8 text-blue-600" />}
                            number="3,000+"
                            label="Oyo State Participants"
                        />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <StatCard
                            icon={<MapPin className="w-8 h-8 text-blue-600" />}
                            number="33"
                            label="Local Governments"
                        />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <StatCard
                            icon={<Target className="w-8 h-8 text-blue-600" />}
                            number="85%"
                            label="Local Employment Rate"
                        />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <StatCard
                            icon={<Award className="w-8 h-8 text-blue-600" />}
                            number="25+"
                            label="Oyo-based Partners"
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Training Hubs */}
            <motion.section
                variants={staggerChildren}
                initial="initial"
                whileInView="whileInView"
                className="mb-20"
            >
                <h2 className="text-3xl font-bold text-center mb-12">Training Locations</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div variants={fadeIn}>
                        <LocationCard
                            city="Ibadan"
                            address="Tech Hub, Dugbe"
                            capacity="1,500 participants"
                            features={["Main Training Center", "Innovation Lab", "Co-working Space"]}
                        />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <LocationCard
                            city="Ogbomoso"
                            address="Digital Center, Takie"
                            capacity="800 participants"
                            features={["Satellite Campus", "Research Center", "Startup Incubator"]}
                        />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <LocationCard
                            city="Oyo"
                            address="Skills Center, Awe Road"
                            capacity="700 participants"
                            features={["Training Facility", "Resource Center", "Meeting Spaces"]}
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Local Success Stories */}
            <motion.section
                variants={staggerChildren}
                initial="initial"
                whileInView="whileInView"
                className="mb-20"
            >
                <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <GraduationCap className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Adebayo Success Story</h3>
                                <p className="text-gray-600">
                                From Ibadan South-East, now a Master Craftsman in a leading artisanal workshop, earning 3x their previous income.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <GraduationCap className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Oyo Tech Startup</h3>
                                <p className="text-gray-600">
                                    A group of our graduates founded a successful tech startup in Oyo, creating jobs for local youth.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section with local context */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Build Your Future in Oyo State
                        </h2>
                        <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                            Join 3,000 young innovators shaping the digital future of Oyo State. Applications are now open for our next cohort.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            <Link to='/register'>
                                Apply Now
                            </Link>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

const StatCard = ({ icon, number, label }) => (
    <div className="text-center">
        <div className="flex justify-center mb-4">
            {icon}
        </div>
        <div className="text-2xl font-bold mb-2">{number}</div>
        <div className="text-gray-600">{label}</div>
    </div>
);

const LocationCard = ({ city, address, capacity, features }) => (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold mb-2">{city}</h3>
        <p className="text-gray-600 mb-2">{address}</p>
        <p className="text-blue-600 font-semibold mb-4">{capacity}</p>
        <ul className="space-y-3">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default AboutPage;