const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
  // Получить все категории
  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      next(ApiError.internal('Ошибка при выборке категорий'));
    }
  }

  // Создать категорию
  async createCategory(req, res, next) {
    try {
        const categories = req.body; // Получаем массив категорий

        // Проверка, что тело запроса не пустое
        if (!Array.isArray(categories) || categories.length === 0) {
            return next(ApiError.badRequest('Массив категорий не может быть пустым'));
        }

        // Используем Sequelize для создания нескольких категорий за один раз
        const createdCategories = await Category.bulkCreate(categories);

        res.status(201).json(createdCategories);
    } catch (error) {
        next(ApiError.internal('Ошибка создания категорий'));
    }
}

  // Получить категорию по ID
  async getCategoryById(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return next(ApiError.badRequest('Категория не найдена'));
      res.json(category);
    } catch (error) {
      next(ApiError.internal('Ошибка при выборке категории'));
    }
  }

  // Обновить категорию
  async updateCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return next(ApiError.badRequest('Категория не найдена'));

      await category.update(req.body);
      res.json(category);
    } catch (error) {
      next(ApiError.internal('Ошибка при обновлении категории'));
    }
  }

  // Удалить категорию по ID
  async deleteCategory(req, res, next) {
    try {
      const categoryId = req.params.id;

      const category = await Category.findByPk(categoryId);
      if (!category) return next(ApiError.badRequest('Категория не найдена'));

      await category.destroy();
      res.json({ message: 'Категория удалена' });
    } catch (error) {
      next(ApiError.internal('Ошибка при удалении категории'));
    }
  }
}

module.exports = new CategoryController();