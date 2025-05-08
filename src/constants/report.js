export const REPORT_CONSTANTS = {
    FILE_NAME: 'insights_report.txt',
    ENCODING: 'utf-8',
    HEADER: '📌 Tags and their counts:',
    TAG_LINE: (tag, count) => `🔖 ${tag} (${count})`,
    CONTEXT_LINE: (index, context) => `  ${index}. Context: ${context}`,
    RECOMMENDATION_LINE: (recommendation) => `     Recommendation: ${recommendation}`,
};
