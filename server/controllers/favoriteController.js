const { Favorite, Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

class FavoriteController {
    async getFavoriteByUser(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const userId = req.params.userId;

            const favorites = await Favorite.find({ userId })
                .populate({
                    path: 'productId',
                    populate: {
                        path: 'images',
                        model: 'ProductImage'
                    }
                })
                .skip(skip)
                .limit(parseInt(limit));

            const total = await Favorite.countDocuments({ userId });
            const totalPages = Math.ceil(total / limit);

            const favoriteProducts = favorites.map(fav => ({
                id: fav._id,
                userId: fav.userId,
                productId: fav.productId._id,
                productName: fav.productId.name,
                productPrice: fav.productId.price,
                productImage: fav.productId.images[0]?.url || null
            }));

            res.json({
                total,
                totalPages,
                currentPage: parseInt(page),
                favorites: favoriteProducts
            });
        } catch (error) {
            console.error('Ошибка при выборке избранного:', error);
            next(ApiError.internal('Ошибка при выборке избранного'));
        }
    }

    async addFavorite(req, res, next) {
        await check('userId').isMongoId().withMessage('ID пользователя должен быть корректным MongoDB ObjectId').run(req);
        await check('productId').isMongoId().withMessage('ID продукта должен быть корректным MongoDB ObjectId').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest(errors.array()));
        }

        try {
            const { userId, productId } = req.body;

            const existingFavorite = await Favorite.findOne({ userId, productId });
            if (existingFavorite) {
                return next(ApiError.badRequest('Товар уже в избранном'));
            }

            const favorite = new Favorite({ userId, productId });
            await favorite.save();

            res.status(201).json(favorite);
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
            next(ApiError.internal('Ошибка при добавлении в избранное'));
        }
    }

    async removeFavorite(req, res, next) {
        try {
            const { userId, productId } = req.params;

            const favorite = await Favorite.findOne({ userId, productId });
            if (!favorite) {
                return next(ApiError.badRequest('Избранное не найдено'));
            }

            await Favorite.deleteOne({ _id: favorite._id });

            res.status(204).json({ message: 'Избранное успешно удалено' });
        } catch (error) {
            console.error('Ошибка при удалении избранного:', error);
            next(ApiError.internal('Ошибка при удалении избранного'));
        }
    }
}

module.exports = new FavoriteController();
