// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navegacion from './Navegacion';

const Layout = () => {
  return (
    <>
      <Navegacion />
      
      <main>
        <Outlet /> 
      </main>
    </>
  );
};

export default Layout;