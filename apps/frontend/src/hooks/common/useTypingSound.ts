import { useCallback, useRef } from 'react'
import typingSound from '@/assets/sounds/typing_1.wav'
import typingErrorSound from '@/assets/sounds/typing_error_1.wav'

const useTypingSound = () => {
  const typingAudioRef = useRef(new Audio(typingSound))
  const errorAudioRef = useRef(new Audio(typingErrorSound))

  const playTypingSound = useCallback(() => {
    if (typingAudioRef.current) {
      typingAudioRef.current.currentTime = 0
      typingAudioRef.current.play()
    }
  }, [])

  const playErrorSound = useCallback(() => {
    if (errorAudioRef.current) {
      errorAudioRef.current.currentTime = 0
      errorAudioRef.current.play()
    }
  }, [])

  return { playTypingSound, playErrorSound }
}

export default useTypingSound
