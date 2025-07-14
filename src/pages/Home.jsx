// src/pages/Home.jsx
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import ProductCarousel from "../components/ProductCarousel";
import { FaThList, FaTh, FaArrowLeft } from "react-icons/fa";
import categories from "../data/categories";
import "./Home.css";

function Home() {
  const { addToCart } = useContext(CartContext);
  const { products = [], searchTerm = "" } = useContext(ProductContext);

  const [selectedColors, setSelectedColors] = useState({});
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("viewMode") || "grid");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const toggleView = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleColorChange = (productId, color) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: color,
    }));
  };

  const getColorImage = (product) => {
    const colors = product.colors || {};
    const color = selectedColors[product.id] || Object.keys(colors)[0];
    return colors[color] || product.image || "/images/Tazas/Taza_Amarilla.png";
  };

  // Filtrar productos por búsqueda (free search)
const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (!selectedCategory || product.category === selectedCategory)
);


  // Condiciones para mostrar categorías o productos
  const shouldShowCategories = !searchTerm && !selectedCategory;
  const shouldShowProducts = searchTerm || selectedCategory;

  return (
    <div className="home-container">
      <ProductCarousel />

      {shouldShowCategories && (
        <>
          <h2>Categorías</h2>
          <div className="category-grid">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="category-card"
                onClick={() => setSelectedCategory(cat.slug)}

              >
                <img
                  src={cat.image || "/images/categorias/default.jpg"}
                  alt={cat.name}
                  className="category-image"
                />
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </>
      )}

      {shouldShowProducts && (
        <>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="back-button" style={{ marginRight: "1rem" }}>
                <FaArrowLeft /> Volver a categorías
              </button>
            )}
            <h2 style={{ margin: 0 }}>
              {searchTerm
                ? `Resultados de búsqueda para "${searchTerm}"`
                : `Productos de ${selectedCategory}`}
            </h2>
          </div>

          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <button onClick={toggleView} className="toggle-view-button">
              {viewMode === "grid" ? <FaThList /> : <FaTh />} Vista: {viewMode === "grid" ? "Cuadrícula" : "Lista"}
            </button>
          </div>

          <ul className={`product-list ${viewMode}`}>
            {filteredProducts.length === 0 ? (
              <li>No se encontraron productos</li>
            ) : (
              filteredProducts.map((product) => {
                const colors = product.colors || {};
                const colorOptions = Object.keys(colors);
                const selectedColor = selectedColors[product.id] || colorOptions[0] || "";

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
                              className={`color-button ${selectedColor === color ? "selected" : ""}`}
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
              })
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
