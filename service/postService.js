const UserService = require('./userService');
const PostRepository = require('../repository/postRepository');
const CommentRepository = require('../repository/commentRepository');
const { isNumber } = require('../validator/validator');

class PostService {
  #userService = new UserService();
  #postRepository = new PostRepository();
  #commentRepository = new CommentRepository();

  constructor() {
    if (!PostService._instance) {
      PostService._instance = this;
    }
    return PostService._instance;
  }

  async findAll() {
    return this.#postRepository.findAll();
  }

  async findById(id) {
    isNumber(id);
    return this.#postRepository.findById(id);
  }

  async save(post) {
    return this.#postRepository.save(post);
  }

  async update(id, post) {
    isNumber(id);
    return this.#postRepository.update(id, post);
  }

  async delete(id) {
    isNumber(id);
    await this.#commentRepository.deleteAllByPostId(id);
    return this.#postRepository.delete(id);
  }

  async findAllPostComments(id) {
    isNumber(id);
    await this.#validateIfPostExists(id);
    return this.#commentRepository.findAllByPostId(id);
  }

  async savePostComment(id, comment) {
    isNumber(id);
    await this.#userService.validateIfUserExists(comment.userId);
    await this.#validateIfPostExists(id);
    comment.postId = id;
    return this.#commentRepository.save(comment);
  }

  async #validateIfPostExists(id) {
    const post = await this.#postRepository.findById(id);
    if (!post) {
      const error = new Error(`Post with id:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
}

module.exports = PostService;
