// Edenlayer Protocol API Client

import axios from 'axios';
import { EDENLAYER_API_URL, EDENLAYER_API_KEY } from '../config/edenlayer';
import type { AgentRegistration, TaskRequest, TaskResult, ComposedTask } from '../types/edenlayer';

export class EdenlayerClient {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = EDENLAYER_API_URL;
    this.apiKey = EDENLAYER_API_KEY;
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'X-Api-Key': this.apiKey
    };
  }

  async registerAgent(registration: AgentRegistration): Promise<{ agentId: string }> {
    const response = await axios.post(
      `${this.apiUrl}/agents`,
      registration,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async executeTask(task: TaskRequest): Promise<TaskResult> {
    const response = await axios.post(
      `${this.apiUrl}/tasks`,
      task,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async composeTasks(tasks: ComposedTask[]): Promise<TaskResult> {
    const response = await axios.post(
      `${this.apiUrl}/tasks/compose`,
      tasks,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async getTaskStatus(taskId: string): Promise<TaskResult> {
    const response = await axios.get(
      `${this.apiUrl}/tasks/${taskId}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async listAgents(): Promise<any[]> {
    const response = await axios.get(
      `${this.apiUrl}/agents`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async searchAgents(query: string): Promise<any[]> {
    const response = await axios.get(
      `${this.apiUrl}/agents/search`,
      { 
        params: { query },
        headers: this.getHeaders() 
      }
    );
    return response.data;
  }
}

