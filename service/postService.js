const UserService = require('./userService');
const PostRepository = require('../repository/postRepository');
const CommentRepository = require('../repository/commentRepository');
const { validateNumber } = require('../validator/validator');
const { getPageParams } = require('./utils');

class PostService {
  #userService = new UserService();
  #postRepository = new PostRepository();
  #commentRepository = new CommentRepository();
  #nonSearchParams = ['page', 'size', 'sort', 'order']

  constructor() {
    if (!PostService._instance) {
      PostService._instance = this;
    }
    return PostService._instance;
  }

  async findAll(params) {
    const searchParams = this.#getSearchParams(params);
    const count = await this.#postRepository.getCount(searchParams);
    const pageParams = getPageParams(params, count);
    const pageCount = Math.ceil(count / pageParams.take);
    const sortParams = this.#getSortParams(params);
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
    const pageParams = getPageParams(params, count);
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

  #getSortParams(params) {
    if(params.sort === 'author') {
      return this.#getSortParamsForAuthor(params);
    }
    let key;
    let value;
    params.order ? (value = params.order) : (value = 'desc');
    params.sort ? (key = params.sort) : (key = 'created');
    return { sortBy: [{ [key]: value }] };
  }

  #getSortParamsForAuthor(params) {
    let value;
    params.order ? (value = params.order) : (value = 'desc');
    return {
      sortBy: [{ user: { firstName: value } }, { user: { lastName: value } }],
    };
  }

  #getSearchParams(params) {
    const searchParams = {... params};
    this.#nonSearchParams.forEach(param => delete searchParams[param])
    Object.entries(searchParams).forEach(entry => {
      const [key, value] = entry;
      if(!isNaN(value)) {
        searchParams[key] = Number(value)
      }
    })
    return searchParams;
  }
}

module.exports = PostService;
