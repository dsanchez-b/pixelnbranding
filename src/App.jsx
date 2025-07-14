// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Forbidden from './pages/Forbidden';
import Checkout from './pages/Checkout';
import RoleRoute from './components/RoleRoute';
import CategoryProducts from './pages/CategoryProducts';
import Profile from './pages/Profile'; // ✅ Usa solo este
import Cart from './pages/Cart';

import { UserProvider } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';

function App() {
  return (
    <UserProvider>
      <PaymentProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:categoryName" element={<CategoryProducts />} />
          <Route path="/categoria/:slug" element={<Home />} />
          <Route path="/cart" element={<Cart />} />


          {/* ✅ Perfil correcto */}
          <Route
            path="/perfil"
            element={
              <RoleRoute allowedRoles={['user', 'admin']}>
                <Profile />
              </RoleRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RoleRoute allowedRoles={['admin', 'user']}>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminPanel />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminPanel />
              </RoleRoute>
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route
            path="/checkout"
            element={
              <RoleRoute allowedRoles={['admin', 'user']}>
                <Checkout />
              </RoleRoute>
            }
          />
          <Route path="*" element={<div style={{ padding: 20 }}><h2>Página no encontrada</h2></div>} />
        </Routes>
      </PaymentProvider>
    </UserProvider>
  );
}

export default App;
