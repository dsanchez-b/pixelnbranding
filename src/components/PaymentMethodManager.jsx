import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function PaymentMethodManager() {
  const {
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
  } = useContext(UserContext);

  const [paymentForm, setPaymentForm] = useState({
    id: null,
    cardHolder: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updatePaymentMethod(paymentForm);
      setEditingId(null);
    } else {
      addPaymentMethod(paymentForm);
    }
    setPaymentForm({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
  };

  const handleEdit = (method) => {
    setPaymentForm(method);
    setEditingId(method.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este método de pago?')) {
      deletePaymentMethod(id);
      if (editingId === id) {
        setEditingId(null);
        setPaymentForm({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
      }
    }
  };

  return (
    <section className="payments-section">
      <h3>Métodos de Pago</h3>
      <form onSubmit={handleSubmit} className="payment-form">
        <input name="cardHolder" placeholder="Nombre en la tarjeta" value={paymentForm.cardHolder} onChange={handleChange} required />
        <input name="cardNumber" placeholder="Número de tarjeta" maxLength={16} value={paymentForm.cardNumber} onChange={handleChange} required />
        <input name="expirationDate" placeholder="Expiración (MM/AA)" maxLength={5} value={paymentForm.expirationDate} onChange={handleChange} required />
        <input name="cvv" placeholder="CVV" maxLength={4} value={paymentForm.cvv} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setPaymentForm({ id: null, cardHolder: '', cardNumber: '', expirationDate: '', cvv: '' });
          }}>
            Cancelar
          </button>
        )}
      </form>

      <ul className="payment-list">
        {paymentMethods.map(method => (
          <li key={method.id}>
            {method.cardHolder} - **** {method.cardNumber.slice(-4)} - Exp: {method.expirationDate}
            <button onClick={() => handleEdit(method)}>Editar</button>
            <button onClick={() => handleDelete(method.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PaymentMethodManager;
