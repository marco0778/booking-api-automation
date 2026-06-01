const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/all', adminController.getAllUser);

module.exports = router;