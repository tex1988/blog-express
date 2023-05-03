BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [userId] BIGINT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(20) NOT NULL,
    [firstName] VARCHAR(50),
    [lastName] VARCHAR(50),
    [email] VARCHAR(100) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([userId]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [postId] BIGINT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(100) NOT NULL,
    [content] VARCHAR(max) NOT NULL,
    [created] DATETIME2 NOT NULL,
    [modified] DATETIME2,
    [userId] BIGINT NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([postId]),
    CONSTRAINT [Post_title_key] UNIQUE NONCLUSTERED ([title])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [commentId] BIGINT NOT NULL IDENTITY(1,1),
    [content] VARCHAR(max) NOT NULL,
    [created] DATETIME2 NOT NULL,
    [modified] DATETIME2,
    [userId] BIGINT NOT NULL,
    [postId] BIGINT NOT NULL,
    CONSTRAINT [Comment_pkey] PRIMARY KEY CLUSTERED ([commentId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [Comment_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Post]([postId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
