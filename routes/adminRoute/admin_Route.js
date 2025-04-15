const express = require('express');
const { login, verifyOTP } = require('../../controllers/admin/auth/login');
const { registerAdmin } = require('../../controllers/admin/auth/register');
// const { login, verifyOTP } = require('../controllers/adminController');
const router = express.Router();

// router.post('/login', login);
// router.post('/verify-otp', verifyOTP);

router.post('/login', login);
// router.post('/verify-otp', verifyOTP);

router.post('/register', registerAdmin);


module.exports = router;
