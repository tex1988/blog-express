class PostRepository {
  #prisma = require('../prisma/client');

  constructor() {
    if (!PostRepository._instance) {
      PostRepository._instance = this;
    }
    return PostRepository._instance;
  }

  async findAll(params) {
    const { skip, take } = params;
    return this.#prisma.post.findMany({
      skip,
      take,
      include: {
        user: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        created: 'desc',
      },
    });
  }

  async getCount() {
    return this.#prisma.post.count();
  }

  async findAllByUserId(id, params) {
    const { skip, take } = params;
    return this.#prisma.post.findMany({
      skip,
      take,
      where: {
        userId: Number(id),
      },
      include: {
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        created: 'desc',
      },
    });
  }

  async getCountByUserId(id) {
    return this.#prisma.post.count({
      where: {
        userId: Number(id),
      },
    });
  }

  async findById(id) {
    return this.#prisma.post.findFirst({
      where: {
        postId: Number(id),
      },
      include: {
        user: true,
        _count: {
          select: { comments: true },
        },
      },
    });
  }

  async save(post) {
    return this.#prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        created: new Date(),
        userId: Number(post.userId),
      },
      include: {
        user: true,
        _count: {
          select: { comments: true },
        },
      },
    });
  }

  async update(id, post) {
    return this.#prisma.post.update({
      where: {
        postId: Number(id),
      },
      data: {
        title: post.title,
        content: post.content,
        modified: new Date(),
      },
    });
  }

  async delete(id) {
    return this.#prisma.post.delete({
      where: {
        postId: Number(id),
      },
    });
  }
}

module.exports = PostRepository;
