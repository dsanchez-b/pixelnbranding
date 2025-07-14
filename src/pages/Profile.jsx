// src/pages/Profile.jsx
import React from 'react';
import UserInfoForm from '../components/UserInfoForm';
import AddressManager from '../components/AddressManager';
import PaymentMethodManager from '../components/PaymentMethodManager';
import './Profile.css';

function UserProfile() {
  return (
    <div className="user-profile-container">
      <h2>Mi Perfil</h2>
      <UserInfoForm />
      <AddressManager />
      <PaymentMethodManager />
    </div>
  );
}

export default UserProfile;
