'use client'

import React from 'react'
import AnalyticsModule from './AnalyticsModule'
import TypingContentModule from './TypingContentModule'
import { useTypingStore } from '@/store'
import { useTimer } from '@/hooks'

const HomeContainerModule = () => {
  const { isTypingStarted } = useTypingStore((state) => state)
  const timer = useTimer()

  return (
    <div>
      {isTypingStarted ? (
        <div className="text-center">
          <h1 className="text-6xl">{timer} </h1>
        </div>
      ) : (
        <AnalyticsModule />
      )}
      {timer === 0 ? <div>Analitssldfadlfjaldsfklj</div> : <TypingContentModule />}
    </div>
  )
}

export default HomeContainerModule
