// src/components/AddressSelector.jsx
import React from 'react';

function AddressSelector({ addresses, selectedId, onSelect }) {
  if (!addresses || addresses.length === 0) {
    return <p>No tienes direcciones guardadas.</p>;
  }

  return (
    <div className="address-selector">
      <h4>Selecciona una dirección guardada</h4>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {addresses.map((addr) => (
          <li key={addr.id} style={{ marginBottom: '0.5rem' }}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="radio"
                name="selectedAddress"
                value={addr.id}
                checked={selectedId === addr.id}
                onChange={() => onSelect(addr.id)}
                style={{ marginRight: '0.5rem' }}
              />
              <strong>{addr.label}</strong>: {addr.street}, {addr.city}, {addr.state} {addr.zip}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressSelector;
