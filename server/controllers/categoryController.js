const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const uuid = require('uuid');

class CategoryController {
    async createCategory(req, res, next) {
        try {
            // Логирование тела запроса и файлов
            console.log('Тело запроса:', req.body);
            console.log('Файлы запроса:', req.files);

            const { name } = req.body;
            const { image } = req.files;

            if (!name) {
                console.log('Ошибка: Имя категории не указано');
                return next(ApiError.badRequest('Имя категории не может быть пустым'));
            }

            if (!image) {
                console.log('Ошибка: Файл изображения не загружен');
                return next(ApiError.badRequest('Файл изображения не загружен'));
            }

            const fileName = uuid.v4() + path.extname(image.name);
            const filePath = path.resolve(__dirname, '..', 'static', fileName);

            // Попытка переместить файл
            image.mv(filePath, err => {
                if (err) {
                    console.log('Ошибка при перемещении файла:', err);
                    return next(ApiError.internal('Ошибка загрузки файла'));
                }
            });

            // Попытка создания новой категории
            const newCategory = await Category.create({ name, image: fileName });
            console.log('Созданная категория:', newCategory);
            res.status(201).json(newCategory);
        } catch (error) {
            // Расширенное логирование ошибок
            console.error('Ошибка создания категории:', error);
            if (error instanceof TypeError) {
                next(ApiError.internal('Type Error: ' + error.message));
            } else if (error instanceof ReferenceError) {
                next(ApiError.internal('Reference Error: ' + error.message));
            } else {
                next(ApiError.internal('Ошибка создания категории: ' + error.message));
            }
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
