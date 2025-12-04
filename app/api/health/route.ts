// Health Check Endpoint

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Research Orchestrator Agent',
    timestamp: new Date().toISOString()
  });
}

