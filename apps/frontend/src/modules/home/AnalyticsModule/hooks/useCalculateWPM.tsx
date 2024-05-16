import { useEffect, useState } from 'react'
import { useTypingStore } from '@/store'
import { useTimer } from '@/hooks'

const useCalculateWPM = () => {
  const timer = useTimer()
  const [wpm, setWpm] = useState(0)
  const { charIndex, timerDuration, isTypingStarted } = useTypingStore((state) => state)

  useEffect(() => {
    if (!isTypingStarted) {
      setWpm(0)
      return
    }

    const calculateWPM = () => {
      const timeElapsedSeconds = timerDuration - timer
      if (timeElapsedSeconds <= 0) return 0

      const minutes = timeElapsedSeconds / 60
      return charIndex / 5 / minutes
    }

    setWpm(calculateWPM())
  }, [charIndex, timer, isTypingStarted])

  return Math.floor(wpm)
}

export default useCalculateWPM
