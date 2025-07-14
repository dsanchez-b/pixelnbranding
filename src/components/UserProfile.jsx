// src/pages/Profile.jsx
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext'; // Asegúrate que existe y tiene los datos/funciones
//import './UserProfile.css';

function UserProfile() {
  const {
    userData,
    updateUserData,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  } = useContext(UserContext);

  // Estado para formulario datos personales
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Estados para formularios direcciones y métodos de pago
  const [addressForm, setAddressForm] = useState({ id: null, label: '', street: '', city: '', state: '', zip: '' });
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [paymentForm, setPaymentForm] = useState({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
  const [editingPaymentId, setEditingPaymentId] = useState(null);

  useEffect(() => {
    if (userData) {
      setUserForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
      });
    }
  }, [userData]);

  // Manejo de cambios en formularios
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressFormChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  // Guardar datos personales
  const handleUserSubmit = (e) => {
    e.preventDefault();
    updateUserData(userForm);
    alert('Datos personales actualizados');
  };

  // Direcciones: agregar o actualizar
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddress(addressForm);
      setEditingAddressId(null);
    } else {
      addAddress(addressForm);
    }
    setAddressForm({ id: null, label: '', street: '', city: '', state: '', zip: '' });
  };

  const handleEditAddress = (addr) => {
    setAddressForm(addr);
    setEditingAddressId(addr.id);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('¿Eliminar esta dirección?')) {
      deleteAddress(id);
      if (editingAddressId === id) {
        setEditingAddressId(null);
        setAddressForm({ id: null, label: '', street: '', city: '', state: '', zip: '' });
      }
    }
  };

  // Métodos de pago: agregar o actualizar
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (editingPaymentId) {
      updatePaymentMethod(paymentForm);
      setEditingPaymentId(null);
    } else {
      addPaymentMethod(paymentForm);
    }
    setPaymentForm({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
  };

  const handleEditPayment = (method) => {
    setPaymentForm(method);
    setEditingPaymentId(method.id);
  };

  const handleDeletePayment = (id) => {
    if (window.confirm('¿Eliminar este método de pago?')) {
      deletePaymentMethod(id);
      if (editingPaymentId === id) {
        setEditingPaymentId(null);
        setPaymentForm({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
      }
    }
  };

  return (
    <div className="user-profile-container">
      <h2>Mi Perfil</h2>

      <section className="user-data-section">
        <h3>Datos Personales</h3>
        <form onSubmit={handleUserSubmit} className="user-form">
          <input name="name" placeholder="Nombre completo" value={userForm.name} onChange={handleUserFormChange} required />
          <input name="email" type="email" placeholder="Email" value={userForm.email} onChange={handleUserFormChange} required />
          <input name="phone" type="tel" placeholder="Teléfono" value={userForm.phone} onChange={handleUserFormChange} />
          <button type="submit">Guardar Datos</button>
        </form>
      </section>

      <section className="addresses-section">
        <h3>Direcciones</h3>
        <form onSubmit={handleAddressSubmit} className="address-form">
          <input name="label" placeholder="Etiqueta (Ej: Casa, Oficina)" value={addressForm.label} onChange={handleAddressFormChange} required />
          <input name="street" placeholder="Calle y número" value={addressForm.street} onChange={handleAddressFormChange} required />
          <input name="city" placeholder="Ciudad" value={addressForm.city} onChange={handleAddressFormChange} required />
          <input name="state" placeholder="Estado / Provincia" value={addressForm.state} onChange={handleAddressFormChange} />
          <input name="zip" placeholder="Código postal" value={addressForm.zip} onChange={handleAddressFormChange} />
          <button type="submit">{editingAddressId ? 'Actualizar Dirección' : 'Agregar Dirección'}</button>
          {editingAddressId && <button type="button" onClick={() => {
            setEditingAddressId(null);
            setAddressForm({ id: null, label: '', street: '', city: '', state: '', zip: '' });
          }}>Cancelar</button>}
        </form>
        <ul className="address-list">
          {addresses.map(addr => (
            <li key={addr.id}>
              <strong>{addr.label}</strong>: {addr.street}, {addr.city} {addr.state} {addr.zip}
              <button onClick={() => handleEditAddress(addr)}>Editar</button>
              <button onClick={() => handleDeleteAddress(addr.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="payments-section">
        <h3>Métodos de Pago</h3>
        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <input name="cardHolder" placeholder="Nombre en la tarjeta" value={paymentForm.cardHolder} onChange={handlePaymentFormChange} required />
          <input name="cardNumber" placeholder="Número de tarjeta" maxLength={16} value={paymentForm.cardNumber} onChange={handlePaymentFormChange} required />
          <input name="expirationDate" placeholder="Fecha expiración (MM/AA)" maxLength={5} value={paymentForm.expirationDate} onChange={handlePaymentFormChange} required />
          <input name="cvv" placeholder="CVV" maxLength={4} value={paymentForm.cvv} onChange={handlePaymentFormChange} required />
          <button type="submit">{editingPaymentId ? 'Actualizar Método' : 'Agregar Método'}</button>
          {editingPaymentId && <button type="button" onClick={() => {
            setEditingPaymentId(null);
            setPaymentForm({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
          }}>Cancelar</button>}
        </form>
        <ul className="payment-list">
          {paymentMethods.map(method => (
            <li key={method.id}>
              {method.cardHolder} - **** **** **** {method.cardNumber.slice(-4)} - Exp: {method.expirationDate}
              <button onClick={() => handleEditPayment(method)}>Editar</button>
              <button onClick={() => handleDeletePayment(method.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default UserProfile;
