'use client'

import { useTimer } from '@/hooks/common'
import { useTypingStore } from '@/store'
import { AnalyticsModule, TypingContentModule, TypingSettingsModule } from '@/modules/home'
import { formatTime } from '@/lib/utils'

export default function Home() {
  const { isTypingStarted } = useTypingStore((state) => state)
  const timer = useTimer()
  const timerInMinutes = formatTime(timer)

  return (
    <main className="p-24">
      <h1 className="text-4xl font-semibold">Typing app</h1>
      <div>
        {isTypingStarted ? (
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl">{timerInMinutes} </h1>
          </div>
        ) : (
          <div className="animate-fade-out">
            <TypingSettingsModule />
          </div>
        )}
        {timer === 0 ? (
          <div className="animate-fade-in">
            <AnalyticsModule />
          </div>
        ) : (
          <div className="animate-fade-out">
            <TypingContentModule />
          </div>
        )}
      </div>
    </main>
  )
}
