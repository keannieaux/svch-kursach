const { User } = require("../models/models");
const tokenService = require("./tokenService");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require("../dtos/userDto");

class UserService {
    // Регистрация пользователя
    async register(email, password, firstname, lastname, delivery_address, phone_number) {
        // Проверка на существование пользователя
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw new Error(`Пользователь с такой почтой ${email} уже существует`);
        }
        
        // Хэшируем пароль
        const hashPassword = await bcrypt.hash(password, 3);
        
        // Создаем нового пользователя
        const user = new User({
            email,
            password: hashPassword,
            firstname,
            lastname,
            delivery_address,
            phone_number,
        });
        
        // Сохраняем пользователя в базе
        await user.save();
        
        // Создаем DTO пользователя и генерируем токены
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        
        // Сохраняем refreshToken в базе данных
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        
        return { ...tokens, user: userDto };
    }

    // Вход пользователя
    async login(email, password) {
        // Поиск пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.badRequest("Пользователь не найден");
        }
        
        // Сравниваем пароли
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw ApiError.badRequest("Неверный пароль");
        }

        // Создаем DTO пользователя и генерируем токены
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        // Сохраняем refreshToken
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        
        return { ...tokens, user: userDto };
    }

    // Выход пользователя
    async logout(refreshToken) {
        // Удаляем refreshToken
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    // Обновление токенов (по refresh token)
    async refresh(refreshToken) {
        console.log(refreshToken + " Заход в user-service");

        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token не найден");
        }

        // Находим токен в базе данных
        const tokenFromDb = await tokenService.findToken(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);

        if (!tokenFromDb || !userData) {
            throw ApiError.unauthorized("Refresh token не найден");
        }

        // Находим пользователя по ID из токена
        const user = await User.findById(userData._id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });

        // Сохраняем новый refreshToken в базе данных
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
