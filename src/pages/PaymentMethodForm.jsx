import React, { useState, useEffect } from "react";

const initialFormState = {
  cardHolder: "",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  billingAddress: "",
};

export default function PaymentMethodForm({ onSubmit, editingMethod, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (editingMethod) {
      setFormData(editingMethod);
    } else {
      setFormData(initialFormState);
    }
  }, [editingMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !formData.cardHolder.trim() ||
      !formData.cardNumber.trim() ||
      !formData.expirationDate.trim() ||
      !formData.cvv.trim()
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    // Aquí podrías agregar más validación (número tarjeta, fecha, etc)

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <label>
        Nombre en la tarjeta*
        <input
          name="cardHolder"
          type="text"
          value={formData.cardHolder}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Número de tarjeta*
        <input
          name="cardNumber"
          type="text"
          value={formData.cardNumber}
          onChange={handleChange}
          maxLength={16}
          required
          placeholder="Ej. 1234 5678 9012 3456"
        />
      </label>

      <label>
        Fecha de expiración* (MM/AA)
        <input
          name="expirationDate"
          type="text"
          value={formData.expirationDate}
          onChange={handleChange}
          placeholder="MM/AA"
          maxLength={5}
          required
        />
      </label>

      <label>
        CVV*
        <input
          name="cvv"
          type="password"
          value={formData.cvv}
          onChange={handleChange}
          maxLength={4}
          required
          placeholder="123"
        />
      </label>

      <label>
        Dirección de facturación
        <textarea
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          placeholder="Opcional"
        />
      </label>

      <div className="form-buttons">
        <button type="submit">{editingMethod ? "Actualizar" : "Agregar"} Método</button>
        {editingMethod && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
