// src/context/ProductContext.jsx
import React, { createContext, useState, useEffect } from "react";
import initialProducts from "../data/products";

export const ProductContext = createContext();

const LOCAL_STORAGE_KEY = "pixelandbranding_products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
  });

  const [searchTerm, setSearchTerm] = useState(''); // ✅ Agregado

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        searchTerm,       // ✅ Asegúrate de incluirlo en el value
        setSearchTerm,    // ✅ También incluir la función
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
