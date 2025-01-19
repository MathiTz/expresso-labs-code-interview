import { expect, vi, it, describe } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { SideMenu } from "@/app/dashboard/components/SideMenu"
import { ROUTES } from '@/app/routes';

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

const setup = () => {
  return render(<SideMenu />)
}

describe('SideMenu component', async () => {
  it('should render a list of routes', async () => {
    const { findByText, unmount } = setup()

    expect(findByText('List')).not.toBeNull()
    expect(findByText('Create')).not.toBeNull()

    unmount()
  })

  it('should render only the routes available', async () => {
    const { findByTestId, unmount } = setup()

    expect((await findByTestId('routes-list')).children.length).toBe(ROUTES.length)
    unmount()
  })

  it('should be able to call push from router correctly', async () => {
    const { findByTestId } = setup()

    const createRoute = await findByTestId('route-dashboard-create')

    fireEvent.click(createRoute)

    waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/dashboard/create')
    })
  })

})
