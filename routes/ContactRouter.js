const router = require('express').Router();
const contactController = require('../controllers/ContactController');


router.post('/user/contact', contactController.contactus);


module.exports = router;