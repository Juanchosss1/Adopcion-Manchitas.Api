// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PantallaAuth from './components/PantallaAuth';
import Layout from './components/Layout'; // Importamos la nueva plantilla
import ListadoPerros from './components/ListadoPerros';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import PanelAdmin from './components/PanelAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Ruta PÚBLICA (Fuera del Layout, sin Navbar) */}
        <Route path="/" element={<PantallaAuth />} />

        {/* 2. Rutas INTERNAS (Envueltas en el Layout para que tengan Navbar) */}
        <Route element={<Layout />}>
          <Route path="/perros" element={<ListadoPerros />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin-panel" element={<PanelAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;