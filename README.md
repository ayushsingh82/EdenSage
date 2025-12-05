# EdenSage

A sophisticated multi-agent research system built on the Edenlayer Protocol that coordinates specialized agents to conduct comprehensive research, analyze data, generate summaries, and format citations.

## 🎯 Overview

The Research Orchestrator Agent demonstrates the power of agent composition by coordinating four specialized agents:

- **Web Search Agent** - Finds relevant information from multiple sources
- **Data Analysis Agent** - Analyzes and extracts key insights from research data
- **Summarization Agent** - Creates structured reports and executive summaries
- **Citation Agent** - Formats references in various academic styles (APA, MLA, Chicago, IEEE)

## 🏗️ Architecture & Workflow

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                           │
│              (Web UI / API / Edenlayer Router)               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Research Orchestrator Agent                     │
│          (Coordinates the entire workflow)                   │
└─────────────┬───────────────────────────────────────────────┘
              │
              ├───────────────────────────────────────────────┐
              │                                               │
              ▼                                               ▼
    ┌─────────────────────┐                    ┌─────────────────────┐
    │  Web Search Agent   │                    │  Data Analysis      │
    │  (Parallel Searches)│                    │  Agent              │
    └─────────────────────┘                    └─────────────────────┘
              │                                               │
              ▼                                               ▼
    ┌─────────────────────┐                    ┌─────────────────────┐
    │  Summarization      │                    │  Citation Agent     │
    │  Agent              │                    │  (APA/MLA/Chicago)  │
    └─────────────────────┘                    └─────────────────────┘
              │                                               │
              └───────────────┬───────────────────────────────┘
                              ▼
              ┌───────────────────────────────────┐
              │   Comprehensive Research Report   │
              └───────────────────────────────────┘
```

### Detailed Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WORKFLOW: Research Execution                         │
└─────────────────────────────────────────────────────────────────────────────┘

Step 1: User Submission
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    User Input: "Impact of AI on healthcare costs"
    Focus Areas: ["cost reduction", "patient outcomes"]
    Max Sources: 5
    Citation Format: APA
    
                          │
                          ▼
    ┌─────────────────────────────────────────┐
    │   Research Orchestrator Agent           │
    │   - Receives query                      │
    │   - Plans workflow                      │
    │   - Generates search queries            │
    └─────────────────────────────────────────┘
                          │
                          ▼

Step 2: Parallel Web Search (SIMULTANEOUS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────────────────────────────┐
    │      Web Search Agent                   │
    └─────────────────────────────────────────┘
              │
              ├───────────────────────────────────────┐
              │                                       │
              ▼                   ▼                   ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │ Search Query │    │ Search Query │    │ Search Query │
    │      #1      │    │      #2      │    │      #3      │
    │              │    │              │    │              │
    │ • AI +       │    │ • AI +       │    │ • AI +       │
    │   healthcare │    │   healthcare │    │   healthcare │
    │   costs      │    │   overview   │    │   trends     │
    └──────────────┘    └──────────────┘    └──────────────┘
              │                   │                   │
              └───────────────────┴───────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────┐
    │   Aggregated Search Results (5 sources) │
    │   - Titles, URLs, Snippets              │
    └─────────────────────────────────────────┘
                          │
                          ▼

Step 3: Data Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────────────────────────────┐
    │      Data Analysis Agent                │
    │                                         │
    │  Processes:                             │
    │  • Extracts key points                  │
    │  • Identifies trends                    │
    │  • Generates insights                   │
    │  • Calculates confidence                │
    └─────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────┐
    │   Analysis Results:                     │
    │   • 5 key findings                      │
    │   • 3 identified trends                 │
    │   • Confidence: 85%                     │
    └─────────────────────────────────────────┘
                          │
                          ▼

Step 4: Report Generation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────────────────────────────┐
    │     Summarization Agent                 │
    │                                         │
    │  Generates:                             │
    │  • Executive summary                    │
    │  • Detailed report                      │
    │  • Structured sections                  │
    └─────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────┐
    │   Summary Report:                       │
    │   • Executive Summary (200 words)       │
    │   • Detailed Report (1500 words)        │
    │   • Structured Sections                 │
    └─────────────────────────────────────────┘
                          │
                          ▼

Step 5: Citation Formatting
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────────────────────────────┐
    │      Citation Agent                     │
    │                                         │
    │  Formats in APA style:                  │
    │  • Bibliography                         │
    │  • In-text citations                    │
    │  • Formatted sources                    │
    └─────────────────────────────────────────┘
                          │
                          ▼

Step 6: Final Output
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌─────────────────────────────────────────────────────────┐
    │          Complete Research Report                        │
    ├─────────────────────────────────────────────────────────┤
    │                                                          │
    │  ✅ Search Results (5 sources)                          │
    │  ✅ Analysis (key points, trends, insights)             │
    │  ✅ Executive Summary                                    │
    │  ✅ Detailed Report                                      │
    │  ✅ Formatted Citations (APA style)                     │
    │                                                          │
    └─────────────────────────────────────────────────────────┘
                          │
                          ▼
                   Return to User

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Timeline: ~5-10 seconds
Agents Involved: 5 (1 Orchestrator + 4 Specialized)
Parallel Operations: Web searches execute simultaneously
Dependencies: Analysis → Summarization (sequential)
                Citations ← Search Results (parallel branch)
```

