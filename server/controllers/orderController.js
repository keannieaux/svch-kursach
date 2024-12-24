const { Order, OrderItem, Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class OrderController {
    async getOrdersByUser(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const orders = await Order.findAndCountAll({
                where: { userId: req.params.userId },
                include: [{ 
                    model: OrderItem,
                    include: [{ 
                        model: Product,
                        include: [ProductImage] // Загрузка изображений продукта
                    }]
                }],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            const totalPages = Math.ceil(orders.count / limit);

            const orderData = orders.rows.map(order => ({
                id: order.id,
                userId: order.userId,
                createdAt: order.createdAt,
                status: order.status,
                items: order.OrderItems.map(item => ({
                    id: item.id,
                    orderId: item.orderId,
                    productId: item.productId,
                    productName: item.Product.name,
                    productPrice: item.Product.price,
                    productColors: item.Product.colors,
                    productImages: item.Product.ProductImages.map(img => img.url), // Изменение здесь
                    quantity: item.quantity,
                    size: item.size
                }))
            }));

            res.json({
                total: orders.count,
                totalPages,
                currentPage: page,
                orders: orderData,
            });
        } catch (error) {
            console.error('Ошибка при выборке заказов:', error); // Логирование ошибки
            next(ApiError.internal('Ошибка при выборке заказов'));
        }
    }

    async addOrder(req, res, next) {
        try {
            const { userId, items } = req.body;

            const order = await Order.create({ userId, total_price: 0, status: 'Pending' });

            let totalPrice = 0;
            for (const item of items) {
                const product = await Product.findByPk(item.productId);
                if (!product) {
                    return next(ApiError.badRequest('Товар не найден'));
                }

                await OrderItem.create({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    size: item.size,
                    price: product.price
                });

                totalPrice += product.price * item.quantity;
            }

            order.total_price = totalPrice;
            await order.save();

            res.status(201).json(order);
        } catch (error) {
            console.error('Ошибка при добавлении заказа:', error); // Логирование ошибки
            next(ApiError.internal('Ошибка при добавлении заказа'));
        }
    }

    async updateOrderStatus() {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 часа назад
            await Order.update(
                { status: 'Completed' },
                { where: { createdAt: { [Op.lte]: oneDayAgo }, status: 'Pending' } }
            );
            console.log('Статусы заказов обновлены');
        } catch (error) {
            console.error('Ошибка при обновлении статусов заказов:', error);
        }
    }
}

module.exports = new OrderController();
