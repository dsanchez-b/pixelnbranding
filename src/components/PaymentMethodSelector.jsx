// src/components/PaymentMethodSelector.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function PaymentMethodSelector({ selectedId, onSelect }) {
  const { paymentMethods } = useContext(UserContext);

  if (paymentMethods.length === 0) return <p>No tienes métodos de pago guardados. Por favor, agrégalos en tu perfil.</p>;

  return (
    <div className="payment-method-selector">
      <h3>Método de Pago</h3>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.id}>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedId === method.id}
                onChange={() => onSelect(method.id)}
              />
              {method.cardHolder} - **** **** **** {method.cardNumber.slice(-4)} - Expira {method.expirationDate}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
