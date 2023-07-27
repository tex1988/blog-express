const express = require('express');
const router = express.Router();
const UserService = require('../service/userService');
const userService = new UserService();
const validateSchema = require('../validator/schema/schemaValidator');
const { postUser, putUser } = require('../validator/schema/userSchema');

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.findAll(req.query);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.findById(userId);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/', validateSchema(postUser), async (req, res, next) => {
  try {
    const user = await userService.save(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.put('/:userId', validateSchema(putUser), async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.update(userId, req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get('/:userId/post', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await userService.findAllUserPosts(userId, req.query);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get('/:userId/post/:postId', async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const post = await userService.findUserPost(userId, postId);
    res.json(post);
  } catch (e) {
    next(e);
  }
});

router.get('/:userId/comment', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const comments = await userService.findAllUserComments(userId);
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
