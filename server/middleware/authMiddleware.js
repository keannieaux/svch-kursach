const ApiError = require('../error/ApiError');
const tokenService = require('../service/token-service');
module.exports = function (req, res, next)  {
    try{
        const authorization = req.headers.authorization;
        if(!authorization){
            return next(ApiError.unauthorized("Пользователь не авторизован"))
        }
        // bearer accessToken
        const accessToken = authorization.split(' ')[1]

        if(!accessToken){
            return next(ApiError.unauthorized("Пользователь не авторизован"))
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.unauthorized("Пользователь не авторизован"))
        }
        req.user = userData;
        next()
    }
    catch(err){
        return next(ApiError.unauthorized("Пользователь не авторизован"))
    }
}