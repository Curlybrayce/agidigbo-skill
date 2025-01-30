import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Loader2
} from 'lucide-react';

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:mt-[80px] px-4">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto"
          >
            Have questions about our training program in Oyo State? We're here to help!
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactCard 
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                info="+234 xxx xxxx xxx"
                subInfo="Mon-Fri 9am-5pm"
              />
              <ContactCard 
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                info="info@training.org"
                subInfo="24/7 Support"
              />
              <ContactCard 
                icon={<MapPin className="w-6 h-6" />}
                title="Office"
                info="Dugbe, Ibadan"
                subInfo="Oyo State, Nigeria"
              />
              <ContactCard 
                icon={<Clock className="w-6 h-6" />}
                title="Hours"
                info="Mon-Fri 9am-5pm"
                subInfo="Sat 10am-2pm"
              />
            </div>

            {/* Map or Location Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Training Centers</h3>
              <div className="space-y-4">
                <LocationInfo 
                  city="Ibadan"
                  address="Tech Hub, Dugbe, Ibadan"
                  phone="+234 xxx xxxx xxx"
                />
                <LocationInfo 
                  city="Ogbomoso"
                  address="Digital Center, Takie, Ogbomoso"
                  phone="+234 xxx xxxx xxx"
                />
                <LocationInfo 
                  city="Oyo"
                  address="Skills Center, Awe Road, Oyo"
                  phone="+234 xxx xxxx xxx"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <FormInput
                  label="Subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center space-x-2
                    ${formStatus === 'success' 
                      ? 'bg-green-500' 
                      : 'bg-blue-600 hover:bg-blue-700'} 
                    transition-colors`}
                >
                  {formStatus === 'sending' && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                  {formStatus === 'success' && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {formStatus === 'idle' && (
                    <Send className="w-5 h-5" />
                  )}
                  <span>
                    {formStatus === 'sending' ? 'Sending...' :
                     formStatus === 'success' ? 'Sent Successfully!' :
                     'Send Message'}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FAQCard 
              question="How can I apply for the training program?"
              answer="You can apply through our online application portal or visit any of our training centers in Ibadan, Ogbomoso, or Oyo."
            />
            <FAQCard 
              question="What are the training hours?"
              answer="Training sessions run from Monday to Friday, 9am to 5pm. We also have weekend sessions available."
            />
            <FAQCard 
              question="Is the program free?"
              answer="Yes, the program is fully funded and free for selected participants from Oyo State."
            />
            <FAQCard 
              question="How long is the training program?"
              answer="The program runs for 12 weeks, with both theoretical and practical sessions."
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, info, subInfo }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start space-x-4">
      <div className="bg-blue-100 rounded-lg p-3">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{info}</p>
        <p className="text-sm text-gray-500">{subInfo}</p>
      </div>
    </div>
  </div>
);

const LocationInfo = ({ city, address, phone }) => (
  <div className="border-l-4 border-blue-500 pl-4">
    <h4 className="font-semibold text-gray-900">{city}</h4>
    <p className="text-gray-600 text-sm">{address}</p>
    <p className="text-gray-500 text-sm">{phone}</p>
  </div>
);

const FormInput = ({ label, name, type, required, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

const FAQCard = ({ question, answer }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </motion.div>
);

export default ContactPage;