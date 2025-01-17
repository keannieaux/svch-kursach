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

            await image.mv(filePath).catch(err => {
                return next(ApiError.internal('Ошибка при сохранении изображения: ' + err.message));
            });

            const category = new Category({ name, image: fileName });
            await category.save();

            return res.json(category);
        } catch (error) {
            console.error('Ошибка создания категории:', error);
            next(ApiError.internal('Ошибка создания категории: ' + error.message));
        }
    }

    async getAllCategories(req, res, next) {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            console.error('Ошибка при выборке категорий:', error);
            next(ApiError.internal('Ошибка при выборке категорий: ' + error.message));
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return next(ApiError.badRequest('Категория не найдена'));
            }
            res.json(category);
        } catch (error) {
            console.error('Ошибка при выборке категории:', error);
            next(ApiError.internal('Ошибка при выборке категории: ' + error.message));
        }
    }

    async updateCategory(req, res, next) {
        try {
            const { name } = req.body;
            let category = await Category.findById(req.params.id);

            if (!category) {
                return next(ApiError.badRequest('Категория не найдена'));
            }

            let fileName = category.image;

            if (req.files && req.files.image) {
                const { image } = req.files;
                fileName = uuid.v4() + path.extname(image.name);
                const filePath = path.resolve(__dirname, '..', 'static', fileName);

                await image.mv(filePath).catch(err => {
                    return next(ApiError.internal('Ошибка при сохранении изображения: ' + err.message));
                });

                // Удаление старого изображения
                const oldImagePath = path.resolve(__dirname, '..', 'static', category.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            category.name = name || category.name;
            category.image = fileName;
            await category.save();

            res.json(category);
        } catch (error) {
            console.error('Ошибка при обновлении категории:', error);
            next(ApiError.internal('Ошибка при обновлении категории: ' + error.message));
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return next(ApiError.badRequest('Категория не найдена'));
            }

            const imagePath = path.resolve(__dirname, '..', 'static', category.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await Category.findByIdAndDelete(req.params.id);

            res.json({ message: 'Категория удалена' });
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
            next(ApiError.internal('Ошибка при удалении категории: ' + error.message));
        }
    }
}

module.exports = new CategoryController();
