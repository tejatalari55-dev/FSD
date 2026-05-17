import { useState, useEffect } from 'react'
import FakeStoreProducts from './FakeStoreProducts'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [notification, setNotification] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        showNotification(`Updated ${product.title} quantity!`)
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      showNotification(`Added ${product.title} to cart!`)
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app-container">
      {/* 1. Promotional Top Bar */}
      <div className="promo-bar">
        <p>✨ Summer Sale: Get 20% off on all electronics! Use code: <strong>FAKE20</strong></p>
      </div>

      {notification && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✨</span>
            <p>{notification}</p>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="nav-logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="logo-icon">F</div>
            <span>FakeStore</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Shop</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about" className="nav-special">About Us</a></li>
          </ul>
          <div className="nav-actions">
            <button className="search-trigger">🔍</button>
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <div className="header-title">
                <h2>Shopping Bag</h2>
                <span className="item-count">{cartCount} items</span>
              </div>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon">🛍️</div>
                <h3>Your bag is empty</h3>
                <p>Looks like you haven't added anything yet.</p>
                <button className="cta-button" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cart-item-info">
                        <h4>{item.title}</h4>
                        <div className="price-row">
                          <span className="unit-price">${item.price.toFixed(2)}</span>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row shipping">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="summary-row total">
                    <span>Estimated Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>
                    Go to Checkout
                  </button>
                  <p className="footer-note">Secure checkout powered by FakePay</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <header className="hero-section" id="home">
        <div className="hero-bg-accent"></div>
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-tag">
              <span className="dot"></span>
              Live Your Best Life
            </div>
            <h1>The Future of <span className="highlight">Shopping</span> is Here.</h1>
            <p>Curated collections from world-class brands. Experience the seamless fusion of style, quality, and technology.</p>
            <div className="hero-btns">
              <a href="#products" className="cta-button">Explore Shop</a>
              <a href="#featured" className="secondary-button">Watch Film</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>20k+</strong>
                <span>Customers</span>
              </div>
              <div className="stat">
                <strong>500+</strong>
                <span>Brands</span>
              </div>
            </div>
          </div>
          <div className="hero-image-wrapper">
             <div className="image-card card-1">✨ Premium</div>
             <div className="image-card card-2">🔥 Hot Deal</div>
             <img src={heroImg} alt="Hero" className="hero-main-img" />
             <div className="hero-img-blob"></div>
          </div>
        </div>
      </header>

      <main className="container">
        <FakeStoreProducts onAddToCart={addToCart} />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="logo-icon white">F</div>
                <span>FakeStore</span>
              </div>
              <p>Redefining the digital marketplace with curated excellence since 2026.</p>
              <div className="social-links">
                <span>IG</span> <span>TW</span> <span>FB</span> <span>LI</span>
              </div>
            </div>
            <div className="footer-nav">
              <h4>Shop</h4>
              <ul>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Jewelry</a></li>
                <li><a href="#">Men's Clothing</a></li>
                <li><a href="#">Women's Clothing</a></li>
              </ul>
            </div>
            <div className="footer-nav">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Order Status</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Stay in the loop</h4>
              <p>Get the latest updates on new arrivals and sales.</p>
              <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 FakeStore. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
