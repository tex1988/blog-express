class UserRepository {
  #prisma = require('../prisma/client');

  constructor() {
    if (!UserRepository._instance) {
      UserRepository._instance = this;
    }
    return UserRepository._instance;
  }

  async findAll(params) {
    return this.#prisma.user.findMany({
      where: params
    });
  }

  async findById(id) {
    return this.#prisma.user.findUnique({
      where: {
        userId: Number(id),
      },
    });
  }

  async findByUsername(username) {
    return this.#prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async save(user) {
    return this.#prisma.user.create({
      data: user,
    });
  }

  async update(id, user) {
    return this.#prisma.user.update({
      where: {
        userId: Number(id),
      },
      data: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }
}

module.exports = UserRepository;