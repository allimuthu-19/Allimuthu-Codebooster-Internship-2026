import mongoose from 'mongoose'
import Product from './models/Product.js'

mongoose.connect('mongodb://localhost:27017/homedecor')

const seedProducts = async () => {
  await Product.deleteMany({})

  const products = [
    { name: 'Modern Table Lamp', price: 7499, image: 'src/images/lamp.jpg', category: 'Lighting', description: 'Elegant modern table lamp with adjustable brightness', stock: 15 },
    { name: 'Velvet Throw Pillow', price: 3799, image: 'src/images/pillows.jpeg', category: 'Textiles', description: 'Luxurious velvet throw pillow in multiple colors', stock: 30 },
    { name: 'Abstract Canvas Print', price: 9999, image: 'src/images/canvas.webp', category: 'Wall Art', description: 'Contemporary abstract canvas wall art', stock: 12 },
    { name: 'Modern Ceramic Vase', price: 7499, image: 'src/images/vase.webp', category: 'Decor', description: 'Handcrafted ceramic vase with modern design', stock: 20 },
    { name: 'Woven Storage Basket', price: 4599, image: 'src/images/Basket.webp', category: 'Storage', description: 'Natural woven storage basket for organization', stock: 25 },
    { name: 'Scented Candle Set', price: 2299, image: '/src/images/Candle.jpg', category: 'Decor', description: 'Set of 3 aromatherapy scented candles', stock: 40 },
    { name: 'Wool Area Rug', price: 24999, image: '/src/images/Rug.webp', category: 'Textiles', description: 'Premium wool area rug with geometric pattern', stock: 8 },
    { name: 'Pendant Light Fixture', price: 12199, image: '/src/images/Pendant.webp', category: 'Lighting', description: 'Industrial style pendant light fixture', stock: 10 },
    { name: 'Decorative Mirror', price: 7999, image: 'src/images/Mirror.webp', category: 'Wall Art', description: 'Round decorative mirror with brass frame', stock: 18 },
    { name: 'Artificial Plant', price: 2899, image: 'src/images/Plant.webp', category: 'Decor', description: 'Realistic artificial plant in ceramic pot', stock: 35 }
  ]

  await Product.insertMany(products)
  console.log('Products seeded successfully')
  process.exit()
}

seedProducts()