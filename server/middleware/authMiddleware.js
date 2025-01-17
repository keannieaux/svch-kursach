const ApiError = require('../error/ApiError');
const tokenService = require('../service/tokenService');
const { User } = require('../models/models'); // Подключаем модель пользователя

module.exports = async function (req, res, next) {
    try {
        const authorization = req.headers.authorization;

        // Проверка наличия заголовка Authorization
        if (!authorization) {
            return next(ApiError.unauthorized("Пользователь не авторизован"));
        }

        // Извлечение токена из заголовка
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.unauthorized("Пользователь не авторизован"));
        }

        // Валидация токена
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorized("Пользователь не авторизован"));
        }

        // Проверка существования пользователя в базе данных
        const user = await User.findById(userData.id); // Получаем пользователя по ID из данных токена
        if (!user) {
            return next(ApiError.unauthorized("Пользователь не найден"));
        }

        // Проверка на совпадение токена с тем, что хранится в базе данных (если нужно)
        // Например, можно сравнить с refreshToken, если вы его сохраняете в базе данных
        if (user.refreshToken !== userData.refreshToken) {
            return next(ApiError.unauthorized("Токен недействителен"));
        }

        // Добавление данных пользователя в объект запроса
        req.user = user;  // Теперь в req.user у вас будет вся информация о пользователе из базы
        next();
    } catch (err) {
        console.error("Ошибка аутентификации:", err);
        return next(ApiError.unauthorized("Пользователь не авторизован"));
    }
};
