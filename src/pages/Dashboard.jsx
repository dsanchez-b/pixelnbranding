import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PaymentMethodManager from '../components/PaymentMethodManager';
import './Dashboard.css';

function Dashboard() {
  const { user, orders } = useContext(AuthContext);
  const userOrders = orders.filter(order => order.userEmail === user?.email);

  const exportToCSV = () => {
    const headers = ['ID', 'Fecha', 'Total', 'Estado', 'Productos'];
    const rows = userOrders.map(order => [
      order.id,
      order.date,
      `$${order.total.toFixed(2)}`,
      order.status,
      order.items.map(i => `${i.name} × ${i.quantity}`).join(', ')
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'mis_pedidos.csv';
    link.click();
  };

  return (
    <div className="dashboard-container">
      <h2>Bienvenido, {user?.email}</h2>
      <h3>Mis pedidos</h3>

      {userOrders.length === 0 ? (
        <p>No has realizado ningún pedido aún.</p>
      ) : (
        <div className="dashboard-orders">
          <button onClick={exportToCSV} className="dashboard-export-button">
            Exportar pedidos
          </button>
          {userOrders.map((order) => (
            <div className="dashboard-order" key={order.id}>
              <p><strong>Fecha:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <p><strong>Productos:</strong></p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              {order.paymentMethod && (
                <p>
                  <strong>Método de pago:</strong> {order.paymentMethod.cardHolder} (****{order.paymentMethod.cardNumber.slice(-4)})
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* <div className="dashboard-section">
        <h2>Mi Cuenta</h2>
        <PaymentMethodManager />
      </div> */}
    </div>
  );
}

export default Dashboard;
