class CommentRepository {
  #prisma = require('../prisma/client');

  constructor() {
    if (!CommentRepository._instance) {
      CommentRepository._instance = this;
    }
    return CommentRepository._instance;
  }

  async findAll() {
    return this.#prisma.comment.findMany();
  }

  async findAllByUserId(id) {
    return this.#prisma.comment.findMany({
      where: {
        userId: Number(id),
      },
    });
  }

  async findAllByPostId(id) {
    return this.#prisma.comment.findMany({
      where: {
        postId: Number(id),
      },
    });
  }

  async findById(id) {
    return this.#prisma.comment.findFirst({
      where: {
        commentId: Number(id),
      },
    });
  }

  async save(comment) {
    return this.#prisma.comment.create({
      data: {
        content: comment.content,
        userId: Number(comment.userId),
        postId: Number(comment.postId),
        created: new Date(),
      },
    });
  }

  async update(id, comment) {
    return this.#prisma.comment.update({
      where: {
        commentId: Number(id),
      },
      data: {
        content: comment.title,
        modified: new Date(),
      },
    });
  }

  async delete(id) {
    return this.#prisma.comment.delete({
      where: {
        commentId: Number(id),
      },
    });
  }

  async deleteAllByPostId(id) {
    return this.#prisma.comment.deleteMany({
      where: {
        postId: Number(id),
      },
    });
  }
}

module.exports = CommentRepository;
