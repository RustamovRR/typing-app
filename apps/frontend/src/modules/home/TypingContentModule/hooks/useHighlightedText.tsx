import { useTypingStore } from '@/store'
import { cn } from '@/lib/utils'

const useHighlightedText = () => {
  const { charIndex, inputValue, isTyping, text } = useTypingStore((state) => state)

  const words = text.split(' ')
  let currentIndex = 0
  let globalCharIndex = 0

  return words.map((word, wordIndex) => {
    const wordElements = word.split('').map((char, charIndexInWord) => {
      globalCharIndex = currentIndex + charIndexInWord

      return (
        <span
          key={charIndexInWord}
          className={cn('text-gray-500 relative inline-block', {
            'before:absolute before:rounded-sm before:-left-[2.5px] before:top-1 before:h-8 before:w-[3px] before:bg-green-500 before:content-[""] before:ml-[1.5px]':
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
            'before:absolute before:rounded-sm before:-left-[2.5px] before:-bottom-1.5 before:h-8 before:w-[3px] before:bg-green-500 before:content-[""] before:ml-0.5':
              globalCharIndex + 1 === charIndex,
            'before:animate-blink': globalCharIndex + 1 === charIndex && !isTyping,
          })}
        ></span>
        {wordIndex < words.length - 1 && <span className="inline-block"> </span>}
      </div>
    )
  })
}

export default useHighlightedText
