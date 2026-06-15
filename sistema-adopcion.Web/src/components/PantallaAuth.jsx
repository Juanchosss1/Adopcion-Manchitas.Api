// src/components/PantallaAuth.jsx
import React, { useState } from 'react';
import Login from './Login';
import Registro from './Registro';
import './Login.css'; // Importamos el CSS global del template aquí

const PantallaAuth = () => {
  // Estado para controlar qué formulario mostrar ('login' o 'registro')
  const [vista, setVista] = useState('login');

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          
          {/* Operador ternario: si la vista es 'login', mostramos el componente Login, sino el Registro */}
          {vista === 'login' ? (
            <Login cambiarVista={() => setVista('registro')} />
          ) : (
            <Registro cambiarVista={() => setVista('login')} />
          )}

          {/* La imagen de fondo se mantiene estática sin importar el formulario */}
          <div 
            className="login100-more" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800')" }}
          ></div>

        </div>
      </div>
    </div>
  );
};

export default PantallaAuth;