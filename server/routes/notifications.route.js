const { Router } = require('express');
const { getNotifications, delivered, delay, returned } = require('../controllers/notifications.controller');
const authorizeAdmin = require('../middlewares/authorizeAdmin');



const router = Router();

router.get('/getNotifications', authorizeAdmin, getNotifications);
router.post('/delivered', authorizeAdmin, delivered);
router.post('/delay', authorizeAdmin, delay);
router.post('/returned', authorizeAdmin, returned);



module.exports = router;