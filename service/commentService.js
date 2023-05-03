const UserRepository = require('../repository/userRepository');
const PostRepository = require('../repository/postRepository');
const CommentRepository = require('../repository/commentRepository');

class CommentService {
  #userRepository = new UserRepository();
  #postRepository = new PostRepository();
  #commentRepository = new CommentRepository();

  constructor() {
    if (!CommentService._instance) {
      CommentService._instance = this;
    }
    return CommentService._instance;
  }

  async findAll() {
    return this.#commentRepository.findAll();
  }

  async findById(id) {
    return this.#commentRepository.findById(id);
  }

  async save(comment) {
    return this.#commentRepository.save(comment);
  }

  async update(id, comment) {
    return this.#commentRepository.update(id, comment);
  }

  async delete(id) {
    return this.#commentRepository.delete(id);
  }
}

module.exports = CommentService;
