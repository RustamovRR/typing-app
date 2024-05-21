'use client'

import React from 'react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const Theme = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Mavzuni almashtirish</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Yorug'</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Qorong'i</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>Tizim</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Theme
