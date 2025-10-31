/*import './App.css';*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Catalogo from './pages/Catalogo';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Formulario from './pages/Formulario';
import PerfilUsusario from './pages/PerfilUsuario';
import ListaProductos from './pages/ListaProductos';
import Productos from './pages/Producto';
import Contador from './pages/contador';
import Carrito from "./pages/Carrito";


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
        <Route path='/formulario' element= {<Formulario/>}/>
        <Route path='/producto' element={<Productos/>}/>
        <Route path='/perfil/:nombreUsuario' element={<PerfilUsusario/>}/>
        <Route path='/contador' element={<Contador/>}/>
        <Route path="/carrito" element={<Carrito />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
