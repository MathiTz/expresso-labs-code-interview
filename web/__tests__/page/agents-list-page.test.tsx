import AgentsListPage from "@/app/dashboard/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockedPush = vi.fn()

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: mockedPush,
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

const queryClient = new QueryClient({})

const setup = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AgentsListPage />
    </QueryClientProvider>
  )
}

vi.mock('../src/api/agents/list', async () => {
  return async () => [
    { id: 1, name: 'Leanne Graham', email: 'leanne_graham@agency.com', status: 'Active' },
    { id: 2, name: 'Ervin Howell', email: 'ervin_howell@agency.com', status: 'Inactive' },
  ]
})

describe('AgentsListPage', async () => {
  it('should render a list of agents', async () => {
    const { findByText, unmount } = setup()

    expect(findByText('Leanne Graham')).not.toBeNull()
    expect(findByText('Ervin Howell')).not.toBeNull()

    unmount()
  })

  it('should be able to call push from router correctly', async () => {
    const { findByTestId, unmount } = setup()

    const createRoute = await findByTestId('button-create-agent')

    fireEvent.click(createRoute)

    waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/dashboard/create')
    })

    unmount()
  })
})
