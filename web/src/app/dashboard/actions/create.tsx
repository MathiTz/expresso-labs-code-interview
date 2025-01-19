'use server'

import { faker } from '@faker-js/faker'
import { createAgent } from "@/api/agents/create";
import { CreateAgentData } from "@/app/context/agents";
import { revalidateTag } from "next/cache";

export async function create(agentData: CreateAgentData): Promise<void> {
  const newAgent = {
    ...agentData,
    "username": faker.person.middleName(),
    "address": {
      "street": faker.location.street(),
      "suite": faker.location.secondaryAddress(),
      "city": faker.location.city(),
      "zipcode": faker.location.zipCode(),
      "geo": {
        "lat": faker.location.latitude().toString(),
        "lng": faker.location.longitude().toString()
      }
    },
    "phone": faker.phone.number(),
    "website": "test@test.com",
    "company": {
      "name": faker.company.name(),
      "catchPhrase": faker.company.catchPhrase(),
      "bs": faker.company.buzzPhrase()
    },
  }

  await createAgent(newAgent)
  revalidateTag("agents")
  return
}
