import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Datos del usuario (nombre, email, teléfono)
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '555-1234',
  });

  // Direcciones (array con id único)
  const [addresses, setAddresses] = useState([
    {
      id: uuidv4(),
      label: 'Casa',
      street: 'Av. Siempre Viva 742',
      city: 'Springfield',
      state: 'SP',
      zip: '12345',
    }
    , {
      id: uuidv4(),
      label: 'Oficina',
      street: 'Calle Falsa 123',
      city: 'Springfield',
      state: 'SP',
      zip: '54321',
    }
  ]);

  // Métodos de pago (array con id único)
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: uuidv4(),
      cardHolder: 'Juan Pérez',
      cardNumber: '1234123412341234',
      expirationDate: '12/25',
      cvv: '123',
    },
    {
      id: uuidv4(),
      cardHolder: 'Ana Gómez',
      cardNumber: '4321432143214321',
      expirationDate: '11/24',
      cvv: '456',
    } 

  ]);

  // Actualizar datos personales
  const updateUserData = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  // Funciones para direcciones
  const addAddress = (address) => {
    setAddresses(prev => [...prev, { ...address, id: uuidv4() }]);
  };

  const updateAddress = (address) => {
    setAddresses(prev =>
      prev.map(a => (a.id === address.id ? { ...a, ...address } : a))
    );
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  // Funciones para métodos de pago
  const addPaymentMethod = (method) => {
    setPaymentMethods(prev => [...prev, { ...method, id: uuidv4() }]);
  };

  const updatePaymentMethod = (method) => {
    setPaymentMethods(prev =>
      prev.map(m => (m.id === method.id ? { ...m, ...method } : m))
    );
  };

  const deletePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
