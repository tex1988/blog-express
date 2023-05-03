const express = require('express');
const router = express.Router();
const PostService = require('../service/postService');
const postService = new PostService();

router.get('/', async (req, res, next) => {
  try {
    const posts = await postService.findAll();
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

router.post('/', async (req, res, next) => {
  try {
    const post = await postService.save(req.body);
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
});

router.put('/:postId', async (req, res, next) => {
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
    const comments = await postService.findAllPostComments(postId);
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

router.post('/:postId/comment', async (req, res, next) => {
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
