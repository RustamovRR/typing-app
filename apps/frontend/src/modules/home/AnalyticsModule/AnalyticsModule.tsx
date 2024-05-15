'use client'

import { FC, useEffect } from 'react'
import { useTypingStore } from '@/store'

interface IProps {}

const TypingContentModule: FC<IProps> = (): JSX.Element => {
  const { timer, isTypingStarted, updateTypingState } = useTypingStore((state) => state)

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
      <div>WPM: 10</div>
      <div>ACC: 100%</div>
      <div>Time: {timer}s</div>
    </div>
  )
}

export default TypingContentModule
