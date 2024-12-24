const { Cart, Product, ProductImage, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class CartController {

    async getAllCarts(req, res, next) {
        try {
            const cartItems = await Cart.findAll({
                include: [{
                    model: Product,
                    include: [ProductImage]
                }, {
                    model: User
                }]
            });

            res.json(cartItems);
        } catch (error) {
            console.error('Ошибка при получении корзин всех пользователей:', error);
            next(ApiError.internal('Ошибка при получении корзин всех пользователей'));
        }
    }

    async getCartByUser(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query; 
            const offset = (page - 1) * limit; 

            const cartItems = await Cart.findAndCountAll({
                where: { userId: req.params.userId },
                include: [{ 
                    model: Product,
                    include: [ProductImage] // Загрузка изображений продукта
                }],
                limit: parseInt(limit),
                offset: parseInt(offset) 
            });

            const totalPages = Math.ceil(cartItems.count / limit);

            console.log("Cart items from DB:", cartItems.rows); // Логирование

            res.json({
                total: cartItems.count,
                totalPages,
                currentPage: page,
                items: cartItems.rows,
            });
        } catch (error) {
            console.error('Ошибка при получении корзины:', error); // Логирование ошибки
            next(ApiError.internal('Ошибка при получении корзины'));
        }
    }

    // Добавить товар в корзину
    async addToCart(req, res, next) {
        try {
            const { userId, productId, quantity, size } = req.body;

            const existingCartItem = await Cart.findOne({ where: { userId, productId, size } });
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                return res.status(200).json(existingCartItem);
            }

            const cartItem = await Cart.create({ userId, productId, quantity, size });
            res.status(201).json(cartItem);
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error); // Логирование ошибки
            next(ApiError.internal('Ошибка при добавлении в корзину'));
        }
    }

    // Удалить товар из корзины
    async removeFromCart(req, res, next) {
        try {
            console.log("Attempting to remove cart item with ID:", req.params.id); // Логирование
            const cartItem = await Cart.findByPk(req.params.id);
            if (!cartItem) {
                console.error("Cart item not found:", req.params.id); // Логирование
                return next(ApiError.badRequest('Товар в корзине не найден'));
            }
            await cartItem.destroy();
            res.json({ message: 'Товар в корзине удален' });
        } catch (error) {
            console.error('Ошибка при удалении товара в корзине:', error); // Логирование ошибки
            next(ApiError.internal('Ошибка при удалении товара в корзине'));
        }
    }
}

module.exports = new CartController();
