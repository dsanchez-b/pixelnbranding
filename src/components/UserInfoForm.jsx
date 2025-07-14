import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function UserInfoForm() {
  const { userData, updateUserData } = useContext(UserContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(form);
    alert('Datos actualizados');
  };

  return (
    <section className="user-data-section">
      <h3>Datos Personales</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <input name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Teléfono" value={form.phone} onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
    </section>
  );
}

export default UserInfoForm;
