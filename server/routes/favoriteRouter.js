const Router = require ('express')
const favoriteController = require('../controllers/favoriteController')
const router = new Router()

router.get('/getFavoriteByUser', favoriteController.getFavoriteByUser)
router.post('/addfavorite', favoriteController.addFavorite)
router.delete('/removeFavorite', favoriteController.removeFavorite)

module.exports = router