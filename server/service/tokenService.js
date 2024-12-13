const jwt = require('jsonwebtoken');
const { Refresh_Token } = require('../models/models');

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async saveToken(user_id, refreshToken) {
        try {
            const tokenData = await Refresh_Token.findOne({ where: { id_user: user_id } });
            if (tokenData) {
                tokenData.refresh_token = refreshToken;
                await tokenData.save();
            } else {
                await Refresh_Token.create({ id_user: user_id, refresh_token: refreshToken });
            }
        } catch (error) {
            console.error("Error saving token:", error);
        }
    }

        async removeToken(refreshToken) {
            try {
                const tokenData = await Refresh_Token.destroy({ where: { refresh_token: refreshToken } });
                console.log("Token removed from database:", tokenData); 
                return tokenData;
            } catch (e) {
                console.error("Error removing token from database:", e); 
            }
        }
    
    

    async findToken(refreshToken) {
        return await Refresh_Token.findOne({ where: { refresh_token: refreshToken } });
    }
}

module.exports = new TokenService();