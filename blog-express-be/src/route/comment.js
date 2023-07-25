const express = require('express');
const router = express.Router();
const CommentService = require('../service/commentService');
const commentService = new CommentService();
const validateSchema = require('../validator/schema/schemaValidator');
const { postComment, putComment } = require('../validator/schema/commentSchema');

router.get('/', async (req, res, next) => {
  try {
    const comments = await commentService.findAll();
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

router.get('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.findById(commentId);
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.post('/', validateSchema(postComment), async (req, res, next) => {
  try {
    const comment = await commentService.save(req.body);
    res.status(201).json(comment);
  } catch (e) {
    next(e);
  }
});

router.put('/:commentId', validateSchema(putComment), async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.update(commentId, req.body);
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.delete('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentService.delete(commentId);
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
