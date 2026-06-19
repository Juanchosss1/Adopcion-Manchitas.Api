// src/components/PantallaAuth.jsx
import React, { useState } from 'react';
import Login from './Login';
import Registro from './Registro';
import './Login.css'; 
const PantallaAuth = () => {
  const [vista, setVista] = useState('login');

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          
          {vista === 'login' ? (
            <Login cambiarVista={() => setVista('registro')} />
          ) : (
            <Registro cambiarVista={() => setVista('login')} />
          )}

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