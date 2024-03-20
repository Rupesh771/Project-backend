const router = require('express').Router();
const ProductsController = require('../controllers/ProductsController');
const upload = require('../Middleware/upload');
const auth = require('../Middleware/auth');
const authAdmin = require('../Middleware/authAdmin');

router.route('/displayproducts')
    .get(ProductsController.getProducts)
    

router.post('/products', upload.single('productimages'),
ProductsController.createProduct);


router.route('/products/:id')
    .delete( ProductsController.deleteProduct)
    .put( ProductsController.updateProduct)



module.exports = router