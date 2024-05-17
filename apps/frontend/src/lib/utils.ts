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

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return remainingSeconds.toString()
  }

  const formattedMinutes = minutes.toString()
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
