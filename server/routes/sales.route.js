const { Router } = require('express');
const { recordSales } = require('../controllers/sales.controller');

const router = Router();

router.post('/recordSales', recordSales);


module.exports = router;