const { User, Role } = require('../models/models');
const ApiError = require('../error/ApiError');

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке пользователей'));
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return next(ApiError.badRequest('Пользователь не найден'));
            res.json(user);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке пользователя'));
        }
    }

    async createUser(req, res, next) {
        try {
            const { firstname, lastname, email, password, delivery_address, phone_number } = req.body;

            // Проверка на уникальность email
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'));
            }

            // Находим роль 'customer'
            const customerRole = await Role.findOne({ where: { name: 'customer' } });
            if (!customerRole) {
                return next(ApiError.internal('Роль "customer" не найдена'));
            }

            // Создаем нового пользователя с ролью 'customer'
            const newUser = await User.create({ 
                firstname, 
                lastname, 
                email, 
                password, 
                delivery_address, 
                phone_number,
                roleId: customerRole.id // Присваиваем роль 'customer'
            });

            // Убираем пароль из ответа, чтобы не отправлять его клиенту
            const userJson = newUser.toJSON();
            delete userJson.password;

            res.status(201).json(userJson);
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
            // Получаем ID из параметров URL
            const userId = req.params.id;
            
            // Ищем пользователя по ID
            const user = await User.findByPk(userId);
            
            // Если пользователь не найден, возвращаем ошибку
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }
    
            // Удаляем пользователя
            await user.destroy();
    
            // Возвращаем успешный ответ
            res.json({ message: 'Пользователь удален' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении пользователя'));
        }
    }
}

module.exports = new UserController();
