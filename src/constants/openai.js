export const OPENAI = {
    MODEL: 'gpt-4',
    MESSAGE_ROLE: {
        USER: 'user',
    },
    HISTORY_BULLET: '•',
    COMMENT_FIELDS: {
        TEXT: 'text',
        TAG: 'tag',
    },
    DISTINCT_FIELDS: ['text', 'tag'],
    COMMENT_TAG_FILTER: {
        not: ''
    },
    TEMPERATURE: 0.2,
    CLEANUP_REGEX: /```json|```/g,
    COMMENT_EMPTY_TAG_FILTER: '',
    COMMENTS_BATCH_SIZE: 100,
};


