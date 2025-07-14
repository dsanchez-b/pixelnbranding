// src/pages/CategoryProducts.jsx
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import "./home.css";
import "./CategoryProducts.css";

function CategoryProducts() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { products = [] } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const [selectedColors, setSelectedColors] = useState({});
  const [filterColor, setFilterColor] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

const categoryProducts = products.filter((product) => {
  return (product.categorySlug || "").toLowerCase() === categoryName.toLowerCase();
});



  const allColors = Array.from(
    new Set(
      categoryProducts.flatMap((product) => Object.keys(product.colors || {}))
    )
  );

  const handleColorChange = (productId, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  const getColorImage = (product) => {
    const colors = product.colors || {};
    const color = selectedColors[product.id] || Object.keys(colors)[0];
    return colors[color] || product.image || "";
  };

  const STORAGE_KEY = `filters_${categoryName}`;

  const clearFilters = () => {
    setFilterColor(null);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setSortOrder("asc");
    localStorage.removeItem(STORAGE_KEY);
  };

  const filteredProducts = categoryProducts
    .filter((product) => {
      const colorMatch =
        !filterColor || Object.keys(product.colors || {}).includes(filterColor);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return colorMatch && priceMatch && nameMatch;
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div className="category-products-container">
      <div className="header-row">
        <button onClick={() => navigate("/")} className="back-button">
          ← Volver a categorías
        </button>
        <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
      </div>

      {/* Filtros */}
      <div className="filter-section">
        <strong>Buscar por nombre:</strong>
        <input
          type="text"
          value={searchTerm}
          placeholder="Buscar producto..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <strong>Filtrar por color:</strong>
        {allColors.map((color) => (
          <button
            key={color}
            className={`color-filter-button ${filterColor === color ? "selected" : ""}`}
            onClick={() => setFilterColor(filterColor === color ? null : color)}
          >
            {color}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={clearFilters} className="clear-filters-button">
          Limpiar filtros
        </button>
      </div>

      <div className="filter-section">
        <strong>Rango de precio:</strong>
        <div className="price-range">
          <label>
            Mín:
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              min={0}
            />
          </label>
          <label>
            Máx:
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              min={0}
            />
          </label>
        </div>
      </div>

      <div className="filter-section">
        <strong>Ordenar por precio:</strong>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>

      {/* Productos */}
      {filteredProducts.length === 0 ? (
        <p>No hay productos que coincidan con los filtros.</p>
      ) : (
        <ul className="product-list grid">
          {filteredProducts.map((product) => {
            const colors = product.colors || {};
            const colorOptions = Object.keys(colors);
            const selectedColor =
              selectedColors[product.id] || colorOptions[0] || "";

            return (
              <li key={product.id} className="product-card">
                <img
                  src={getColorImage(product)}
                  alt={`${product.name} - ${selectedColor}`}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>

                  {colorOptions.length > 0 && (
                    <div className="color-options">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorChange(product.id, color)}
                          className={`color-button ${
                            selectedColor === color ? "selected" : ""
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        selectedColor: selectedColor,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CategoryProducts;
