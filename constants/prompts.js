export const PROMPTS = {
    getAdvice: ({ history, description, snippet }) => `
You are a personal code advisor. The user previously received these review comments:
${history}

Now the user is working on: "${description}"
Code snippet:
${snippet}

What should the user be careful about based on their past mistakes?
Give actionable advice in bullet points.
`
    ,
    insightExtraction: ({ code, comment }) => `You are an expert code reviewer.

Given the following code block and the associated review comment, extract:
- A short general tag (e.g., "naming", "readability", "architecture", "error handling", etc.)
- A clear context that explains what the issue is
- A useful recommendation to avoid this issue in the future

CODE:
"""
${code}
"""

COMMENT:
"""
${comment}
"""

Respond in this JSON format (no code fences or markdown):
{
  "tag": "",
  "context": "",
  "recommendation": ""
}`
};
