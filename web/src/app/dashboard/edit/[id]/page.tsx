"use client"

import { UpdateAgentData, useAgents } from "@/app/context/agents";
import { use } from "react";
import { redirect } from "next/navigation";
import { sanatizeFields } from "@/app/utils";
import { update } from "../../actions/update";
import { Form } from "../../components/Form";
import { useQuery } from "@tanstack/react-query";
import { detailAgent } from "@/api/agents/detail";
import { deleteAction } from "../../actions/delete";

type EditAgentParams = {
  params: Promise<{ id: string }>
}

const EditAgentPage = ({
  params
}: EditAgentParams) => {
  const { handleDeleteAgent } = useAgents()
  const { id: agentId } = use(params);
  const { data: agentData, isLoading } = useQuery({
    queryKey: ["agent", agentId],
    queryFn: async () => await detailAgent(agentId)
  })

  const handleGoBack = () => {
    redirect("/dashboard")
  }

  const handleUpdateAgent = (data: UpdateAgentData) => {
    const updatedAgent = { ...agentData, ...sanatizeFields({ ...data }) }

    update(updatedAgent)
    redirect("/dashboard")
  }

  const handleDelete = async (id: string) => {
    deleteAction(id)
    handleDeleteAgent(id);

    redirect("/dashboard")
  };

  return (
    <div className="flex-1 bg-gray-500 py-4">
      <div className="flex justify-between items-center">
        <button
          className="bg-blue-500 text-white ml-4 mt-4 px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          onClick={handleGoBack}
        >
          Back
        </button>
        <h2 className="text-2xl ml-4 mt-4">Edit Agent</h2>
        <button
          className="bg-red-500 text-white mr-4 mt-4 px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
          onClick={() => handleDelete(agentId)}
        >
          Delete
        </button>
      </div>
      {isLoading ?
        (
          <div className="flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        )
        :
        (
          <Form formMode="edit" onSubmit={handleUpdateAgent} agentValue={agentData} />
        )}
    </div>
  )
}

export default EditAgentPage;
