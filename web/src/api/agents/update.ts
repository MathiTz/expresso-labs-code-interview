import { UpdateAgentData } from '@/app/context/agents';

export async function updateAgent(agentData: UpdateAgentData): Promise<void> {
  await fetch(`http://localhost:3001/agents/${agentData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agentData),
  });

  return;
}
