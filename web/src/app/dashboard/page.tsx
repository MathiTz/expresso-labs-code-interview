"use client"

import { useRouter } from "next/navigation";
import { List } from "./components/List";
import { useQuery } from "@tanstack/react-query";
import { Agent } from "../context/agents";
import { listAgents } from "@/api/agents/list";

const AgentsListPage = () => {
  const router = useRouter();

  const handleCreateNewAgent = () => {
    router.push("/dashboard/create");
  };

  const { data: agentsData, } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: async () => await listAgents(),
    staleTime: 1000
  })

  return (
    <main className="flex-1 p-6 bg-gray-500">
      <section className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Agents</h1>
        <button data-testid="button-create-agent" onClick={handleCreateNewAgent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add New Agent</button>
      </section>
      <List data={agentsData} />
    </main>
  );
};

export default AgentsListPage;
