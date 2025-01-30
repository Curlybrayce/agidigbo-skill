import { useState } from 'react'
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import ApplicationForm from './pages/ApplicationForm';
import Footer from './components/shared/Footer';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Homepage />
            <Footer />
          </>
          } 
        />
        <Route path="/register" element={
          <>
            <Navbar />
            <ApplicationForm />
            <Footer />
          </>
          } 
        />
        <Route path="/about" element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
          } 
        />
        <Route path="/contact" element={
          <>
            <Navbar />
            <ContactPage />
            <Footer />
          </>
          } 
        />

        </Routes>
      </Router>      
    </>
  );
};

export default App
