'use client'

import { determineCorrectness } from '@/lib/utils'
import { useTypingStore } from '@/store'
import { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react'
import { useGetHighlightedText } from './hooks'

interface IProps {}

const TypingContentModule: FC<IProps> = (): JSX.Element => {
  const { inputValue, updateTypingState, isTypingStarted, text } = useTypingStore((state) => state)
  const inputRef = useRef<HTMLInputElement>(null)

  const highlightedText = useGetHighlightedText()

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    updateTypingState('inputValue', value)
    updateTypingState('charIndex', value.length)
    updateTypingState('isTyping', true)

    const { correctCount, incorrectCount } = determineCorrectness(value, text)
    updateTypingState('totalChars', value.length)
    updateTypingState('correctChars', correctCount)
    updateTypingState('incorrectChars', incorrectCount)
  }, [])

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

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInput} ref={inputRef} className="opacity-0" />
      <div className="text-3xl tracking-wider leading-10 border border-black p-2" tabIndex={0} onClick={handleFocus}>
        {highlightedText}
      </div>
    </div>
  )
}

export default TypingContentModule
