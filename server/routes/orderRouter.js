const Router = require('express');
const orderController = require('../controllers/orderController');
const router = new Router();

// Получить заказы пользователя по ID
router.get('/users/:userId/orders', orderController.getOrdersByUser);

// Добавить заказ
router.post('/', orderController.addOrder);

module.exports = router;
