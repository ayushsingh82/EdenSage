# Usage Examples

## Basic Research Query

### Using the Orchestrator Directly

```typescript
import { ResearchOrchestrator } from '@/lib/agents/orchestrator';

const orchestrator = new ResearchOrchestrator();

// Conduct research
const result = await orchestrator.conductResearch({
  query: 'Impact of AI on healthcare costs',
  focusAreas: ['cost reduction', 'patient outcomes', 'efficiency'],
  maxSources: 10,
  citationFormat: 'apa'
});

console.log('Executive Summary:', result.summary.executiveSummary);
console.log('Key Points:', result.analysis.keyPoints);
console.log('Citations:', result.citations.bibliography);
```

## Via Edenlayer Protocol

### 1. Execute a Single Task

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: YOUR_API_KEY" \
  -d '{
    "agentId": "YOUR_ORCHESTRATOR_AGENT_ID",
    "operation": "tools/conductResearch",
    "params": {
      "query": "Impact of AI on healthcare costs",
      "maxSources": 5,
      "citationFormat": "apa"
    }
  }' \
  https://api.edenlayer.com/tasks
```

### 2. Check Task Status

```bash
curl -X GET \
  -H "X-Api-Key: YOUR_API_KEY" \
  https://api.edenlayer.com/tasks/TASK_ID
```

### 3. Composed Tasks (Multi-Agent Workflow)

```typescript
import { ResearchOrchestrator } from '@/lib/agents/orchestrator';
import { EdenlayerClient } from '@/lib/edenlayer/client';

const orchestrator = new ResearchOrchestrator();
const client = new EdenlayerClient();

// Generate composed tasks
const tasks = await orchestrator.generateComposedTasks(
  'Impact of AI on healthcare',
  {
    webSearch: 'WEB_SEARCH_AGENT_ID',
    dataAnalysis: 'DATA_ANALYSIS_AGENT_ID',
    summarization: 'SUMMARIZATION_AGENT_ID',
    citation: 'CITATION_AGENT_ID'
  }
);

// Submit composed tasks
const result = await client.composeTasks(tasks);
console.log('Composed task ID:', result.taskId);
```

## Using Individual Agents

### Web Search Agent

```typescript
import { WebSearchAgent } from '@/lib/agents/web-search-agent';

const searchAgent = new WebSearchAgent();

// Single search
const results = await searchAgent.search({
  query: 'AI healthcare applications',
  maxResults: 5
});

// Multiple parallel searches
const multiResults = await searchAgent.multiSearch([
  'AI in healthcare',
  'Healthcare cost reduction',
  'Patient outcomes AI'
], 3);
```

### Data Analysis Agent

```typescript
import { DataAnalysisAgent } from '@/lib/agents/data-analysis-agent';

const analysisAgent = new DataAnalysisAgent();

const analysis = await analysisAgent.analyze({
  searchResults: [
    {
      title: 'AI Transforming Healthcare',
      snippet: 'Artificial intelligence is revolutionizing...',
      url: 'https://example.com/article1'
    },
    // ... more results
  ],
  focusAreas: ['cost', 'efficiency']
});

console.log('Key Points:', analysis.keyPoints);
console.log('Trends:', analysis.trends);
console.log('Insights:', analysis.insights);
```

### Summarization Agent

```typescript
import { SummarizationAgent } from '@/lib/agents/summarization-agent';

const summaryAgent = new SummarizationAgent();

const summary = await summaryAgent.generateSummary({
  analysis: {
    keyPoints: ['Point 1', 'Point 2', 'Point 3'],
    trends: ['Trend 1', 'Trend 2'],
    statistics: {},
    insights: ['Insight 1', 'Insight 2']
  },
  originalQuery: 'AI in healthcare',
  format: 'detailed'
});

console.log('Executive Summary:', summary.executiveSummary);
console.log('Detailed Report:', summary.detailedReport);
```

### Citation Agent

```typescript
import { CitationAgent } from '@/lib/agents/citation-agent';

const citationAgent = new CitationAgent();

const citations = await citationAgent.formatCitations({
  sources: [
    {
      title: 'AI in Healthcare',
      url: 'https://example.com/article1',
      snippet: 'Article content...'
    },
    // ... more sources
  ],
  format: 'apa'
});

console.log('Bibliography:', citations.bibliography);
console.log('Formatted Sources:', citations.formattedSources);
```

## Chat Interface

### Real-time Chat via WebSocket

The agent supports real-time chat through Edenlayer's Conversation Manager. Connect to a chat room:

```javascript
const ws = new WebSocket(
  `wss://api.edenlayer.com/parties/chat-server/ROOM_ID?api-key=YOUR_API_KEY`
);

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

// Send a research query
ws.send(JSON.stringify({
  type: 'message',
  content: 'Research the impact of AI on healthcare costs'
}));
```

## Example Research Workflow

```typescript
import { ResearchOrchestrator } from '@/lib/agents/orchestrator';

async function fullResearchWorkflow() {
  const orchestrator = new ResearchOrchestrator();
  
  // Step 1: Conduct research
  const research = await orchestrator.conductResearch({
    query: 'Future of renewable energy',
    focusAreas: ['solar', 'wind', 'storage'],
    maxSources: 10,
    citationFormat: 'apa'
  });
  
  // Step 2: Access results
  console.log('=== RESEARCH REPORT ===');
  console.log('\nQuery:', research.query);
  console.log('\n=== EXECUTIVE SUMMARY ===');
  console.log(research.summary.executiveSummary);
  console.log('\n=== KEY FINDINGS ===');
  research.analysis.keyPoints.forEach((point, i) => {
    console.log(`${i + 1}. ${point}`);
  });
  console.log('\n=== TRENDS ===');
  research.analysis.trends.forEach(trend => {
    console.log(`• ${trend}`);
  });
  console.log('\n=== SOURCES ===');
  research.citations.formattedSources.forEach(source => {
    console.log(source.citation);
  });
  
  return research;
}

// Run the workflow
fullResearchWorkflow().catch(console.error);
```

