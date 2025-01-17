const ApiError = require('../error/ApiError');
const userService = require('../service/userService');
const { validationResult } = require('express-validator');
const { User, Role } = require("../models/models");
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;

class UserController {

    async registration(req, res, next) {
        try {
            const { email, password, firstname, lastname } = req.body;

            console.log('Received registration data:', { email, password, firstname, lastname });

            if (!email.trim() || !password.trim() || !firstname.trim() || !lastname.trim()) {
                return res.status(400).json({ message: "Все поля должны быть заполнены, пустых не может быть" });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка валидации: пароль от 3 до 32 символов или неправильно введена почта" });
            }

            const userData = await userService.register(email, password, firstname, lastname);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            if (e.message.includes('с такой почтой')) {
                return res.status(409).json({ message: e.message });
            }
            next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.internal(e.message));
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.error(e);
            next(ApiError.internal(e.message));
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log('refreshToken from cookie:', refreshToken);
            if (!refreshToken) {
                throw ApiError.unauthorized("Refresh token not found");
            }

            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const users = await User.find({ roleId: { $ne: 2 } })  // Пропускаем пользователей с ролью 2 (например, владельцы)
                .skip(skip)
                .limit(parseInt(limit))
                .populate('roleId', 'name') // Включаем модель Role
                .exec();

            const total = await User.countDocuments({ roleId: { $ne: 2 } });

            const totalPages = Math.ceil(total / limit);

            return res.json({
                total,
                totalPages,
                currentPage: page,
                users,
            });
        } catch (e) {
            console.error(e);
            next(ApiError.internal(e.message));
        }
    }

    async updateUserRole(req, res, next) {
        try {
            const { _id } = req.params;
            const { roleId } = req.body;

            console.log(`Updating role for user with ID: ${_id}`);
            console.log(`Received role ID: ${roleId}`);

            if (!roleId) {
                console.log("Role ID is missing");
                return res.status(400).json({ message: "Роль не может быть пустой" });
            }

            const user = await User.findById(_id);
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            user.roleId = roleId;
            await user.save();

            console.log('User role updated successfully:', user);

            return res.json({ message: "Роль пользователя обновлена", user });
        } catch (e) {
            console.error(e);
            next(ApiError.internal(e.message));
        }
    }

    async updateUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("Validation errors:", errors.array());
                return res.status(400).json({ errors: errors.array() });
            }

            const { _id } = req.params;
            const { email, firstname, lastname, delivery_address, phone_number } = req.body;

            console.log(`Updating user with ID: ${_id}`);
            console.log(`Received data: ${JSON.stringify(req.body)}`);

            const user = await User.findById(_id);
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            // Обновление полей пользователя
            if (email) user.email = email;
            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;
            if (delivery_address) user.delivery_address = delivery_address;
            if (phone_number || phone_number === '') user.phone_number = phone_number;

            await user.save();

            console.log('User updated successfully:', user);

            return res.json({ message: "Информация о пользователе обновлена", user });
        } catch (e) {
            console.error(e);
            next(ApiError.internal(e.message));
        }
    }

}

module.exports = new UserController();
