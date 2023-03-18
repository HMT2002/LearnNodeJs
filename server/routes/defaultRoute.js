const express = require('express');
const defaultController = require('../controllers/defaultController');
const router = express.Router();

//ROUTE HANDLER
router.route('/').get(defaultController.Default);

module.exports = router;
