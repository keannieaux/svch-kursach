const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

// Получить все категории
router.get('/', categoryController.getAllCategories);

// Создать категорию
router.post('/', categoryController.createCategory);

// Получить категорию по ID
router.get('/:id', categoryController.getCategoryById);

// Обновить категорию
router.put('/:id', categoryController.updateCategory);

// Удалить категорию по ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;