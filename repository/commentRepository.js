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

  async findAllByPostId(id, params) {
    const { skip, take } = params;
    return this.#prisma.comment.findMany({
      skip,
      take,
      where: {
        postId: Number(id),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        created: 'desc',
      },
    });
  }

  async getCountByPostId(id) {
    return this.#prisma.comment.count({
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
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        created: 'desc',
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
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(id, comment) {
    return this.#prisma.comment.update({
      where: {
        commentId: Number(id),
      },
      data: {
        content: comment.content,
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
