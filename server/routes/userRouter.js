const Router = require('express');
const router = new Router();
const { check } = require('express-validator');
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

// Регистрация нового пользователя
router.post(
    '/registration',
    [
        check('email').isEmail().withMessage('Email is invalid'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        check('firstname').notEmpty().withMessage('Firstname is required'),
        check('lastname').notEmpty().withMessage('Lastname is required'),
    ],
    userController.registration
);

// Логин пользователя
router.post('/login', userController.login);

// Логаут пользователя
router.post('/logout', userController.logout);

// Обновление токена
router.post('/refresh', userController.refresh);

module.exports = router;
