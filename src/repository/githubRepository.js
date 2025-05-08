
import { Octokit } from '@octokit/rest';
import { GITHUB } from '../constants/github.js';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export function createGitHubRepository() {
    return {
        async fetchClosedPullRequests(owner, repo) {
            const { data: prs } = await octokit.pulls.list({
                owner,
                repo,
                state: GITHUB.PR_STATE_CLOSED,
                per_page: 100,
            });
            return prs.filter(pr => pr[GITHUB.PR_MERGED_FIELD]);
        },

        async fetchReviewCommentsWithContext(owner, repo, prNumber) {
            const { data: comments } = await octokit.pulls.listReviewComments({
                owner,
                repo,
                [GITHUB.PR_NUMBER_FIELD]: prNumber,
                per_page: 100,
            });

            return comments.map(comment => ({
                body: comment[GITHUB.REVIEW_COMMENT_FIELDS.BODY],
                path: comment[GITHUB.REVIEW_COMMENT_FIELDS.PATH],
                original_line: comment[GITHUB.REVIEW_COMMENT_FIELDS.LINE],
                diff_hunk: comment[GITHUB.REVIEW_COMMENT_FIELDS.DIFF],
            }));
        },
    };
}
