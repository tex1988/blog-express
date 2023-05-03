const express = require('express');
const router = express.Router();
const CommentRepository = require('../repository/commentRepository');
const commentRepository = new CommentRepository();

router.get('/', async (req, res, next) => {
  try {
    const comments = await commentRepository.findAll();
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

router.get('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentRepository.findById(commentId);
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const comment = await commentRepository.save(req.body);
    res.status(201).json(comment);
  } catch (e) {
    next(e);
  }
});

router.put('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentRepository.update(commentId, req.body);
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

router.delete('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentRepository.delete(commentId);
    res.json(comment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
