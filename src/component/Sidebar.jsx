import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    setLoadingProducts(true);
    fetch('http://localhost:8000/api/products/')  // Your API URL
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoadingProducts(false);
      });
  }, []);

  return (
    <aside style={{ width: 280, padding: 20, borderRight: '1px solid #ddd' }}>
      <section>
        <h2>Profile</h2>
        {/* Clicking this redirects to /profile */}
        <Link to="/profile" style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>
          <p><strong>{user?.username}</strong></p>
          <p>{user?.email}</p>
          <button>Go to Profile</button>
        </Link>
      </section>

      <hr />

      <section>
        <h2>Products</h2>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          <ul style={{ maxHeight: 300, overflowY: 'auto', paddingLeft: 10 }}>
            {products.length > 0 ? (
              products.map(product => (
                <li key={product.id}>
                  <strong>{product.name}</strong><br />
                  <small>{product.description}</small>
                </li>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </ul>
        )}
      </section>

      <hr />

      <section>
        <h2>Other</h2>
        <p>Additional sidebar items here</p>
      </section>
    </aside>
  );
};

export default Sidebar;
