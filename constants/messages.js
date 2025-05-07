export const CONSOLE_MESSAGES = {
    SKIPPED_COMMENT: (id) => `⚠️ Skipped comment #${id}: GPT insight failed`,
    TAGGED_COMMENT: (id) => `✅ Tagged comment #${id}`,
    SUMMARY_DONE: '🎉 Finished tagging comments',
    SUMMARY_SUCCESS: (count) => `✅ Successful: ${count}`,
    SUMMARY_FAIL: (count) => `❌ Failed: ${count}`,
    IMPORT_START: (owner, repo) => `🔍 Importing from: ${owner}/${repo}`,
    IMPORT_DONE: (count, repo) => `✅ Done importing ${count} PRs from ${repo}`,
    ALL_REPOS_DONE: '🎉 All repositories processed.',
    CLEAR_COMMENTS_SUCCESS: '✅ All comments deleted.',
    REPORT_WRITTEN: (filename) => `📁 File "${filename}" has been written.`,
    REPORT_FAILED: '❌ Failed to generate report:',
};
