const express = require('express');
const testController = require('../controllers/testController');
const postController = require('../controllers/postController');
const signController = require('../controllers/signController');
const userController = require('../controllers/userController');
const upload = require('../modules/multerAPI.js');

const router = express.Router();

router.param('id', signController.CheckID);

//ROUTE HANDLER
router.route('/').post(signController.CheckID, signController.CheckInput, signController.SignUp);

router.route('/upload').post(upload, testController.UploadNewFile);
router.route('/posts').get(testController.GetAllPosts).post(testController.CreateNewPost);

router.route('/:id').post(signController.CheckID, signController.CheckInput, signController.SignIn);
router.route('/:id/out').post(signController.CheckID, signController.CheckInput, signController.SignOut);

module.exports = router;
