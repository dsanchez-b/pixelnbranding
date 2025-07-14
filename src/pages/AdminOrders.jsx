import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './AdminOrders.css';

function AdminOrders() {
  const { orders, setOrders, user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <p>Acceso denegado. Solo administradores.</p>;
  }

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  // Función para exportar pedidos a CSV
  const exportCSV = () => {
    if (orders.length === 0) return alert('No hay pedidos para exportar.');

    const headers = ['ID', 'Usuario', 'Fecha', 'Total', 'Estado', 'Items'];
    const rows = orders.map(order => [
      order.id,
      order.userEmail,
      order.date,
      order.total.toFixed(2),
      order.status,
      order.items.map(i => `${i.name} x${i.quantity}`).join('; '),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows]
        .map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pedidos_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="admin-orders-container">
      <h2>Administración de Pedidos</h2>

      <button className="export-button" onClick={exportCSV}>
        Exportar pedidos CSV
      </button>

      {orders.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="admin-order">
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Usuario:</strong> {order.userEmail}</p>
            <p><strong>Fecha:</strong> {order.date}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Estado:</strong></p>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="enviado">Enviado</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;
