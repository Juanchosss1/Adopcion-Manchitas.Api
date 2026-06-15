// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PantallaAuth from './components/PantallaAuth';
import ListadoPerros from './components/ListadoPerros';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-light min-vh-100">
        <Routes>
          <Route path="/" element={<PantallaAuth />} />
          <Route path="/perros" element={<ListadoPerros />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;