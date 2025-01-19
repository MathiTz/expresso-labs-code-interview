export enum AgentStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type Agent = {
  id: string;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  status: AgentStatus;
  lastSeen: string;
};

export type CreateAgentData = Agent;
export type UpdateAgentData = Partial<Agent>;

export type AgentsContextType = {
  agents: Agent[];
  handleGetAgent: (id: string) => Agent | undefined;
  handleAddAgent: (agent: CreateAgentData) => void;
  handleEditAgent: (agent: Partial<Agent>) => void;
  handleDeleteAgent: (id: string) => void;
  handleSetAgents: (agents: Agent[]) => void;
};
