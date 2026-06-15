// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = ({ cambiarVista }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/`, {
        username: username,
        password: password
      });

      localStorage.setItem('token', response.data.token);
      
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonColor: '#00ad5f'
      }).then(() => {
        navigate('/perros'); 
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error de acceso',
        text: 'Credenciales incorrectas o problema de conexión.',
        icon: 'error',
        confirmButtonColor: '#c80000'
      });
    }
  };

  return (
    <form className="login100-form validate-form" onSubmit={handleSubmit}>
      <span className="login100-form-title" style={{ paddingBottom: '34px' }}>
        Iniciar Sesión
      </span>

      <div className="wrap-input100 validate-input" style={{ marginBottom: '20px' }}>
        <input 
          className="input100" 
          type="text" 
          name="username" 
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input" style={{ marginBottom: '20px' }}>
        <input 
          className="input100" 
          type="password" 
          name="pass" 
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <span className="focus-input100"></span>
      </div>

      <div className="container-login100-form-btn">
        <button type="submit" className="login100-form-btn">
          Ingresar
        </button>
      </div>

      <div style={{ width: '100%', textAlign: 'center', paddingTop: '27px', paddingBottom: '100px' }}>
         {/* Espaciador central */}
      </div>

      <div style={{ width: '100%', textAlign: 'center' }}>
        {/* Cambiamos el <a> por un <button> que llama a la función del padre */}
        <button type="button" className="txt3" onClick={cambiarVista}>
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default Login;