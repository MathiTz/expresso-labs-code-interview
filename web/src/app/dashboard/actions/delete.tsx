'use server'

import { deleteAgent } from "@/api/agents/delete"
import { revalidatePath } from "next/cache"

export async function deleteAction(id: string): Promise<void> {
  await deleteAgent(id)

  revalidatePath("/dashboard", "page")

  return
}
