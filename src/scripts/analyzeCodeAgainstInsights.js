import fs from 'fs';
import readline from 'readline';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is missing in your .env file');
    process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function loadInsightsFromFile(path) {
    const content = fs.readFileSync(path, 'utf-8');
    const matches = [...content.matchAll(/Context: (.*?)\n\s*Recommendation: (.*?)\n/g)];
    return matches.map(match => ({
        context: match[1].trim(),
        recommendation: match[2].trim(),
    }));
}

function formatInsights(insights) {
    return insights.map(i => `Context: ${i.context}\nRecommendation: ${i.recommendation}`).join('\n---\n');
}

async function analyze(code) {
    const insights = loadInsightsFromFile('insights_report.txt');
    const prompt = `You are assisting in identifying whether a new code snippet exhibits similar issues to those found in past code review insights.

Each past insight includes:
- A context describing what was found in the code
- A recommendation for improvement

Please compare the **structure, logic, naming, error handling, security, readability**, or **design patterns** used in the new code with the past insights — even if the exact syntax or variable names differ. Focus on matching high-level issues, not surface differences.

Past insights:
${formatInsights(insights)}

New code to evaluate:
"""
${code}
"""

Your task:
1. If you find any similarity between the new code and one or more past insights, list:
   - The matching insight(s)
   - A short explanation of the similarity
2. If no insight is relevant, respond with: "No match found with previous insights."`;
    const res = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
    });

    console.log('\n🧠 Analysis Result:\n');
    console.log(res.choices[0].message.content);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('🔍 Enter your code snippet: ', async (code) => {
    await analyze(code);
    rl.close();
});
