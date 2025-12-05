# Research Orchestrator Agent - Demo Guide

## 🤝 Agents Collaborating Together

The Research Orchestrator coordinates **4 specialized AI agents** to conduct comprehensive research:

### 1. 🔍 **Web Search Agent** (`web-search-agent.ts`)
- **Purpose**: Searches the web for information
- **Capabilities**: 
  - Single query search
  - Parallel multi-query search
  - Returns structured search results (title, URL, snippet)
- **Current Status**: ⚠️ **USING DUMMY DATA** (see below)

### 2. 📊 **Data Analysis Agent** (`data-analysis-agent.ts`)
- **Purpose**: Analyzes search results and extracts insights
- **Capabilities**:
  - Extracts key points from text
  - Identifies trends and common themes
  - Extracts statistics and numbers
  - Generates insights
  - Calculates confidence scores
- **Current Status**: ✅ **WORKING** (uses simple NLP techniques)

### 3. 📝 **Summarization Agent** (`summarization-agent.ts`)
- **Purpose**: Creates comprehensive summaries and reports
- **Capabilities**:
  - Generates executive summaries
  - Creates detailed reports
  - Structures content into sections
  - Multiple format support (executive, detailed, brief)
- **Current Status**: ✅ **WORKING**

### 4. 📚 **Citation Agent** (`citation-agent.ts`)
- **Purpose**: Formats references in academic styles
- **Capabilities**:
  - Formats citations in 4 styles: APA, MLA, Chicago, IEEE
  - Generates bibliographies
  - Creates in-text citations
  - Validates source URLs
- **Current Status**: ✅ **WORKING**

### 5. 🎯 **Research Orchestrator** (`orchestrator.ts`)
- **Purpose**: Coordinates all agents
- **Capabilities**:
  - Manages the research workflow
  - Executes parallel searches
  - Coordinates agent communication
  - Generates task composition for Edenlayer Protocol
- **Current Status**: ✅ **WORKING**

## 🔄 How Agents Collaborate

```
User Query: "Impact of AI on healthcare costs"
    ↓
Research Orchestrator
    ↓
┌─────────────────────────────────────────┐
│  STEP 1: Generate Multiple Search Queries │
│  • "Impact of AI on healthcare costs"    │
│  • "Impact of AI on healthcare costs overview" │
│  • "Impact of AI on healthcare costs analysis" │
│  • "Impact of AI on healthcare costs trends" │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  STEP 2: Web Search Agent (PARALLEL)    │
│  🔍 Agent executes 4 searches at once   │
│  Returns structured search results       │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  STEP 3: Data Analysis Agent            │
│  📊 Analyzes all search results         │
│  • Extracts key points                  │
│  • Identifies trends                    │
│  • Generates insights                   │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  STEP 4: Summarization Agent            │
│  📝 Creates comprehensive report        │
│  • Executive summary                    │
│  • Detailed report                      │
│  • Structured sections                  │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│  STEP 5: Citation Agent                 │
│  📚 Formats all sources                 │
│  • APA/MLA/Chicago/IEEE format         │
│  • Bibliography                         │
└─────────────────────────────────────────┘
    ↓
Complete Research Report with:
✅ Search results
✅ Analysis & insights
✅ Executive summary
✅ Formatted citations
```

## ⚠️ Current Status: What's Dummy/Mock Data

### **Web Search Agent - USING MOCK DATA** ⚠️

**Location**: `lib/agents/web-search-agent.ts` (lines 22-36)

**Current Implementation**:
```typescript
// Returns mock/placeholder search results
const mockResults: SearchResult[] = [
  {
    title: `Search Result for: ${query}`,
    url: `https://example.com/search?q=${encodeURIComponent(query)}`,
    snippet: `This is a search result related to "${query}". In a production environment, this would fetch real results from search APIs.`,
    source: 'web'
  }
];
```

**Why Mock?**
- Need API keys for real search APIs (Google Custom Search, Bing, etc.)
- Avoids rate limits during development
- Demonstrates the architecture and workflow

**To Make It Real**:
1. Get Google Custom Search API key or Bing Search API key
2. Replace mock data with actual API calls
3. Parse and structure real search results

### **Everything Else - WORKING** ✅

- **Data Analysis Agent**: Uses real text analysis (simple NLP)
- **Summarization Agent**: Generates real summaries from analysis
- **Citation Agent**: Formats real citations
- **Orchestrator**: Fully functional workflow coordination

## 🎬 How to Demo

### Option 1: Direct UI Demo (Easiest)

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Open the Research Page**:
   - Go to `http://localhost:3000/research`
   - Or click "Research" in the navbar

