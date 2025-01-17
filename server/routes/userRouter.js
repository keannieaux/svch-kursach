const Router = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');


const router = new Router();

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

// Обновление роли пользователя по ID
router.put('/role/:id', userController.updateUserRole);

// Обновление данных пользователя по ID
router.put(
  '/:id',
  [
    check('email').isEmail().withMessage('Email is invalid').optional(),
    check('firstname').notEmpty().withMessage('Firstname is required').optional(),
    check('lastname').notEmpty().withMessage('Lastname is required').optional(),
    check('delivery_address').notEmpty().withMessage('Delivery address is required').optional(),
    check('phone_number').optional().matches(/^\+[1-9]\d{1,14}$/).withMessage('Phone number is invalid')
  ],
  userController.updateUser
);

module.exports = router;
