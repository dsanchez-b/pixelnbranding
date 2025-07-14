import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // Asegúrate de tener un archivo CSS para estilos

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromAddToCart = params.get('fromAddToCart');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/'); // O donde quieras redirigir después del login
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };
  
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Iniciar sesión</h2>
      {fromAddToCart && (
       <div className="login-info">
         Debes iniciar sesión o registrarte para agregar productos al carrito.
    </div>

      )}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>

    
  );
}

export default Login;
