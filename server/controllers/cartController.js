const {Cart} = require('../models/models');
const ApiError = require('../error/ApiError');

class CartController {
    async getCartByUser(req, res, next) {
        try {
            const cart = await Cart.findAll({ where: { userId: req.params.userId } });
            res.json(cart);
          } catch (error) {
            next(ApiError.internal('Ошибка при получении корзины'));
          }
    }

    async addToCart(req, res, next) {
        try {
            const { userId, productId, quantity, size } = req.body;
            const cartItem = await Cart.create({ userId, productId, quantity, size });
            res.status(201).json(cartItem);
          } catch (error) {
            next(ApiError.internal('Ошибка при добавлении в корзину'));
          }
    }

    async removeFromCart(req, res, next) {
        try {
            const cartItem = await Cart.findByPk(req.params.id);
            if (!cartItem) return next(ApiError.badRequest('Товар в корзине не найден'));
            await cartItem.destroy();
            res.json({ message: 'Товар в корзине удален' });
          } catch (error) {
            next(ApiError.internal('Ошибка при удалении товара в корзине'));
          }
    }
}

module.exports = new CartController()