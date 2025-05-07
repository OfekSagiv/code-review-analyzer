
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import { CONSOLE_MESSAGES } from '../constants/messages.js';
import { REPORT_CONSTANTS } from '../constants/report.js';
import { createCommentRepository } from '../repository/commentRepository.js';

const prisma = new PrismaClient();
const commentRepo = createCommentRepository(prisma);

export default async function generateInsightsFile() {
    try {
        const tags = await commentRepo.groupTagsWithCounts();
        let output = `${REPORT_CONSTANTS.HEADER}\n\n`;

        for (const tag of tags) {
            output += `${REPORT_CONSTANTS.TAG_LINE(tag.tag, tag._count.tag)}\n`;

            const insights = await commentRepo.getDistinctInsightsByTag(tag.tag);

            insights.forEach((insight, i) => {
                output += `${REPORT_CONSTANTS.CONTEXT_LINE(i + 1, insight.context)}\n`;
                output += `${REPORT_CONSTANTS.RECOMMENDATION_LINE(insight.recommendation)}\n\n`;
            });
        }

        await fs.writeFile(REPORT_CONSTANTS.FILE_NAME, output, REPORT_CONSTANTS.ENCODING);
        console.log(CONSOLE_MESSAGES.REPORT_WRITTEN(REPORT_CONSTANTS.FILE_NAME));
    } catch (error) {
        console.error(CONSOLE_MESSAGES.REPORT_FAILED, error.message);
    } finally {
        await prisma.$disconnect();
    }
}


