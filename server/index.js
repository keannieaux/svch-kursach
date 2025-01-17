require('dotenv').config();
const express = require('express');
const connectDB = require('./db'); // Новое подключение к MongoDB
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const orderController = require('./controllers/orderController');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(fileUpload({}));

// Роуты
app.use('/api', router);

// Крон-задача для обновления статуса заказов
cron.schedule('0 0 * * *', () => {
    orderController.updateOrderStatus();
});

// Обработчик ошибок
app.use(errorHandler);

// Запуск сервера
const start = async () => {
    try {
        await connectDB();  // Подключение к MongoDB
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Error occurred during server startup:', error);
    }
};

start();
