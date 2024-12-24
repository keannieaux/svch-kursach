const { Role } = require('../models/models');
const ApiError = require('../error/ApiError');

class RoleController {
    // Получить все роли с пагинацией
    async getAllRoles(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit; 

            const roles = await Role.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset), 
            });

            const totalPages = Math.ceil(roles.count / limit); 

            res.json({
                total: roles.count,
                totalPages,
                currentPage: page,
                roles: roles.rows,
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке ролей'));
        }
    }

    // Создать роль
    async createRole(req, res, next) {
        try {
            const { name } = req.body;

            const existingRole = await Role.findOne({ where: { name } });
            if (existingRole) {
                return next(ApiError.badRequest('Роль с таким именем уже существует'));
            }

            const newRole = await Role.create({ name });
            res.status(201).json(newRole);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании роли'));
        }
    }

    // Получить роль по ID
    async getRoleById(req, res, next) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) return next(ApiError.badRequest('Роль не найдена'));
            res.json(role);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке роли'));
        }
    }

    // Обновить роль
    async updateRole(req, res, next) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) return next(ApiError.badRequest('Роль не найдена'));

            await role.update(req.body);
            res.json(role);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении роли'));
        }
    }

    // Удалить роль
    async deleteRole(req, res, next) {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) return next(ApiError.badRequest('Роль не найдена'));

            await role.destroy();
            res.json({ message: 'Роль удалена' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении роли'));
        }
    }
}

module.exports = new RoleController();