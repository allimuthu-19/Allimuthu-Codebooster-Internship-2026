import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [user, setUser] = useState(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id))
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleSignup = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place an order')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        shippingAddress: {
          street: '123 Main St',
          city: 'Sample City',
          state: 'CA',
          zipCode: '12345',
          country: 'USA'
        }
      }

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      alert(`Order placed successfully! Total: ₹${total.toFixed(2)}`)
      setCart([])
      setShowCart(false)
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to place order: ' + (error.response?.data?.message || 'Server error'))
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link to="/" className="text-2xl font-bold text-purple-600">🏠 HomeDecor</Link>

              <div className="flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
                <Link to="/products" className="text-gray-700 hover:text-purple-600 font-medium">Products</Link>
                <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">Contact</Link>
                {user && (
                  <Link to="/orders" className="text-gray-700 hover:text-purple-600 font-medium">My Orders</Link>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-gray-700">Hi, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-purple-600 font-medium"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => setShowCart(!showCart)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors relative"
                    >
                      🛒 Cart ({cartCount})
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium">Login</Link>
                    <Link to="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>

          {showCart && (
            <div className="w-80 bg-white shadow-xl p-6 h-screen overflow-y-auto fixed right-0 top-16 z-40">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Shopping Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item._id} className="flex justify-between items-center py-3 border-b">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">₹{item.price.toLocaleString('en-IN')} x {item.quantity}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-xl font-bold mb-4">Total: ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <footer className="bg-gray-800 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">🏠 HomeDecor</h3>
                <p className="text-gray-300">Transform your space with our curated collection of beautiful home decor items.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><Link to="/" className="hover:text-white">Home</Link></li>
                  <li><Link to="/products" className="hover:text-white">Products</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Lighting</li>
                  <li>Wall Art</li>
                  <li>Textiles</li>
                  <li>Storage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <span className="text-2xl cursor-pointer hover:text-purple-400">📘</span>
                  <span className="text-2xl cursor-pointer hover:text-purple-400">📷</span>
                  <span className="text-2xl cursor-pointer hover:text-purple-400">🐦</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 HomeDecor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App