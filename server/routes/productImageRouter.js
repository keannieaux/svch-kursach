const Router = require('express');
const router = new Router();
const productImageController = require('../controllers/productImageController');

// Получить все изображения продуктов
router.get('/', productImageController.getAllProductImages);

// Создать изображение продукта
router.post('/', productImageController.createProductImage);

// Получить изображение продукта по ID
router.get('/:id', productImageController.getProductImageById);

// Обновить изображение продукта по ID
router.put('/:id', productImageController.updateProductImage);

// Удалить изображение продукта по ID
router.delete('/:id', productImageController.deleteProductImage);

module.exports = router;