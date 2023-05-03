const UserRepository = require('../repository/userRepository');
const PostRepository = require('../repository/postRepository');
const CommentRepository = require('../repository/commentRepository');

class UserService {
  #userRepository = new UserRepository();
  #postRepository = new PostRepository();
  #commentRepository = new CommentRepository();

  constructor() {
    if (!UserService._instance) {
      UserService._instance = this;
    }
    return UserService._instance;
  }

  async findAll() {
    return this.#userRepository.findAll();
  }

  async findById(id) {
    return this.#userRepository.findById(id);
  }

  async save(user) {
    return this.#userRepository.save(user);
  }

  async update(id, user) {
    return this.#userRepository.update(id, user);
  }

  async findAllUserPosts(id) {
    await this.#validateIfUserExists(id);
    return this.#postRepository.findAllByUserId(id);
  }

  async findAllUserComments(id) {
    await this.#validateIfUserExists(id);
    return this.#commentRepository.findAllByUserId(id);
  }

  async #validateIfUserExists(id) {
    const user = await this.#userRepository.findById(id);
    if (!user) {
      const error = new Error(`User with id:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
}

module.exports = UserService;
