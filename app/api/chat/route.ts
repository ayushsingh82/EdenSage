// Chat Endpoint - Handles real-time chat messages from Edenlayer Conversation Manager

import { NextRequest, NextResponse } from 'next/server';
import { ResearchOrchestrator } from '@/lib/agents/orchestrator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, roomId, userId, agentId } = body;

    // Process the chat message
    const response = await processChatMessage(message, roomId, userId);

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Chat Error:', error);
    return NextResponse.json(
      {
        message: `I apologize, but I encountered an error: ${error.message}. Please try rephrasing your request.`,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function processChatMessage(
  message: string,
  roomId: string,
  userId: string
): Promise<string> {
  const orchestrator = new ResearchOrchestrator();

  // Check if the message is a research query
  const isResearchQuery = detectResearchQuery(message);

  if (isResearchQuery) {
    // Extract query from message
    const query = extractQuery(message);
    
    // Conduct research
    const researchResult = await orchestrator.conductResearch({
      query,
      maxSources: 5
    });

    // Format response for chat
    return formatResearchResponse(researchResult);
  } else {
    // Handle general conversation
    return handleGeneralConversation(message);
  }
}

function detectResearchQuery(message: string): boolean {
  const researchKeywords = [
    'research',
    'find information',
    'analyze',
    'investigate',
    'search for',
    'what is',
    'tell me about',
    'explore'
  ];

  const lowerMessage = message.toLowerCase();
  return researchKeywords.some(keyword => lowerMessage.includes(keyword));
}

function extractQuery(message: string): string {
  // Simple extraction - in production, use more sophisticated NLP
  const patterns = [
    /research (.+)/i,
    /find information about (.+)/i,
    /analyze (.+)/i,
    /investigate (.+)/i,
    /search for (.+)/i,
    /what is (.+)/i,
    /tell me about (.+)/i,
    /explore (.+)/i
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // If no pattern matches, return the full message
  return message.trim();
}

function formatResearchResponse(result: any): string {
  return `🔍 Research Complete: ${result.query}

📊 Executive Summary:
${result.summary.executiveSummary.substring(0, 500)}...

📝 Key Findings:
${result.analysis.keyPoints.slice(0, 3).map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}

📈 Trends Identified:
${result.analysis.trends.map((t: string) => `• ${t}`).join('\n')}

💡 Insights:
${result.analysis.insights.slice(0, 2).join('\n')}

📚 Sources: ${result.citations.formattedSources.length} sources found

Would you like more details on any specific aspect?`;
}

function handleGeneralConversation(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! I\'m the Research Orchestrator Agent. I can help you conduct comprehensive research on any topic. Just ask me to research something, and I\'ll gather information, analyze it, and provide you with a detailed report.';
  }

  if (lowerMessage.includes('help')) {
    return `I can help you with research tasks! Here's what I can do:

• Conduct comprehensive research on any topic
• Analyze multiple sources of information
• Generate detailed reports and summaries
• Format citations in various styles
• Identify trends and key insights

Just ask me something like:
- "Research the impact of AI on healthcare"
- "Find information about renewable energy trends"
- "Analyze the latest developments in quantum computing"

What would you like to research today?`;
  }

  if (lowerMessage.includes('capabilities') || lowerMessage.includes('what can you do')) {
    return `I coordinate multiple specialized agents to provide comprehensive research:

🔍 Web Search Agent - Finds relevant information from multiple sources
📊 Data Analysis Agent - Analyzes and extracts key insights
📝 Summarization Agent - Creates structured reports
📚 Citation Agent - Formats references properly

Together, we can tackle complex research queries and provide you with actionable insights!`;
  }

  return 'I\'m here to help with research tasks! Try asking me to research a topic, or type "help" to see what I can do.';
}

