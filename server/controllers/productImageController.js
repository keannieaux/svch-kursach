const { ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductImageController {
    // Получить все изображения продуктов с пагинацией
    async getAllProductImages(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query; 
            const offset = (page - 1) * limit; 

            const productImages = await ProductImage.findAndCountAll({
                limit: parseInt(limit), 
                offset: parseInt(offset), 
            });

            const totalPages = Math.ceil(productImages.count / limit); 

            res.json({
                total: productImages.count,
                totalPages,
                currentPage: page,
                productImages: productImages.rows,
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке изображений продуктов'));
        }
    }

    // Получить изображение по ID
    async getProductImageById(req, res, next) {
        try {
            const productImage = await ProductImage.findByPk(req.params.id);
            if (!productImage) {
                return next(ApiError.badRequest('Изображение продукта не найдено'));
            }
            res.json(productImage);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке изображения продукта'));
        }
    }

    // Создать изображение продукта
    async createProductImage(req, res, next) {
        try {
            const { url } = req.body;

            const existingImage = await ProductImage.findOne({ where: { url } });
            if (existingImage) {
                return next(ApiError.badRequest('Изображение с таким URL уже существует'));
            }

            const newProductImage = await ProductImage.create({ url });
            res.status(201).json(newProductImage);
        } catch (error) {
            next(ApiError.internal('Ошибка создания изображения продукта'));
        }
    }

    // Обновить изображение продукта
    async updateProductImage(req, res, next) {
        try {
            const productImage = await ProductImage.findByPk(req.params.id);
            if (!productImage) {
                return next(ApiError.badRequest('Изображение продукта не найдено'));
            }
            await productImage.update(req.body);
            res.json(productImage);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении изображения продукта'));
        }
    }

    // Удалить изображение продукта
    async deleteProductImage(req, res, next) {
        try {
            const productImage = await ProductImage.findByPk(req.params.id);
            if (!productImage) {
                return next(ApiError.badRequest('Изображение продукта не найдено'));
            }
            await productImage.destroy();
            res.json({ message: 'Изображение продукта удалено' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении изображения продукта'));
        }
    }
}

module.exports = new ProductImageController();