import { Agent } from '@/app/context/agents';

export async function detailAgent(id: string): Promise<Agent> {
  return fetch(`http://localhost:3001/agents/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['agents'],
    },
  }).then((res) => res.json());
}
