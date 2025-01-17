const bcrypt = require('bcryptjs');  // Используйте bcryptjs вместо bcrypt
const { User, Role } = require('../models/models');
const tokenService = require('./tokenService');
const ApiError = require('../error/ApiError');
const UserDto = require('../dtos/userDto');  // Подключение вашего UserDto

class UserService {
    async register(email, password, firstname, lastname, delivery_address, phone_number) {
        console.log('Received registration data:', { email, password, firstname, lastname });

        const candidate = await User.findOne({ email });
        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const userRole = await Role.findOne({ name: 'customer' });
        const user = new User({ email, password: hashPassword, firstname, lastname, delivery_address, phone_number, role: userRole._id });

        await user.save();

        const userDto = new UserDto(user);  // Используем UserDto
        const tokens = tokenService.generateTokens(userDto.toObject());  // Используем generateTokens с преобразованием в простой объект
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.badRequest('Неверный пароль');
        }

        const userDto = new UserDto(user);  // Используем UserDto
        const tokens = tokenService.generateTokens(userDto.toObject());  // Используем generateTokens с преобразованием в простой объект
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        console.log(refreshToken + " Заход в user-service");

        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token не найден");
        }

        const tokenFromDb = await tokenService.findToken(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);

        if (!tokenFromDb || !userData) {
            throw ApiError.unauthorized("Refresh token не найден");
        }

        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);  // Используем UserDto
        const tokens = tokenService.generateTokens(userDto.toObject());  // Используем generateTokens с преобразованием в простой объект
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
