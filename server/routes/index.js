const Router = require ('express')
const router = new Router()
const cartRouter = require ('./cartRouter')
const userRouter = require ('./userRouter')
const favoriteRouter = require ('./favoriteRouter')
const productRouter = require ('./productRouter')
const orderRouter = require ('./orderRouter')

router.use('/user', userRouter)
router.use('/cart', cartRouter)
router.use('/favorite', favoriteRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)

module.exports = router