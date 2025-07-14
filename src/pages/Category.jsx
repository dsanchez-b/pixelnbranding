// src/pages/Category.jsx
import React from "react";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import "./Home.css"; // usa tu estilo global

const categories = [
  { slug: "tazas", name: "Tazas", image: "/images/categorias/tazas.jpg" },
  { slug: "camisetas", name: "Camisetas", image: "/images/categorias/camisetas.png" },
  { slug: "termos", name: "Termos", image: "/images/categorias/termos.jpg" },
];

function Category() {
  return (
    <div className="home-container">
      <ProductCarousel />
      <h2>Categorías</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link to={`/${cat.slug}`} key={cat.slug} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-image" />
            <h3>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
