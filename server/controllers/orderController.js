const { Order, OrderItem, Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const mongoose = require('mongoose');

class OrderController {
    async getOrdersByUser(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const userId = req.params.userId;

            const orders = await Order.find({ userId })
                .populate({
                    path: 'items',
                    populate: {
                        path: 'productId',
                        populate: { path: 'images', model: 'ProductImage' }
                    }
                })
                .skip(skip)
                .limit(parseInt(limit))
                .exec();

            const total = await Order.countDocuments({ userId });
            const totalPages = Math.ceil(total / limit);

            const orderData = orders.map(order => ({
                id: order._id,
                userId: order.userId,
                createdAt: order.createdAt,
                status: order.status,
                items: order.items.map(item => ({
                    id: item._id,
                    productId: item.productId._id,
                    productName: item.productId.name,
                    productPrice: item.productId.price,
                    productColors: item.productId.colors,
                    productImages: item.productId.images.map(img => img.url),
                    quantity: item.quantity,
                    size: item.size
                }))
            }));

            res.json({
                total,
                totalPages,
                currentPage: parseInt(page),
                orders: orderData,
            });
        } catch (error) {
            console.error('Ошибка при выборке заказов:', error);
            next(ApiError.internal('Ошибка при выборке заказов'));
        }
    }

    async addOrder(req, res, next) {
        try {
            const { userId, items } = req.body;

            let totalPrice = 0;
            const orderItems = [];

            for (const item of items) {
                const product = await Product.findById(item.productId).exec();
                if (!product) {
                    return next(ApiError.badRequest('Товар не найден'));
                }

                const orderItem = new OrderItem({
                    productId: product._id,
                    quantity: item.quantity,
                    size: item.size,
                    price: product.price
                });

                await orderItem.save();

                totalPrice += product.price * item.quantity;
                orderItems.push(orderItem._id);
            }

            const order = new Order({
                userId: mongoose.Types.ObjectId(userId),
                items: orderItems,
                total_price: totalPrice,
                status: 'Pending'
            });

            await order.save();

            res.status(201).json(order);
        } catch (error) {
            console.error('Ошибка при добавлении заказа:', error);
            next(ApiError.internal('Ошибка при добавлении заказа'));
        }
    }

    async updateOrderStatus() {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

            await Order.updateMany(
                { createdAt: { $lte: oneDayAgo }, status: 'Pending' },
                { $set: { status: 'Completed' } }
            );

            console.log('Статусы заказов обновлены');
        } catch (error) {
            console.error('Ошибка при обновлении статусов заказов:', error);
        }
    }
}

module.exports = new OrderController();
