'use client'

import { RegisterModule } from '@/modules/auth'
import { queryClient } from '@/providers'
import { QueryClientProvider } from '@tanstack/react-query'

const RegisterPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex items-center justify-center">
        <RegisterModule />
      </div>
    </QueryClientProvider>
  )
}

export default RegisterPage
