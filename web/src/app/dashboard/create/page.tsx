"use client"

import { CreateAgentData, useAgents } from "@/app/context/agents"
import { useRouter } from "next/navigation"
import { FC } from "react"

import { Form } from "../components/Form"
import { create } from "../actions/create"

const CreateAgentPage: FC = () => {
  const router = useRouter()
  const {
    handleAddAgent
  } = useAgents()

  const onSubmit = (data: CreateAgentData) => {
    const newAgent = { ...data, id: Math.random().toString(36).substr(2, 9), lastSeen: new Date() }

    create(newAgent)
    handleAddAgent(newAgent)
    // Redirect to the dashboard page
    router.push("/dashboard")
  }

  return (
    <main className="flex-1 bg-gray-500">
      <div className="p-4">
        <h2 className="text-2xl">Create Agent</h2>
        <p className="text-gray-200">Fill in the form to create a new agent.</p>
      </div>
      <div className="p-4">
        <Form formMode="create" onSubmit={onSubmit} />
      </div>
    </main>
  )
}

export default CreateAgentPage
