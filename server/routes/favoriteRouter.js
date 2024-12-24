const Router = require('express');
const favoriteController = require('../controllers/favoriteController');
const router = new Router();

// Получить избранное пользователя по ID
router.get('/users/:userId/favorites', favoriteController.getFavoriteByUser);

// Добавить в избранное
router.post('/', favoriteController.addFavorite); 

// Удалить из избранного по ID
router.delete('/users/:userId/products/:productId', favoriteController.removeFavorite); 

module.exports = router;
