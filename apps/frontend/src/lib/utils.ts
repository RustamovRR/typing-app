import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function determineCorrectness(inputValue: string, referenceText: string) {
  let correctCount = 0
  const inputLength = inputValue.length
  const referenceLength = referenceText.length
  const maxLength = Math.min(inputLength, referenceLength)

  for (let i = 0; i < maxLength; i++) {
    if (inputValue[i] === referenceText[i]) {
      correctCount++
    }
  }

  const incorrectCount = inputLength - correctCount
  return { correctCount, incorrectCount }
}
