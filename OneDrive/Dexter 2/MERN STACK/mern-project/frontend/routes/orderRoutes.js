import express from 'express'
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus
} from '../controllers/orderController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/status').put(protect, updateOrderStatus)

export default router
