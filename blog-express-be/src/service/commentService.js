const CommentRepository = require('../repository/commentRepository');
const { validateNumber } = require('../validator/validator');

class CommentService {
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
    validateNumber(id);
    const comment = await this.#commentRepository.findById(id);
    if(comment) {
      return comment
    } else {
      const error = new Error(`Comment with id:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  async save(comment) {
    return this.#commentRepository.save(comment);
  }

  async update(id, comment) {
    validateNumber(id);
    await this.#validateIfCommentExists(id);
    return this.#commentRepository.update(id, comment);
  }

  async delete(id) {
    validateNumber(id);
    await this.#validateIfCommentExists(id);
    return this.#commentRepository.delete(id);
  }

  async #validateIfCommentExists(id) {
    const post = await this.#commentRepository.findById(id);
    if (!post) {
      const error = new Error(`Comment with id:${id} not found`);
      error.status = 404;
      throw error;
    }
  }
}

module.exports = CommentService;
