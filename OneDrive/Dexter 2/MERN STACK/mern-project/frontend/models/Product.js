import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        default: 'Beautiful home decor item'
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    category: {
        type: String,
        enum: ['Lighting', 'Wall Art', 'Textiles', 'Storage', 'Decor', 'Furniture'],
        default: 'Decor'
    },
    stock: {
        type: Number,
        default: 10,
        min: 0
    }
}, {
    timestamps: true
})

export default mongoose.model('Product', productSchema)
