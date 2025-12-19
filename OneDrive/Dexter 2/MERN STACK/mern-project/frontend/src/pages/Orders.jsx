import { useState, useEffect } from 'react'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            const response = await axios.get('http://localhost:5000/api/orders/myorders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setOrders(response.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
            if (error.response?.status === 401) {
                alert('Please login to view your orders')
            }
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-purple-100 text-purple-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    if (loading) {
        return (
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Loading orders...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">You haven't placed any orders yet</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-lg shadow-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Order #{order._id.slice(-8)}</h3>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-semibold mb-3">Items:</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total:</span>
                                    <span className="text-2xl font-bold text-purple-600">₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>

                                {order.shippingAddress && (
                                    <div className="border-t mt-4 pt-4">
                                        <h4 className="font-semibold mb-2">Shipping Address:</h4>
                                        <p className="text-gray-600">
                                            {order.shippingAddress.street && `${order.shippingAddress.street}, `}
                                            {order.shippingAddress.city && `${order.shippingAddress.city}, `}
                                            {order.shippingAddress.state && `${order.shippingAddress.state} `}
                                            {order.shippingAddress.zipCode}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
