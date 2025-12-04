// Script to register the Research Orchestrator Agent with Edenlayer Protocol

import 'dotenv/config';
import { EdenlayerClient } from '../lib/edenlayer/client';
import { AGENT_BASE_URL } from '../lib/config/edenlayer';
import type { AgentRegistration } from '../lib/types/edenlayer';

async function registerOrchestrator() {
  const client = new EdenlayerClient();
  
  const registration: AgentRegistration = {
    name: 'Research Orchestrator',
    description: 'Coordinates multiple specialized agents to conduct comprehensive research, analyze data, generate summaries, and format citations. Orchestrates Web Search, Data Analysis, Summarization, and Citation agents.',
    defaultPrompt: 'Hello! I\'m the Research Orchestrator. I coordinate multiple agents to provide comprehensive research on any topic. What would you like me to research?',
    imageUrl: `${AGENT_BASE_URL}/agent-orchestrator.png`,
    backgroundImageUrl: `${AGENT_BASE_URL}/agent-background.png`,
    websiteUrl: AGENT_BASE_URL,
    mcpUrl: `${AGENT_BASE_URL}/api/mcp`,
    chatUrl: `${AGENT_BASE_URL}/api/chat`,
    capabilities: {
      tools: [
        {
          name: 'conductResearch',
          description: 'Conduct comprehensive research on a topic by coordinating web search, data analysis, summarization, and citation formatting',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'The research query or topic to investigate'
              },
              focusAreas: {
                type: 'array',
                items: { type: 'string' },
                description: 'Optional specific areas to focus on within the research topic'
              },
              maxSources: {
                type: 'number',
                description: 'Maximum number of sources to use (default: 5)',
                default: 5
              },
              citationFormat: {
                type: 'string',
                enum: ['apa', 'mla', 'chicago', 'ieee'],
                description: 'Citation format style (default: apa)',
                default: 'apa'
              }
            },
            required: ['query']
          },
          annotations: {
            outputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
                searchResults: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      url: { type: 'string' },
                      snippet: { type: 'string' }
                    }
                  }
                },
                analysis: {
                  type: 'object',
                  properties: {
                    keyPoints: { type: 'array', items: { type: 'string' } },
                    trends: { type: 'array', items: { type: 'string' } },
                    insights: { type: 'array', items: { type: 'string' } },
                    confidence: { type: 'number' }
                  }
                },
                summary: {
                  type: 'object',
                  properties: {
                    executiveSummary: { type: 'string' },
                    detailedReport: { type: 'string' },
                    sections: { type: 'array' }
                  }
                },
                citations: {
                  type: 'object',
                  properties: {
                    bibliography: { type: 'string' },
                    formattedSources: { type: 'array' }
                  }
                }
              }
            }
          }
        }
      ]
    }
  };

  try {
    console.log('Registering Research Orchestrator Agent...');
    const result = await client.registerAgent(registration);
    console.log('✅ Successfully registered!');
    console.log('Agent ID:', result.agentId);
    console.log('\nPlease save this Agent ID to your environment variables:');
    console.log(`ORCHESTRATOR_AGENT_ID=${result.agentId}`);
    
    return result.agentId;
  } catch (error: any) {
    console.error('❌ Registration failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  registerOrchestrator()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { registerOrchestrator };

