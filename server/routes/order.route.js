const { Router } = require('express');
const { placeOrder, getOrders, overAllOrders } = require('../controllers/order.controller');
const authorizeAdmin = require('../middlewares/authorizeAdmin');


const router = Router();

router.post('/placeOrder', authorizeAdmin, placeOrder);
router.get('/getOrders', getOrders);
router.get('/overAllOrders', overAllOrders);



module.exports = router;