const { Router } = require('express');
const { addSupplier, getSuppliers } = require('../controllers/supplier.controller');
const authorizeAdmin = require('../middlewares/authorizeAdmin');


const router = Router();

router.get('/getSuppliers', authorizeAdmin, getSuppliers);
router.post('/addSupplier', authorizeAdmin, addSupplier);


module.exports = router;