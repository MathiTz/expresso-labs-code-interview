import { CreateAgentData, Agent } from '@/app/context/agents';

export async function createAgent(agentData: CreateAgentData): Promise<Agent> {
  const response = await fetch('http://localhost:3001/agents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agentData),
  });

  return response.json();
}
