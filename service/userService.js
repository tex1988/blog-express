const UserRepository = require('../repository/userRepository');
const PostRepository = require('../repository/postRepository');
const CommentRepository = require('../repository/commentRepository');
const { validateNumber, validateParams } = require('../validator/validator');
const { getPageParams } = require('./utils');

class UserService {
  #userRepository = new UserRepository();
  #postRepository = new PostRepository();
  #commentRepository = new CommentRepository();
  #allowedParams = ['username', 'firstname', 'lastname', 'email'];

  constructor() {
    if (!UserService._instance) {
      UserService._instance = this;
    }
    return UserService._instance;
  }

  async findAll(params) {
    validateParams(params, this.#allowedParams);
    return this.#userRepository.findAll(params);
  }

  async findById(id) {
    validateNumber(id);
    return this.#userRepository.findById(id);
  }

  async save(user) {
    return this.#userRepository.save(user);
  }

  async update(id, user) {
    validateNumber(id);
    return this.#userRepository.update(id, user);
  }

  async findAllUserPosts(id, params) {
    validateNumber(id);
    await this.validateIfUserExists(id);
    const count = await this.#postRepository.getCountByUserId(id);
    const pageParams = getPageParams(params, count);
    const pageCount = Math.ceil(count / pageParams.take);
    const posts = await this.#postRepository.findAllByUserId(id, pageParams);
    return { posts, pageCount };
  }

  async findAllUserComments(id) {
    validateNumber(id);
    await this.validateIfUserExists(id);
    return this.#commentRepository.findAllByUserId(id);
  }

  async validateIfUserExists(id) {
    const user = await this.#userRepository.findById(id);
    if (!user) {
      const error = new Error(`User with id:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
}

module.exports = UserService;
