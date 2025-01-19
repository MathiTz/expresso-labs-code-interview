import { Agent, AgentStatus } from "@/app/context/agents"
import { FC } from "react"
import { useForm } from "react-hook-form"

export type FormComponentProps = {
  formMode: 'create' | 'edit'
  onSubmit: (data: Agent) => void
  agentValue?: Agent
}

export const Form: FC<FormComponentProps> = ({ formMode, onSubmit, agentValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Agent>()

  const registerByMode = (name: keyof Agent) => {
    if (formMode === 'create') {
      return register(name, { required: true })
    }

    return register(name, {
      value: agentValue?.[name],
    })
  }

  return (
    <form className="w-full max-w-lg mx-auto my-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center mb-4">
        <label htmlFor="name" className="w-1/4">Name</label>
        <input
          type="text"
          id="name"
          className="w-3/4 text-black"
          {...registerByMode("name")}
        />
        {errors.name && (
          <span className="text-red-500">Name is required</span>
        )}
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="email" className="w-1/4">Email</label>
        <input
          type="email"
          id="email"
          className="w-3/4 text-black"
          {...registerByMode("email")}
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="status" className="w-1/4">Status</label>
        <select
          id="status"
          className="w-3/4 text-black"
          {...registerByMode("status")}
        >
          <option value={AgentStatus.Active}>Active</option>
          <option value={AgentStatus.Inactive}>Inactive</option>
        </select>
        {errors.status && (
          <span className="text-red-500">Status is required</span>
        )}
      </div>
      <div className="flex items-center mb-4">
        <button
          data-testid="form-agent-submit"
          className="w-1/4 bg-blue-500 text-white py-2"
          type="submit"
        >
          {formMode === 'create' ? 'Add' : 'Update'} Agent
        </button>
      </div>
    </form>
  )
}
