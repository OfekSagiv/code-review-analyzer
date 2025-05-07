import importGitHubData from './importGitHubData.js';
import tagCommentsWithLLM from './tagCommentsWithLLM.js';
import generateInsightsFile from './extractInsightsToTextFile.js';

async function runAll() {
    try {
        await importGitHubData();
        await tagCommentsWithLLM();
        await generateInsightsFile();
        console.log('✅ All scripts completed successfully.');
    } catch (error) {
        console.error('❌ Failed to complete scripts:', error.message);
    }
}

runAll();
