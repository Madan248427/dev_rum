// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = '/products/';
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '1em' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '150px', height: 'auto', display: 'block' }}
              />
              <strong>{product.name}</strong> - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
