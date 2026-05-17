import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FakeStoreProducts.css';


function FakeStoreProducts({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);
        setProducts(prodRes.data);
        setFilteredProducts(prodRes.data);
        setCategories(catRes.data);
        setTimeout(() => setLoading(false), 800); // Slight delay for skeleton effect
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  // Skeleton Loader Component
  const Skeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-text short"></div>
        <div className="skeleton-text long"></div>
        <div className="skeleton-footer">
          <div className="skeleton-text small"></div>
          <div className="skeleton-btn"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="products-section" id="products">
      <div className="products-header">
        <h2 className="section-title">New Arrivals</h2>
        <div className="filters-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search our collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filters" id="categories">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''} 
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {loading ? (
          Array(8).fill(0).map((_, i) => <Skeleton key={i} />)
        ) : filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found matching your search.</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div 
              className="product-card" 
              key={product.id}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="product-image-container" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.title} loading="lazy" />
                <div className="card-badge">New</div>
                <button className="wishlist-btn">♥</button>
                <div className="image-overlay">
                  <span>Quick View</span>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title" onClick={() => setSelectedProduct(product)}>{product.title}</h3>
                <div className="product-rating">
                  {'★'.repeat(Math.round(product.rating.rate))}
                  <span className="rate-value">{product.rating.rate}</span>
                  <span className="count">({product.rating.count})</span>
                </div>
                <div className="product-footer">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>&times;</button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>
              <div className="modal-details">
                <span className="modal-category">{selectedProduct.category}</span>
                <h2>{selectedProduct.title}</h2>
                <div className="modal-price-row">
                  <p className="modal-price">${selectedProduct.price.toFixed(2)}</p>
                  <div className="modal-rating">
                    <span className="stars">{'★'.repeat(Math.round(selectedProduct.rating.rate))}</span>
                    <span className="rate-text">{selectedProduct.rating.rate} / 5</span>
                  </div>
                </div>
                <div className="modal-description">
                  <h3>About this product</h3>
                  <p>{selectedProduct.description}</p>
                </div>
                <div className="modal-actions">
                  <button className="modal-add-btn" onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}>
                    Add to Bag
                  </button>
                  <button className="modal-wishlist">Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FakeStoreProducts;
