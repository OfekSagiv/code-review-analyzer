export function createCommentRepository(prisma) {
    return {
        createComment: async (prId, comment) => {
            return prisma.comment.create({
                data: {
                    prId,
                    filePath: comment.path,
                    lineNumber: comment.original_line || 0,
                    text: comment.body,
                    context: comment.diff_hunk || '',
                    tag: '',
                },
            });
        },

        getTaggedCommentsForAdvice: async () => {
            return prisma.comment.findMany({
                select: {
                    text: true,
                    tag: true,
                },
                where: {
                    tag: {
                        not: '',
                    },
                },
                distinct: ['text', 'tag'],
            });
        },

        getUnlabeledComments: async (limit = 50) => {
            return prisma.comment.findMany({
                where: {
                    tag: '',
                },
                take: limit,
            });
        },

        updateCommentWithInsight: async (id, { tag, context, recommendation }) => {
            return prisma.comment.update({
                where: { id },
                data: { tag, context, recommendation },
            });
        },

        groupTagsWithCounts: async () => {
            return prisma.comment.groupBy({
                by: ['tag'],
                where: {
                    tag: {
                        not: '',
                    },
                },
                _count: {
                    tag: true,
                },
            });
        },

        getDistinctInsightsByTag: async (tag) => {
            return prisma.comment.findMany({
                where: { tag },
                select: {
                    context: true,
                    recommendation: true,
                },
                distinct: ['context', 'recommendation'],
            });
        },
    };


}


