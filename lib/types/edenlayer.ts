// Edenlayer Protocol Types

export interface AgentCapability {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  annotations?: {
    outputSchema?: Record<string, any>;
  };
}

export interface AgentRegistration {
  name: string;
  description: string;
  defaultPrompt: string;
  imageUrl?: string;
  backgroundImageUrl?: string;
  websiteUrl?: string;
  mcpUrl: string;
  chatUrl: string;
  capabilities: {
    tools: AgentCapability[];
    prompts?: any[];
    resources?: any[];
  };
}

export interface TaskRequest {
  agentId: string;
  operation: string;
  params: Record<string, any>;
}

export interface TaskResult {
  taskId: string;
  state: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: {
    type: string;
    data: {
      content: Array<{
        type: string;
        text?: string;
        [key: string]: any;
      }>;
    };
  };
  error?: string;
}

export interface ComposedTask {
  agentId: string;
  operation: string;
  parents?: string[];
  params: Record<string, any>;
}

export interface MCPServerRequest {
  method: string;
  params: {
    name: string;
    arguments?: Record<string, any>;
  };
}

export interface MCPServerResponse {
  content: Array<{
    type: string;
    text?: string;
    [key: string]: any;
  }>;
}

