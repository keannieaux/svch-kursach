const Router = require('express');
const productController = require('../controllers/productController');
const router = new Router();

// Получить все продукты
router.get('/', productController.getAllProduct);

// Получить продукт по ID
router.get('/:id', productController.getProductById);

// Создать новый продукт
router.post('/', productController.createProduct);

// Обновить продукт по ID
router.put('/:id', productController.updateProduct);

// Удалить продукт по ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;