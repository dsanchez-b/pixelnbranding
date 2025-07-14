// src/components/PaymentMethodsAdmin.jsx
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export default function PaymentMethodsAdmin() {
  const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } = useContext(UserContext);
  const [editingMethod, setEditingMethod] = useState(null);
  const [form, setForm] = useState({
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (editingMethod) {
      setForm({
        cardHolder: editingMethod.cardHolder,
        cardNumber: editingMethod.cardNumber,
        expirationDate: editingMethod.expirationDate,
        cvv: editingMethod.cvv,
      });
    } else {
      setForm({ cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
    }
  }, [editingMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cardHolder || !form.cardNumber || !form.expirationDate || !form.cvv) {
      alert('Completa todos los campos');
      return;
    }
    if (editingMethod) {
      updatePaymentMethod({ ...editingMethod, ...form });
      setEditingMethod(null);
    } else {
      addPaymentMethod(form);
    }
    setForm({ cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
  };

  return (
    <div>
      <h3>Gestión de Métodos de Pago</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="cardHolder"
          placeholder="Nombre en la tarjeta"
          value={form.cardHolder}
          onChange={handleChange}
        />
        <input
          name="cardNumber"
          placeholder="Número de tarjeta"
          value={form.cardNumber}
          onChange={handleChange}
          maxLength={16}
        />
        <input
          name="expirationDate"
          placeholder="Fecha expiración (MM/AA)"
          value={form.expirationDate}
          onChange={handleChange}
          maxLength={5}
        />
        <input
          name="cvv"
          placeholder="CVV"
          value={form.cvv}
          onChange={handleChange}
          maxLength={4}
        />
        <button type="submit">{editingMethod ? 'Actualizar' : 'Agregar'} Método</button>
        {editingMethod && <button type="button" onClick={() => setEditingMethod(null)}>Cancelar</button>}
      </form>

      {paymentMethods.length === 0 ? (
        <p>No hay métodos de pago registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Número</th>
              <th>Expiración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method) => (
              <tr key={method.id}>
                <td>{method.cardHolder}</td>
                <td>**** **** **** {method.cardNumber.slice(-4)}</td>
                <td>{method.expirationDate}</td>
                <td>
                  <button onClick={() => setEditingMethod(method)}>Editar</button>
                  <button onClick={() => deletePaymentMethod(method.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
