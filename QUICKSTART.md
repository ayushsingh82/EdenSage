# Quick Start Guide

Get your Research Orchestrator Agent up and running in minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

1. Copy the example environment file:
   ```bash
   cp env.example.txt .env
   ```

2. Edit `.env` and add your Edenlayer API key:
   ```env
   EDENLAYER_API_KEY=your-api-key-here
   AGENT_BASE_URL=http://localhost:3000
   ```

## Step 3: Start the Development Server

```bash
npm run dev
```

Your server will be running at `http://localhost:3000`

## Step 4: Register Your Agents

### Option A: Register Just the Orchestrator

```bash
npm run register:orchestrator
```

This will output an Agent ID. Save it to your `.env`:
```env
ORCHESTRATOR_AGENT_ID=your-orchestrator-agent-id
```

### Option B: Register All Agents

```bash
npm run register:agents
```

This will register all specialized agents and output their IDs. Add them to your `.env`:
```env
WEB_SEARCH_AGENT_ID=...
DATA_ANALYSIS_AGENT_ID=...
SUMMARIZATION_AGENT_ID=...
CITATION_AGENT_ID=...
```

## Step 5: Test Your Agent

### Test Health Endpoint

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Research Orchestrator Agent",
  "timestamp": "2024-..."
}
```

### Test MCP Endpoint

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "method": "tools/call",
    "params": {
      "name": "conductResearch",
      "arguments": {
        "query": "AI in healthcare"
      }
    }
  }'
```

### Test Chat Endpoint

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Research the impact of AI on healthcare costs",
    "roomId": "test-room",
    "userId": "test-user"
  }'
```

## Step 6: Execute a Task via Edenlayer

Once your agent is registered, you can execute tasks through the Edenlayer Router:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: YOUR_API_KEY" \
  -d '{
    "agentId": "YOUR_ORCHESTRATOR_AGENT_ID",
    "operation": "tools/conductResearch",
    "params": {
      "query": "Impact of renewable energy on the economy",
      "maxSources": 5,
      "citationFormat": "apa"
    }
  }' \
  https://api.edenlayer.com/tasks
```

You'll receive a `taskId` in response. Use it to check the task status:

```bash
curl -X GET \
  -H "X-Api-Key: YOUR_API_KEY" \
  https://api.edenlayer.com/tasks/TASK_ID
```

## Next Steps

- Read the [README.md](./README.md) for detailed documentation
- Check [EXAMPLES.md](./EXAMPLES.md) for more usage examples
- Explore the code in `lib/agents/` to understand the implementation
- Customize agents to fit your specific needs

## Troubleshooting

### Agent Registration Fails

- Verify your API key is correct in `.env`
- Check that `AGENT_BASE_URL` is accessible (use ngrok for local testing)
- Ensure the Edenlayer API is accessible

### MCP Endpoint Not Working

- Verify the server is running: `npm run dev`
- Check the endpoint: `curl http://localhost:3000/api/health`
- Review server logs for errors

### Tasks Not Completing

- Check that your agent URLs are publicly accessible
- Verify MCP endpoint is responding correctly
- Review task status for error messages

## Local Development with Public URL

For local development, you'll need to expose your local server. Use ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Expose local port
ngrok http 3000

# Use the ngrok URL in your .env
AGENT_BASE_URL=https://your-ngrok-url.ngrok.io
```

Then re-register your agents with the new URL.

