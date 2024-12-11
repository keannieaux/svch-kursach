const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

// Получение всех пользователей
router.get('/getAllUsers', userController.getAllUsers);

// Получение пользователя по ID
router.get('/getUserById/:id', userController.getUserById);

// Создание нового пользователя
router.post('/createUser', userController.createUser);

// Обновление пользователя по ID
router.put('/updateUser/:id', userController.updateUser);

// Удаление пользователя по ID
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
