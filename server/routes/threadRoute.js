const express = require('express');
const threadController = require('../controllers/threadController');
const router = express.Router();

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

module.exports = router;
