const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

// Остальные маршруты остаются без изменений

router.get('/all', cartController.getAllCarts);

// Получить корзину пользователя по ID
router.get('/users/:userId/cart', cartController.getCartByUser);

// Добавить товар в корзину
router.post('/', cartController.addToCart); 

// Удалить товар из корзины по ID
router.delete('/:id', cartController.removeFromCart); 

module.exports = router;
