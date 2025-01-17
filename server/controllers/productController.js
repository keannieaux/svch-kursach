const { Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const mongoose = require('mongoose');

class ProductController {
    async getAllProduct(req, res, next) {
        try {
            const { page = 1, limit = 10, categoryId } = req.query;
            const skip = (page - 1) * limit;
            const filter = categoryId ? { categoryId: mongoose.Types.ObjectId(categoryId) } : {};

            const products = await Product.find(filter)
                .populate('images')
                .skip(skip)
                .limit(parseInt(limit))
                .exec();

            const total = await Product.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);

            res.json({
                total,
                totalPages,
                currentPage: parseInt(page),
                products
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при получении товаров'));
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await Product.findById(req.params.id).populate('images').exec();
            if (!product) return next(ApiError.badRequest('Товар не найден'));
            res.json(product);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении товара'));
        }
    }

    async createProduct(req, res, next) {
        try {
            const { name, description, price, stock, size, categoryId } = req.body;

            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                return next(ApiError.internal('Товар с таким названием уже существует'));
            }

            const sizeArray = size ? size.split(',').map(s => parseInt(s.trim())) : [];

            const product = new Product({
                name,
                description,
                price,
                stock,
                size: sizeArray,
                categoryId: mongoose.Types.ObjectId(categoryId)
            });

            await product.save();

            if (req.files && req.files.images) {
                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
                const imageDocs = [];

                for (const image of images) {
                    const fileName = uuid.v4() + path.extname(image.name);
                    const filePath = path.resolve(__dirname, '..', 'static', fileName);

                    await image.mv(filePath);

                    const imageDoc = new ProductImage({ url: fileName, productId: product._id });
                    await imageDoc.save();
                    imageDocs.push(imageDoc._id);
                }

                product.images = imageDocs;
                await product.save();
            }

            const newProduct = await Product.findById(product._id).populate('images').exec();

            res.json(newProduct);
        } catch (error) {
            console.error('Ошибка при создании товара:', error);
            next(ApiError.internal('Ошибка при создании товара: ' + error.message));
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { name, description, price, stock, size, categoryId } = req.body;
            const product = await Product.findById(req.params.id);

            if (!product) return next(ApiError.badRequest('Товар не найден'));

            const sizeArray = size ? size.split(',').map(s => parseInt(s.trim())) : product.size;

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.stock = stock || product.stock;
            product.size = sizeArray;
            product.categoryId = categoryId ? mongoose.Types.ObjectId(categoryId) : product.categoryId;

            await product.save();

            if (req.files && req.files.images) {
                await ProductImage.deleteMany({ productId: product._id });

                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
                const imageDocs = [];

                for (const image of images) {
                    const fileName = uuid.v4() + path.extname(image.name);
                    const filePath = path.resolve(__dirname, '..', 'static', fileName);

                    await image.mv(filePath);

                    const imageDoc = new ProductImage({ url: fileName, productId: product._id });
                    await imageDoc.save();
                    imageDocs.push(imageDoc._id);
                }

                product.images = imageDocs;
                await product.save();
            }

            const updatedProduct = await Product.findById(product._id).populate('images').exec();

            res.json(updatedProduct);
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error);
            next(ApiError.internal('Ошибка при обновлении товара: ' + error.message));
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return next(ApiError.badRequest('Товар не найден'));

            await ProductImage.deleteMany({ productId: product._id });
            await product.remove();

            res.json({ message: 'Товар удален' });
        } catch (error) {
            next(ApiError.internal('Ошибка удаления товара'));
        }
    }
}

module.exports = new ProductController();
