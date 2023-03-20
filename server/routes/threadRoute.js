const express = require('express');
const threadController = require('../controllers/threadController');
const router = express.Router();
const upload = require('../modules/multerAPI.js');

//router.param('slug', threadController.CheckSlug);

//ROUTE HANDLER
router
  .route('/')
  .get(threadController.GetAllThreads)
  .post(threadController.CheckInput, threadController.CreateNewThread);
router.route('/upload').post(upload, threadController.UploadNewFile);

router
  .route('/:slug/:n?')
  .get(threadController.GetThread)
  .patch(threadController.UpdateThread)
  .delete(threadController.DeleteThread);

module.exports = router;
