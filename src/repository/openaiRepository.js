import { OpenAI } from 'openai';
import { OPENAI } from '../constants/openai.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function createOpenAIRepository() {
    return {
        async getAdvice(prompt) {
            const chat = await openai.chat.completions.create({
                model: OPENAI.MODEL,
                messages: [
                    {
                        role: OPENAI.MESSAGE_ROLE.USER,
                        content: prompt,
                    },
                ],
            });

            return chat.choices[0].message.content;
        },
    };
}
