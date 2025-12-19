import Product from '../models/Product.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Public (should be admin only in production)
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock } = req.body

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public (should be admin only in production)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (product) {
            product.name = req.body.name || product.name
            product.description = req.body.description || product.description
            product.price = req.body.price || product.price
            product.image = req.body.image || product.image
            product.category = req.body.category || product.category
            product.stock = req.body.stock !== undefined ? req.body.stock : product.stock

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public (should be admin only in production)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (product) {
            await product.deleteOne()
            res.json({ message: 'Product removed' })
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
