const express = require('express');
const threadController = require('../controllers/threadController');
const router = express.Router();
const upload = require('../modules/multerAPI.js');

router.param('id', threadController.CheckID);

//ROUTE HANDLER
router
  .route('/')
  .get(threadController.GetAllThreads)
  .post(threadController.CheckInput, threadController.CreateNewThread);
router
  .route('/:id/:n?')
  .get(threadController.GetThread)
  .patch(threadController.UpdateThread)
  .delete(threadController.DeleteThread);

router.route('/upload').post(upload, threadController.UploadNewFile);

module.exports = router;
