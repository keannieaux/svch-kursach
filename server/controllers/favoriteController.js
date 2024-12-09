const {Favorite} = require('../models/models');
const ApiError = require('../error/ApiError');

class FavoriteController {
    async getFavoriteByUser(req, res, next) {
        try {
            const favorites = await Favorite.findAll({ where: { userId: req.params.userId } });
            res.json(favorites);
          } catch (error) {
            next(ApiError.internal('Ошибка при выборке избранного'));
          }
    }

    async addFavorite(req, res, next) {
        try {
            const { userId, productId } = req.body;
            const favorite = await Favorite.create({ userId, productId });
            res.status(201).json(favorite);
          } catch (error) {
            next(ApiError.internal('Ошибка при добавлении в избранное'));
          } 
    }

    async removeFavorite(req, res, next) {
        try {
            const favorite = await Favorite.findByPk(req.params.id);
            if (!favorite) return next(ApiError.badRequest('Избранное не найдено'));
            await favorite.destroy();
            res.json({ message: 'Избранное удалено' });
          } catch (error) {
            next(ApiError.internal('Ошибка при удалении избранного'));
          }
    }
}

module.exports = new FavoriteController()