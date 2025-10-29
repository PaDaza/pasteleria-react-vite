import { useState } from 'react';
import './App.css';

import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacto' element={<Contacto />} />
          
          
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
