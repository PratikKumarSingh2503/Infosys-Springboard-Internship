const { Router } = require('express');
const { salesOverview, InventorySummary, purchaseOverview, productSummary, salesAndPurchases, orderSummary, topSellingStock, lowQuantityStock } = require('../controllers/dashboard.controller');

const router = Router();

router.get('/salesOverview', salesOverview);
router.get('/InventorySummary', InventorySummary);
router.get('/purchaseOverview', purchaseOverview);
router.get('/productSummary', productSummary);
router.get('/salesAndPurchases', salesAndPurchases);
router.get('/orderSummary', orderSummary);
router.get('/topSellingStock', topSellingStock);
router.get('/lowQuantityStock', lowQuantityStock);


module.exports = router;