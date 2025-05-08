import { createGitHubRepository } from '../repository/githubRepository.js';
import { ERROR_MESSAGES } from '../constants/errors.js';

const githubRepo = createGitHubRepository();

export async function fetchClosedPullRequests(owner, repo) {
    try {
        return await githubRepo.fetchClosedPullRequests(owner, repo);
    } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_CLOSED_PRS_FAILED, error.message);
        return [];
    }
}

export async function fetchReviewCommentsWithContext(owner, repo, prNumber) {
    try {
        return await githubRepo.fetchReviewCommentsWithContext(owner, repo, prNumber);
    } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_REVIEW_COMMENTS_FAILED(prNumber), error.message);
        return [];
    }
}
