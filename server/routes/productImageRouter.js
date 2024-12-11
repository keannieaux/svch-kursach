const Router = require('express')
const router = new Router()
const productImageController = require('../controllers/productImageController');

// Получить все изображения продуктов
router.get('/getAllProductImages', productImageController.getAllProductImages);

// Создать изображение продукта
router.post('/createProductImage', productImageController.createProductImage);

// Получить изображение продукта по ID
router.get('/getProductImageById', productImageController.getProductImageById);

// Обновить изображение продукта
router.put('/updateProductImage', productImageController.updateProductImage);

// Удалить изображение продукта
router.delete('/deleteProductImage', productImageController.deleteProductImage);

module.exports = router;
