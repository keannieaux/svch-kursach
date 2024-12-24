const Router = require('express');
const router = new Router();

const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const favoriteRouter = require('./favoriteRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const categoryRouter = require('./categoryRouter');
const productImageRouter = require('./productImageRouter');
const roleRouter = require('./roleRouter');

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/favorites', favoriteRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/product-images', productImageRouter);
router.use('/roles', roleRouter);

module.exports = router;
