export function createRepositoryRepository(prisma) {
    return {
        upsertRepository: async (name, url) => {
            return prisma.repository.upsert({
                where: { name },
                update: {},
                create: { name, url },
            });
        },
    };
}
