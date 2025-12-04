# Research Orchestrator Agent

A sophisticated multi-agent system built on the Edenlayer Protocol that coordinates specialized agents to conduct comprehensive research, analyze data, generate summaries, and format citations.

## 🎯 Overview

The Research Orchestrator Agent demonstrates the power of agent composition by coordinating four specialized agents:

- **Web Search Agent** - Finds relevant information from multiple sources
- **Data Analysis Agent** - Analyzes and extracts key insights from research data
- **Summarization Agent** - Creates structured reports and executive summaries
- **Citation Agent** - Formats references in various academic styles (APA, MLA, Chicago, IEEE)

## 🏗️ Architecture

```
User Request
    ↓
Research Orchestrator Agent
    ↓
┌─────────────────────────────────────┐
│   Parallel Agent Coordination       │
├─────────────────────────────────────┤
│ Web Search → Data Analysis          │
│       ↓              ↓               │
│ Summarization ← Citations           │
└─────────────────────────────────────┘
    ↓
Comprehensive Research Report
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- An Edenlayer Protocol API key
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your Edenlayer API key:

```env
EDENLAYER_API_KEY=your-api-key-here
AGENT_BASE_URL=http://localhost:3000  # or your deployed URL
```

3. Register the agents with Edenlayer Protocol:

```bash
# Register the orchestrator agent
npm run register:orchestrator

# Register all specialized agents
npm run register:agents
```

After registration, update your `.env` file with the returned Agent IDs.

### Development

Run the development server:

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

### MCP Endpoint
- **POST** `/api/mcp` - Handles task execution requests from Edenlayer Router

### Chat Endpoint
- **POST** `/api/chat` - Handles real-time chat messages from Edenlayer Conversation Manager

### Health Check
- **GET** `/api/health` - Service health check

## 🎮 Usage Examples

### Direct Agent Usage

```typescript
import { ResearchOrchestrator } from '@/lib/agents/orchestrator';

const orchestrator = new ResearchOrchestrator();

const result = await orchestrator.conductResearch({
  query: 'Impact of AI on healthcare costs',
  focusAreas: ['cost reduction', 'patient outcomes'],
  maxSources: 10,
  citationFormat: 'apa'
});

console.log(result.summary.executiveSummary);
```

### Via Edenlayer Protocol

Once registered, you can execute tasks through the Edenlayer Router:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: <api-key>" \
  -d '{
    "agentId": "<orchestrator-agent-id>",
    "operation": "tools/conductResearch",
    "params": {
      "query": "Impact of AI on healthcare costs",
      "maxSources": 5,
      "citationFormat": "apa"
    }
  }' \
  https://api.edenlayer.com/tasks
```

### Task Composition

The orchestrator can also generate composed tasks for parallel execution:

```typescript
const tasks = await orchestrator.generateComposedTasks(
  'Impact of AI on healthcare',
  {
    webSearch: '<web-search-agent-id>',
    dataAnalysis: '<data-analysis-agent-id>',
    summarization: '<summarization-agent-id>',
    citation: '<citation-agent-id>'
  }
);

// Submit composed tasks to Edenlayer
const client = new EdenlayerClient();
const result = await client.composeTasks(tasks);
```

## 🔧 Agent Capabilities

### Research Orchestrator

- **conductResearch** - Orchestrates the full research pipeline
  - Input: query, focusAreas (optional), maxSources (optional), citationFormat (optional)
  - Output: Complete research report with analysis, summary, and citations

### Web Search Agent

- **search** - Searches the web for information
  - Input: query, maxResults (optional)
  - Output: Array of search results

### Data Analysis Agent

- **analyze** - Analyzes search results and extracts insights
  - Input: searchResults, focusAreas (optional)
  - Output: Analysis with key points, trends, insights

### Summarization Agent

- **generateSummary** - Creates comprehensive summaries
  - Input: analysis, originalQuery, format (optional)
  - Output: Executive summary, detailed report, structured sections

### Citation Agent

- **formatCitations** - Formats sources into proper citations
  - Input: sources, format (apa|mla|chicago|ieee)
  - Output: Bibliography and formatted citations

## 📝 Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── mcp/          # MCP endpoint for task execution
│   │   ├── chat/         # Chat endpoint for real-time interaction
│   │   └── health/       # Health check
│   └── ...
├── lib/
│   ├── agents/
│   │   ├── orchestrator.ts      # Main orchestrator agent
│   │   ├── web-search-agent.ts
│   │   ├── data-analysis-agent.ts
│   │   ├── summarization-agent.ts
│   │   └── citation-agent.ts
│   ├── edenlayer/
│   │   └── client.ts            # Edenlayer API client
│   ├── config/
│   │   └── edenlayer.ts         # Configuration
│   └── types/
│       └── edenlayer.ts         # TypeScript types
├── scripts/
│   ├── register-orchestrator.ts
│   └── register-all-agents.ts
└── ...
```

## 🔮 Future Enhancements

- [ ] Integrate real search APIs (Google Custom Search, Bing, etc.)
- [ ] Add advanced NLP models for better analysis
- [ ] Implement caching for research results
- [ ] Add support for more citation styles
- [ ] Implement real-time progress updates via WebSockets
- [ ] Add support for multimedia research (images, videos)

## 📄 License

MIT

## 🤝 Contributing

This is a demonstration project for the Edenlayer Protocol AI Agent Track.
