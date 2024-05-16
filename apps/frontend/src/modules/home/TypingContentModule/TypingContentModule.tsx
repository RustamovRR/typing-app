'use client'

import { useTypingStore } from '@/store'
import { FC } from 'react'
import { useFocusManagement, useHighlightedText, useInputManagement } from './hooks'

interface IProps {}

const TypingContentModule: FC<IProps> = (): JSX.Element => {
  const { inputValue } = useTypingStore((state) => state)

  const highlightedText = useHighlightedText()
  const { handleInput } = useInputManagement()
  const { inputRef, handleFocus } = useFocusManagement()

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
