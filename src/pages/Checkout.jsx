import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import UserInfoForm from '../components/UserInfoForm';
import AddressSelector from '../components/AddressSelector';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(AuthContext);
  const {
    userData,
    updateUserData,
    paymentMethods,
    addresses
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [editingUserInfo, setEditingUserInfo] = useState(false);

  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  const handleConfirmPurchase = () => {
    if (!userData.name || !userData.email || !userData.phone) {
      alert('Completa tus datos personales antes de continuar.');
      return;
    }

    if (!selectedAddress) {
      alert('Por favor, selecciona una dirección de envío.');
      return;
    }

    if (!selectedPaymentMethodId) {
      alert('Por favor, selecciona un método de pago.');
      return;
    }

    addOrder({
      items: cart,
      shippingInfo: selectedAddress,
      paymentMethodId: selectedPaymentMethodId,
      userInfo: userData,
      date: new Date().toISOString(),
    });

    clearCart();
    navigate('/dashboard');
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar compra</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="checkout-columns">
          {/* Columna izquierda: resumen de compra */}
          <div className="checkout-left">
            <h3>Resumen del pedido</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity} = ${item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p className="checkout-total">Total: ${getTotal().toFixed(2)}</p>
          </div>

          {/* Columna derecha: datos del usuario, envío y pago */}
          <div className="checkout-right">
            <div className="user-info-block">
              <h3>Datos del Usuario</h3>
              {!editingUserInfo && userData.name && userData.email && userData.phone ? (
                <>
                  <p><strong>Nombre:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Teléfono:</strong> {userData.phone}</p>
                  <button onClick={() => setEditingUserInfo(true)}>Editar mis datos</button>
                </>
              ) : (
                <UserInfoForm userData={userData} updateUserData={(newData) => {
                  updateUserData(newData);
                  setEditingUserInfo(false);
                }} />
              )}
            </div>

            <div className="shipping-info-block">
              <h3>Dirección de envío</h3>
              <AddressSelector
                addresses={addresses}
                selectedId={selectedAddressId}
                onSelect={setSelectedAddressId}
              />
            </div>

            <div className="payment-method-block">
              
              <PaymentMethodSelector
                selectedId={selectedPaymentMethodId}
                onSelect={setSelectedPaymentMethodId}
                methods={paymentMethods}
              />
            </div>

            <button onClick={handleConfirmPurchase}>Confirmar compra</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