3. **Submit a Research Query**:
   - Enter: `"Impact of AI on healthcare costs"`
   - Set focus areas: `cost reduction, patient outcomes`
   - Choose citation format: `APA`
   - Click "🚀 Start Research"

4. **What You'll See**:
   - ⏳ Loading animation showing agents working
   - 📊 Results in 4 tabs:
     - **Summary**: Executive summary and detailed report
     - **Analysis**: Key points, trends, insights
     - **Sources**: Search results (currently mock data)
     - **Citations**: Formatted bibliography

### Option 2: API Demo (Technical)

1. **Test Health Endpoint**:
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Test MCP Endpoint**:
   ```bash
   curl -X POST http://localhost:3000/api/mcp \
     -H "Content-Type: application/json" \
     -d '{
       "method": "tools/call",
       "params": {
         "name": "conductResearch",
         "arguments": {
           "query": "Impact of AI on healthcare costs",
           "maxSources": 5,
           "citationFormat": "apa"
         }
       }
     }'
   ```

3. **Test Individual Agents**:
   ```bash
   # Test Web Search Agent
   curl -X POST http://localhost:3000/api/mcp \
     -H "Content-Type: application/json" \
     -d '{
       "method": "tools/call",
       "params": {
         "name": "search",
         "arguments": {
           "query": "AI healthcare",
           "maxResults": 3
         }
       }
     }'
   ```

### Option 3: Via Edenlayer Protocol (Full Integration)

1. **Register Agents** (one-time):
   ```bash
   npm run register:orchestrator
   npm run register:agents
   ```

2. **Execute Task via Edenlayer Router**:
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

## 📋 Demo Script

### For Judges/Demo Audience:

1. **Introduction** (30 seconds):
   - "This is the Research Orchestrator Agent - a multi-agent system that coordinates 4 specialized AI agents"

2. **Show the UI** (1 minute):
   - Open `/research` page
   - Show the form with all options
   - Explain: "Users can set research query, focus areas, max sources, and citation format"

3. **Run a Demo Query** (2 minutes):
   - Enter: "Impact of renewable energy on the economy"
   - Click "Start Research"
   - Show the loading animation: "Agents are working in parallel"
   - Show results in each tab:
     - Summary tab: "Executive summary generated"
     - Analysis tab: "Key points and trends extracted"
     - Sources tab: "Search results found" (mention it's mock for demo)
     - Citations tab: "Properly formatted bibliography"

4. **Explain Architecture** (1 minute):
   - "The orchestrator coordinates 4 agents"
   - "Searches execute in parallel for speed"
   - "Each agent has a specific role"
   - "All connected via Edenlayer Protocol"

5. **Show Code/Implementation** (1 minute):
   - Show orchestrator coordinating agents
   - Show task composition capability
   - Show MCP endpoint integration

## 🎯 Key Demo Points

### ✅ What Works (Real Implementation):
- Multi-agent coordination
- Parallel task execution
- Data analysis and insight extraction
- Report generation
- Citation formatting
- Edenlayer Protocol integration
- Task composition workflows
- Real-time UI updates

### ⚠️ What's Mock/Dummy:
- **Web Search Results**: Currently returns placeholder data
  - This is intentional - demonstrates architecture
  - Easy to replace with real search APIs
  - All other agents process the data normally

## 🔧 Making It Production-Ready

To replace mock search data with real results:

1. **Get API Key**:
   - Google Custom Search API
   - Or Bing Search API
   - Or SerpAPI

2. **Update Web Search Agent**:
   ```typescript
   async search(params: SearchParams): Promise<SearchResult[]> {
     // Replace mock data with:
     const response = await fetch(
       `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
     );
     const data = await response.json();
     // Parse and structure results
   }
   ```

3. **That's it!** All other agents work with real data once you provide it.

## 📊 Demo Metrics to Highlight

- **4 Agents** coordinating together
- **Parallel execution** for speed
- **5-step workflow** orchestrated seamlessly
- **4 citation formats** supported
- **Edenlayer Protocol** fully integrated
- **Task composition** ready for complex workflows

## 🎬 Quick Demo Checklist

- [ ] Server running (`npm run dev`)
- [ ] Navigate to `/research` page
- [ ] Enter a research query
- [ ] Show all 4 tabs with results
- [ ] Explain multi-agent architecture
- [ ] Show Edenlayer Protocol integration
- [ ] Mention mock search data (easy to replace)

---

**Ready to demo!** The system is fully functional - only search results are mocked to demonstrate the architecture without requiring API keys.

