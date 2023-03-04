const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.param('id', postController.CheckID);

//ROUTE HANDLER
router.route('/').get(postController.GetAllPosts).post(postController.CheckInput, postController.CreateNewPost);
router.route('/test').post(postController.CreateNewPostTest);

router.route('/:id/:n?').get(postController.GetPost).patch(postController.UpdatePost).delete(postController.DeletePost);

module.exports = router;
