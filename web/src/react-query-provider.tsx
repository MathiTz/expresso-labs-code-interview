'use client'

import React from 'react'
import { QueryClientProvider, QueryClient, HydrationBoundary } from '@tanstack/react-query'

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
