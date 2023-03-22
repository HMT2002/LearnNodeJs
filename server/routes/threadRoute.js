const express = require('express');
const threadController = require('../controllers/threadController');
const authController = require('../controllers/authController');
const router = express.Router();
const upload = require('../modules/multerAPI.js');

//router.param('slug', threadController.CheckSlug);

//ROUTE HANDLER
router
  .route('/')
  .get(authController.protect, threadController.GetAllThreads)
  .post(threadController.CheckInput, threadController.CreateNewThread);
router.route('/upload').post(upload, threadController.UploadNewFile);

router
  .route('/:slug/:n?')
  .get(threadController.GetThread)
  .patch(threadController.UpdateThread)
  .delete(threadController.DeleteThread);

module.exports = router;
