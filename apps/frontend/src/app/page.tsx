'use client'

import { useTimer } from '@/hooks/common'
import { useTypingStore } from '@/store'
import { AnalyticsModule, TypingContentModule, TypingSettingsModule } from '@/modules/home'
import { formatTime } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'

export default function Home() {
  const { isTypingStarted, isTypingFinished } = useTypingStore(
    useShallow(({ isTypingStarted, isTypingFinished }) => ({ isTypingStarted, isTypingFinished })),
  )
  const timer = useTimer()
  const timerInMinutes = formatTime(timer)

  return (
    <main className="p-24">
      <h1 className="text-4xl font-semibold">Typing app</h1>
      <div>
        {!isTypingStarted && !isTypingFinished && (
          <div className="animate-fade-in">
            <TypingSettingsModule />
          </div>
        )}
        {isTypingStarted && !isTypingFinished && (
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl">{timerInMinutes}</h1>
          </div>
        )}

        {!isTypingFinished && (
          <div className="animate-fade-in">
            <TypingContentModule />
          </div>
        )}

        {isTypingFinished && (
          <div className="animate-fade-in">
            <AnalyticsModule />
          </div>
        )}
      </div>
    </main>
  )
}
