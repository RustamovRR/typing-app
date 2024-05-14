'use client'

import { cn } from '@/lib/utils'
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react'

interface IProps {}

const textContent =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt provident quibusdam distinctio facere voluptates ex consequuntur expedita. Suscipit ipsum facilis reprehenderit sunt nisi doloribus atque facere modi adipisci! Nesciunt vitae saepe modi soluta exercitationem velit illum libero deleniti obcaecati, eligendi doloremque maiores dolorem minus adipisci nulla aperiam? Rem vel ut doloremque est repellat! Esse quisquam consequatur quas at ab veniam nostrum accusamus similique, autem velit! Cum reiciendis dolore neque eligendi minus debitis optio inventore iste impedit, quidem totam ab voluptatibus beatae error modi! Aliquid rerum fugiat consequuntur reprehenderit sapiente ex nihil aspernatur, nostrum accusantium repellendus! Quas fugiat repellat similique nulla nemo molestias dolorum, autem molestiae alias temporibus modi consecteturo?'

const TypingTest: FC<IProps> = (): JSX.Element => {
  const [word, setWord] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setWord(value)
    setCharIndex(value.length)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const getHighlightedText = () => {
    return textContent.split('').map((char, index) => {
      return (
        <span
          key={index}
          className={cn('text-gray-500 relative', {
            'before:absolute before:rounded-sm before:-left-[2.5px] before:top-0 before:h-6 before:w-0.5 before:bg-green-500 before:content-[""] before:inline-block before:ml-0.5 before:opacity-100 before:animate-blink':
              index === charIndex,
            'text-white': word[index] === char,
            'text-red-500': word[index] !== char && index < charIndex,
          })}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <div>
      <h1>Typing Test</h1>
      <input type="text" value={word} onChange={handleInput} ref={inputRef} className="opacity-0" />
      <div className="text-xl tracking-widest leading-10 border border-black p-2" tabIndex={0}>
        {getHighlightedText()}
      </div>
    </div>
  )
}

export default TypingTest
