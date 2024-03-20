const router = require('express').Router()
const CategoryController = require('../controllers/CategoryControllers');
const auth = require('../Middleware/auth');
const authAdmin = require('../Middleware/authAdmin');

router.route('/category')
.get(CategoryController.getCategories)
.post( CategoryController.createCategory)

router.route('/category/:id')
.delete(CategoryController.deleteCategory)
.put(CategoryController.updateCategory )

module.exports = router;
