const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');
const handleSuccess = require('../utils/sucessHandler');
const handleErrorAsync = require('../utils/handleErrorAsync');
const AppError = require('../utils/appError');
const postController = require('../controllers/posts');

router
  .get('/', handleErrorAsync(postController.getPosts))
  .post('/', handleErrorAsync(postController.postPost))
  .delete('/', handleErrorAsync(postController.deletePosts))
  .delete('/:id', handleErrorAsync(postController.deletePost))
  .patch('/:id', handleErrorAsync(postController.updatePost));

  module.exports = router;
