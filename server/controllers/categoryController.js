const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            if (!req.files || !req.files.image) {
                return next(ApiError.badRequest('Изображение не загружено'));
            }
            const { image } = req.files;
    
            const fileName = uuid.v4() + path.extname(image.name);
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
    
            // Попробуем сохранить изображение
            await image.mv(filePath).catch(err => {
                return next(ApiError.internal('Ошибка при сохранении изображения: ' + err.message));
            });
    
            const category = await Category.create({ name, image: fileName });
    
            return res.json(category);
        } catch (error) {
            console.error('Ошибка создания категории:', error);
            next(ApiError.internal('Ошибка создания категории: ' + error.message));
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке категорий'));
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) return next(ApiError.badRequest('Категория не найдена'));
            res.json(category);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке категории'));
        }
    }

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
