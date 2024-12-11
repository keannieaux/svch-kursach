const Router = require('express');
const router = new Router();
const roleController = require('../controllers/roleController');

// Получить все роли
router.get('/getAllRoles', roleController.getAllRoles);

// Создать роль
router.post('/createRole', roleController.createRole);

// Получить роль по ID
router.get('/getRoleById/:id', roleController.getRoleById);  // Теперь ID передается через URL

// Обновить роль
router.put('/updateRole/:id', roleController.updateRole); // Теперь ID передается через URL

// Удалить роль
router.delete('/deleteRole/:id', roleController.deleteRole); // Теперь ID передается через URL

module.exports = router;