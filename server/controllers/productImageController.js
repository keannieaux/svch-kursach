const { ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const mongoose = require('mongoose');

class ProductImageController {
    async getAllProductImages(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const productImages = await ProductImage.find()
                .skip(skip)
                .limit(parseInt(limit))
                .exec();

            const total = await ProductImage.countDocuments();
            const totalPages = Math.ceil(total / limit);

            res.json({
                total,
                totalPages,
                currentPage: parseInt(page),
                productImages
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке изображений продуктов'));
        }
    }

    async getProductImageById(req, res, next) {
        try {
            const productImage = await ProductImage.findById(req.params.id).exec();
            if (!productImage) {
                return next(ApiError.badRequest('Изображение продукта не найдено'));
            }
            res.json(productImage);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке изображения продукта'));
        }
    }

    async createProductImage(req, res, next) {
        try {
            const { url } = req.body;

            const existingImage = await ProductImage.findOne({ url }).exec();
            if (existingImage) {
                return next(ApiError.badRequest('Изображение с таким URL уже существует'));
            }

            const newProductImage = new ProductImage({ url });
            await newProductImage.save();
            res.status(201).json(newProductImage);
        } catch (error) {
            next(ApiError.internal('Ошибка создания изображения продукта'));
        }
    }

    async updateProductImage(req, res, next) {
        try {
            const productImage = await ProductImage.findById(req.params.id).exec();
            if (!productImage) {
                return next(ApiError.badRequest('Изображение продукта не найдено'));
            }
            Object.assign(productImage, req.body);
            await productImage.save();
            res.json(productImage);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении изображения продукта'));
        }
    }

    async deleteProductImage(req, res, next) {
        try {
            const productImage = await ProductImage.findById(req.params.id).exec();
            if (!productImage) {
                return next(ApiError.badRequest('Изображение продукта не найдено'));
            }
            await productImage.remove();
            res.json({ message: 'Изображение продукта удалено' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении изображения продукта'));
        }
    }
}

module.exports = new ProductImageController();
