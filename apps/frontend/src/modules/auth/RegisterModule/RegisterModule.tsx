'use client'

import React, { useState } from 'react'
import { GithubIcon, GoogleIcon } from '@/assets/icons'
import { Button, Input, Label, PasswordInput } from '@/components/ui'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { BASE_URL } from '@/constants'

const RegisterModule = () => {
  const [password, setPassword] = useState('')
  const { theme } = useTheme()

  return (
    <div className="sm:w-[350px] mb-20">
      <section className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Yangi akkount ochish</h1>
        <p className="text-sm text-muted-foreground">
          Yangi akkount ochish uchun pastda elektron pochtangizni kiriting
        </p>
        <form>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <section className="flex flex-col items-start gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" className="h-9" id="email" placeholder="name@example.com" autoComplete="email" />
              </section>
              <section className="flex flex-col text-start gap-2">
                <Label htmlFor="password">Parol</Label>
                <PasswordInput
                  type="password"
                  className="h-9"
                  id="password"
                  placeholder="12345678"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </section>
            </div>
            <Button size="sm" type="submit" variant={theme === 'dark' ? 'default' : 'outline'}>
              Ro'yxatdan o'tish
            </Button>
          </div>
        </form>
      </section>
      <section className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="flex justify-center relative text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Yoki ushbular orqali</span>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <Button size="sm" variant={theme === 'dark' ? 'default' : 'outline'}>
          <Link href={`${BASE_URL}/auth/google`} className="flex items-center justify-center gap-2 w-full h-full">
            <GoogleIcon />
            <span>Google orqali ro'yxatdan o'tish</span>
          </Link>
        </Button>
        <Button size="sm" variant={theme === 'dark' ? 'default' : 'outline'}>
          <Link href={`${BASE_URL}/auth/github`} className="flex items-center justify-center gap-2 w-full h-full">
            <GithubIcon />
            <span>Github orqali ro'yxatdan o'tish</span>
          </Link>
        </Button>
      </section>
    </div>
  )
}

export default RegisterModule
