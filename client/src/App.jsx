import { useState } from 'react'
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import ApplicationForm from './pages/ApplicationForm';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Homepage />
          </>
          } 
        />
        <Route path="/register" element={
          <>
            <Navbar />
            <ApplicationForm />
          </>
          } 
        />
        <Route path="/about" element={
          <>
            <Navbar />
          </>
          } 
        />
        <Route path="/contact" element={
          <>
            <Navbar />
          </>
          } 
        />

        </Routes>
      </Router>      
    </>
  );
};

export default App
