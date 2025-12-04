// Test utility for the Research Orchestrator

import { ResearchOrchestrator } from '../agents/orchestrator';

/**
 * Simple test function to verify the orchestrator works
 */
export async function testOrchestrator() {
  console.log('🧪 Testing Research Orchestrator...\n');

  const orchestrator = new ResearchOrchestrator();

  try {
    const result = await orchestrator.conductResearch({
      query: 'Impact of artificial intelligence on healthcare',
      focusAreas: ['cost reduction', 'patient outcomes'],
      maxSources: 3,
      citationFormat: 'apa'
    });

    console.log('✅ Research completed successfully!\n');
    console.log('📊 Results Summary:');
    console.log(`   Query: ${result.query}`);
    console.log(`   Sources Found: ${result.searchResults.length}`);
    console.log(`   Key Points: ${result.analysis.keyPoints.length}`);
    console.log(`   Trends Identified: ${result.analysis.trends.length}`);
    console.log(`   Report Word Count: ${result.summary.wordCount}`);
    console.log(`   Citations: ${result.citations.formattedSources.length}\n`);

    console.log('📝 Executive Summary Preview:');
    console.log(result.summary.executiveSummary.substring(0, 200) + '...\n');

    return result;
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  testOrchestrator()
    .then(() => {
      console.log('✅ All tests passed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Tests failed:', error);
      process.exit(1);
    });
}

