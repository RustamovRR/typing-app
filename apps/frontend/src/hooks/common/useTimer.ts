import { useEffect, useState } from 'react'
import { useTypingStore } from '@/store'

const useTimer = () => {
  const { isTypingStarted, timerDuration } = useTypingStore((state) => state)
  const [timer, setTimer] = useState<number>(timerDuration)

  useEffect(() => {
    setTimer(timerDuration)
  }, [timerDuration])

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null
    if (isTypingStarted && timer > 0) {
      timerId = setTimeout(() => setTimer((value) => value - 1), 1000)
    }
    return () => {
      if (timerId) clearTimeout(timerId)
    }
  }, [isTypingStarted, timer])

  return timer
}

export default useTimer
