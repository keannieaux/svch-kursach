const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');

// Получить все роли
router.get('/', roleController.getAllRoles);

// Создать роль
router.post('/', roleController.createRole);

// Получить роль по ID
router.get('/:id', roleController.getRoleById);  

// Обновить роль
router.put('/:id', roleController.updateRole); 

// Удалить роль
router.delete('/:id', roleController.deleteRole); 

module.exports = router;