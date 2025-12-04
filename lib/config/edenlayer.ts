// Edenlayer Protocol Configuration

export const EDENLAYER_API_URL = process.env.EDENLAYER_API_URL || 'https://api.edenlayer.com';
export const EDENLAYER_API_KEY = process.env.EDENLAYER_API_KEY || '';

export const AGENT_BASE_URL = process.env.AGENT_BASE_URL || process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const ORCHESTRATOR_AGENT_ID = process.env.ORCHESTRATOR_AGENT_ID || '';

// Agent IDs (will be set after registration)
export const AGENT_IDS = {
  WEB_SEARCH: process.env.WEB_SEARCH_AGENT_ID || '',
  DATA_ANALYSIS: process.env.DATA_ANALYSIS_AGENT_ID || '',
  SUMMARIZATION: process.env.SUMMARIZATION_AGENT_ID || '',
  CITATION: process.env.CITATION_AGENT_ID || '',
};

