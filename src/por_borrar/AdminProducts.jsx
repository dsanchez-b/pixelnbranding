import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import './AdminProducts.css';

function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...form,
      price: parseFloat(form.price),
      id: editingId || Date.now(),
      colors: {} // podrías permitir editar esto en una sección avanzada
    };

    if (editingId) {
      updateProduct(product);
    } else {
      addProduct(product);
    }

    setForm({
      name: '',
      price: '',
      image: '',
      category: '',
      description: ''
    });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || '',
      description: product.description || ''
    });
    setEditingId(product.id);
  };

  return (
    <div className="admin-products">
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="URL de Imagen" value={form.image} onChange={handleChange} />
        <input name="category" placeholder="Categoría (ej. tazas)" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <div className="admin-products-list">
        {products.map((product) => (
          <div key={product.id} className="admin-product-card">
            <img src={product.image} alt={product.name} className="admin-product-img" />
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
            <small>{product.category}</small>
            <p>{product.description}</p>
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
