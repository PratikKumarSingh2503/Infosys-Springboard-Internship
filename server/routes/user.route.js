const { Router } = require('express');
const { register, login, forgotPassword, resetPassword, editProfile, getUser } = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/authenticateUser');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/editProfile', authenticateUser, editProfile);
router.get('/getUser', authenticateUser, getUser);


module.exports = router;