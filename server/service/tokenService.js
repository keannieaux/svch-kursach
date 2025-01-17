const jwt = require("jsonwebtoken");
const { Refresh_Token } = require("../models/models");  // Убедитесь, что используете модели Mongoose

class TokenService {

    // Генерация токенов
    generateTokens(payload) { // Убедитесь, что используется правильное имя функции
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '10d' });
        return {
            accessToken,
            refreshToken
        };
    }

    // Валидация Access токена
    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    // Валидация Refresh токена
    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    // Сохранение Refresh токена
    async saveToken(userId, refreshToken) {
        try {
            console.log("Saving token for userId:", userId);
            console.log("Refresh Token:", refreshToken);

            // Находим или создаем новый документ в MongoDB для токенов
            const tokenData = await Refresh_Token.findOne({ user: userId });

            if (tokenData) {
                console.log("Updating existing token");
                tokenData.refresh_token = refreshToken; // Обновляем токен
                await tokenData.save();
            } else {
                console.log("Creating new token");
                const newTokenData = new Refresh_Token({ user: userId, refresh_token: refreshToken });
                await newTokenData.save(); // Создаем новый документ с токеном
            }
        } catch (error) {
            console.error("Error saving token:", error);
            throw error;
        }
    }

    // Удаление Refresh токена
    async removeToken(refreshToken) {
        try {
            const tokenData = await Refresh_Token.deleteOne({ refresh_token: refreshToken });
            return tokenData;
        } catch (error) {
            console.error("Error removing token:", error);
            throw error;
        }
    }

    // Поиск Refresh токена
    async findToken(refreshToken) {
        try {
            const tokenData = await Refresh_Token.findOne({ refresh_token: refreshToken });
            console.log('Token search result:');
            console.log(refreshToken);
            console.log(tokenData);
            return tokenData;
        } catch (error) {
            console.error("Error finding token:", error);
            throw error;
        }
    }

}

module.exports = new TokenService();
