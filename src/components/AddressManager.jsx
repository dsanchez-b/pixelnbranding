import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function AddressManager() {
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress
  } = useContext(UserContext);

  const [addressForm, setAddressForm] = useState({ id: null, label: '', street: '', city: '', state: '', zip: '' });
  const [editingAddressId, setEditingAddressId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      updateAddress(addressForm);
      setEditingAddressId(null);
    } else {
      addAddress(addressForm);
    }
    setAddressForm({ id: null, label: '', street: '', city: '', state: '', zip: '' });
  };

  const handleEdit = (addr) => {
    setAddressForm(addr);
    setEditingAddressId(addr.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar esta dirección?')) {
      deleteAddress(id);
      if (editingAddressId === id) {
        setEditingAddressId(null);
        setAddressForm({ id: null, label: '', street: '', city: '', state: '', zip: '' });
      }
    }
  };

  return (
    <section className="addresses-section">
      <h3>Direcciones</h3>
      <form onSubmit={handleSubmit} className="address-form">
        <input
          name="label"
          placeholder="Etiqueta (Ej: Casa, Oficina)"
          value={addressForm.label}
          onChange={handleChange}
          required
        />
        <input
          name="street"
          placeholder="Calle y número"
          value={addressForm.street}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="Ciudad"
          value={addressForm.city}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="Estado / Provincia"
          value={addressForm.state}
          onChange={handleChange}
        />
        <input
          name="zip"
          placeholder="Código postal"
          value={addressForm.zip}
          onChange={handleChange}
        />
        <button type="submit">{editingAddressId ? 'Actualizar Dirección' : 'Agregar Dirección'}</button>
        {editingAddressId && (
          <button
            type="button"
            onClick={() => {
              setEditingAddressId(null);
              setAddressForm({ id: null, label: '', street: '', city: '', state: '', zip: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <ul className="address-list">
        {addresses.map(addr => (
          <li key={addr.id}>
            <strong>{addr.label}</strong>: {addr.street}, {addr.city} {addr.state} {addr.zip}
            <button onClick={() => handleEdit(addr)}>Editar</button>
            <button onClick={() => handleDelete(addr.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AddressManager;
