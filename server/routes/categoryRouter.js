const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

// Получить все категории
router.get('/getAllCategories', categoryController.getAllCategories);

// Создать категорию
router.post('/createCategory', categoryController.createCategory);

// Получить категорию по ID
router.get('/getCategoryById/:id', categoryController.getCategoryById);

// Обновить категорию
router.put('/updateCategory/:id', categoryController.updateCategory);

// Удалить категорию по ID
router.delete('/deleteCategory/:id', categoryController.deleteCategory);  // Используем :id

module.exports = router;
