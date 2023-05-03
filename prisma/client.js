const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

module.exports = prisma;