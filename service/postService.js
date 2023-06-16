const AbstractQueryableService = require('./abstractQueryableService')
const UserService = require('./userService');
const PostRepository = require('../repository/postRepository');
const CommentRepository = require('../repository/commentRepository');
const { validateNumber } = require('../validator/validator');

class PostService extends AbstractQueryableService {
  #userService = new UserService();
  #postRepository = new PostRepository();
  #commentRepository = new CommentRepository();
  #nonSearchParams = ['page', 'size', 'sort', 'order'];
  #textSearchParams = ['content', 'title', this.AUTHOR];

  constructor() {
    super();
    if (!PostService._instance) {
      PostService._instance = this;
    }
    return PostService._instance;
  }

  async findAll(params) {
    const searchParams = this.getSearchParams(params, this.#nonSearchParams, this.#textSearchParams);
    const count = await this.#postRepository.getCount(searchParams);
    const pageParams = this.getPageParams(params, count);
    const pageCount = Math.ceil(count / pageParams.take);
    const sortParams = this.getSortParams(params);
    const additionalParams = { ...pageParams, ...sortParams };
    const posts = await this.#postRepository.findAll(searchParams, additionalParams);
    return { posts, pageCount };
  }

  async findById(id) {
    validateNumber(id);
    return this.#postRepository.findById(id);
  }

  async save(post) {
    return this.#postRepository.save(post);
  }

  async update(id, post) {
    validateNumber(id);
    return this.#postRepository.update(id, post);
  }

  async delete(id) {
    validateNumber(id);
    await this.#commentRepository.deleteAllByPostId(id);
    return this.#postRepository.delete(id);
  }

  async findAllPostComments(id, params) {
    validateNumber(id);
    await this.#validateIfPostExists(id);
    const count = await this.#commentRepository.getCountByPostId(id);
    const pageParams = this.getPageParams(params, count);
    const pageCount = Math.ceil(count / pageParams.take);
    const comments = await this.#commentRepository.findAllByPostId(id, pageParams);
    return { comments, pageCount };
  }

  async savePostComment(id, comment) {
    validateNumber(id);
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
