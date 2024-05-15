'use client'

import { cn, determineCorrectness } from '@/lib/utils'
import { useTypingStore } from '@/store'
import { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react'

interface IProps {}

const textContent =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt provident quibusdam distinctio facere voluptates ex consequuntur expedita. Suscipit ipsum facilis reprehenderit sunt nisi doloribus atque facere modi adipisci! Nesciunt vitae saepe modi soluta exercitationem velit illum libero deleniti obcaecati, eligendi doloremque maiores dolorem minus adipisci nulla aperiam? Rem vel ut doloremque est repellat! Esse quisquam consequatur quas at ab veniam nostrum accusamus similique, autem velit! Cum reiciendis dolore neque eligendi minus debitis optio inventore iste impedit, quidem totam ab voluptatibus beatae error modi! Aliquid rerum fugiat consequuntur reprehenderit sapiente ex nihil aspernatur, nostrum accusantium repellendus! Quas fugiat repellat similique nulla nemo molestias dolorum, autem molestiae alias temporibus modi consecteturo?'

const TypingContentModule: FC<IProps> = (): JSX.Element => {
  const { charIndex, inputValue, isTyping, updateTypingState, isTypingStarted } = useTypingStore((state) => state)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    updateTypingState('inputValue', value)
    updateTypingState('charIndex', value.length)
    updateTypingState('isTyping', true)

    const { correctCount, incorrectCount } = determineCorrectness(value, textContent)
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

  const getHighlightedText = () => {
    const words = textContent.split(' ')
    let currentIndex = 0
    let globalCharIndex = 0

    return words.map((word, wordIndex) => {
      const wordElements = word.split('').map((char, charIndexInWord) => {
        globalCharIndex = currentIndex + charIndexInWord

        return (
          <span
            key={charIndexInWord}
            className={cn('text-gray-500 relative inline-block', {
              'before:absolute before:rounded-sm before:-left-[2.5px] before:top-2 before:h-6 before:w-0.5 before:bg-green-500 before:content-[""]  before:ml-0.5':
                globalCharIndex === charIndex,
              'before:animate-blink': globalCharIndex === charIndex && !isTyping,
              'text-white': inputValue[globalCharIndex] === char,
              'text-red-500': inputValue[globalCharIndex] !== char && globalCharIndex < inputValue.length,
            })}
          >
            {char}
          </span>
        )
      })

      currentIndex += word.length + 1
      return (
        <div key={wordIndex} className="inline-block mr-2">
          {wordElements}
          <span
            className={cn('relative inline-block', {
              'before:absolute before:rounded-sm before:-left-[2.5px] before:-top-5 before:h-6 before:w-0.5 before:bg-green-500 before:content-[""] before:ml-0.5':
                globalCharIndex + 1 === charIndex,
              'before:animate-blink': globalCharIndex + 1 === charIndex && !isTyping,
            })}
          ></span>
          {wordIndex < words.length - 1 && <span className="inline-block"> </span>}
        </div>
      )
    })
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInput} ref={inputRef} className="opacity-0" />
      <div className="text-xl tracking-widest leading-10 border border-black p-2" tabIndex={0} onClick={handleFocus}>
        {getHighlightedText()}
      </div>
    </div>
  )
}

export default TypingContentModule
