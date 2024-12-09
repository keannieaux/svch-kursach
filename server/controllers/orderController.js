const {Order, OrderItem} = require('../models/models');
const ApiError = require('../error/ApiError');

class OrderController {
    async getOrderByUser(req, res, next) {
        try {
            const orders = await Order.findAll({ where: { userId: req.params.userId } });
            res.json(orders);
          } catch (error) {
            next(ApiError.internal('Ошибка при получении заказов'));
          }
    }

    async createOrder(req, res, next) {
        try {
            const { userId, total_price, items } = req.body;
            const order = await Order.create({ userId, total_price });
            for (const item of items) {
              await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                price: item.price,
              });
            }
            res.status(201).json(order);
          } catch (error) {
            next(ApiError.internal('Ошибка при создании заказа'));
          }
    }

}

module.exports = new OrderController()