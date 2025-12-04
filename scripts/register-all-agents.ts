// Script to register all specialized agents with Edenlayer Protocol

import { EdenlayerClient } from '../lib/edenlayer/client';
import { AGENT_BASE_URL } from '../lib/config/edenlayer';
import type { AgentRegistration } from '../lib/types/edenlayer';

async function registerAllAgents() {
  const client = new EdenlayerClient();
  
  const agents: AgentRegistration[] = [
    {
      name: 'Web Search Agent',
      description: 'Searches the web for information on specified queries. Can execute multiple searches in parallel.',
      defaultPrompt: 'I can search the web for information. What would you like me to search for?',
      mcpUrl: `${AGENT_BASE_URL}/api/mcp`,
      chatUrl: `${AGENT_BASE_URL}/api/chat`,
      capabilities: {
        tools: [
          {
            name: 'search',
            description: 'Search the web for information on a given query',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'The search query'
                },
                maxResults: {
                  type: 'number',
                  description: 'Maximum number of results to return',
                  default: 5
                }
              },
              required: ['query']
            },
            annotations: {
              outputSchema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    url: { type: 'string' },
                    snippet: { type: 'string' }
                  }
                }
              }
            }
          }
        ]
      }
    },
    {
      name: 'Data Analysis Agent',
      description: 'Analyzes search results and extracts key points, trends, and insights from research data.',
      defaultPrompt: 'I analyze research data to extract insights. Provide me with search results to analyze.',
      mcpUrl: `${AGENT_BASE_URL}/api/mcp`,
      chatUrl: `${AGENT_BASE_URL}/api/chat`,
      capabilities: {
        tools: [
          {
            name: 'analyze',
            description: 'Analyze search results and extract key insights',
            inputSchema: {
              type: 'object',
              properties: {
                searchResults: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      snippet: { type: 'string' },
                      url: { type: 'string' }
                    }
                  },
                  description: 'Array of search results to analyze'
                },
                focusAreas: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Optional areas to focus analysis on'
                }
              },
              required: ['searchResults']
            }
          }
        ]
      }
    },
    {
      name: 'Summarization Agent',
      description: 'Generates comprehensive summaries and structured reports from analysis results.',
      defaultPrompt: 'I create detailed summaries and reports. Provide me with analysis data to summarize.',
      mcpUrl: `${AGENT_BASE_URL}/api/mcp`,
      chatUrl: `${AGENT_BASE_URL}/api/chat`,
      capabilities: {
        tools: [
          {
            name: 'generateSummary',
            description: 'Generate a comprehensive summary and report from analysis data',
            inputSchema: {
              type: 'object',
              properties: {
                analysis: {
                  type: 'object',
                  description: 'Analysis results containing key points, trends, and insights'
                },
                originalQuery: {
                  type: 'string',
                  description: 'The original research query'
                },
                format: {
                  type: 'string',
                  enum: ['executive', 'detailed', 'brief'],
                  default: 'detailed'
                }
              },
              required: ['analysis', 'originalQuery']
            }
          }
        ]
      }
    },
    {
      name: 'Citation Agent',
      description: 'Formats references and citations in various academic styles (APA, MLA, Chicago, IEEE).',
      defaultPrompt: 'I format citations and references. Provide me with sources to format.',
      mcpUrl: `${AGENT_BASE_URL}/api/mcp`,
      chatUrl: `${AGENT_BASE_URL}/api/chat`,
      capabilities: {
        tools: [
          {
            name: 'formatCitations',
            description: 'Format sources into proper citations and bibliography',
            inputSchema: {
              type: 'object',
              properties: {
                sources: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      url: { type: 'string' },
                      snippet: { type: 'string' }
                    }
                  },
                  description: 'Array of sources to format'
                },
                format: {
                  type: 'string',
                  enum: ['apa', 'mla', 'chicago', 'ieee'],
                  default: 'apa'
                }
              },
              required: ['sources']
            }
          }
        ]
      }
    }
  ];

  const agentIds: Record<string, string> = {};

  for (const agent of agents) {
    try {
      console.log(`\nRegistering ${agent.name}...`);
      const result = await client.registerAgent(agent);
      agentIds[agent.name] = result.agentId;
      console.log(`✅ ${agent.name} registered with ID: ${result.agentId}`);
    } catch (error: any) {
      console.error(`❌ Failed to register ${agent.name}:`, error.message);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
    }
  }

  console.log('\n=== Registration Summary ===');
  console.log('\nPlease save these Agent IDs to your environment variables:\n');
  
  Object.entries(agentIds).forEach(([name, id]) => {
    const envName = name.toUpperCase().replace(/\s+/g, '_').replace(/AGENT$/g, '') + '_AGENT_ID';
    console.log(`${envName}=${id}`);
  });

  return agentIds;
}

// Run if executed directly
if (require.main === module) {
  registerAllAgents()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { registerAllAgents };

