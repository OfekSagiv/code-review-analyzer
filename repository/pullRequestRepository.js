export function createPullRequestRepository(prisma) {
    return {
        upsertPullRequest: async (repoId, pr) => {
            return prisma.pullRequest.upsert({
                where: {
                    repoId_number: {
                        repoId,
                        number: pr.number,
                    },
                },
                update: {},
                create: {
                    title: pr.title,
                    number: pr.number,
                    mergedAt: new Date(pr.merged_at),
                    author: pr.user.login,
                    repoId,
                },
            });
        },
    };
}
