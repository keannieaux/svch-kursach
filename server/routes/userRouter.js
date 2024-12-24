const Router = require('express');
const router = new Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

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

// Получение всех пользователей
router.get('/', userController.getAll);

// Получение пользователя по ID
router.get('/:id', userController.getOne);

// Обновление роли пользователя по ID
router.put('/role/:id', userController.updateUserRole);  // Разделение маршрута для изменения роли пользователя

// Обновление данных пользователя по ID
router.put('/:id', userController.updateUser);

module.exports = router;
