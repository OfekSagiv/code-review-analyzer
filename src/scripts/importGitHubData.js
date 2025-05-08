import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { fetchClosedPullRequests, fetchReviewCommentsWithContext } from '../services/githubService.js';
import { createPullRequestRepository } from '../repository/pullRequestRepository.js';
import { createRepositoryRepository } from '../repository/repositoryRepository.js';
import { createCommentRepository } from '../repository/commentRepository.js';
import { GITHUB } from '../constants/github.js';
import { ERROR_MESSAGES } from '../constants/errors.js';
import { CONSOLE_MESSAGES } from '../constants/messages.js';

dotenv.config();
const prisma = new PrismaClient();

const repositoryRepo = createRepositoryRepository(prisma);
const pullRequestRepo = createPullRequestRepository(prisma);
const commentRepo = createCommentRepository(prisma);

const fullName = process.env[GITHUB.REPO_ENV_VAR]?.trim();
if (!fullName) {
    console.error(ERROR_MESSAGES.MISSING_GITHUB_REPO);
    process.exit(1);
}

const [owner, repo] = fullName.split('/');

export default async function importGitHubData() {
    try {
        console.log(CONSOLE_MESSAGES.IMPORT_START(owner, repo));

        const repoRecord = await repositoryRepo.upsertRepository(repo, `${GITHUB.BASE_URL}/${owner}/${repo}`);
        const prs = await fetchClosedPullRequests(owner, repo);

        for (const pr of prs) {
            const created = await pullRequestRepo.upsertPullRequest(repoRecord.id, pr);
            const comments = await fetchReviewCommentsWithContext(owner, repo, pr.number);

            for (const comment of comments) {
                await commentRepo.createComment(created.id, comment);
            }
        }

        console.log(CONSOLE_MESSAGES.IMPORT_DONE(prs.length, repo));
        console.log(CONSOLE_MESSAGES.ALL_REPOS_DONE);
    } catch (error) {
        console.error(ERROR_MESSAGES.IMPORT_FAILED, error.message);
        process.exit(1);
    }
}


