-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "id" SERIAL NOT NULL,
    "repoId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "mergedAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "prId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "context" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pattern" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "occurrences" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExampleSnippet" (
    "id" SERIAL NOT NULL,
    "patternId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ExampleSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pattern_tag_key" ON "Pattern"("tag");

-- AddForeignKey
ALTER TABLE "PullRequest" ADD CONSTRAINT "PullRequest_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_prId_fkey" FOREIGN KEY ("prId") REFERENCES "PullRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExampleSnippet" ADD CONSTRAINT "ExampleSnippet_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "Pattern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
