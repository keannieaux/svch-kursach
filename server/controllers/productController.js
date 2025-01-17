const { Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const mongoose = require('mongoose');
const uuid = require('uuid');
const path = require('path');

class ProductController {

    async getAllProduct(req, res, next) {
        try {
            const { page = 1, limit = 10, categoryId } = req.query;
            const skip = (page - 1) * limit;
            let filter = {};

            if (categoryId) {
                if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                    return next(ApiError.badRequest('Некорректный идентификатор категории'));
                }
                filter.category = new mongoose.Types.ObjectId(categoryId);
            }

            console.log('Fetching products with filter:', filter);
            console.log('Pagination - skip:', skip, 'limit:', limit);

            const products = await Product.find(filter)
                .skip(skip)
                .limit(parseInt(limit))
                .exec();

            console.log('Fetched products:', products);

            // Получаем изображения для каждого товара
            for (const product of products) {
                const images = await ProductImage.find({ product: product._id }).exec();
                product.images = images;
            }

            const total = await Product.countDocuments(filter);
            const totalPages = Math.ceil(total / limit);

            res.json({
                total,
                totalPages,
                currentPage: parseInt(page),
                products
            });
        } catch (error) {
            console.error('Ошибка при получении товаров:', error);
            next(ApiError.internal('Ошибка при получении товаров: ' + error.message));
        }
    }

        async getProductById(req, res, next) {
            try {
                const { id } = req.params;
                console.log('Получение продукта с идентификатором:', id);
    
                // Проверка формата идентификатора
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    console.error('Некорректный идентификатор продукта:', id);
                    return next(ApiError.badRequest('Некорректный идентификатор продукта'));
                }
    
                const product = await Product.findById(id).populate('images').exec();
                if (!product) return next(ApiError.badRequest('Товар не найден'));
                res.json(product);
            } catch (error) {
                next(ApiError.internal('Ошибка при получении товара'));
            }
        }


    async createProduct(req, res, next) {
        try {
            const { name, description, price, stock, size, categoryId } = req.body;

            if (!mongoose.Types.ObjectId.isValid(categoryId)) {
                return next(ApiError.badRequest('Некорректный идентификатор категории'));
            }

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
                category: new mongoose.Types.ObjectId(categoryId)
            });

            await product.save();

            if (req.files && req.files.images) {
                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
                const imageDocs = [];

                for (const image of images) {
                    const fileName = uuid.v4() + path.extname(image.name);
                    const filePath = path.resolve(__dirname, '..', 'static', fileName);

                    await image.mv(filePath);

                    const imageDoc = new ProductImage({ url: fileName, product: product._id });
                    await imageDoc.save();
                    imageDocs.push(imageDoc._id);
                }

                product.images = imageDocs;
                await product.save();
            }

            const newProduct = await Product.findById(product._id).exec();
            const images = await ProductImage.find({ product: newProduct._id }).exec();
            newProduct.images = images;

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
            product.category = categoryId ? new mongoose.Types.ObjectId(categoryId) : product.category;

            await product.save();

            if (req.files && req.files.images) {
                await ProductImage.deleteMany({ product: product._id });

                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
                const imageDocs = [];

                for (const image of images) {
                    const fileName = uuid.v4() + path.extname(image.name);
                    const filePath = path.resolve(__dirname, '..', 'static', fileName);

                    await image.mv(filePath);

                    const imageDoc = new ProductImage({ url: fileName, product: product._id });
                    await imageDoc.save();
                    imageDocs.push(imageDoc._id);
                }

                product.images = imageDocs;
                await product.save();
            }

            const updatedProduct = await Product.findById(product._id).exec();
            const images = await ProductImage.find({ product: updatedProduct._id }).exec();
            updatedProduct.images = images;

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

            await ProductImage.deleteMany({ product: product._id });
            await product.remove();

            res.json({ message: 'Товар удален' });
        } catch (error) {
            next(ApiError.internal('Ошибка удаления товара'));
        }
    }
}

module.exports = new ProductController();
