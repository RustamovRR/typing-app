import { useEffect, useRef } from 'react'
import { useTypingStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const useFocusManagement = () => {
  const { isTypingStarted, updateTypingState } = useTypingStore(
    useShallow(({ isTypingStarted, updateTypingState }) => ({
      isTypingStarted,
      updateTypingState,
    })),
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    handleFocus()
  }, [])

  useEffect(() => {
    const handleActiveFocus = () => {
      if (document.activeElement === inputRef.current && !isTypingStarted) {
        if (!isTypingStarted) {
          updateTypingState('isTypingStarted', true)
        }
      }
    }

    inputRef.current?.addEventListener('keypress', handleActiveFocus)

    return () => {
      inputRef.current?.removeEventListener('keypress', handleActiveFocus)
    }
  }, [isTypingStarted])

  return { inputRef, handleFocus }
}

export default useFocusManagement
