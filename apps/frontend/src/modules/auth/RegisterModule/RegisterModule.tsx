'use client'

import React, { useState } from 'react'

import { AuthForm } from '../components'

const RegisterModule = () => {
  const [password, setPassword] = useState('')

  return <AuthForm />
}

export default RegisterModule
