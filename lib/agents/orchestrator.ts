// Research Orchestrator Agent - Coordinates all research agents

import { WebSearchAgent } from './web-search-agent';
import { DataAnalysisAgent } from './data-analysis-agent';
import { SummarizationAgent } from './summarization-agent';
import { CitationAgent } from './citation-agent';

export interface ResearchQuery {
  query: string;
  focusAreas?: string[];
  maxSources?: number;
  citationFormat?: 'apa' | 'mla' | 'chicago' | 'ieee';
}

export interface ResearchResult {
  query: string;
  searchResults: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  analysis: {
    keyPoints: string[];
    trends: string[];
    statistics: Record<string, any>;
    insights: string[];
    confidence: number;
  };
  summary: {
    executiveSummary: string;
    detailedReport: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
    wordCount: number;
  };
  citations: {
    bibliography: string;
    inTextCitations: Array<{
      text: string;
      citation: string;
    }>;
    formattedSources: Array<{
      id: string;
      citation: string;
      url: string;
    }>;
  };
  taskId?: string;
}

export class ResearchOrchestrator {
  private webSearchAgent: WebSearchAgent;
  private dataAnalysisAgent: DataAnalysisAgent;
  private summarizationAgent: SummarizationAgent;
  private citationAgent: CitationAgent;

  constructor() {
    this.webSearchAgent = new WebSearchAgent();
    this.dataAnalysisAgent = new DataAnalysisAgent();
    this.summarizationAgent = new SummarizationAgent();
    this.citationAgent = new CitationAgent();
  }

  async conductResearch(params: ResearchQuery): Promise<ResearchResult> {
    const {
      query,
      focusAreas = [],
      maxSources = 5,
      citationFormat = 'apa'
    } = params;

    // Step 1: Generate search queries
    const searchQueries = this.generateSearchQueries(query, focusAreas);
    
    // Step 2: Execute parallel web searches
    const searchResults = await this.webSearchAgent.multiSearch(
      searchQueries,
      Math.ceil(maxSources / searchQueries.length)
    );
    
    // Flatten search results
    const allResults = Object.values(searchResults).flat().slice(0, maxSources);

    // Step 3: Analyze the data
    const analysis = await this.dataAnalysisAgent.analyze({
      searchResults: allResults,
      focusAreas
    });

    // Step 4: Generate summary
    const summary = await this.summarizationAgent.generateSummary({
      analysis,
      originalQuery: query,
      format: 'detailed'
    });

    // Step 5: Format citations
    const citations = await this.citationAgent.formatCitations({
      sources: allResults,
      format: citationFormat
    });

    return {
      query,
      searchResults: allResults,
      analysis,
      summary,
      citations
    };
  }

  async generateComposedTasks(query: string, agentIds: {
    webSearch: string;
    dataAnalysis: string;
    summarization: string;
    citation: string;
  }): Promise<any[]> {
    // Generate search queries
    const searchQueries = this.generateSearchQueries(query);

    // Create parallel search tasks
    const searchTasks = searchQueries.map((sq, index) => ({
      agentId: agentIds.webSearch,
      operation: 'tools/search',
      params: {
        query: sq,
        maxResults: 3
      }
    }));

    // Create analysis task (depends on search tasks)
    const analysisTask = {
      agentId: agentIds.dataAnalysis,
      operation: 'tools/analyze',
      parents: searchTasks.map((_, i) => i.toString()),
      params: {
        searchResults: {
          source: {
            field: 'data.content',
            taskIds: searchTasks.map((_, i) => i.toString())
          },
          type: 'array'
        },
        focusAreas: []
      }
    };

    // Create summarization task (depends on analysis)
    const summaryTask = {
      agentId: agentIds.summarization,
      operation: 'tools/generateSummary',
      parents: [searchTasks.length.toString()], // analysis task index
      params: {
        analysis: {
          source: {
            field: 'data.content',
            taskId: searchTasks.length.toString()
          },
          type: 'object'
        },
        originalQuery: query,
        format: 'detailed'
      }
    };

    // Create citation task (depends on search tasks)
    const citationTask = {
      agentId: agentIds.citation,
      operation: 'tools/formatCitations',
      parents: searchTasks.map((_, i) => i.toString()),
      params: {
        sources: {
          source: {
            field: 'data.content',
            taskIds: searchTasks.map((_, i) => i.toString())
          },
          type: 'array'
        },
        format: 'apa'
      }
    };

    return [
      ...searchTasks,
      analysisTask,
      summaryTask,
      citationTask
    ];
  }

  private generateSearchQueries(mainQuery: string, focusAreas: string[] = []): string[] {
    const queries = [mainQuery];
    
    // Add focused queries if focus areas are specified
    if (focusAreas.length > 0) {
      focusAreas.forEach(area => {
        queries.push(`${mainQuery} ${area}`);
      });
    } else {
      // Generate related queries automatically
      queries.push(`${mainQuery} overview`);
      queries.push(`${mainQuery} analysis`);
      queries.push(`${mainQuery} trends`);
    }

    return queries.slice(0, 4); // Limit to 4 parallel searches
  }
}

