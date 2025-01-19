import { Agent } from '@/app/context/agents';

export async function listAgents(): Promise<Agent[]> {
  return fetch('http://localhost:3001/agents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    next: {
      tags: ['agents'],
    },
  }).then((res) => res.json());
}
