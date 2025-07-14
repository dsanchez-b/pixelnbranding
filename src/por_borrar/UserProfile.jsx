import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import PaymentMethodManager from '../components/PaymentMethodManager';
import './UserProfile.css'; // si tienes estilos personalizados

function UserProfile() {
  const { userData } = useContext(UserContext);

  return (
    <div className="user-profile-container">
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {userData.name}</p>
      <p><strong>Correo:</strong> {userData.email}</p>
      <p><strong>Teléfono:</strong> {userData.phone}</p>

      <hr />

      <PaymentMethodManager />
    </div>
  );
}

export default UserProfile;
