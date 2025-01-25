"use client"

import { detailAgent } from "@/api/agents/detail";
import { formatDate } from "@/app/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { use } from "react";

type EditAgentParams = {
  params: Promise<{ id: string }>
}

const DetailsAgentPage = ({
  params
}: EditAgentParams) => {
  const { id } = use(params);

  const { data: agent, isLoading } = useQuery({
    queryKey: ["agent", id],
    queryFn: async () => await detailAgent(id)
  })

  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    )
  }

  return agent && (
    <div className="flex-1 bg-gray-500 p-4">
      <div className="relative my-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 absolute top-0 left-0 ml-4"
          onClick={handleBack}
        >
          Back to List
        </button>
        <h2 className="text-2xl text-center flex-1">Agent Details</h2>
      </div>
      <div className="w-full max-w-lg mx-auto my-8 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <div className="p-2 border rounded text-black">{agent.name}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Username</label>
          <div className="p-2 border rounded text-black">{agent.username}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <div className="p-2 border rounded text-black">{agent.email}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Status</label>
          <div className="p-2 border rounded text-black">{agent.status}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Last Seen</label>
          <div className="p-2 border rounded text-black">{formatDate(agent.lastSeen)}</div>
        </div>
      </div>
    </div>
  )
}

export default DetailsAgentPage;
