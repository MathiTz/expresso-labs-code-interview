"use client"

import { Agent } from "@/app/context/agents";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/app/utils";

const getStatusPill = (status: string) => {
  const baseClass = "px-2 py-1 text-sm text-white rounded-full";
  const statusClass = status === "Active" ? "bg-green-500" : "bg-red-500";
  return <span className={`${baseClass} ${statusClass}`}>{status}</span>;
};

type ListProps = {
  data?: Agent[];
}

export const List: FC<ListProps> = ({ data }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/edit/${id}`);
  };

  const handleAgentDetails = (id: string) => {
    router.push(`/dashboard/details/${id}`);
  };

  const filteredAgents = data?.filter(agent =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search agents..."
        data-testid="search-agents-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full text-black"
      />
      <ul className="space-y-4" data-testid="agents-list">
        {filteredAgents && filteredAgents.length > 0 ? (
          filteredAgents.slice(0, visibleCount).map(agent => (
            <li key={agent.id} className="border p-4 rounded-lg bg-white shadow-md transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700 font-semibold">{agent.name}</span>
                  <span className="text-gray-500">{agent.email}</span>
                  <span>{getStatusPill(agent.status)}</span>
                  <span className="text-gray-500">{formatDate(agent.lastSeen)}</span>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-300"
                    onClick={() => handleAgentDetails(agent.id)}
                  >
                    Info
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => handleEdit(agent.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center py-4">No available agents at the moment</li>
        )}
      </ul>
      {filteredAgents && filteredAgents.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};
