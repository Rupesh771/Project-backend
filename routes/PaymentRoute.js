const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController');
const auth = require('../Middleware/auth');
const authAdmin = require('../Middleware/authAdmin');

router.route('/payment')
    .get(auth, authAdmin, PaymentController.getPayments)
    .post(auth, PaymentController.createPayment)


module.exports = router