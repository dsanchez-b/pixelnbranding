import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import PaymentMethodForm from "./PaymentMethodForm";
import "./PaymentMethods.css";

export default function PaymentMethods() {
  const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } = useContext(UserContext);

  const [editingMethod, setEditingMethod] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setEditingMethod(null);
    setShowForm(true);
  };

  const handleSubmit = (methodData) => {
    if (editingMethod) {
      updatePaymentMethod({ ...editingMethod, ...methodData });
    } else {
      addPaymentMethod(methodData);
    }
    setShowForm(false);
    setEditingMethod(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMethod(null);
  };

  return (
    <div className="payment-methods-container">
      <h2>Métodos de Pago</h2>

      {!showForm && (
        <>
          <button onClick={handleAddClick} className="add-method-button">
            + Agregar Método de Pago
          </button>

          {paymentMethods.length === 0 ? (
            <p>No tienes métodos de pago guardados.</p>
          ) : (
            <table className="payment-methods-table">
              <thead>
                <tr>
                  <th>Nombre en la tarjeta</th>
                  <th>Número</th>
                  <th>Expiración</th>
                  <th>Dirección de facturación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paymentMethods.map((method) => (
                  <tr key={method.id}>
                    <td>{method.cardHolder}</td>
                    <td>**** **** **** {method.cardNumber.slice(-4)}</td>
                    <td>{method.expirationDate}</td>
                    <td>{method.billingAddress || "-"}</td>
                    <td>
                      <button onClick={() => { setEditingMethod(method); setShowForm(true); }}>
                        Editar
                      </button>
                      <button onClick={() => deletePaymentMethod(method.id)} style={{marginLeft: "8px", color:"red"}}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {showForm && (
        <PaymentMethodForm
          editingMethod={editingMethod}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
