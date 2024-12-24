const { Product, ProductImage } = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

class ProductController {
    async getAllProduct(req, res, next) {
        try {
            const { page = 1, limit = 10, categoryId } = req.query; 
            const offset = (page - 1) * limit; 
            const where = categoryId ? { categoryId } : {};
            const products = await Product.findAndCountAll({
                where,
                include: [{ model: ProductImage }],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            const totalPages = Math.ceil(products.count / limit); 

            res.json({
                total: products.count,
                totalPages,
                currentPage: page,
                products: products.rows,
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при получении товаров'));
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [{ model: ProductImage }]
            });
            if (!product) return next(ApiError.badRequest('Товар не найден'));
            res.json(product);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении товара'));
        }
    }

        async createProduct(req, res, next) {
            try {
                const { name, description, price, stock, size, categoryId } = req.body;
                const existingProduct = await Product.findOne({ where: { name } });
    
                if (existingProduct) {
                    return next(ApiError.internal('Товар с таким названием уже существует'));
                }
    
                const product = await Product.create({
                    name,
                    description,
                    price,
                    stock,
                    size: size.split(',').map(s => parseInt(s.trim())), // Преобразование строки в массив чисел
                    categoryId,
                });
    
                if (req.files && req.files.images) {
                    const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
                    const imageRecords = [];
    
                    for (const image of images) {
                        const fileName = uuid.v4() + path.extname(image.name);
                        const filePath = path.resolve(__dirname, '..', 'static', fileName);
    
                        await image.mv(filePath);
                        imageRecords.push({ url: fileName, productId: product.id });
                    }
    
                    await ProductImage.bulkCreate(imageRecords);
                }
    
                const newProduct = await Product.findByPk(product.id, {
                    include: [{ model: ProductImage }]
                });
    
                return res.json(newProduct);
            } catch (error) {
                console.error('Ошибка при создании товара:', error);
                next(ApiError.internal('Ошибка при создании товара: ' + error.message));
            }
        }

            async updateProduct(req, res, next) {
                try {
                    console.log('Request Body:', req.body);
                    console.log('Request Files:', req.files);
        
                    const { name, description, price, stock, size, categoryId } = req.body;
                    const product = await Product.findByPk(req.params.id);
                    if (!product) return next(ApiError.badRequest('Товар не найден'));
        
                    const sizeArray = size ? size.split(',').map(s => parseInt(s.trim())) : product.size;
                    await product.update({ name, description, price, stock, size: sizeArray, categoryId });
        
                    if (req.files && req.files.length > 0) {
                        console.log('Updating Images:', req.files);
        
                        await ProductImage.destroy({ where: { productId: product.id } });
        
                        const images = req.files;
                        const imageRecords = [];
        
                        for (const image of images) {
                            console.log('Processing Image:', image);
                            if (!image.originalname) {
                                console.error('Image has no original name:', image);
                                continue;
                            }
                            const fileName = uuid.v4() + path.extname(image.originalname);
                            const filePath = path.resolve(__dirname, '..', 'static', fileName);
        
                            await image.mv(filePath);
                            imageRecords.push({ url: fileName, productId: product.id });
                        }
        
                        await ProductImage.bulkCreate(imageRecords);
                    }
        
                    const updatedProduct = await Product.findByPk(product.id, {
                        include: [{ model: ProductImage }]
                    });
        
                    res.json(updatedProduct);
                } catch (error) {
                    console.error('Ошибка при обновлении товара:', error);
                    next(ApiError.internal('Ошибка при обновлении товара: ' + error.message));
                }
            }


    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return next(ApiError.badRequest('Товар не найден'));

            await product.destroy();
            await ProductImage.destroy({ where: { productId: product.id } });

            res.json({ message: 'Товар удален' });
        } catch (error) {
            next(ApiError.internal('Ошибка удаления товара'));
        }
    }
}

module.exports = new ProductController();
