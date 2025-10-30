import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Catalogo from './pages/Catalogo';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
