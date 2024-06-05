'use client'

import { Button, Skeleton } from '@/components/ui'
import { useAppStore } from '@/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useUserProfileQuery } from '@/hooks/queries'
import Image from 'next/image'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/providers'

const AuthButton = () => {
  const { isLoading } = useAppStore(
    useShallow(({ isLoading }) => ({
      isLoading,
    })),
  )
  const pathname = usePathname()
  const isLoginPage = pathname === '/auth/login'
  const { data, isLoading: isUserLoading } = useUserProfileQuery()
  const profile = data?.data

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {isUserLoading ? (
          <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
        ) : data?.status ? (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              width={40}
              height={40}
              src={profile?.photo || ''}
              alt={profile?.fullName || profile?.username || profile?.email || ''}
            />
          </div>
        ) : isLoading ? (
          <Button variant="outline" disabled>
            {isLoginPage ? "Ro'yxatdan o'tish" : 'Login'}{' '}
          </Button>
        ) : (
          <Link href={isLoginPage ? '/auth/register' : '/auth/login'}>
            <Button variant="outline">{isLoginPage ? "Ro'yxatdan o'tish" : 'Login'} </Button>
          </Link>
        )}
      </div>
    </QueryClientProvider>
  )
}

export default AuthButton
