const { Cart, Product, ProductImage, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class CartController {

    // Получить все корзины
    async getAllCarts(req, res, next) {
        try {
            const cartItems = await Cart.find()
                .populate({
                    path: 'product',
                    populate: { path: 'images' } // Загрузка изображений продукта
                })
                .populate('user'); // Загрузка пользователя

            res.json(cartItems);
        } catch (error) {
            console.error('Ошибка при получении корзин всех пользователей:', error);
            next(ApiError.internal('Ошибка при получении корзин всех пользователей'));
        }
    }

    // Получить корзину пользователя
    async getCartByUser(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const cartItems = await Cart.find({ user: req.params.userId })
                .populate({
                    path: 'product',
                    populate: { path: 'images' }
                })
                .skip(offset)
                .limit(parseInt(limit));

            const totalItems = await Cart.countDocuments({ user: req.params.userId });
            const totalPages = Math.ceil(totalItems / limit);

            res.json({
                total: totalItems,
                totalPages,
                currentPage: parseInt(page),
                items: cartItems,
            });
        } catch (error) {
            console.error('Ошибка при получении корзины:', error);
            next(ApiError.internal('Ошибка при получении корзины'));
        }
    }

    // Добавить товар в корзину
    async addToCart(req, res, next) {
        try {
            const { userId, productId, quantity, size } = req.body;

            const existingCartItem = await Cart.findOne({ user: userId, product: productId, size });
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                return res.status(200).json(existingCartItem);
            }

            const cartItem = new Cart({ user: userId, product: productId, quantity, size });
            await cartItem.save();

            res.status(201).json(cartItem);
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
            next(ApiError.internal('Ошибка при добавлении в корзину'));
        }
    }

    // Удалить товар из корзины
    async removeFromCart(req, res, next) {
        try {
            const cartItem = await Cart.findById(req.params.id);
            if (!cartItem) {
                return next(ApiError.badRequest('Товар в корзине не найден'));
            }

            await cartItem.remove();
            res.json({ message: 'Товар в корзине удален' });
        } catch (error) {
            console.error('Ошибка при удалении товара в корзине:', error);
            next(ApiError.internal('Ошибка при удалении товара в корзине'));
        }
    }
}

module.exports = new CartController();
