const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.param('id', userController.CheckID);

//ROUTE HANDLER
router.route('/').get(userController.GetAllUsers).post(userController.CheckInput, userController.CreateNewUser);
router.route('/:id/:n?').get(userController.GetUser).patch(userController.UpdateUser).delete(userController.DeleteUser);

module.exports = router;
