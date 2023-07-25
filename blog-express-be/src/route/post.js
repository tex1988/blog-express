const express = require('express');
const router = express.Router();
const PostService = require('../service/postService');
const postService = new PostService();
const validateSchema = require('../validator/schema/schemaValidator');
const { postPutPost } = require('../validator/schema/postSchema');
const { postComment } = require('../validator/schema/commentSchema');

router.get('/', async (req, res, next) => {
  try {
    const posts = await postService.findAll(req.query);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.findById(postId);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

router.post('/', validateSchema(postPutPost), async (req, res, next) => {
  try {
    const post = await postService.save(req.body);
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
});

router.put('/:postId', validateSchema(postPutPost), async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.update(postId, req.body);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

router.get('/:postId/comment', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await postService.findAllPostComments(postId, req.query);
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

router.post('/:postId/comment', validateSchema(postComment), async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await postService.savePostComment(postId, req.body);
    res.status(201).json(comments);
  } catch (e) {
    next(e);
  }
});

router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.delete(postId);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
