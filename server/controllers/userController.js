const {User} = require('../models/models');
const ApiError = require('../error/ApiError');

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const user = await User.findAll();
            res.json(user);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке пользователей'));
        }
    }

    async getUserById(req, res, next) {
        try{
            const user = await User.findByPk(req.params.id);
            if(!user) return next(ApiError.badRequest('Пользователь не найден'));
            res.json(user);
        }   catch(error){
            next(ApiError.internal('Ошибка при выборке пользователей'))
        }
    }

    async createUser(req, res, next) {
        try {
            const { firstname, lastname, email, password, delivery_address, phone_number } = req.body;
            const newUser = await User.create({ firstname, lastname, email, password, delivery_address, phone_number });
            res.status(201).json(newUser);
          } catch (error) {
            next(ApiError.internal('Ошибка создания пользователя'));
          }
    }

    async updateUser(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));
            await user.update(req.body);
            res.json(user);
          } catch (error) {
            next(ApiError.internal('Ошибка при обновлении пользователя'));
          }
    }

    async deleteUser(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));
            await user.destroy();
            res.json({ message: 'Пользователь удален' });
          } catch (error) {
            next(ApiError.internal('Ошибка при удалении пользователя'));
          }
    }
}

module.exports = new UserController()