import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Transform Your Home</h1>
          <p className="text-xl mb-8">Discover beautiful decor pieces that make your house a home</p>
          <Link to="/products" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block">
            Shop Now
          </Link>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛋️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Furniture</h3>
              <p className="text-gray-600">Modern and comfortable furniture pieces</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lighting</h3>
              <p className="text-gray-600">Beautiful lamps and light fixtures</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wall Art</h3>
              <p className="text-gray-600">Stunning artwork for your walls</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home