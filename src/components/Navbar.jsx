import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Logo a la izquierda */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="\images\pixelnbranding.png" alt="Pixel & Branding" style={{ height: '40px' }} />
        </Link>
      </div>

      {/* Contenedor derecho: carrito, pedidos/admin, búsqueda y login/logout */}
      <div className="navbar-right">
        <div className="navbar-links">
          {user?.role === 'user' && <Link to="/perfil">👤 Mi perfil</Link>}

          {user?.role === 'user' && (
            <>
              <Link to="/cart" aria-label="Carrito" className="cart-icon-link">
                <FiShoppingCart />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
              <Link to="/dashboard">📦 Mis pedidos</Link>
            </>
          )}
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>

        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
