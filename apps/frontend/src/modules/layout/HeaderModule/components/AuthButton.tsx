'use client'

import { Button } from '@/components/ui'
import { useAppStore } from '@/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

const AuthButton = () => {
  const { isLoading } = useAppStore(
    useShallow(({ isLoading }) => ({
      isLoading,
    })),
  )
  const pathname = usePathname()
  const isLoginPage = pathname === '/auth/login'
  return (
    <div>
      {isLoading ? (
        <Button variant="outline" disabled>
          {isLoginPage ? "Ro'yxatdan o'tish" : 'Login'}{' '}
        </Button>
      ) : (
        <Link href={isLoginPage ? '/auth/register' : '/auth/login'}>
          <Button variant="outline">{isLoginPage ? "Ro'yxatdan o'tish" : 'Login'} </Button>
        </Link>
      )}
    </div>
  )
}

export default AuthButton
