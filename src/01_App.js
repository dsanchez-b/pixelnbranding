import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
//import AdminOrders from './por_borrar/AdminOrders';
import AdminPanel from './pages/AdminPanel';
import CategoryProducts from './pages/CategoryProducts';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Navigate to="/admin-panel" replace />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        {/* <Route path="/admin-orders" element={<AdminOrders />} /> */}
        <Route path="/:categoryName" element={<CategoryProducts />} />


      </Routes>
    </>
  );
}

export default App;
