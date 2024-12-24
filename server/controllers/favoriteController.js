const { Favorite, Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const { check, validationResult } = require('express-validator');

class FavoriteController {
    async getFavoriteByUser(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query; 
            const offset = (page - 1) * limit; 

            const favorites = await Favorite.findAndCountAll({
                where: { userId: req.params.userId },
                include: [{ 
                    model: Product,
                    include: [ProductImage] 
                }],
                limit: parseInt(limit), 
                offset: parseInt(offset)
            });

            const totalPages = Math.ceil(favorites.count / limit);

            const favoriteProducts = favorites.rows.map(favorite => ({
                id: favorite.id,
                userId: favorite.userId,
                productId: favorite.productId,
                productName: favorite.Product.name,
                productPrice: favorite.Product.price,
                productImage: favorite.Product.ProductImages[0]?.url 
            }));

            res.json({
                total: favorites.count,
                totalPages,
                currentPage: page,
                favorites: favoriteProducts,
            });
        } catch (error) {
            console.error('Ошибка при выборке избранного:', error);
            next(ApiError.internal('Ошибка при выборке избранного'));
        }
    }

    async addFavorite(req, res, next) {
        await check('userId').isNumeric().withMessage('ID пользователя должен быть числом').run(req);
        await check('productId').isNumeric().withMessage('ID продукта должен быть числом').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()));
        }

        try {
            const { userId, productId } = req.body;

            const existingFavorite = await Favorite.findOne({ where: { userId, productId } });
            if (existingFavorite) {
                return next(ApiError.badRequest('Товар уже в избранном'));
            }

            const favorite = await Favorite.create({ userId, productId });
            res.status(201).json(favorite);
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
            next(ApiError.internal('Ошибка при добавлении в избранное'));
        }
    }

    async removeFavorite(req, res, next) {
        try {
            const { userId, productId } = req.params;
            const favorite = await Favorite.findOne({ where: { userId, productId } });
            if (!favorite) return next(ApiError.badRequest('Избранное не найдено'));
            await favorite.destroy();
            res.status(204).json({ message: 'Избранное успешно удалено' });
        } catch (error) {
            console.error('Ошибка при удалении избранного:', error);
            next(ApiError.internal('Ошибка при удалении избранного'));
        }
    }
    
}

module.exports = new FavoriteController();
