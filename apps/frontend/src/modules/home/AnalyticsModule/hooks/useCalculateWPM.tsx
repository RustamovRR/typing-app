import { useEffect, useState } from 'react'
import { useTypingStore } from '@/store'

const useCalculateWPM = () => {
  const { charIndex, timerDurationType, timer, isTypingStarted } = useTypingStore((state) => state)
  const [wpm, setWpm] = useState(0)

  useEffect(() => {
    if (!isTypingStarted) {
      setWpm(0)
      return
    }

    const calculateWPM = () => {
      const timeElapsedSeconds = timerDurationType - timer
      if (timeElapsedSeconds <= 0) return 0

      const minutes = timeElapsedSeconds / 60
      return charIndex / 5 / minutes
    }

    setWpm(calculateWPM())
  }, [charIndex, timer, isTypingStarted])

  return Math.floor(wpm)
}

export default useCalculateWPM
