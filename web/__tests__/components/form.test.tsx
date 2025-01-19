import { expect, vi, it, describe } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Form, FormComponentProps } from "@/app/dashboard/components/Form"
import { AgentStatus } from '@/app/context/agents'

const mockAgent = [
  { id: "1", name: 'Agent 1', status: AgentStatus.Active, email: "agent_test+1@agency.com", lastSeen: "2021-09-01T00:00:00Z" },
  { id: "2", name: 'Agent 2', status: AgentStatus.Inactive, email: "agent_test+2@agency.com", lastSeen: "2021-09-01T00:00:00Z" },
]

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

const setup = (formProps: FormComponentProps) => {
  return render(<Form {...formProps} />)
}
describe('Form component', async () => {
  it('should render create form', async () => {
    const onSubmit = vi.fn()
    const formProps: FormComponentProps = {
      formMode: 'create',
      onSubmit,
    }
    const { getByText, getByLabelText, unmount } = setup(formProps)
    expect(getByText('Name')).toBeTruthy()
    expect(getByLabelText('Name')).toBeTruthy()
    expect(getByText('Email')).toBeTruthy()
    expect(getByLabelText('Email')).toBeTruthy()
    expect(getByText('Status')).toBeTruthy()
    expect(getByLabelText('Status')).toBeTruthy()

    unmount()
  })

  it('should render edit form', async () => {
    const onSubmit = vi.fn()
    const formProps: FormComponentProps = {
      formMode: 'edit',
      onSubmit,
      agentValue: mockAgent[0]
    }
    const { getByText, getByLabelText, unmount } = setup(formProps)
    expect(getByText('Name')).toBeTruthy()
    expect(getByLabelText('Name')).toBeTruthy()
    expect(getByText('Email')).toBeTruthy()
    expect(getByLabelText('Email')).toBeTruthy()
    expect(getByText('Status')).toBeTruthy()
    expect(getByLabelText('Status')).toBeTruthy()

    unmount()
  })

  it('should call onSubmit with correct data', async () => {
    const onSubmit = vi.fn()
    const formProps: FormComponentProps = {
      formMode: 'create',
      onSubmit,
    }
    const { getByTestId, getByLabelText } = setup(formProps)

    fireEvent.change(getByLabelText('Name'), { target: { value: 'Agent 1' } })
    fireEvent.change(getByLabelText('Email'), { target: { value: 'agent_test+1@agency.com' } })
    fireEvent.change(getByLabelText('Status'), { target: { value: AgentStatus.Active } })

    fireEvent.click(getByTestId('form-agent-submit'))

    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Agent 1',
        email: 'agent_test+1@agency.com',
        status: AgentStatus.Active
      })
    })
  })
})
