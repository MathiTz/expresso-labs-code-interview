'use server'

import { updateAgent } from "@/api/agents/update";
import { UpdateAgentData } from "@/app/context/agents";
import { revalidatePath } from "next/cache";

export async function update(agentData: UpdateAgentData): Promise<void> {
  await updateAgent(agentData)
  revalidatePath("/dashboard", "page")
  return
}
