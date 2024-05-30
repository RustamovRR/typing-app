'use client'

import { LoginModule } from '@/modules/auth'
import { queryClient } from '@/providers'
import { QueryClientProvider } from '@tanstack/react-query'

const LoginPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex items-center justify-center">
        <LoginModule />
      </div>
    </QueryClientProvider>
  )
}

export default LoginPage
