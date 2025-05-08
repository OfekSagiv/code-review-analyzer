import { OpenAI } from 'openai';
import { PROMPTS } from '../constants/prompts.js';
import { ERROR_MESSAGES } from '../constants/errors.js';
import { OPENAI } from '../constants/openai.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAdviceFromHistory(commentRepository, openaiRepo, snippet, description) {
    const comments = await commentRepository.getTaggedCommentsForAdvice();

    const historySummary = comments
        .map(c => `${OPENAI.HISTORY_BULLET} (${c.tag}) ${c.text}`)
        .join('\n');

    const prompt = PROMPTS.getAdvice({
        history: historySummary,
        description,
        snippet,
    });

    try {
        return await openaiRepo.getAdvice(prompt);
    } catch (error) {
        console.error(ERROR_MESSAGES.ADVICE_GENERATION_FAILED, error.message);
        return ERROR_MESSAGES.ADVICE_GENERATION_RESPONSE;
    }
}
