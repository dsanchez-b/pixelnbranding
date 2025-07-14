import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import './AdminPanel.css';

function AdminPanel() {
  const [section, setSection] = useState('products');
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const { orders, setOrders } = useContext(AuthContext);

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    colors: []
  });

  const [newColor, setNewColor] = useState({ name: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [orderSortConfig, setOrderSortConfig] = useState({ key: 'date', direction: 'desc' });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        description: editingProduct.description || '',
        category: editingProduct.category || '',
        image: editingProduct.image || '',
        colors: editingProduct.colors ? Object.entries(editingProduct.colors).map(([name, image]) => ({ name, image })) : []
      });
      setImagePreview(editingProduct.image || '');
      setImageFile(null);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];

        if (sortConfig.key === 'price') {
          aKey = Number(aKey);
          bKey = Number(bKey);
        } else {
          aKey = aKey ? aKey.toString().toLowerCase() : '';
          bKey = bKey ? bKey.toString().toLowerCase() : '';
        }

        if (aKey < bKey) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aKey > bKey) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (orderSortConfig !== null) {
      sortableOrders.sort((a, b) => {
        let aKey = a[orderSortConfig.key];
        let bKey = b[orderSortConfig.key];

        if (orderSortConfig.key === 'total') {
          aKey = Number(aKey);
          bKey = Number(bKey);
        } else {
          aKey = aKey ? aKey.toString().toLowerCase() : '';
          bKey = bKey ? bKey.toString().toLowerCase() : '';
        }

        if (aKey < bKey) return orderSortConfig.direction === 'asc' ? -1 : 1;
        if (aKey > bKey) return orderSortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, orderSortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const requestOrderSort = (key) => {
    let direction = 'asc';
    if (orderSortConfig.key === key && orderSortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setOrderSortConfig({ key, direction });
  };

  const getClassNamesFor = (name, type = 'product') => {
    const config = type === 'product' ? sortConfig : orderSortConfig;
    if (!config) return;
    return config.key === name ? (config.direction === 'asc' ? 'sort-asc' : 'sort-desc') : undefined;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      image: '',
      colors: []
    });
    setNewColor({ name: '', image: '' });
    setImageFile(null);
    setImagePreview('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddColor = () => {
    if (newColor.name.trim() && newColor.image.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, { ...newColor }]
      }));
      setNewColor({ name: '', image: '' });
    }
  };

  const handleRemoveColor = (nameToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c.name !== nameToRemove)
    }));
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const priceNum = parseFloat(formData.price);
    if (!formData.name || isNaN(priceNum) || priceNum <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }

    const productData = {
      ...formData,
      price: priceNum,
      colors: formData.colors.reduce((acc, curr) => {
        acc[curr.name] = curr.image;
        return acc;
      }, {})
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }

    resetForm();
  };

  const handleChangeOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="admin-panel-container">
      <aside className="admin-sidebar">
        <nav>
          <ul>
            <li>
              <button
                className={section === 'products' ? 'active' : ''}
                onClick={() => setSection('products')}
              >
                Productos
              </button>
            </li>
            <li>
              <button
                className={section === 'orders' ? 'active' : ''}
                onClick={() => setSection('orders')}
              >
                Pedidos
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="admin-content">
     {section === 'products' && (
  <>
    <h2>Gestión de Productos</h2>

    <form onSubmit={handleProductSubmit} className="product-form">
      <input
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={formData.price}
        onChange={handleInputChange}
      />
      <input
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleInputChange}
      />
      <input
        name="category"
        placeholder="Categoría"
        value={formData.category}
        onChange={handleInputChange}
      />

      <div>
        <label>Imagen principal:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            marginTop: 10,
            borderRadius: 6
          }}
        />
      )}

      <div className="color-management">
        <h4>Colores:</h4>
        {formData.colors.length === 0 && <p>No hay colores añadidos.</p>}
        <div className="color-preview-list">
          {formData.colors.map(color => (
            <div key={color.name} className="color-preview-item">
              <img
                src={color.image}
                alt={color.name}
                className="color-circle"
                title={color.name}
              />
              <span>{color.name}</span>
              <button type="button" onClick={() => handleRemoveColor(color.name)}>✖</button>
            </div>
          ))}
        </div>

        <input
          placeholder="Color (ej: rojo)"
          value={newColor.name}
          onChange={e => setNewColor({ ...newColor, name: e.target.value })}
        />
        <input
          placeholder="URL imagen del color"
          value={newColor.image}
          onChange={e => setNewColor({ ...newColor, image: e.target.value })}
        />
        <button type="button" onClick={handleAddColor}>Agregar Color</button>
      </div>

      <button type="submit">
        {editingProduct ? 'Actualizar' : 'Agregar'} Producto
      </button>
      {editingProduct && (
        <button type="button" onClick={() => setEditingProduct(null)}>
          Cancelar
        </button>
      )}
    </form>

    {products.length === 0 ? (
      <p>No hay productos.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
              style={{ cursor: 'pointer' }}
            >
              Nombre
            </th>
            <th
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price')}
              style={{ cursor: 'pointer' }}
            >
              Precio
            </th>
            <th
              onClick={() => requestSort('category')}
              className={getClassNamesFor('category')}
              style={{ cursor: 'pointer' }}
            >
              Categoría
            </th>
            <th>Colores</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(p => (
            <tr key={p.id}>
              <td>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: 6
                  }}
                />
              </td>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.category}</td>
              <td>
                {p.colors &&
                  Object.entries(p.colors).map(([color, url]) => (
                    <img
                      key={color}
                      src={url}
                      alt={color}
                      title={color}
                      style={{
                        width: 25,
                        height: 25,
                        objectFit: 'cover',
                        marginRight: 4,
                        borderRadius: '50%'
                      }}
                    />
                  ))}
              </td>
              <td>
                <button onClick={() => setEditingProduct(p)}>Editar</button>
                <button onClick={() => deleteProduct(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
)}

        {section === 'orders' && (
          <>
            <h2>Gestión de Pedidos</h2>
            {orders.length === 0 ? (
              <p>No hay pedidos.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => requestOrderSort('id')}
                      className={getClassNamesFor('id', 'order')}
                      style={{ cursor: 'pointer' }}
                    >
                      ID Pedido
                    </th>
                    <th
                      onClick={() => requestOrderSort('userEmail')}
                      className={getClassNamesFor('userEmail', 'order')}
                      style={{ cursor: 'pointer' }}
                    >
                      Usuario
                    </th>
                    <th
                      onClick={() => requestOrderSort('date')}
                      className={getClassNamesFor('date', 'order')}
                      style={{ cursor: 'pointer' }}
                    >
                      Fecha
                    </th>
                    <th
                      onClick={() => requestOrderSort('total')}
                      className={getClassNamesFor('total', 'order')}
                      style={{ cursor: 'pointer' }}
                    >
                      Total
                    </th>
                    <th
                      onClick={() => requestOrderSort('status')}
                      className={getClassNamesFor('status', 'order')}
                      style={{ cursor: 'pointer' }}
                    >
                      Estado
                    </th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map(o => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.userEmail}</td>
                      <td>{o.date}</td>
                      <td>${o.total.toFixed(2)}</td>
                      <td>{o.status}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={e => handleChangeOrderStatus(o.id, e.target.value)}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
