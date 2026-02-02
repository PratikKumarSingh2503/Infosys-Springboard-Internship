const { Router } = require('express');
const { overview, bestSellingCategory, profitAndRevenue, bestSellingProduct } = require('../controllers/report.controller');
const router = Router();

router.get('/overview', overview);
router.get('/bestSellingCategory', bestSellingCategory);
router.get('/profitAndRevenue', profitAndRevenue);
router.get('/bestSellingProduct', bestSellingProduct);

module.exports = router;