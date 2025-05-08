export const ERROR_MESSAGES = {
    LOAD_PATTERNS_FAILED: 'Failed to load insights',
    GET_ADVICE_FAILED: 'Failed to get advice',
    MISSING_OPENAI_KEY: '❌ OPENAI_API_KEY is missing in your .env file',
    TAGGING_FAILED: '❌ Failed to tag comment during GPT call:',
    UPDATE_FAILED: '❌ Failed to update comment',
    ADVICE_GENERATION_FAILED: '❌ Failed to generate advice from GPT:',
    ADVICE_GENERATION_RESPONSE: 'An error occurred while generating advice.',
    FETCH_CLOSED_PRS_FAILED: '❌ Failed to fetch closed PRs:',
    FETCH_REVIEW_COMMENTS_FAILED: (prNumber) => `❌ Failed to fetch review comments for PR #${prNumber}:`,
    NO_COMMENTS: '✅ No untagged comments found',
    SUMMARY_SUCCESS: '✅ Successful:',
    SUMMARY_FAIL: '❌ Failed:',
    SUMMARY_DONE: '🎉 Finished tagging comments',
    CLEAR_COMMENTS_FAILED: '❌ Failed to delete comments:',
    MISSING_GITHUB_REPO: '❌ GITHUB_REPO is missing in your .env file',
};

export const EXIT_CODES = {
    MISSING_ENV: 1,
};
