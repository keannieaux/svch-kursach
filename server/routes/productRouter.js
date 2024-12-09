const Router = require ('express')
const productController = require('../controllers/productController')
const router = new Router()

router.get('/getAllProduct', productController.getAllProduct)
router.get('/getProductById', productController.getProductById)
router.get('/createProduct', productController.createProduct)
router.put('/updateProduct', productController.updateProduct)
router.delete('/deleteProduct', productController.deleteProduct)

module.exports = router