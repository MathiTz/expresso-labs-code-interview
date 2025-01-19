import { revalidatePath } from 'next/cache';

export async function deleteAgent(id: string): Promise<void> {
  await fetch(`http://localhost:3001/agents/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['agents'],
    },
  });

  revalidatePath('/dashboard', 'page');

  return;
}
