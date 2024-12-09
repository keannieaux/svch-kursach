const Router = require ('express')
const orderController = require('../controllers/orderController')
const router = new Router()

router.get('/getOrderByUser', orderController.getOrderByUser)
router.post('/createOrder', orderController.createOrder)

module.exports = router