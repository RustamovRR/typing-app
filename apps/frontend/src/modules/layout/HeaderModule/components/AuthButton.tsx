'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AuthButton = () => {
  const pathname = usePathname()
  const isLoginPage = pathname === '/auth/login'
  return (
    <div>
      <Link href={isLoginPage ? '/auth/register' : '/auth/login'}>
        <Button variant="outline">{isLoginPage ? "Ro'yxatdan o'tish" : 'Login'} </Button>
      </Link>
    </div>
  )
}

export default AuthButton
