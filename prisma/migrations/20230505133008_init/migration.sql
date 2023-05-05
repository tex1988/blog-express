-- CreateTable
CREATE TABLE "User" (
    "userId" BIGSERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Post" (
    "postId" BIGSERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" VARCHAR NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "modified" TIMESTAMP(3),
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" BIGSERIAL NOT NULL,
    "content" VARCHAR NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "modified" TIMESTAMP(3),
    "userId" BIGINT NOT NULL,
    "postId" BIGINT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
