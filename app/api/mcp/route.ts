// MCP Endpoint - Handles task execution requests from Edenlayer Router

import { NextRequest, NextResponse } from 'next/server';
import { ResearchOrchestrator } from '@/lib/agents/orchestrator';
import { WebSearchAgent } from '@/lib/agents/web-search-agent';
import { DataAnalysisAgent } from '@/lib/agents/data-analysis-agent';
import { SummarizationAgent } from '@/lib/agents/summarization-agent';
import { CitationAgent } from '@/lib/agents/citation-agent';
import type { MCPServerRequest, MCPServerResponse } from '@/lib/types/edenlayer';

export async function POST(request: NextRequest) {
  try {
    const body: MCPServerRequest = await request.json();
    const { method, params } = body;

    let response: MCPServerResponse;

    switch (method) {
      case 'tools/call':
        response = await handleToolCall(params.name, params.arguments || {});
        break;
      
      default:
        return NextResponse.json(
          { error: `Unknown method: ${method}` },
          { status: 400 }
        );
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('MCP Error:', error);
    return NextResponse.json(
      {
        content: [{
          type: 'text',
          text: `Error: ${error.message}`
        }]
      },
      { status: 500 }
    );
  }
}

async function handleToolCall(toolName: string, args: Record<string, any>): Promise<MCPServerResponse> {
  const orchestrator = new ResearchOrchestrator();

  switch (toolName) {
    case 'conductResearch':
      const researchResult = await orchestrator.conductResearch({
        query: args.query,
        focusAreas: args.focusAreas,
        maxSources: args.maxSources || 5,
        citationFormat: args.citationFormat || 'apa'
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(researchResult, null, 2)
        }]
      };

    case 'search':
      const searchAgent = new WebSearchAgent();
      const searchResults = await searchAgent.search({
        query: args.query,
        maxResults: args.maxResults || 5
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(searchResults, null, 2)
        }]
      };

    case 'analyze':
      const analysisAgent = new DataAnalysisAgent();
      const analysis = await analysisAgent.analyze({
        searchResults: args.searchResults || [],
        focusAreas: args.focusAreas || []
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(analysis, null, 2)
        }]
      };

    case 'generateSummary':
      const summaryAgent = new SummarizationAgent();
      const summary = await summaryAgent.generateSummary({
        analysis: args.analysis,
        originalQuery: args.originalQuery,
        format: args.format || 'detailed'
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(summary, null, 2)
        }]
      };

    case 'formatCitations':
      const citationAgent = new CitationAgent();
      const citations = await citationAgent.formatCitations({
        sources: args.sources || [],
        format: args.format || 'apa'
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(citations, null, 2)
        }]
      };

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

