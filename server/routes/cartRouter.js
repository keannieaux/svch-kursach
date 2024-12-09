const Router = require ('express')
const cartController = require('../controllers/cartController')
const router = new Router()

router.get('/getCartByUser', cartController.getCartByUser)
router.post('/addToCart', cartController.addToCart)
router.delete('/removeFromCart', cartController.removeFromCart)

module.exports = router