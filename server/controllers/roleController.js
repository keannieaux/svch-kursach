const { Role } = require('../models/models');
const ApiError = require('../error/ApiError');

class RoleController {
    async getAllRoles(req, res, next) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const roles = await Role.find()
                .skip(skip)
                .limit(parseInt(limit))
                .exec();

            const total = await Role.countDocuments();
            const totalPages = Math.ceil(total / limit);

            res.json({
                total,
                totalPages,
                currentPage: parseInt(page),
                roles
            });
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке ролей'));
        }
    }

    async createRole(req, res, next) {
        try {
            const { name } = req.body;

            const existingRole = await Role.findOne({ name }).exec();
            if (existingRole) {
                return next(ApiError.badRequest('Роль с таким именем уже существует'));
            }

            const newRole = new Role({ name });
            await newRole.save();
            res.status(201).json(newRole);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании роли'));
        }
    }

    async getRoleById(req, res, next) {
        try {
            const role = await Role.findById(req.params.id).exec();
            if (!role) return next(ApiError.badRequest('Роль не найдена'));
            res.json(role);
        } catch (error) {
            next(ApiError.internal('Ошибка при выборке роли'));
        }
    }

    async updateRole(req, res, next) {
        try {
            const role = await Role.findById(req.params.id).exec();
            if (!role) return next(ApiError.badRequest('Роль не найдена'));

            Object.assign(role, req.body);
            await role.save();
            res.json(role);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении роли'));
        }
    }

    async deleteRole(req, res, next) {
        try {
            const role = await Role.findById(req.params.id).exec();
            if (!role) return next(ApiError.badRequest('Роль не найдена'));

            await role.remove();
            res.json({ message: 'Роль удалена' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении роли'));
        }
    }
}

module.exports = new RoleController();
