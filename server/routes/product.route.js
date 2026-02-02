const { Router } = require('express');
const { getProducts, getTopSellingProducts, getProductsByIdsList, getProductsByCateogory, getLimitedProducts, getProduct, searchProduct, inventoryStats, productPagination } = require('../controllers/product.controller');


const router = Router();

router.get('/getproducts', getProducts);
router.get('/getTopSellingProducts', getTopSellingProducts);
router.get('/getProductsByCateogory', getProductsByCateogory);
router.get('/getLimitedProducts', getLimitedProducts);
router.get('/searchProduct', searchProduct);
router.get('/inventoryStats', inventoryStats);
router.get('/productPagination', productPagination);

router.post('/getProductsByIdsList', getProductsByIdsList);
router.get('/getProduct/:id', getProduct);

module.exports = router;