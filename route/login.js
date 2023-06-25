const express = require('express');
const router = express.Router();
const UserService = require('../service/userService');
const userService = new UserService();

router.post('/', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = await userService.logInUser(username, password);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;