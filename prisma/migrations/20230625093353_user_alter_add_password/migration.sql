-- AlterTable
ALTER TABLE "User" ADD
    -- Default password - 'test1234'
    COLUMN "password" VARCHAR(100) NOT NULL DEFAULT '$2b$10$qtdCYNB6sf9fwXDszpcyoO1/qkHk89rzSqW7JJ.lXMynmaxCnthaS';
ALTER TABLE "User"
    ALTER COLUMN "password" DROP DEFAULT;
