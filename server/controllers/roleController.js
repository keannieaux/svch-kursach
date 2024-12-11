const { Role } = require('../models/models');
const ApiError = require('../error/ApiError');

class RoleController {
    // Получить все роли
    async getAllRoles(req, res, next) {
        try {
            const roles = await Role.findAll();
            res.json(roles);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке ролей'));
        }
    }

    // Создать роль
    async createRole(req, res, next) {
        try {
            const { name } = req.body;
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
