// src/components/Registro.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiUrl = import.meta.env.VITE_API_URL;

const Registro = ({ cambiarVista }) => {
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', first_name: '', last_name: '', telefono: '', direccion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}/usuarios/`, formData);
      
      Swal.fire({
        title: '¡Cuenta creada!',
        text: 'Tu registro fue exitoso. Ya puedes iniciar sesión.',
        icon: 'success',
        confirmButtonColor: '#198754'
      }).then(() => {
        cambiarVista();
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error al registrar',
        text: 'Revisa los datos ingresados. Es posible que el usuario ya exista.',
        icon: 'error',
        confirmButtonColor: '#c80000'
      });
    }
  };

  return (
    <form className="login100-form validate-form" onSubmit={handleSubmit} style={{ paddingTop: '80px', paddingBottom: '40px' }}>
      <span className="login100-form-title" style={{ paddingBottom: '34px' }}>
        Crear Cuenta
      </span>

      <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
        <div className="wrap-input100 rs1-wrap-input100 validate-input">
          <input className="input100" type="text" name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} required />
          <span className="focus-input100"></span>
        </div>
        <div className="wrap-input100 rs2-wrap-input100 validate-input">
          <input className="input100" type="text" name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} required />
          <span className="focus-input100"></span>
        </div>
      </div>

      <div className="wrap-input100 validate-input" style={{ marginBottom: '20px' }}>
        <input className="input100" type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
        <span className="focus-input100"></span>
      </div>

      <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
        <div className="wrap-input100 rs1-wrap-input100 validate-input">
          <input className="input100" type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
          <span className="focus-input100"></span>
        </div>
        <div className="wrap-input100 rs2-wrap-input100 validate-input">
          <input className="input100" type="password" name="password" placeholder="Contraseña" minLength={8} value={formData.password} onChange={handleChange} required />
          <span className="focus-input100"></span>
        </div>
      </div>

      <div style={{ display: 'flex', width: '100%', marginBottom: '30px' }}>
        <div className="wrap-input100 rs1-wrap-input100 validate-input">
          <input className="input100" type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
          <span className="focus-input100"></span>
        </div>
        <div className="wrap-input100 rs2-wrap-input100 validate-input">
          <input className="input100" type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
          <span className="focus-input100"></span>
        </div>
      </div>

      <div className="container-login100-form-btn">
        <button type="submit" className="login100-form-btn">
          Registrarme
        </button>
      </div>

      <div style={{ width: '100%', textAlign: 'center', paddingTop: '30px' }}>
        <button type="button" className="txt3" onClick={cambiarVista}>
          Volver al Login
        </button>
      </div>
    </form>
  );
};

export default Registro;