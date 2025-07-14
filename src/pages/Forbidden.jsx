import React from 'react';
import { Link } from 'react-router-dom';
import './Forbidden.css';

function Forbidden() {
  return (
    <div className="forbidden-container">
      <h1>403 - Acceso Denegado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/">Regresar al inicio</Link>
    </div>
  );
}

export default Forbidden;
