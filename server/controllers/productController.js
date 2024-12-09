const {Product} = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
    async getAllProduct(req, res, next) {
        try {
            const products = await Product.findAll();
            res.json(products);
          } catch (error) {
            next(ApiError.internal('Ошибка при получении товаров'));
          }
    }

    async getProductById(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return next(ApiError.badRequest('Товар не найден'));
            res.json(product);
          } catch (error) {
            next(ApiError.internal('Ошибка при получении товаров'));
          }
    }

    async createProduct(req, res, next) {
        try {
            const { name, description, price, stock, size, categoryId } = req.body;
            const newProduct = await Product.create({ name, description, price, stock, size, categoryId });
            res.status(201).json(newProduct);
          } catch (error) {
            next(ApiError.internal('Ошибка при создании товара'));
          }
    }

    async updateProduct(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return next(ApiError.badRequest('Товар не найден'));
            await product.update(req.body);
            res.json(product);
          } catch (error) {
            next(ApiError.internal('Ошибка обновления товара'));
          }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return next(ApiError.badRequest('Товар не найден'));
            await product.destroy();
            res.json({ message: 'Товар удален' });
          } catch (error) {
            next(ApiError.internal('Ошибка удаления товара'));
          }
    }
}

module.exports = new ProductController()