'use client'

import { FC, useEffect } from 'react'
import { useTypingStore } from '@/store'
import { useCalculateAccuracy, useCalculateWPM } from './hooks'

interface IProps {}

const TypingContentModule: FC<IProps> = (): JSX.Element => {
  const { timer, isTypingStarted, updateTypingState, correctChars, totalChars } = useTypingStore((state) => state)
  const wpm = useCalculateWPM()
  const accuracy = useCalculateAccuracy()

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    if (isTypingStarted && timer > 0) {
      timerId = setTimeout(() => updateTypingState('timer', timer - 1), 1000)
    }
    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isTypingStarted, timer])

  return (
    <div className="flex gap-3 mt-5">
      <h1>Anayltics Test</h1>
      <div>WPM: {wpm}</div>
      <div>ACC: {accuracy ?? 100}%</div>
      <div>Time: {timer}s</div>
    </div>
  )
}

export default TypingContentModule
