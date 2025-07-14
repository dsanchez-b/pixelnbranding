import React, { createContext, useState, useEffect } from "react";

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [paymentMethods, setPaymentMethods] = useState(() => {
    // Intentar cargar desde localStorage o iniciar vacío
    const saved = localStorage.getItem("paymentMethods");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cuando cambie paymentMethods
  useEffect(() => {
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  // Agregar método de pago
  const addPaymentMethod = (method) => {
    const newMethod = { ...method, id: Date.now().toString() }; // ID simple
    setPaymentMethods((prev) => [...prev, newMethod]);
  };

  // Editar método de pago por id
  const updatePaymentMethod = (id, updatedMethod) => {
    setPaymentMethods((prev) =>
      prev.map((method) => (method.id === id ? { ...method, ...updatedMethod } : method))
    );
  };

  // Eliminar método de pago por id
  const deletePaymentMethod = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentMethods,
        addPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
