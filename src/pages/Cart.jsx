import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal
  } = useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                {item.name} - ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </div>
              <div className="item-actions">
                <button
                  className="decrease"
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <button className="increase" onClick={() => increaseQuantity(item.id)}>+</button>
                <button className="remove" onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}

          <div className="cart-total">Total: ${getTotal().toFixed(2)}</div>

          <button
            onClick={handleCheckout}
            className="checkout-button"
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Continuar con la compra
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
