/*
  Warnings:

  - A unique constraint covering the columns `[repoId,number]` on the table `PullRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PullRequest_repoId_number_key" ON "PullRequest"("repoId", "number");
