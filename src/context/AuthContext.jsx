import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const getRoleFromEmail = (email) =>
    email.endsWith('@pixelnbranding.com') ? 'admin' : 'user';

  const login = (email, password) => {
    if (email && password) {
      const role = getRoleFromEmail(email);
      setUser({ email, role });
      return true;
    }
    return false;
  };

  const register = (email, password, extraFields = {}) => {
    if (email && password) {
      const role = getRoleFromEmail(email);
      const newUser = { email, role, ...extraFields };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

const addOrder = ({ items, shippingInfo, paymentMethodId, userInfo, date }) => {
  if (!user) return;
  const order = {
    id: Date.now(),
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: date || new Date().toLocaleString(),
    userEmail: user.email,
    userInfo,
    shippingInfo,
    paymentMethodId,
    status: 'pendiente',
  };
  setOrders((prev) => [...prev, order]);
};


  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, orders, setOrders, addOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Aquí agregas el hook useAuth para usar el contexto cómodamente
export function useAuth() {
  return useContext(AuthContext);
}
