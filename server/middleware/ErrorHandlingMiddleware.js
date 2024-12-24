const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    // Логирование ошибки для отладки
    console.error("Ошибка:", err);

    // Проверка, является ли ошибка экземпляром ApiError
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    // Обработка непредвиденных ошибок
    return res.status(500).json({ message: "Непредвиденная ошибка!" });
};