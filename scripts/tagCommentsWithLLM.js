import dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { createCommentRepository } from '../repository/commentRepository.js';
import { ERROR_MESSAGES, EXIT_CODES } from '../constants/errors.js';
import { OPENAI } from '../constants/openai.js';
import { PROMPTS } from '../constants/prompts.js';
import { CONSOLE_MESSAGES } from '../constants/messages.js';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.error(ERROR_MESSAGES.MISSING_OPENAI_KEY);
    process.exit(EXIT_CODES.MISSING_ENV);
}

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const commentRepo = createCommentRepository(prisma);

async function generateInsight(commentText, codeContext) {
    const prompt = PROMPTS.insightExtraction({
        code: codeContext,
        comment: commentText,
    });

    try {
        const res = await openai.chat.completions.create({
            model: OPENAI.MODEL,
            messages: [{ role: OPENAI.MESSAGE_ROLE.USER, content: prompt }],
            temperature: OPENAI.TEMPERATURE,
        });

        let content = res.choices[0].message.content;
        content = content.replace(OPENAI.CLEANUP_REGEX, '').trim();
        const parsed = JSON.parse(content);
        return parsed;
    } catch (err) {
        console.error(ERROR_MESSAGES.TAGGING_FAILED, err.message);
        return null;
    }
}

async function handleSingleComment(comment) {
    const insight = await generateInsight(comment.text, comment.context || '');

    if (!insight) {
        console.warn(CONSOLE_MESSAGES.SKIPPED_COMMENT(comment.id));
        return false;
    }

    try {
        await commentRepo.updateCommentWithInsight(comment.id, {
            tag: insight.tag,
            context: insight.context,
            recommendation: insight.recommendation,
        });
        console.log(CONSOLE_MESSAGES.TAGGED_COMMENT(comment.id));
        return true;
    } catch (err) {
        console.error(`${ERROR_MESSAGES.UPDATE_FAILED} #${comment.id}: ${err.message}`);
        return false;
    }
}

export default async function tagCommentsWithLLM() {
    const comments = await commentRepo.getUnlabeledComments(OPENAI.COMMENTS_BATCH_SIZE);

    if (comments.length === 0) {
        console.log(ERROR_MESSAGES.NO_COMMENTS);
        return;
    }

    let successCount = 0;
    let failCount = 0;

    for (const comment of comments) {
        const success = await handleSingleComment(comment);
        success ? successCount++ : failCount++;
    }

    console.log(`\n${CONSOLE_MESSAGES.SUMMARY_DONE}`);
    console.log(CONSOLE_MESSAGES.SUMMARY_SUCCESS(successCount));
    console.log(CONSOLE_MESSAGES.SUMMARY_FAIL(failCount));
}