### Quick Demo Diagram (Easy to Draw)

For whiteboard presentations and quick explanations:

```
┌─────────────────────────────────────────────────────────┐
│                   EDENSAGE WORKFLOW                      │
└─────────────────────────────────────────────────────────┘

   USER: "Research AI in healthcare"
           │
           ▼
   ┌──────────────┐
   │ Orchestrator │ ← Coordinates everything
   └──────┬───────┘
          │
    ┌─────┼─────┐
    │     │     │
    ▼     ▼     ▼
  ┌───┐ ┌───┐ ┌───┐
  │🔍 │ │🔍 │ │🔍 │  ← 3 Parallel Searches
  └─┬─┘ └─┬─┘ └─┬─┘
    └─────┼─────┘
          │
          ▼
    ┌──────────┐
    │ 📊 Data  │ ← Analyzes results
    │ Analysis │
    └────┬─────┘
         │
    ┌────┼────┐
    │    │    │
    ▼    ▼    ▼
  ┌──┐ ┌──┐ ┌──┐
  │📝│ │📚│ │📄│  ← Summary, Citations, Report
  └─┬┘ └─┬┘ └─┬┘
    └────┼────┘
         │
         ▼
    ┌─────────┐
    │  RESULT │ ← Complete research report
    └─────────┘
```

### Step-by-Step Flow (For Demo Explanation)

1. **User submits query** → Orchestrator receives it
2. **Orchestrator plans** → Generates multiple search queries
3. **Web Search Agents** → Run in parallel (3-4 searches at once)
4. **Results combined** → All search results aggregated
5. **Data Analysis Agent** → Extracts insights, trends, key points
6. **Summary & Citations** → Generate report and format references
7. **Final Report** → Complete with all sections

**Key Points:**
- ⚡ **Parallel**: Searches happen simultaneously
- 🔗 **Orchestrated**: One agent coordinates all others
- 📊 **Comprehensive**: Analysis → Summary → Citations
- 🚀 **Fast**: ~5-10 seconds for complete research

### Agent Collaboration Flow

```
                    ┌─────────────────┐
                    │   User Query    │
                    └────────┬────────┘
                             │
                             ▼
            ┌────────────────────────────────┐
            │  Research Orchestrator Agent   │
            │  (Master Coordinator)          │
            └────────┬───────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ Web     │ │ Web     │ │ Web     │
   │ Search  │ │ Search  │ │ Search  │
   │ Agent 1 │ │ Agent 2 │ │ Agent 3 │
   └────┬────┘ └────┬────┘ └────┬────┘
        │            │            │
        └────────────┴────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Combined Search │
            │    Results      │
            └────────┬────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ Data    │ │ Summary │ │Citation │
   │Analysis │ │  Agent  │ │  Agent  │
   │ Agent   │ │         │ │         │
   └────┬────┘ └────┬────┘ └────┬────┘
        │            │            │
        └────────────┴────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  Final Report   │
            └─────────────────┘
```

### Key Workflow Features

1. **Parallel Execution**: Web searches run simultaneously for speed
2. **Sequential Processing**: Analysis depends on search results
3. **Independent Branches**: Citations and summaries can process in parallel
4. **Orchestrated Coordination**: Orchestrator manages all dependencies
5. **Edenlayer Protocol**: All communication via standardized protocol

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
