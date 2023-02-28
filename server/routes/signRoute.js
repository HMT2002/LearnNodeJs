const express = require('express');
const signController = require('../controllers/signController');
const router = express.Router();

router.param('id', signController.CheckID);

//ROUTE HANDLER
router.route('/').post(signController.CheckID, signController.CheckInput, signController.SignUp);
router.route('/:id').post(signController.CheckID, signController.CheckInput, signController.SignIn);
router.route('/:id/out').post(signController.CheckID, signController.CheckInput, signController.SignOut);

module.exports = router;
