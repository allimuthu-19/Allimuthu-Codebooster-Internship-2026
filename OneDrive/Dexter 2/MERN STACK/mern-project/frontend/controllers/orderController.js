import Order from '../models/Order.js'
import Product from '../models/Product.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' })
        }

        // Verify stock and calculate total (optional security step)
        for (const item of items) {
            const product = await Product.findById(item.product || item._id) // Handle both product ID formats
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.name}` })
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` })
            }
        }

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        })

        if (order) {
            // Update stock
            for (const item of items) {
                const product = await Product.findById(item.product || item._id)
                if (product) {
                    product.stock = product.stock - item.quantity
                    await product.save()
                }
            }
            res.status(201).json(order)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if (order) {
            // Check if order belongs to user
            if (order.user._id.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to view this order' })
            }
            res.json(order)
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (should be admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.status = req.body.status || order.status
            const updatedOrder = await order.save()
            res.json(updatedOrder)
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
