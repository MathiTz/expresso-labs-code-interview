"use client"

import { FC, PropsWithChildren, useContext, useState, createContext } from "react";
import { AgentsContextType, Agent } from ".";
import { sleep } from "@/app/utils";

const AgentsContext = createContext({} as AgentsContextType)

const AgentsContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const handleGetAgent = (id: string) => {
    return agents.find(a => a.id === id)
  }

  const handleAddAgent = (newAgent: Agent) => {
    setAgents([...agents, newAgent])
  }

  const handleEditAgent = (agent: Partial<Agent>) => {
    const updatedAgents = agents.map(a => {
      if (a.id === agent.id) {
        return { ...a, ...agent }
      }
      return a
    })

    setAgents(updatedAgents)
  }

  const handleDeleteAgent = (id: string) => {
    const updatedAgents = agents.filter(a => a.id !== id)
    setAgents(updatedAgents)
    sleep(1000)
  }

  const handleSetAgents = (agents: Agent[]) => {
    setAgents(agents)
  }

  return (
    <AgentsContext.Provider value={
      {
        agents,
        handleGetAgent,
        handleAddAgent,
        handleEditAgent,
        handleDeleteAgent,
        handleSetAgents,
      }
    }>
      {children}
    </AgentsContext.Provider>
  )
}

const useAgents = (): AgentsContextType => useContext(AgentsContext)

export { AgentsContextProvider, useAgents }
