import { ChangeEvent, useCallback } from 'react'
import { useTypingStore } from '@/store'
import { determineCorrectness } from '@/lib/utils'

const useInputManagement = () => {
  const { updateTypingState, text } = useTypingStore((state) => state)

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      updateTypingState('inputValue', value)
      updateTypingState('charIndex', value.length)
      updateTypingState('isTyping', true)

      const { correctCount, incorrectCount } = determineCorrectness(value, text)
      updateTypingState('totalChars', value.length)
      updateTypingState('correctChars', correctCount)
      updateTypingState('incorrectChars', incorrectCount)
    },
    [text],
  )

  return { handleInput }
}

export default useInputManagement
