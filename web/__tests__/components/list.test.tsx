import { expect, vi, it, describe } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { List } from "@/app/dashboard/components/List"
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

const setup = () => {
  return render(<List data={mockAgent} />)
}

describe('List component', async () => {
  it('should render a list of agents', async () => {
    const { findByText, unmount } = setup()

    expect(findByText('Agent 1')).not.toBeNull()
    expect(findByText('Agent 2')).not.toBeNull()

    unmount()
  })

  it('should render only 2 agents', async () => {
    const { findByTestId, unmount } = setup()

    expect((await findByTestId('agents-list')).children.length).toBe(2)

    unmount()
  })

  it('should be able to render a search input', async () => {
    const { findByTestId, unmount } = render(<List />)

    expect(findByTestId('search-agents-input')).not.toBeNull()
    unmount()
  })

  it('should be able to search agents', async () => {
    const { findByTestId, findByText, unmount } = setup()

    const searchInput = await findByTestId('search-agents-input')
    fireEvent.change(searchInput, { target: { value: 'Agent 1' } })

    waitFor(() => {
      expect(findByText('Agent 1')).not.toBeNull()
      expect(findByText('Agent 2')).toBeNull()
    })

    unmount()
  })

})
